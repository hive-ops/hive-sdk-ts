import { Interceptor } from "@connectrpc/connect";
import { createFirebaseTokenManager } from "./token-manager";

export const getTokenInterceptor = (): Interceptor => (next) => async (req) => {
  const token = await createFirebaseTokenManager().getFirebaseTokenWithClaims();
  req.header.set("Authorization", `Bearer ${token}`);
  return next(req);
};
