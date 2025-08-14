import { Interceptor } from "@connectrpc/connect";
import { tokenManager } from "./token-manager";

export const getTokenInterceptor = (): Interceptor => (next) => async (req) => {
  const token = await tokenManager.getFirebaseTokenWithClaims();
  req.header.set("Authorization", `Bearer ${token}`);
  return next(req);
};
