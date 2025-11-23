import { App, Environment } from "../../gen";
import { ClientType, Framework } from "./types";

// export const FRAMEWORK_MAP: { [key in keyof typeof Framework]: string } = {
//   UNSPECIFIED: "",
//   GRPC: "grpc",
//   GRPC_WEB: "grpc-web",
// };

export const APP_MAP: { [key in keyof typeof App]: string } = {
  UNSPECIFIED: "",
  DRONE: "drone",
  BEEKEEPER: "beekeeper",
  VESPA: "vespa",
};

export const CLIENT_TYPE_FRAMEWORK_MAP: { [key in ClientType]: Framework } = {
  node: Framework.GRPC,
  web: Framework.GRPC_WEB,
};

export const ENVIRONMENT_MAP: { [key in keyof typeof Environment]: string } = {
  UNSPECIFIED: "",
  PROD: "prod",
  STAGING: "staging",
  QA: "qa",
  DEV: "dev",
};
