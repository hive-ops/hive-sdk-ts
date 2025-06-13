import { createClient } from "@connectrpc/connect";
import { App, BeekeeperService } from "../../gen";
import { makeSingletonFactory } from "../utilities/utils";
import { ClientOptions } from "./types";
import { createTransport, getInterceptors } from "./utils";

export const createSingletonBeekeeperClient = makeSingletonFactory((options: ClientOptions) => {
  const transport = createTransport({ ...options, app: App.BEEKEEPER }, getInterceptors());
  return {
    ...createClient(BeekeeperService, transport),
  };
});
