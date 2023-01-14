import { Bot, webhookCallback } from "https://deno.land/x/grammy@v1.8.3/mod.ts";

const bot = new Bot(Deno.env.get("TELEGRAM_BOT_TOKEN") || "");

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.command("ping", (ctx) => ctx.reply(`Pong! ${new Date()} ${Date.now()}`));

const handleUpdate = webhookCallback(bot, "std/http");

const telegramHandler = async (context: any) => {
  try {
    if (
      context.request.url.searchParams.get("secret") !==
        Deno.env.get("FUNCTION_SECRET")
    ) {
      context.response.status = 405;
      context.response.body = "not allowed";
    } else {
      context.response = await handleUpdate(context.request);
    }
  } catch (err) {
    console.error(err);
  }
};

export default telegramHandler;
