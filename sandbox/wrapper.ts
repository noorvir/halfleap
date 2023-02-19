import init from "./index.ts";
import process from "https://deno.land/std@0.175.0/node/process.ts";

async function handleListener(
  method: "handle" | "respond" | "parseAuthenticator",
  args: string[],
) {
  const listener = init(1);
  switch (method) {
    case "handle": {
      const reqBody = args[0];
      const body = JSON.parse(atob(reqBody));
      const res = await listener.handle(body);
      console.log(JSON.stringify(res));
      return res;
    }
    case "parseAuthenticator": {
      console.error("parseAuthenticator not implemented");
      break;
    }
    case "respond": {
      const responseMsg = args[0];
      const msg = atob(responseMsg);
      const res = await listener.respond(msg);
      console.log(JSON.stringify(res));
      return res;
    }
    default:
      console.error("Invalid method");
  }
}

await (async function () {
  const [type, ...args] = Deno.args.map((arg) => arg.split("::")[1]);
  try {
    switch (type) {
      case "listener": {
        const method = args[0];
        if (
          method !== "handle" && method !== "respond" &&
          method !== "parseAuthenticator"
        ) {
          console.error("Invalid listener method");
          process.exit(1);
          return;
        }
        await handleListener(method, args.slice(1));
        return;
      }
      default: {
        throw new Error("Not implemented	");
      }
    }
  } catch (e) {
    console.error(e);
    // process.exit(1);
  }
})();
