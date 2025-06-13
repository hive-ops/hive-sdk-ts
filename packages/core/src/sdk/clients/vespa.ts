import { createClient } from "@connectrpc/connect";
import { App, VespaService } from "../../gen";
import { DOMAIN, FQDN } from "../utilities";
import { buildURL, makeSingletonFactory } from "../utilities/utils";
import { ClientOptions } from "./types";
import { getInterceptors } from "./utils";

type VespaClientOptions = ClientOptions & {
  hubId: string;
  nodeName: string;
};

export const createSingletonVespaClient = makeSingletonFactory((options: VespaClientOptions) => {
  const fqdn: FQDN = {
    domain: DOMAIN,
    hubId: options.hubId,
    app: App.VESPA,
    nodeName: options.nodeName,
    clientType: options.clientType,
  };

  const transport = options.createTransportFn({
    url: buildURL(fqdn),
    interceptors: getInterceptors(),
  });

  return {
    ...createClient(VespaService, transport),
  };
});
