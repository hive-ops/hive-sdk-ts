import { createClient } from "@connectrpc/connect";
import { App, DroneAppService, DroneMemberService, DroneOrgService, DroneRBACService, DroneUserService } from "../../gen";
import { getInterceptors } from "./token-manager";
import { createTransport } from "./utils";

export const createDroneClient = () => {
  const transport = createTransport(App.DRONE, getInterceptors());
  return {
    ...createClient(DroneAppService, transport),
    ...createClient(DroneMemberService, transport),
    ...createClient(DroneRBACService, transport),
    ...createClient(DroneUserService, transport),
    ...createClient(DroneOrgService, transport),
    ...createClient(DroneMemberService, transport),
  };
};
