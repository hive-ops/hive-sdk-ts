import { Client, Interceptor, Transport } from "@connectrpc/connect";
import { BeekeeperService, DroneService, DroneTokenService, JavaScriptClientType, VespaService } from "../../gen";

export type CreateTransportFn = (opts: { url: string; interceptors: Interceptor[] }) => Transport;

export type ClientOptions = {
  clientType: JavaScriptClientType;
  createTransportFn: CreateTransportFn;
};

export type TokenClient = Client<typeof DroneTokenService>;

export type DroneClient = Client<typeof DroneService>;

export type BeekeeperClient = Client<typeof BeekeeperService>;

export type VespaClient = Client<typeof VespaService>;
