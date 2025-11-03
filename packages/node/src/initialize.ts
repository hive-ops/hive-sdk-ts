import { GetFirebaseTokenFunc, initializeClient } from "@hiveops/core";
import { clientOptions } from "./client-options";

export const initializeNodeClient = ( getTokenWithoutClaimsFunc: GetFirebaseTokenFunc ) => {
  initializeClient(clientOptions, getTokenWithoutClaimsFunc);
};
