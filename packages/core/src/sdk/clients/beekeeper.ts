import { createClient } from "@connectrpc/connect";
import { App, BeekeeperCountryService, BeekeeperVespaDatabaseStackService } from "../../gen";
import { createTransport, getTokenWithoutClaimsInterceptor } from "./utils";

export const createBeekeeperClient = () => {
  const transport = createTransport(App.BEEKEEPER, [getTokenWithoutClaimsInterceptor()]);
  return {
    ...createClient(BeekeeperCountryService, transport),
    ...createClient(BeekeeperVespaDatabaseStackService, transport),
  };
};
