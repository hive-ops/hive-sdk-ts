import { setClientOptions } from "./globals";
import { createTokenManager } from "./token-manager";
import { ClientOptions, GetFirebaseTokenFunc } from "./types";

export const initializeClient = (
  clientOptions: ClientOptions,
  { getTokenWithClaimsFunc, getTokenWithoutClaimsFunc }: { getTokenWithClaimsFunc: GetFirebaseTokenFunc; getTokenWithoutClaimsFunc: GetFirebaseTokenFunc },
) => {
  setClientOptions(clientOptions);
  createTokenManager({ getTokenWithClaimsFunc, getTokenWithoutClaimsFunc, forceNew: true });
};
