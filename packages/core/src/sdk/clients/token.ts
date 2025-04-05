import { createClient } from "@connectrpc/connect";
import { App, DroneTokenService } from "../../gen";
import { makeSingletonFactory } from "../utilities/utils";
import { ClientOptions } from "./types";
import { createTransport, invalidateHiveToken } from "./utils";

export const createSingletonTokenClient = makeSingletonFactory((options: ClientOptions<any>) => {
  const transport = createTransport(options, App.DRONE);
  return {
    ...createClient(DroneTokenService, transport),
    invalidateHiveToken: invalidateHiveToken,
  };
});
