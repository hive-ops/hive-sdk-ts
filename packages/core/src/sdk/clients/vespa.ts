import { createClient } from "@connectrpc/connect";
import { App, VespaService } from "../../gen";
import { DOMAIN, FQDN } from "../utilities";
import { buildURL, makeSingletonFactory } from "../utilities/utils";
import { getClientOptions } from "./globals";
import { getInterceptors } from "./token-manager";

export const createSingletonVespaClient = makeSingletonFactory(({ hubId, nodeName }: { hubId: string; nodeName: string }) => {
  const { clientType, createTransportFn } = getClientOptions();

  const fqdn: FQDN = {
    domain: DOMAIN,
    hubId,
    app: App.VESPA,
    nodeName,
    clientType,
  };

  const transport = createTransportFn({
    url: buildURL(fqdn),
    interceptors: getInterceptors(),
  });

  return {
    ...createClient(VespaService, transport),
  };
});
