import { FirebaseToken, createTokenManager, setClientOptions, initializeClient } from "@hiveops/core";
import { clientOptions } from "./client-options";

export const initializeNodeClient = (getTokenFunc: () => Promise<FirebaseToken>) => {
  initializeClient(clientOptions, getTokenFunc);
};
