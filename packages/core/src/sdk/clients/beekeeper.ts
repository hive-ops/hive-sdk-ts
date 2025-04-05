import { createClient } from "@connectrpc/connect";
import { App, BeekeeperService } from "../../gen";
import { makeSingletonFactory } from "../utilities/utils";
import { ClientOptions } from "./types";
import { createTransport, invalidateHiveToken } from "./utils";

export const createSingletonBeekeeperClient = makeSingletonFactory((options: ClientOptions<any>) => {
  const transport = createTransport(options, App.BEEKEEPER);
  return {
    ...createClient(BeekeeperService, transport),
    invalidateHiveToken: invalidateHiveToken,
  };
});
