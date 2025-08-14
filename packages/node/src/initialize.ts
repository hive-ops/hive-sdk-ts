import { setClientOptions, setTokenWithClaimsFetcher, FirebaseToken } from "@hiveops/core";
import { clientOptions } from "./client-options";

export const initializeClient = (getTokenFunc: () => Promise<FirebaseToken>) => {
  setClientOptions(clientOptions);
  createTokenManager(config?.getTokenFunc, true);
  setTokenWithoutClaimsFetcher(config?.tokenWithoutClaimsFetcher);
  setTokenWithClaimsFetcher(config?.tokenWithClaimsFetcher);
};
