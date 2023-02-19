import SandBoxedListener, {
  bundleListenerVersion,
  CodeTree,
} from "./listener.ts";

await (async function () {
  const tree: CodeTree = {};

  await bundleListenerVersion("telegram", 1, tree);

  const sl = new SandBoxedListener("telegram", "1");

  sl.handle({
    message: {
      text: "hello",
    },
  }).then((res) => {
    console.log(res);
  }).catch((e) => {
    console.error(e);
  });

  sl.respond("bye").then((res) => {
    console.log(res);
  }).catch((e) => {
    console.error(e);
  });
})();
