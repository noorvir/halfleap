import { Context } from '../deps/deps.ts';
import { supabaseAdmin } from './supabase.ts';

const genesis = async (ctx: Context) => {
	console.log('Received genesis request');

	// Check if account is already initialized
	const { data, error } = await supabaseAdmin.from('contacts').select().eq('is_me', true);
	if (error) {
		ctx.response.status = 500;
		return;
	}
	if (data && data.length > 0) {
		ctx.response.body = { message: 'This is not your account. Shame on you.' };
		ctx.response.status = 403;
		return;
	}

	const { firstName, lastName, password, email } = await ctx.request.body().value;

	if (!firstName || !lastName || !password || !email) {
		ctx.response.status = 400;
		return;
	}
	try {
		console.log('Creating user', firstName, lastName, email);
		const uid = await supabaseAdmin.auth.admin.createUser({
			email: email,
			password: password,
			user_metadata: {
				'full_name': `${firstName} ${lastName}`,
			},
		}).then((res) => res.error ? new Error(res.error.message) : res.data.user.id);

		const { data, error } = await supabaseAdmin.from('contacts').update({ is_me: true }).eq(
			'id',
			uid,
		);

		if (error) {
			ctx.response.status = 500;
			console.error(error);
			return;
		}

		ctx.response.body = data;
		ctx.response.status = 201;
		return;
	} catch (e) {
		console.error(e);
		ctx.response.status = 500;
		return;
	}
};

export { genesis };
