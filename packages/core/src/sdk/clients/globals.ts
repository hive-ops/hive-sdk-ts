import { VespaDatabaseStack } from "../../gen";
import { ClientOptions } from "../clients";
import { getEnvString } from "../utilities";


let clientOptions: ClientOptions | undefined = undefined;
export const setClientOptions = (options: ClientOptions) => {
  clientOptions = options;
};

export const getClientOptions = (): ClientOptions => {
  if (!clientOptions) {
    throw new Error("Client options are not set");
  }
  return clientOptions;
};
