import { createClient } from "@connectrpc/connect";
import { App, FQDN, VespaService } from "../../gen";
import { buildURL, getDomain, getEnv, makeSingletonFactory } from "../utilities/utils";
import { getClientOptions } from "./globals";
import { getTokenInterceptor } from "./interceptor";

export const createSingletonVespaClient = makeSingletonFactory(({ hubId, nodeName }: { hubId: string; nodeName: string }) => {
  const { clientType, createTransportFn } = getClientOptions();

  const fqdn = new FQDN({
    domain: getDomain(),
    environment: getEnv(),
    hubId,
    app: App.VESPA,
    nodeName,
  });

  const transport = createTransportFn({
    url: buildURL(fqdn, clientType),
    interceptors: [getTokenInterceptor()],
  });

  return {
    ...createClient(VespaService, transport),
  };
});
