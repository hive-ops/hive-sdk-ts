import * as core from "@hiveops/core";
import { clientOptions } from "./client-options";

export const vespaInit = (options?: { stackHRN?: string; accessToken?: string; userType?: core.UserType }): void =>
  core.vespaInit({
    stackHRN: options?.stackHRN,
    accessToken: options?.accessToken,
    userType: options?.userType,
    clientOptions,
  });

export const initialize = (options?: { token?: string; userType: core.UserType; hiveToken?: core.HiveTokenPair }): void =>
  core.initialize({
    hiveToken: options?.hiveToken,
    token: options?.token,
    type: options?.userType || core.UserType.TENANT_SECURE_APP,
    options: clientOptions,
  });
