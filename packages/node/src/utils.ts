import * as core from "@hiveops/core";
import { clientOptions } from "./client-options";

export const vespaInit = (options: { stackHRN: string; accessToken: string; userType: core.UserType }): void =>
  core.vespaInit({
    stackHRN: options.stackHRN,
    accessToken: options.accessToken,
    userType: options.userType,
    clientOptions,
  });
