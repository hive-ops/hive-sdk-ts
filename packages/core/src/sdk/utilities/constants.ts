import { App, Framework } from "../../gen";
import { ClientType } from "./types";

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

export const CLIENT_TYPE_FRAMEWORK_MAP: { [key in ClientType]: Framework } = {
  node: Framework.GRPC,
  deno: Framework.GRPC,
  web: Framework.GRPC_WEB,
};
