import { create } from "@bufbuild/protobuf";
import { createClient } from "@connectrpc/connect";
import { App, FQDNSchema, VespaDatabaseService } from "../../gen";
import { buildURL, getDomain, getEnv, makeSingletonFactory } from "../utilities/utils";
import { getClientOptions } from "./globals";
import { getTokenWithoutClaimsInterceptor } from "./utils";

export const createSingletonVespaClient = makeSingletonFactory(({ hubId, nodeName }: { hubId: string; nodeName: string }) => {
  const { clientType, createTransportFn } = getClientOptions();

  const fqdn = create(FQDNSchema, {
    domain: getDomain(),
    environment: getEnv(),
    hubId,
    app: App.VESPA,
    nodeName,
  });

  const transport = createTransportFn({
    url: buildURL(fqdn, clientType),
    interceptors: [getTokenWithoutClaimsInterceptor()],
  });

  return {
    ...createClient(VespaDatabaseService, transport),
  };
});
