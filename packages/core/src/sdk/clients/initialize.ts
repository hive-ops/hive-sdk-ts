import { setClientOptions } from "./globals";
import { createTokenManager } from "./token-manager";
import { ClientOptions, GetFirebaseTokenFunc } from "./types";

export const initializeClient = (
  clientOptions: ClientOptions,
  getTokenWithoutClaimsFunc: GetFirebaseTokenFunc
) => {
  setClientOptions(clientOptions);
  createTokenManager(getTokenWithoutClaimsFunc, true);
};
