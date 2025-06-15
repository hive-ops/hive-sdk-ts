import { createClient } from "@connectrpc/connect";
import { App, DroneService } from "../../gen";
import { makeSingletonFactory } from "../utilities/utils";
import { getInterceptors } from "./token-manager";
import { createTransport } from "./utils";

export const createDroneClient = () => {
  const transport = createTransport(App.DRONE, getInterceptors());
  return {
    ...createClient(DroneService, transport),
  };
};
