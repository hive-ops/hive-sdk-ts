import { App, JavaScriptClientType } from "../../gen";

export type FQDN = {
  domain: string;
  hubId?: string;
  app: App;
  nodeName?: string;
  clientType: JavaScriptClientType;
};
