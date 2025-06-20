import { createClient } from "@connectrpc/connect";
import { App, BeekeeperService } from "../../gen";
import { getInterceptors } from "./token-manager";
import { createTransport } from "./utils";

export const createBeekeeperClient = () => {
  const transport = createTransport(App.BEEKEEPER, getInterceptors());
  return {
    ...createClient(BeekeeperService, transport),
  };
};
