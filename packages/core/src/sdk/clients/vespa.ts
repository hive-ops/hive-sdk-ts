import { createClient } from "@connectrpc/connect";
import { App, VespaService } from "../../gen";
import { makeSingletonFactory } from "../utilities/utils";
import { ClientOptions } from "./types";
import { createTransport, invalidateHiveToken } from "./utils";

type VespaClientOptions<T> = ClientOptions<T> & {
  workload: string;
  hub: string;
  node: string;
};

export const createSingletonVespaClient = makeSingletonFactory((options: VespaClientOptions<any>) => {
  const transport = createTransport(options, App.VESPA);

  return {
    ...createClient(VespaService, transport),
    invalidateHiveToken: invalidateHiveToken,
  };
});
