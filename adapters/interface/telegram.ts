import { Bot, webhookCallback } from "https://deno.land/x/grammy@v1.8.3/mod.ts";

import { Context } from "../../deps/deps.ts";
import { AdapterID, Event, Listener, Publisher } from "./generic.ts";

const Telegram: AdapterID = "telegram";

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

  GetType(): AdapterID {
    return Telegram;
  }

  async handle(ctx: Context): Promise<Event> {
    const body = await ctx.request.body({ type: "json" }).value;
    console.log(body);

    return Promise.resolve({
      ID: "123",
      Source: Telegram,
      Timestamp: new Date(),
      Location: { Latitude: 0, Longitude: 0 },
      Data: "Hello",
      response: () => this.handleUpdate(ctx),
    });
  }

  async publish(event: Event, conn: any): Promise<void> {
    // Send the event to the telegram API
  }
}
