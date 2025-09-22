import { FirebaseToken } from "../firebase";
import { setClientOptions } from "./globals";
import { createTokenManager } from "./token-manager";
import { ClientOptions } from "./types";

export const initializeClient = (clientOptions: ClientOptions, getTokenFunc: () => Promise<FirebaseToken>) => {
  setClientOptions(clientOptions);
  createTokenManager(getTokenFunc, true);
};
