import { Context } from '../deps/deps.ts';
import { Database } from './database.types.ts';

export type AdapterT = Database['halfleap']['Tables']['adapters']['Row'];
export type EventT = Database['halfleap']['Tables']['events']['Row'];
export type EventTypesT = Database['halfleap']['Enums']['event_type'];

interface Adapter {
	getID(): string;
	getName(): string;
}

type ResponseFunction = () => Promise<void>;

export type ListenerResponseT = {
	data: EventT['data'];
	response?: ResponseFunction;
	errorResponse?: ResponseFunction;
};

export interface Listener extends Adapter {
	/**
	 * id: string;
	 *  ID of the adapter in the db. This is specific to the user.
	 */
	id: string;
	handle(ctx: Context): Promise<ListenerResponseT>;
	 parseAuthenticator(ctx: Context): Promise<string>;
}

export interface Transformer {
	handleEvent(event: EventT, db: any): Promise<void>;
}

export interface Publisher {
	publish(event: EventT, conn: any): Promise<void>;
}
