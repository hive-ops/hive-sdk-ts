import { FirebaseToken, GetFirebaseTokenFunc, initializeClient } from "@hiveops/core";
import { clientOptions } from "./client-options";

export const initializeWebClient = ({
  getTokenWithoutClaimsFunc,
  getTokenWithClaimsFunc,
}: {
  getTokenWithoutClaimsFunc: GetFirebaseTokenFunc;
  getTokenWithClaimsFunc: GetFirebaseTokenFunc;
}) => {
  initializeClient(clientOptions, { getTokenWithClaimsFunc, getTokenWithoutClaimsFunc });
};
