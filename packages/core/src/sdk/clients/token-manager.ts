import { Interceptor } from "@connectrpc/connect";
import { HiveToken, HiveTokenPair, UserType } from "../../gen";
import { getAccessToken, getHiveTokenPair, getUserType } from "./globals";
import { fetchSecureAppHiveToken, refreshHiveToken } from "./token";

export const hiveTokenIsAboutToExpire = (hiveToken: HiveToken): boolean => {
  return hiveToken.expiresAt < Date.now() + 60000; // 1 minute
};

export const getTokenInterceptor =
  (token?: string): Interceptor =>
  (next) =>
  async (req) => {
    if (!token) {
      const hiveTokenPair = await getHiveToken();
      token = hiveTokenPair.accessHiveToken!.signedToken;
    }
    req.header.set("Authorization", `Bearer ${token}`);
    return next(req);
  };

export const getInterceptors = (): Interceptor[] => [getTokenInterceptor()];

export const getHiveToken = async (): Promise<HiveTokenPair> => {
  const accessToken = getAccessToken();
  const userType = getUserType();
  const hiveTokenPair = getHiveTokenPair();

  if (!accessToken && !hiveTokenPair) {
    throw new Error("Access token or hive token pair is not set");
  }

  if (!!hiveTokenPair) {
    if (hiveTokenIsAboutToExpire(hiveTokenPair.accessHiveToken!)) {
      return hiveTokenPair!;
    } else {
      return await refreshHiveToken(hiveTokenPair.refreshHiveToken!.signedToken, userType);
    }
  }

  if (accessToken && userType == UserType.TENANT_SECURE_APP) {
    return await fetchSecureAppHiveToken(accessToken);
  }

  throw new Error("Unable to retrieve Hive token");
};
