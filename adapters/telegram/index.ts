import {Context} from 'https://deno.land/x/oak@v10.6.0/mod.ts';
import {Bot, webhookCallback} from 'https://deno.land/x/grammy@v1.8.3/mod.ts';
import {type Update as TelegramUpdate} from 'https://esm.sh/v102/@grammyjs/types@2.7.0/update.d.ts';

import {
  EventT,
  Listener,
  ListenerResponseT,
  Publisher,
  ResponseFunction, HlBody,
} from '../../interfaces/adapter.ts';

const TELEGRAM = 'telegram';

export default class TelegramAdapter implements Listener, Publisher {
  id: string;
  bot: Bot;
  chat_id: string;
  // We shouldn't need to call this but I haven't figured out how to do accept messages on the
  // Telegram webhook properly yet. Calling handle update handles sending an OK status to Telegram
  // so it doesn't keep resending us updates.
  handleUpdate: (ctx: any) => Promise<void>;

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
      const body: TelegramUpdate = await ctx.request.body({type: 'json'})?.value;
      this.chat_id = body.message?.chat?.id?.toString() || '';
      return body.message?.from?.id?.toString() || '';
    } catch (e) {
      return '';
    }
  }

  async handle(body: HlBody): Promise<ListenerResponseT> {
    try {
      const text = body.message?.text || '';
      return {
        data: text,
        response: (msg) => this.respond(msg),
      };
    } catch (e) {
      console.log(e);
      // TODO: return error response handler
      throw e;
    }
  }

  respond(response: string): Promise<any> {
    const ctx = {response: {type: "json", body: ""}, }

    return this.bot.api.sendMessage(this.chat_id, response).then(() => this.handleUpdate(ctx));
  }

  async publish(event: EventT, conn: any): Promise<void> {
    // Send the event to the telegram API
    return Promise.resolve();
  }
}
