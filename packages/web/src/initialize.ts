import { FirebaseToken, GetFirebaseTokenFunc, initializeClient } from "@hiveops/core";
import { clientOptions } from "./client-options";

export const initializeWebClient = (getTokenWithoutClaimsFunc: GetFirebaseTokenFunc) => {
  initializeClient(clientOptions, getTokenWithoutClaimsFunc);
};
