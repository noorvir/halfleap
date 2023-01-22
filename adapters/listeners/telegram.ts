import { Bot, Context, TelegramUpdate, webhookCallback } from '../../deps/deps.ts';
import { EventT, Listener, ListenerResponseT, Publisher } from '../../interfaces/adapter.ts';

const TELEGRAM = 'telegram';

export default class TelegramAdapter implements Listener, Publisher {
	id: string;
	bot: Bot;
	handleUpdate: (ctx: Context) => Promise<void>;

	constructor(id: string, token: string) {
		this.bot = new Bot(token);
		this.id = id;
		this.handleUpdate = webhookCallback(this.bot);

		// Commands
		this.bot.command(
			'ping',
			(ctx) => ctx.reply(`Pong! ${new Date()} ${Date.now()}`),
		);
	}

	getID(): string {
		return this.id;
	}

	getName(): string {
		return TELEGRAM;
	}

	async parseAuthenticator(ctx: Context): Promise<string> {
		const body: TelegramUpdate = await ctx.request.body({ type: 'json' }).value;
		return body.message?.from?.id?.toString() || '';
	}

	async handle(ctx: Context): Promise<ListenerResponseT> {
		const body = await ctx.request.body({ type: 'json' }).value;
		console.log(body);

		return {
			data: { 'hello': 'world' },
			response: () => this.handleUpdate(ctx),
		};
	}

	async publish(event: EventT, conn: any): Promise<void> {
		// Send the event to the telegram API
		return Promise.resolve();
	}
}
