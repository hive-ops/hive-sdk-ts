import { FirebaseToken, createTokenManager, setClientOptions } from "@hiveops/core";
import { clientOptions } from "./client-options";

export const  = (getTokenFunc: () => Promise<FirebaseToken>) => {
  setClientOptions(clientOptions);
  createTokenManager(getTokenFunc, true);
};
