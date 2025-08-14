import * as core from "@hiveops/core";
import { clientOptions } from "./client-options";

export const vespaInit = (options?: { stackHRN?: string }): void =>
  core.vespaInit({
    stackHRN: options?.stackHRN,
    clientOptions,
  });

export const initialize = (): void => core.setClientOptions(clientOptions);
