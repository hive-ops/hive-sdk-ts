import { Interceptor } from "@connectrpc/connect";
import { App } from "../../gen";
import { buildURL, DOMAIN } from "../utilities";
import { getClientOptions } from "./globals";

export const createTransport = (app: App, interceptors: Interceptor[]) => {
  const { createTransportFn, clientType } = getClientOptions();
  return createTransportFn({
    url: buildURL({
      domain: DOMAIN,
      app,
      clientType,
    }),
    interceptors,
  });
};
