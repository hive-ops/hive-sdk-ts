import { App, Framework } from "../../gen";

export const DOMAIN = "hiveops.io";

export const FRAMEWORK_MAP: { [key in keyof typeof Framework]: string } = {
  UNSPECIFIED: "",
  GRPC: "grpc",
  GRPC_WEB: "grpc-web",
};

export const APP_MAP: { [key in keyof typeof App]: string } = {
  UNSPECIFIED: "",
  DRONE: "drone",
  BEEKEEPER: "beekeeper",
  VESPA: "vespa",
};
