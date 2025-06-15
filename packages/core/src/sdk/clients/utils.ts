import { Interceptor } from "@connectrpc/connect";
import { buildURL, DOMAIN } from "../utilities";
import { ConnectionOptions } from "./types";

export const createTransport = (options: ConnectionOptions, interceptors: Interceptor[]) => {
  return options.createTransportFn({
    url: buildURL({
      domain: DOMAIN,
      app: options.app,
      clientType: options.clientType,
    }),
    interceptors,
  });
};
