import { createGrpcWebTransport } from "@connectrpc/connect-web";
import * as core from "@hiveops/core";

export const clientOptions: core.ClientOptions = {
  clientType: "web",
  createTransportFn: ({ url, interceptors }) =>
    createGrpcWebTransport({
      baseUrl: url,
      interceptors,
      nodeOptions: {
        rejectUnauthorized: true,
      },
    }),
};
