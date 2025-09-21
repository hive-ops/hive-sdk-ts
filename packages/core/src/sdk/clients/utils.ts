import { create } from "@bufbuild/protobuf";
import { Interceptor } from "@connectrpc/connect";
import { App, BasePort, FQDN, FQDNSchema } from "../../gen";
import { buildURL, getDomain, getEnv } from "../utilities";
import { getClientOptions } from "./globals";
import { tokenManager } from "./token-manager";

export const createTransport = (app: App, interceptors: Interceptor[]) => {
  const { createTransportFn, clientType } = getClientOptions();

  const fqdn: FQDN = create(FQDNSchema, {
    domain: getDomain(),
    environment: getEnv(),
    hubId: "",
    app,
    basePort: BasePort.UNSPECIFIED,
    nodeName: "",
  });

  return createTransportFn({
    url: buildURL(
      fqdn,
      clientType,
    ),
    interceptors,
  });
};

export const getTokenInterceptor = (): Interceptor => (next) => async (req) => {
  const token = await tokenManager.getFirebaseTokenWithClaims();
  req.header.set("Authorization", `Bearer ${token}`);
  return next(req);
};
