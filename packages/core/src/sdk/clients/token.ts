import { createClient } from "@connectrpc/connect";
import { App, DroneTokenService, HiveTokenPair, UserType } from "../../gen";
import { createTransport } from "./utils";

export const createTokenClient = (token: string) => {
  const tokenInterceptor = (next: any) => (req: any) => {
    req.header.set("Authorization", `Bearer ${token}`);
    return next(req);
  };
  const transport = createTransport(App.DRONE, [tokenInterceptor]);
  return {
    ...createClient(DroneTokenService, transport),
  };
};

export const fetchSecureAppHiveToken = async (token: string): Promise<HiveTokenPair> => {
  const tokenClient = createTokenClient(token);
  const uid = "";
  const { hiveTokenPair } = await tokenClient.getSecureAppHiveToken({ tokenUid: uid });
  return hiveTokenPair!;
};

export const refreshHiveToken = async (token: string, userType: UserType): Promise<HiveTokenPair> => {
  const tokenClient = createTokenClient(token);
  switch (userType) {
    case UserType.TENANT_ADMIN:
      return (await tokenClient.refreshTenantAdminHiveToken({ tokenUid: "" })).hiveTokenPair!;
    case UserType.TENANT_SECURE_APP:
      return (await tokenClient.refreshSecureAppHiveToken({ tokenUid: "" })).hiveTokenPair!;
    default:
      throw new Error("Unsupported user type");
  }
};
