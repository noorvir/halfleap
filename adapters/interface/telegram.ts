import { Bot, webhookCallback } from "https://deno.land/x/grammy@v1.8.3/mod.ts";

export const initTelegram = async (token: string) => {
  const bot = new Bot(token);

  bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
  bot.command("ping", (ctx) => ctx.reply(`Pong! ${new Date()} ${Date.now()}`));

  return bot;
};

const telegramHandler = async (
  context: any,
  bot: Bot,
  halfleapToken: string,
) => {
  const handleUpdate = webhookCallback(bot, "std/http");

  try {
    if (context.request.url.searchParams.get("secret") !== halfleapToken) {
      context.response.status = 405;
      context.response.body = "not allowed";
      return;
    }

    context.response = await handleUpdate(context.request);
  } catch (err) {
    console.error(err);
  }
};

export default telegramHandler;
