import { createClient } from "@connectrpc/connect";
import { App, VespaService } from "../../gen";
import { DOMAIN, FQDN } from "../utilities";
import { buildURL, makeSingletonFactory } from "../utilities/utils";
import { ClientOptions } from "./types";
import { invalidateHiveToken } from "./utils";

type VespaClientOptions<T> = ClientOptions<T> & {
  hubId: string;
  nodeName: string;
};

export const createSingletonVespaClient = makeSingletonFactory((options: VespaClientOptions<any>) => {
  const fqdn: FQDN = {
    domain: DOMAIN,
    hubId: options.hubId,
    app: App.VESPA,
    nodeName: options.nodeName,
    clientType: options.clientType,
  };

  const transport = options.createTransportFn({
    url: buildURL(fqdn),
    token: options.token,
    rpcOptions: options.rpcOptions,
  });

  return {
    ...createClient(VespaService, transport),
    invalidateHiveToken: invalidateHiveToken,
  };
});
