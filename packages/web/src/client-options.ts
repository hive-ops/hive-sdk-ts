import { createGrpcWebTransport } from "@connectrpc/connect-web";

export const clientOptions: core.ClientOptions = {
  clientType: "web",
  createTransportFn: ({ url, interceptors }) =>
    createGrpcWebTransport({
      baseUrl: url,
      interceptors,
    }),
};
