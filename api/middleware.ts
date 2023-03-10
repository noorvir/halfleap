import { Context, Middleware } from '../deps/deps.ts';
import { HALFLEAP_API_TOKEN, TELEGRAM_BOT_TOKEN } from './constants.ts';
import { supabaseAdmin } from './supabase.ts';
import { Listener } from '../interfaces/adapter.ts';
import TelegramAdapter from '../adapters/listeners/telegram.ts';

const urlSecretAuth = (ctx: Context) => {
	return ctx.request.url.searchParams.get('secret') === HALFLEAP_API_TOKEN;
};

const getListenerNameFromURL = (pathname: string) => {
	const parts = pathname.split('/');
	if (parts.length < 3) {
		return null;
	}
	return parts[2];
};

export const initListener = async (name: string): Promise<Listener | null> => {
	const adapterID = await supabaseAdmin.from('adapters').select('id').eq('name', name)
		.then(
			({ data, error }) => {
				if (error) {
					throw error;
				}
				if (data && data.length > 0) {
					return data[0].id;
				}
				return null;
			},
		);

	if (!adapterID) {
		return null;
	}

	switch (name) {
		case 'telegram':
			return new TelegramAdapter(adapterID, TELEGRAM_BOT_TOKEN);
		default:
			return null;
	}
};

/**
 * Middleware to authenticate the request.
 *
 * This makes sure the listener being called is installed and configured by the user and check to
 * see if the request is authorized. Note that this does not check whether the user making the
 * request is authorized to make it, rather, that the adapter is authorized.
 *
 * @param ctx
 * @param next
 */
export const withAuthorizedListener: Middleware = async (ctx: Context, next) => {
	const name = getListenerNameFromURL(ctx.request.url.pathname);
	if (!name) {
		ctx.response.status = 400;
		return;
	}

	// TODO: implement other auth methods
	if (!urlSecretAuth(ctx)) {
		ctx.response.status = 405;
		ctx.response.body = 'Not allowed';
		console.warn('Not allowed');
		return;
	}

	const listener = await initListener(name);
	if (!listener) {
		ctx.response.status = 404;
		ctx.response.body = `Listener "${name}" not found`;
		console.warn(`Listener "${name}" not found`);
		return;
	}

	const authID = await listener.parseAuthenticator(ctx);
	if (!authID || authID == '') {
		ctx.response.status = 401;
		ctx.response.body = 'Unauthorized';
	}

	const authenticator = await supabaseAdmin.from('authenticators').select().eq('auth_id', authID)
		.eq('is_allowed', true);

	if (authenticator) {
		return next();
	}
	ctx.response.status = 403;
	ctx.response.body = 'Forbidden';
	console.warn(`Authenticator ${authID} is forbidden from accessing this route`);
	return listener.respond(ctx, 'You\'re not allowed to access this route');
};
