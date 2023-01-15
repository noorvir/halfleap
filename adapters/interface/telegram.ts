import { Bot, webhookCallback } from "https://deno.land/x/grammy@v1.8.3/mod.ts";

export const initTelegram = async (token: string) => {
  console.log("Initializing telegram bot: ", token);
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
  const handleUpdate = webhookCallback(bot);

  console.log("Handler executing");
  try {
    if (context.request.url.searchParams.get("secret") !== halfleapToken) {
      context.response.status = 405;
      context.response.body = "not allowed";
      console.warn("Not allowed");
      return;
    }

    console.log("Handling update");
    console.log(await context.request.body({ type: "json" }).value);
    await handleUpdate(context);
  } catch (err) {
    console.error(err);
  }
};

export default telegramHandler;
