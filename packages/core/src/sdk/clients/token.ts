import { createClient } from "@connectrpc/connect";
import { App, DroneTokenService, HiveTokenPair, UserType } from "../../gen";
import { ClientOptions } from "./types";
import { createTransport } from "./utils";

export const createTokenClient = (options: ClientOptions, token: string) => {
  const tokenInterceptor = (next: any) => (req: any) => {
    req.header.set("Authorization", `Bearer ${token}`);
    return next(req);
  };
  const transport = createTransport(
    {
      ...options,
      app: App.DRONE,
    },
    [tokenInterceptor],
  );
  return {
    ...createClient(DroneTokenService, transport),
  };
};

export const fetchSecureAppHiveToken = async (options: ClientOptions, token: string): Promise<HiveTokenPair> => {
  const tokenClient = createTokenClient(options, token);
  const uid = "";
  const { hiveTokenPair } = await tokenClient.getSecureAppHiveToken({ tokenUid: uid });
  return hiveTokenPair!;
};

export const refreshHiveToken = async (options: ClientOptions, token: string, userType: UserType): Promise<HiveTokenPair> => {
  switch (userType) {
    case UserType.TENANT_ADMIN:
      return refreshTenantAdminHiveToken(options, token);
    case UserType.TENANT_SECURE_APP:
      return refreshSecureAppHiveToken(options, token);
    default:
      throw new Error("Unsupported user type");
  }
};

const refreshSecureAppHiveToken = async (options: ClientOptions, token: string): Promise<HiveTokenPair> => {
  const tokenClient = createTokenClient(options, token);
  const uid = "";
  const { hiveTokenPair } = await tokenClient.refreshSecureAppHiveToken({ tokenUid: uid });
  return hiveTokenPair!;
};

const refreshTenantAdminHiveToken = async (options: ClientOptions, token: string): Promise<HiveTokenPair> => {
  const tokenClient = createTokenClient(options, token);
  const uid = "";
  const { hiveTokenPair } = await tokenClient.refreshTenantAdminHiveToken({ tokenUid: uid });
  return hiveTokenPair!;
};
