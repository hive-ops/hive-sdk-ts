import { FirebaseToken, initializeClient } from "@hiveops/core";
import { clientOptions } from "./client-options";

export const initializeWebClient = (getTokenFunc: () => Promise<FirebaseToken>) => {
  initializeClient(clientOptions, getTokenFunc);
};
