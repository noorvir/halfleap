import { Listener, ListenerResponseT, ResponseFunction } from '../../interfaces/adapter.ts';
import { Context } from 'https://deno.land/x/oak@v10.6.0/context.ts';

const NAME = 'telegram';

export default function init(version: number): Listener {
	return {
		getID(): string {
			return '';
		},
		getName(): string {
			return NAME;
		},
		handle: async function (body): Promise<ListenerResponseT> {
			return { data: { message: body } };
		},
		respond: async function (response: string): Promise<any> {
			return { response };
		},
		parseAuthenticator(): Promise<string | ResponseFunction> {
			return new Promise<string | ResponseFunction>((resolve, reject) => {});
		},
	};
}
