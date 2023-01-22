import { Router } from '../deps/deps.ts';
import { supabaseAdmin } from './supabase.ts';
import { EventT, ListenerResponseT, Publisher, Transformer } from '../interfaces/adapter.ts';
import { initListener } from './middleware.ts';

const router = new Router();

const transforms: Transformer[] = [];
const publishers: Publisher[] = [];

// parse the telegram specific userid from the request
// ensure the correct user is sending the request
// use the adapter to parse the request
// store the parsed event in the database
// execute next adapter

router
	.get('/', (context) => {
		context.response.body = 'Hello, World!';
	})
	.get('/users/:id', (context) => {
		context.response.body = { name: 'John Doe' };
	});

router.post(`/listen/:listener`, async (ctx) => {
	const listener = await initListener(ctx.params.listener);
	// This should be caught by the middleware so this should never happen, but just in case
	if (!listener) {
		ctx.response.status = 400;
		return;
	}

	let event: EventT;
	let res: ListenerResponseT;

	try {
		res = await listener.handle(ctx);
		event = await supabaseAdmin.from('events').insert({
			data: res.data,
			source: listener.id,
			type: 'ingress',
		}).select('*').then((res): EventT => {
			if (res.error) {
				throw new Error(res.error.message);
			}
			return {
				...res!.data[0],
			};
		});
	} catch (e) {
		console.log(e);
		// TODO: add error response to listener
		return ctx.response.status = 500;
	}

	for (const transformer of transforms) {
		await transformer.handleEvent(event, supabaseAdmin);
	}
	for (const publisher of publishers) {
		await publisher.publish(event, supabaseAdmin);
	}

	// Every listener can optionally respond to the request
	if (res.response) {
		return res.response(`ack: \n\tevent: ${event.id}\n\tmsg: ${event.data}`);
	}

	ctx.response.status = 200;
	ctx.response.body = 'ok';
});

export default router;
