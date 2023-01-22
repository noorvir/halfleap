import { Bot, Context, TelegramUpdate, webhookCallback } from '../../deps/deps.ts';
import {
	EventT,
	Listener,
	ListenerResponseT,
	Publisher,
	ResponseFunction,
} from '../../interfaces/adapter.ts';

const TELEGRAM = 'telegram';

export default class TelegramAdapter implements Listener, Publisher {
	id: string;
	bot: Bot;
	chat_id: string;
	handleUpdate: (ctx: Context) => Promise<void>;

	constructor(id: string, token: string) {
		this.bot = new Bot(token);
		this.id = id;
		this.chat_id = '';
		this.handleUpdate = webhookCallback(this.bot);
	}

	getID(): string {
		return this.id;
	}

	getName(): string {
		return TELEGRAM;
	}

	async parseAuthenticator(ctx: Context): Promise<string | ResponseFunction> {
		try {
			const body: TelegramUpdate = await ctx.request.body({ type: 'json' })?.value;
			this.chat_id = body.message?.chat?.id?.toString() || '';
			return body.message?.from?.id?.toString() || '';
		} catch (e) {
			return '';
		}
	}

	async handle(ctx: Context): Promise<ListenerResponseT> {
		try {
			const body = await ctx.request.body({ type: 'json' }).value;
			const text = body.message?.text || '';
			return {
				data: text,
				response: (msg) => this.respond(ctx, msg),
			};
		} catch (e) {
			console.log(e);
			// TODO: return error response handler
			throw e;
		}
	}

	respond(ctx: Context, response: string) {
		return this.bot.api.sendMessage(this.chat_id, response).then(() => this.handleUpdate(ctx));
	}

	async publish(event: EventT, conn: any): Promise<void> {
		// Send the event to the telegram API
		return Promise.resolve();
	}
}
