import { HlBody, Listener, ListenerResponseT, ResponseFunction } from '../../interfaces/adapter.ts';

/**
 * CodeTree is a tree of code, where each node is either a leaf (code) or a branch (tree).
 */
type CodeTree = {
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
function bundleListenerVersion(name: string, version: number, codeTree: CodeTree): string {
	return '';
}

type ExecResult = {
	code: number;
	stdout: string;
	stderr: string;
};

async function execCmd(cmd: string[]): Promise<ExecResult> {
	const proc = Deno.run({ cmd, stderr: 'piped', stdout: 'piped' });
	const [status, stdout, stderr] = await Promise.all([
		proc.status(),
		proc.output(),
		proc.stderrOutput(),
	]);

	try {
		proc.kill('SIGKILL');
		proc.close();
	} catch (e) {
		if (!e.message.includes('ESRCH')) { // Might have already closed
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
		this.bundle = './wrapper.ts';
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
			'deno',
			'run',
			'--allow-net',
			this.bundle,
			'method=handle',
			`body=${btoa(JSON.stringify(body))}`,
		];
		const { code, stdout, stderr } = await execCmd(cmd);
		if (code !== 0) {
			throw new Error(stderr);
		}
		try {
			return JSON.parse(stdout);
		} catch (e) {
			throw new Error(`Invalid JSON: ${stdout}, ${e}`);
		}
	}

	async respond(response: string): Promise<any> {
		const cmd = [
			'deno',
			'run',
			'--allow-net',
			this.bundle,
			'method=respond',
			`responseMsg=${btoa(response)}`,
		];

		const { code, stdout, stderr } = await execCmd(cmd);
		if (code !== 0) {
			throw new Error(stderr);
		}

		try {
			return JSON.parse(stdout);
		} catch (e) {
			throw new Error(`Invalid JSON: ${stdout}, ${e}`);
		}
	}

	async parseAuthenticator(): Promise<string | ResponseFunction> {
		return new Promise<string | ResponseFunction>((resolve, reject) => {
		});
	}
}

await (function () {
	const sl = new SandBoxedListener('telegram', '1');

	sl.handle({
		message: {
			text: 'hello',
		},
	}).then((res) => {
		console.log(res);
	}).catch((e) => {
		console.error(e);
	});

	sl.respond('bye').then((res) => {
		console.log(res);
	}).catch((e) => {
		console.error(e);
	});
})();
