import { createClient } from "@connectrpc/connect";
import { App, DroneService } from "../../gen";
import { makeSingletonFactory } from "../utilities/utils";
import { ClientOptions } from "./types";
import { createTransport, invalidateHiveToken } from "./utils";

export const createSingletonDroneClient = makeSingletonFactory((options: ClientOptions<any>) => {
  const transport = createTransport(options, App.DRONE);
  return {
    ...createClient(DroneService, transport),
    invalidateHiveToken: invalidateHiveToken,
  };
});
