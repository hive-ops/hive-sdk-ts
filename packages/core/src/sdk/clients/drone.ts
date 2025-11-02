import { createClient } from "@connectrpc/connect";
import {
  App,
  DroneIAMOrganizationMemberService,
  DroneIAMOrganizationService,
  DroneIAMPlatformAppService,
  DroneIAMProjectService,
  DroneIAMRoleService,
  DroneIAMSecureAppService,
  DroneIAMUserService,
} from "../../gen";
import { createTransport, getTokenWithoutClaimsInterceptor } from "./utils";

export const createDroneClient = () => {
  const transport = createTransport(App.DRONE, [getTokenWithoutClaimsInterceptor()]);
  return {
    ...createClient(DroneIAMOrganizationService, transport),
    ...createClient(DroneIAMProjectService, transport),
    ...createClient(DroneIAMUserService, transport),
    ...createClient(DroneIAMOrganizationMemberService, transport),
    ...createClient(DroneIAMRoleService, transport),
    ...createClient(DroneIAMPlatformAppService, transport),
    ...createClient(DroneIAMSecureAppService, transport),
  };
};
