import { createClient } from "@connectrpc/connect";
import { DroneTokenService, FQDN, Service } from "../../gen";
import { DOMAIN } from "../constants";
import { buildURL, makeSingletonFactory } from "../utilities/utils";
import { ClientOptions, TokenClient } from "./types";
import { invalidateHiveToken } from "./utils";

const createTokenClient = <T>(options: ClientOptions<T>): TokenClient => {
  const transport = options.createTransportFn({
    url: buildURL(
      new FQDN({
        domain: DOMAIN,
        service: Service.DRONE,
        framework: options.framework,
      }),
    ),
    token: options.token,
    rpcOptions: options.rpcOptions,
  });

  return {
    ...createClient(DroneTokenService, transport),
    invalidateHiveToken: invalidateHiveToken,
  };
};

export const createSingletonTokenClient = makeSingletonFactory((options: ClientOptions<any>) => {
  return createTokenClient(options);
});
