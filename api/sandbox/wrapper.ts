import init from './index.ts';
import process from 'https://deno.land/std@0.175.0/node/process.ts';

const args = Deno.args.map((arg) => arg.split('=')[1]);

await (async function () {
	const listener = init(1);
	try {
		switch (args[0]) {
			case 'handle': {
				const reqBody = args[1];
				const body = JSON.parse(atob(reqBody));
				const res = await listener.handle(body);
				console.log(JSON.stringify(res));
				return res;
			}
			case 'parseAuthenticator': {
				console.error('parseAuthenticator not implemented');
				break;
			}
			case 'respond': {
				const responseMsg = args[1];
				const msg = atob(responseMsg);
				const res = await listener.respond(msg);
				console.log(JSON.stringify(res));
				return res;
			}
			default:
				console.error('Invalid method');
		}
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
})();
