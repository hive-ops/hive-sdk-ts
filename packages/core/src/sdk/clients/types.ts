import { Client, Transport } from "@connectrpc/connect";
import { App, BeekeeperService, DroneTokenService, Framework, HiveToken, VespaService } from "../../gen";

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

export type BeekeeperClient = BaseClient & Client<typeof BeekeeperService>;

export type VespaClient = BaseClient & Client<typeof VespaService>;

export type ClientType = "node" | "deno" | "web";

export const CLIENT_TYPE_FRAMEWORK_MAP: { [key in ClientType]: Framework } = {
  node: Framework.GRPC,
  deno: Framework.GRPC,
  web: Framework.GRPC_WEB,
};

// export type AppName = "drone" | "beekeeper" | "vespa";

export type FQDN = {
  domain: string;
  workload?: string;
  hub?: string;
  app: App;
  nodeName?: string;
};
