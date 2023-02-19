import { Context } from 'https://deno.land/x/oak@v10.6.0/mod.ts';
import { Database } from './database.types.ts';

export type AdapterT = Database['halfleap']['Tables']['adapters']['Row'];
export type EventT = Database['halfleap']['Tables']['events']['Row'];
export type EventTypesT = Database['halfleap']['Enums']['event_type'];

interface Adapter {
	getID(): string;

	getName(): string;
}

export type ResponseFunction = (msg: string) => Promise<any>;

export type ListenerResponseT = {
	data: EventT['data'];
	response?: ResponseFunction;
};

export type HlBody = {
	[key: string]: any;
};

export interface Listener extends Adapter {
	handle(body: HlBody): Promise<ListenerResponseT>;

	respond(response: string): Promise<any>;

	parseAuthenticator(ctx: Context): Promise<string | ResponseFunction>;
}

export interface Transformer {
	handleEvent(event: EventT, db: any): Promise<void>;
}

export interface Publisher {
	publish(event: EventT, conn: any): Promise<void>;
}
