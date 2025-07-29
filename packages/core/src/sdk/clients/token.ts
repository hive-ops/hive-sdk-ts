import { createClient, Interceptor } from "@connectrpc/connect";
import { App, DroneTokenService } from "../../gen";
import { createTransport } from "./utils";

export const createDroneTokenClient = (token: string) => {
  const tokenInterceptor: Interceptor = (next) => (req) => {
    req.header.set("Authorization", `Bearer ${token}`);
    return next(req);
  };
  const transport = createTransport(App.DRONE, [tokenInterceptor]);
  return {
    ...createClient(DroneTokenService, transport),
  };
};
