import { GetFirebaseTokenFunc, initializeClient } from "@hiveops/core";
import { clientOptions } from "./client-options";

export const initializeNodeClient = ({ getTokenWithoutClaimsFunc, getTokenWithClaimsFunc }: { getTokenWithoutClaimsFunc: GetFirebaseTokenFunc; getTokenWithClaimsFunc: GetFirebaseTokenFunc }) => {
  initializeClient(clientOptions, { getTokenWithClaimsFunc, getTokenWithoutClaimsFunc });
};
