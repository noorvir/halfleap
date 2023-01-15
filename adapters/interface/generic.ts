import { Context } from "../../deps/deps.ts";
interface Location {
  Latitude: number;
  Longitude: number;
}

export type AdapterID = "telegram" | "webhook";

export interface Event {
  ID: string;
  Source: AdapterID;
  Timestamp: Date;
  Location: Location;
  Data: string;

  response?: () => Promise<void>;
}

interface Adapter {
  GetType(): AdapterID;
}

export interface Listener extends Adapter {
  handle(ctx: Context): Promise<Event>;
}

export interface Transformer {
  handleEvent(event: Event, db: any): Promise<void>;
}

export interface Publisher {
  publish(event: Event, conn: any): Promise<void>;
}
