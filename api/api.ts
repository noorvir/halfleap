import { Application, Router } from "../deps/deps.ts";

import telegramHandler from "../adapters/interface/telegram.ts";

const router = new Router();

// Connect to database
// Check which adapters are configured
// Load those adapters

// Request:
//  - check RLS policy for user

router
  .get("/", (context) => {
    context.response.body = "Hello, World!";
  })
  .get("/telegram", telegramHandler)
  .get("/users/:id", (context) => {
    context.response.body = { name: "John Doe" };
  });

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
