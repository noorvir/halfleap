const adapterVersion = Deno.args[0] /* `version=b` */.split("=")[1];
const entryPoint = Deno.args[1] /* `path=/a/index.ts` */.split("=")[1];
const scriptProxy = "http://localhost:3001/proxy";
const scriptAuthHeaders = { "x-script-id": adapterVersion };

const realFetch = fetch;

// User fetch (all requests pass through, and are limited by, the proxy)
// n.b. there's no way around this – all other hosts are locked down via `--allow-net`
// e.g. `realFetch("https://bing.com")` will cause the sandbox to crash with `PermissionDenied`
globalThis.fetch = (
  input: string | Request | URL,
  init?: RequestInit | undefined,
) => {
  if (init === undefined) {
    init = {};
  }

  init.headers = {
    ...init.headers,
    ...scriptAuthHeaders,
    "x-script-fetch": input.toString(),
  };
  return realFetch(scriptProxy, init);
};
