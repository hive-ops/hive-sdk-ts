import { Interceptor } from "@connectrpc/connect";
import { App, FQDN } from "../../gen";
import { buildURL, getDomain, getEnv } from "../utilities";
import { getClientOptions } from "./globals";

export const createTransport = (app: App, interceptors: Interceptor[]) => {
  const { createTransportFn, clientType } = getClientOptions();
  return createTransportFn({
    url: buildURL(
      new FQDN({
        domain: getDomain(),
        environment: getEnv(),
        app,
      }),
      clientType,
    ),
    interceptors,
  });
};
