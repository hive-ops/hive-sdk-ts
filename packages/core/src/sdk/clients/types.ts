import { Client, Interceptor, Transport } from "@connectrpc/connect";
import {
  BeekeeperCountryService,
  BeekeeperService,
  BeekeeperVespaDatabaseStackService,
  DroneIAMOrganizationMemberService,
  DroneIAMOrganizationService,
  DroneIAMPlatformAppService,
  DroneIAMProjectService,
  DroneIAMRoleService,
  DroneIAMSecureAppService,
  DroneIAMUserService,
  DroneTokenService,
  VespaDatabaseService,
} from "../../gen";
import { ClientType } from "../utilities";

export type CreateTransportFn = (opts: { url: string; interceptors: Interceptor[] }) => Transport;

export type ClientOptions = {
  clientType: ClientType;
  createTransportFn: CreateTransportFn;
};

export type DroneTokenClient = Client<typeof DroneTokenService>;

export type DroneClient = Client<typeof DroneIAMOrganizationService> &
  Client<typeof DroneIAMProjectService> &
  Client<typeof DroneIAMUserService> &
  Client<typeof DroneIAMOrganizationMemberService> &
  Client<typeof DroneIAMRoleService> &
  Client<typeof DroneIAMPlatformAppService> &
  Client<typeof DroneIAMSecureAppService>;

export type BeekeeperClient = Client<typeof BeekeeperService> & Client<typeof BeekeeperCountryService> & Client<typeof BeekeeperVespaDatabaseStackService>;

export type VespaClient = Client<typeof VespaDatabaseService>;
