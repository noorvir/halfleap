import {
  HlBody,
  Listener,
  ListenerResponseT,
  ResponseFunction,
} from "../interfaces/adapter.ts";
import * as path from "https://deno.land/std@0.177.0/path/mod.ts";
import * as mod from "https://deno.land/std@0.177.0/fs/mod.ts";

export const FILE_DIR = new URL(".", import.meta.url).pathname;
export const CACHE_DIR = `${FILE_DIR}.hl-cache/`;

console.log({ CUR_DIR: FILE_DIR, CACHE_DIR });

/**
 * CodeTree is a tree of code, where each node is either a leaf (code) or a branch (tree).
 */
export type CodeTree = {
  [path: string]: {
    tree: CodeTree | null;
    code: string | null;
  };
};

/**
 * Bundles the listener code by wrapping it with aWrites the code tree to the file system and wraps it with accessor functions.
 *
 * @param name
 * @param version
 * @param codeTree
 */
export async function bundleListenerVersion(
  name: string,
  version: number,
  codeTree: CodeTree,
) {
  await mod.ensureDir(`${CACHE_DIR}listener/${name}/v${version}/`);

  await Deno.copyFile(
    `${FILE_DIR}wrapper.ts`,
    `${CACHE_DIR}listener/${name}/v${version}/wrapper.ts`,
  );

  await mod.copy(`${FILE_DIR}../interfaces/`, `${CACHE_DIR}interfaces`, {
    overwrite: true,
  });

  await Deno.copyFile(
    `${FILE_DIR}../adapters/test/index.ts`,
    `${CACHE_DIR}listener/${name}/v${version}/index.ts`,
  );

  const cmd = [
    "deno",
    "bundle",
    "--import-map",
    `${FILE_DIR}/import_map.json`,
    `${CACHE_DIR}listener/${name}/v${version}/wrapper.ts`,
    `${CACHE_DIR}listener/${name}/v${version}/bundle.ts`,
  ];
  const proc = Deno.run({ cmd, stderr: "piped", stdout: "piped" });

  const [status, stdout, stderr] = await Promise.all([
    proc.status(),
    proc.output(),
    proc.stderrOutput(),
  ]);

  if (status.code !== 0) {
    console.log(`Could not bundle listener ${name} v${version}`);
    console.log(`stdout: ${new TextDecoder().decode(stdout)}`);
    console.log(`stderr: ${new TextDecoder().decode(stderr)}`);
    return;
  }
  return;
}

type ExecResult = {
  code: number;
  stdout: string;
  stderr: string;
};

async function execCmd(cmd: string[]): Promise<ExecResult> {
  const proc = Deno.run({ cmd, stderr: "piped", stdout: "piped" });
  const [status, stdout, stderr] = await Promise.all([
    proc.status(),
    proc.output(),
    proc.stderrOutput(),
  ]);

  try {
    proc.kill("SIGKILL");
    proc.close();
  } catch (e) {
    if (!e.message.includes("ESRCH")) { // Might have already closed
      console.log(`Could not kill process`, e);
    }
  }

  return {
    code: status.code,
    stdout: new TextDecoder().decode(stdout),
    stderr: new TextDecoder().decode(stderr),
  };
}

export default class SandBoxedListener implements Listener {
  bundle: string; // path the the bundle
  name: string;
  version: string;

  constructor(name: string, version: string) {
    this.bundle = `${CACHE_DIR}listener/${name}/v${version}/bundle.ts`;
    this.name = name;
    this.version = version;
  }

  getID(): string {
    return `${this.name}-${this.version}`;
  }

  getName(): string {
    return this.name;
  }

  async handle(body: HlBody): Promise<ListenerResponseT> {
    const cmd = [
      "deno",
      "run",
      "--allow-net",
      this.bundle,
      "type::listener",
      "method::handle",
      `body::${btoa(JSON.stringify(body))}`,
    ];
    const { code, stdout, stderr } = await execCmd(cmd);
    if (code !== 0) {
      throw new Error(stderr);
    }
    try {
      return JSON.parse(stdout);
    } catch (e) {
      console.log(stdout, stderr);
      throw new Error(`Invalid JSON: ${stdout}, ${e}`);
    }
  }

  async respond(response: string): Promise<any> {
    const cmd = [
      "deno",
      "run",
      "--allow-net",
      this.bundle,
      "type::listener",
      "method::respond",
      `responseMsg::${btoa(response)}`,
    ];

    const { code, stdout, stderr } = await execCmd(cmd);
    if (code !== 0) {
      throw new Error(stderr);
    }

    try {
      return JSON.parse(stdout);
    } catch (e) {
      console.log(stdout);
      throw new Error(`Invalid JSON: ${stdout}, ${e}`);
    }
  }

  async parseAuthenticator(): Promise<string | ResponseFunction> {
    return new Promise<string | ResponseFunction>((resolve, reject) => {
    });
  }
}
