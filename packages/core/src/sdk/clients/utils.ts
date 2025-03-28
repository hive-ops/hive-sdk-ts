import { Interceptor } from "@connectrpc/connect";
import { HiveToken } from "../../gen";
import { FetchFreshHiveTokenFn } from "./types";

let hiveToken: HiveToken | undefined;

const hiveTokenIsAboutToExpire = (hiveToken: HiveToken): boolean => {
  return hiveToken.expiresAt > Date.now() + 60000; // 1 minute
};

const getHiveToken = async (token: string, fetchFreshHiveTokenFn: FetchFreshHiveTokenFn): Promise<HiveToken> => {
  if (!hiveToken || hiveTokenIsAboutToExpire(hiveToken)) {
    hiveToken = await fetchFreshHiveTokenFn(token);
  }
  return hiveToken;
};

type InterceptorOptions = {
  token: string;
  fetchFreshHiveTokenFn: FetchFreshHiveTokenFn;
};

export const getInterceptors = (options: InterceptorOptions): Interceptor[] => {
  const interceptors: Interceptor[] = [];
  const hiveTokenInterceptor: Interceptor = (next) => async (req) => {
    const hiveToken = await getHiveToken(options.token, options.fetchFreshHiveTokenFn);
    req.header.set("Authorization", `Bearer ${hiveToken.signedToken}`);
    return next(req);
  };
  interceptors.push(hiveTokenInterceptor);

  return interceptors;
};

export const invalidateHiveToken = (): void => {
  hiveToken = undefined;
};

export const getTokenClientInterceptors = (token: string): Interceptor[] => [
  (next) => async (req) => {
    req.header.set("Authorization", `Bearer ${token}`);
    return next(req);
  },
];
