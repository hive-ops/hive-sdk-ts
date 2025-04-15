import { App } from "../../gen";

export type ClientType = "node" | "deno" | "web";

export type FQDN = {
  domain: string;
  hubId?: string;
  app: App;
  nodeName?: string;
  clientType: ClientType;
};
