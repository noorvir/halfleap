import { Application, Context, Router } from "../deps/deps.ts";

import { HALFLEAP_API_TOKEN, TELEGRAM_BOT_TOKEN } from "./constants.ts";
import TelegramAdapter from "../adapters/interface/telegram.ts";
import {
  Listener,
  Publisher,
  Transformer,
} from "../adapters/interface/generic.ts";

const router = new Router();

// Connect to database
// Check which adapters are configured
// Load those adapters

// Request:
//  - check RLS policy for user

// for each adapter, get the required metadata

// request from ingress adapters
// - verify if the *adapter* sending the request is authenticated and authorized.
// - authenticate the *request* (who sent it using the adapter)
//  -
//  -

// add secret to authenticate webhook
// - each adapter gets it's own token
// - in

const telegramAdapter = new TelegramAdapter(TELEGRAM_BOT_TOKEN);

router
  .get("/", (context) => {
    context.response.body = "Hello, World!";
  })
  .post("/listen/telegram", async (context) => {
    console.log("Executing telegram webhook");

    if (context.request.url.searchParams.get("secret") !== HALFLEAP_API_TOKEN) {
      context.response.status = 405;
      context.response.body = "not allowed";
      console.warn("Not allowed");
      return;
    }

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

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Starting server at http://localhost:8000");
await app.listen({ port: 8000 });
