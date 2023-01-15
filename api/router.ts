import { Router } from "../deps/deps.ts";
import TelegramAdapter from "../adapters/interface/telegram.ts";

import { TELEGRAM_BOT_TOKEN } from "./constants.ts";
import supabase from "./db.ts";

const router = new Router();
const telegramAdapter = new TelegramAdapter(TELEGRAM_BOT_TOKEN);

router
  .get("/", (context) => {
    context.response.body = "Hello, World!";
  })
  .post("/listen/telegram", async (context) => {
    console.log("Executing telegram webhook");

    const event = await telegramAdapter.handle(context);

    console.log(event);

    // Add to DB
    // Pass event to other adapters

    if (event.response) {
      return event.response();
    }

    context.response.status = 200;
    context.response.body = "ok";
  })
  .get("/users/:id", (context) => {
    context.response.body = { name: "John Doe" };
  });

export default router;
