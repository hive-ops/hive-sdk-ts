import { Client, Interceptor, Transport } from "@connectrpc/connect";
import { App, BeekeeperService, DroneService, DroneTokenService, VespaService } from "../../gen";
import { ClientType } from "../utilities/types";

export type CreateTransportFn = (opts: { url: string; interceptors: Interceptor[] }) => Transport;

export type ClientOptions = {
  clientType: ClientType;
  createTransportFn: CreateTransportFn;
};

export type ConnectionOptions = ClientOptions & {
  app: App;
};

export type TokenClient = Client<typeof DroneTokenService>;

export type DroneClient = Client<typeof DroneService>;

export type BeekeeperClient = Client<typeof BeekeeperService>;

export type VespaClient = Client<typeof VespaService>;
