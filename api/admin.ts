import { Context } from '../deps/deps.ts';
import { supabaseAdmin } from './supabase.ts';

const genesis = async (ctx: Context) => {
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

	const { owner } = await ctx.request.body().value;

	if (!owner) {
		ctx.response.status = 400;
		return;
	}

	const { firstName, lastName, secret, email } = owner;
	if (!firstName || !lastName || !secret || !email) {
		ctx.response.status = 400;
		return;
	}
	try {
		const uid = supabaseAdmin.auth.admin.createUser({
			email: email,
			password: secret,
			user_metadata: {
				firstName: firstName,
				lastName: lastName,
				fullName: `${firstName} ${lastName}`,
			},
		}).then((res) => res.error ? new Error(res.error.message) : res.data.user.id);

		const { data, error } = await supabaseAdmin.from('contacts').update({ is_me: true }).eq(
			'id',
			uid,
		);

		if (error) {
			ctx.response.status = 500;
			return;
		}
		return ctx.response.body = data;
	} catch (e) {
		console.log(e);
		ctx.response.status = 500;
		return;
	}
};

export { genesis };
