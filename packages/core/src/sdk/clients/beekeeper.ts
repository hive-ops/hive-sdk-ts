import { createClient } from "@connectrpc/connect";
import { BeekeeperService, FQDN, Service } from "../../gen";
import { DOMAIN } from "../utilities";
import { buildURL, makeSingletonFactory } from "../utilities/utils";
import { BeekeeperClient, ClientOptions } from "./types";
import { invalidateHiveToken } from "./utils";

const createBeekeeperClient = <T>(options: ClientOptions<T>): BeekeeperClient => {
  const transport = options.createTransportFn({
    url: buildURL(
      new FQDN({
        domain: DOMAIN,
        service: Service.BEEKEEPER,
        framework: options.framework,
      }),
    ),
    token: options.token,
    rpcOptions: options.rpcOptions,
  });
  return {
    ...createClient(BeekeeperService, transport),
    invalidateHiveToken: invalidateHiveToken,
  };
};

export const createSingletonBeekeeperClient = makeSingletonFactory((options: ClientOptions<any>) => {
  return createBeekeeperClient(options);
});
