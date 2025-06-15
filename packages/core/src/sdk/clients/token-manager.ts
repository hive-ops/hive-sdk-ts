import { HiveToken, HiveTokenPair, UserType } from "../../gen";
import { fetchSecureAppHiveToken, refreshHiveToken } from "./token";
import { ClientOptions } from "./types";
import { Interceptor } from "@connectrpc/connect";

let accessToken: string | undefined;
let userType: UserType | undefined;
let hiveTokenPair: HiveTokenPair | undefined;
let clientOptions: ClientOptions | undefined;

export const setAccessToken = ({ token, type, hiveToken, options }: { token?: string; type: UserType; hiveToken?: HiveTokenPair; options: ClientOptions }) => {
  accessToken = token;
  userType = type;
  hiveTokenPair = hiveToken;
  clientOptions = options;
};

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
  if (!clientOptions) {
    throw new Error("Client options are not set");
  }

  if (!userType) {
    throw new Error("User type is not set");
  }

  if (!accessToken && !hiveTokenPair) {
    throw new Error("Access token or hive token pair is not set");
  }

  if (!!hiveTokenPair) {
    if (hiveTokenIsAboutToExpire(hiveTokenPair.accessHiveToken!)) {
      return hiveTokenPair!;
    } else {
      return await refreshHiveToken(clientOptions, hiveTokenPair.refreshHiveToken!.signedToken, userType);
    }
  }

  if (accessToken && userType == UserType.TENANT_SECURE_APP) {
    return await fetchSecureAppHiveToken(clientOptions, accessToken);
  }

  throw new Error("Unable to retrieve Hive token");
};
