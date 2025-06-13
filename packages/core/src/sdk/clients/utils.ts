import { Interceptor } from "@connectrpc/connect";
import { HiveToken } from "../../gen";
import { buildURL, DOMAIN } from "../utilities";
import { GetHiveToken as getHiveToken } from "./token-manager";
import { ConnectionOptions } from "./types";

let hiveToken: HiveToken | undefined;

export const hiveTokenIsAboutToExpire = (hiveToken: HiveToken): boolean => {
  return hiveToken.expiresAt < Date.now() + 60000; // 1 minute
};

export const getTokenInterceptorWithToken =
  (token: string): Interceptor =>
  (next) =>
  async (req) => {
    req.header.set("Authorization", `Bearer ${token}`);
    return next(req);
  };

export const getTokenInterceptor = (): Interceptor => (next) => async (req) => {
  const hiveTokenPair = await getHiveToken();
  req.header.set("Authorization", `Bearer ${hiveTokenPair.accessHiveToken!.signedToken}`);
  return next(req);
};

export const getInterceptors = (): Interceptor[] => [getTokenInterceptor()];

export const createTransport = (options: ConnectionOptions, interceptors: Interceptor[]) => {
  return options.createTransportFn({
    url: buildURL({
      domain: DOMAIN,
      app: options.app,
      clientType: options.clientType,
    }),
    interceptors,
  });
};
