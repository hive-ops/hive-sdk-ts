import { createGrpcTransport } from "@connectrpc/connect-node";
import * as core from "@hiveops/core";

export const clientOptions: core.ClientOptions = {
  clientType: "node",
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
