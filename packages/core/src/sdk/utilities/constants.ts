import { App, Framework, JavaScriptClientType } from "../../gen";

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

export const CLIENT_TYPE_FRAMEWORK_MAP: { [key in keyof typeof JavaScriptClientType]: Framework } = {
  UNSPECIFIED: Framework.UNSPECIFIED,
  NODE: Framework.GRPC,
  WEB: Framework.GRPC_WEB,
};
