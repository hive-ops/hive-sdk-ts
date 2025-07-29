import { Client, Interceptor, Transport } from "@connectrpc/connect";
import { BeekeeperService, DroneAppService, DroneMemberService, DroneOrgService, DroneRBACService, DroneTokenService, DroneUserService, VespaService } from "../../gen";
import { ClientType } from "../utilities";

export type CreateTransportFn = (opts: { url: string; interceptors: Interceptor[] }) => Transport;

export type ClientOptions = {
  clientType: ClientType;
  createTransportFn: CreateTransportFn;
};

export type DroneTokenClient = Client<typeof DroneTokenService>;

export type DroneClient = Client<typeof DroneOrgService> &
  Client<typeof DroneAppService> &
  Client<typeof DroneRBACService> &
  Client<typeof DroneUserService> &
  Client<typeof DroneOrgService> &
  Client<typeof DroneMemberService>;

export type BeekeeperClient = Client<typeof BeekeeperService>;

export type VespaClient = Client<typeof VespaService>;
