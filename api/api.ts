import { Application, Router } from "../deps/deps.ts";

import telegramHandler, {
  initTelegram,
} from "../adapters/interface/telegram.ts";
import { HALFLEAP_API_TOKEN, TELEGRAM_BOT_TOKEN } from "./constants.ts";

const router = new Router();

// Connect to database
// Check which adapters are configured
// Load those adapters

// Request:
//  - check RLS policy for user

// for each adapter, get the required metadata

// request from telegram
// - authethenticate who sent it
//  -

// add secret to authenticate webhook
// - each adapter gets it's own token

router
  .get("/", (context) => {
    context.response.body = "Hello, World!";
  })
  .post("/telegram", (context) => {
    console.log("Executing telegram webhook");

    return initTelegram(TELEGRAM_BOT_TOKEN).then((bot) =>
      telegramHandler(context, bot, HALFLEAP_API_TOKEN)
    );
  })
  .get("/users/:id", (context) => {
    context.response.body = { name: "John Doe" };
  });

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Starting server at http://localhost:8000");
await app.listen({ port: 8000 });
