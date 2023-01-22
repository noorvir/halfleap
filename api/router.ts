import { Router } from '../deps/deps.ts';
import TelegramAdapter from '../adapters/listeners/telegram.ts';

import { TELEGRAM_BOT_TOKEN } from './constants.ts';
import { supabaseAdmin } from './supabase.ts';
import {
	EventT,
	Listener,
	ListenerResponseT,
	Publisher,
	Transformer,
} from '../interfaces/adapter.ts';

const router = new Router();
const telegramAdapter = new TelegramAdapter(TELEGRAM_BOT_TOKEN);

const listeners: Listener[] = [telegramAdapter];
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

for (const listener of listeners) {
	router.post(`/listen/${listener.GetID()}`, async (context) => {
		console.log(`Executing ${listener.GetID()} listener`);

		// TODO: Authorize the request the user
		let event: EventT;
		let res: ListenerResponseT;

		try {
			res = await listener.handle(context);
			event = await supabaseAdmin.from('events').insert({
				data: res.event.data,
				source: res.event.source,
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
			return context.response.status = 500;
		}

		for (const transformer of transforms) {
			await transformer.handleEvent(event, supabaseAdmin);
		}
		for (const publisher of publishers) {
			await publisher.publish(event, supabaseAdmin);
		}

		// Every listener can optionally respond to the request
		if (res.response) {
			return res.response();
		}

		context.response.status = 200;
		context.response.body = 'ok';
	});
}

export default router;
