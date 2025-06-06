import { createGrpcTransport } from "@connectrpc/connect-node";
import * as core from "@hiveops/core";

type GRPCOptions = {
  httpVersion: "2";
  nodeOptions: {
    rejectUnauthorized: boolean;
  };
};

const rpcOptions: GRPCOptions = {
  httpVersion: "2",
  nodeOptions: {
    rejectUnauthorized: true,
  },
};

const clientType: core.ClientType = "node";

export const fetchFreshHiveTokenFn: core.FetchFreshHiveTokenFn = async (token: string) => {
  const tokenClient = createSingletonTokenClient(token);
  const response = await tokenClient.getSecureAppHiveToken({});
  return response.hiveToken!;
};

export const createTransportFn: core.CreateTransportFn<GRPCOptions> = ({ url, token, rpcOptions }) =>
  createGrpcTransport({
    baseUrl: url,
    interceptors: core.getInterceptors({ fetchFreshHiveTokenFn, token }),
    ...rpcOptions,
  });

export const createTokenClientTransportFn: core.CreateTransportFn<GRPCOptions> = (config) =>
  createGrpcTransport({
    baseUrl: config.url,
    interceptors: core.getTokenClientInterceptors(config.token),
    ...config.rpcOptions,
  });

export const createSingletonTokenClient = (token?: string): core.TokenClient =>
  core.createSingletonTokenClient({
    token: token || core.getAccessToken(),
    clientType,
    rpcOptions,
    createTransportFn: createTokenClientTransportFn,
  });

export const createSingletonDroneClient = (token?: string): core.DroneClient =>
  core.createSingletonDroneClient({
    token: token || core.getAccessToken(),
    clientType,
    rpcOptions,
    createTransportFn,
  });

export const createSingletonBeekeeperClient = (token?: string): core.BeekeeperClient =>
  core.createSingletonBeekeeperClient({
    token: token || core.getAccessToken(),
    clientType,
    rpcOptions,
    createTransportFn,
  });

export const createSingletonVespaClient = (database: core.VespaDatabase, token?: string): core.VespaClient => {
  return core.createSingletonVespaClient({
    hubId: database.node?.hubId!,
    nodeName: database.node?.name!,
    token: token || core.getAccessToken(),
    clientType,
    rpcOptions,
    createTransportFn,
  });
};
