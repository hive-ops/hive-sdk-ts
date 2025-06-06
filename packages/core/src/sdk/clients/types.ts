import { Client, Transport } from "@connectrpc/connect";
import { BeekeeperService, DroneService, DroneTokenService, HiveToken, VespaService } from "../../gen";
import { ClientType } from "../utilities/types";

export type CreateTransportFn<T> = (transportOptions: { url: string; token: string; rpcOptions: T }) => Transport;

export type ClientOptions<T> = {
  clientType: ClientType;
  token: string;
  rpcOptions: T;
  createTransportFn: CreateTransportFn<T>;
};

export type FetchFreshHiveTokenFn = (accessToken: string) => Promise<HiveToken>;

type BaseClient = {
  invalidateHiveToken: () => void;
};

export type TokenClient = BaseClient & Client<typeof DroneTokenService>;

export type DroneClient = BaseClient & Client<typeof DroneService>;

export type BeekeeperClient = BaseClient & Client<typeof BeekeeperService>;

export type VespaClient = BaseClient & Client<typeof VespaService>;
