import { createGrpcTransport } from "@connectrpc/connect-node";
import * as core from "@hiveops/core";

export const clientOptions: core.ClientOptions = {
  clientType: core.JavaScriptClientType.NODE,
  createTransportFn: ({ url, interceptors }) =>
    createGrpcTransport({
      baseUrl: url,
      interceptors,
      httpVersion: "2",
      nodeOptions: {
        rejectUnauthorized: true,
      },
    }),
};

export const setAccessToken = ({ token, type, hiveToken }: { token?: string; type: core.UserType; hiveToken?: core.HiveTokenPair }) => {
  core.setAccessToken({
    token,
    type,
    hiveToken,
    options: clientOptions,
  });
};

export const createTokenClient = (token: string): core.TokenClient => core.createTokenClient(clientOptions, token);

export const createSingletonDroneClient = (): core.DroneClient => core.createSingletonDroneClient(clientOptions);

export const createSingletonBeekeeperClient = (): core.BeekeeperClient => core.createSingletonBeekeeperClient(clientOptions);

export const createSingletonVespaClient = (database: core.VespaDatabase): core.VespaClient => {
  return core.createSingletonVespaClient({
    hubId: database.node?.hubId!,
    nodeName: database.node?.name!,
    ...clientOptions,
  });
};
