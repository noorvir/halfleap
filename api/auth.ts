import { Context, Middleware } from "../deps/deps.ts";
import { HALFLEAP_API_TOKEN } from "./constants.ts";

const urlSecretAuth = (ctx: Context) => {
  return ctx.request.url.searchParams.get("secret") === HALFLEAP_API_TOKEN;
};

const auth: Middleware = (ctx, next) => {
  if (urlSecretAuth(ctx)) {
    return next();
  }

  // TODO: implement other auth methods

  ctx.response.status = 405;
  ctx.response.body = "not allowed";
  console.warn("Not allowed");

  return;
};

export default auth;
