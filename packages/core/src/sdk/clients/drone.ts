import { createClient } from "@connectrpc/connect";
import { App, DroneService } from "../../gen";
import { makeSingletonFactory } from "../utilities/utils";
import { ClientOptions } from "./types";
import { createTransport, getInterceptors } from "./utils";

export const createSingletonDroneClient = makeSingletonFactory((options: ClientOptions) => {
  const transport = createTransport({ ...options, app: App.DRONE }, getInterceptors());
  return {
    ...createClient(DroneService, transport),
  };
});
