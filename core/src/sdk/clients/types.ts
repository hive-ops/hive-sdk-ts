import { Client, Transport } from "@connectrpc/connect";
import { DroneTokenService, Framework, HiveToken } from "../../gen";

export type CreateTransportFn<T> = (transportOptions: { url: string; token: string; rpcOptions: T }) => Transport;

export type ClientOptions<T> = {
  framework: Framework;
  token: string;
  rpcOptions: T;
  createTransportFn: CreateTransportFn<T>;
};

export type FetchFreshHiveTokenFn = (accessToken: string) => Promise<HiveToken>;

type BaseClient = {
  invalidateHiveToken: () => void;
};

export type TokenClient = BaseClient & Client<typeof DroneTokenService>;
