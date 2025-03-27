import { Framework, Service } from "../../gen";

export const DOMAIN = "hiveops.io";

export const SERVICE_MAP: { [key in keyof typeof Service]: string } = {
  UNSPECIFIED: "",
  DRONE: "drone",
};

export const FRAMEWORK_MAP: { [key in keyof typeof Framework]: string } = {
  UNSPECIFIED: "",
  GRPC: "grpc",
  GRPC_WEB: "grpc-web",
};
