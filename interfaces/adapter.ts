import {Context} from "../deps/deps.ts";
import {Database} from "./database.types.ts";

export type AdapterID = "telegram" | "webhook";

export type AdapterT = Database["halfleap"]["Tables"]["adapters"]["Row"];
export type EventT = Database["halfleap"]["Tables"]["events"]["Row"];
export type EventTypesT = Database["halfleap"]["Enums"]["event_type"];

interface Adapter {
  GetID(): AdapterID;
}

type ResponseFunction = () => Promise<void>;

export type ListenerResponseT = {
  event: EventT,
  response: ResponseFunction;
};

export interface Listener extends Adapter {
  handle(ctx: Context): Promise<ListenerResponseT>;
}

export interface Transformer {
  handleEvent(event: EventT, db: any): Promise<void>;
}

export interface Publisher {
  publish(event: EventT, conn: any): Promise<void>;
}
