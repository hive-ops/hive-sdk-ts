import { createClient } from "@connectrpc/connect";
import { App, BeekeeperService } from "../../gen";
import { getTokenInterceptor } from "./interceptor";
import { createTransport } from "./utils";

export const createBeekeeperClient = () => {
  const transport = createTransport(App.BEEKEEPER, [getTokenInterceptor()]);
  return {
    ...createClient(BeekeeperService, transport),
  };
};
