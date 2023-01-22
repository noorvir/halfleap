import { Bot, webhookCallback } from "https://deno.land/x/grammy@v1.8.3/mod.ts";

import { Context } from "../../deps/deps.ts";
import {
  AdapterID,
  EventT,
  Listener,
  ListenerResponseT,
  Publisher,
} from "../../interfaces/adapter.ts";

const TELEGRAM: AdapterID = "telegram";

export default class TelegramAdapter implements Listener, Publisher {
  bot: Bot;
  handleUpdate: (ctx: Context) => Promise<void>;

  constructor(token: string) {
    this.bot = new Bot(token);
    this.handleUpdate = webhookCallback(this.bot);

    // Commands
    this.bot.command(
      "ping",
      (ctx) => ctx.reply(`Pong! ${new Date()} ${Date.now()}`),
    );
  }

  GetID(): AdapterID {
    return TELEGRAM;
  }

  async handle(ctx: Context): Promise<ListenerResponseT> {
    const body = await ctx.request.body({ type: "json" }).value;
    console.log(body);

    return {
      event: {
        created_at: (new Date()).toDateString(),
        id: 1,
        data: {},
        eid: "",
        type: "ingress",
        source: TELEGRAM,
      },
      response: () => this.handleUpdate(ctx),
    };
  }

  async publish(event: EventT, conn: any): Promise<void> {
    // Send the event to the telegram API
    return Promise.resolve();
  }
}
