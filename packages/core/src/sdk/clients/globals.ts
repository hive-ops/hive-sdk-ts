import { ClientOptions } from "./types";

let clientOptions: ClientOptions | undefined;

export const setClientOptions = (options: ClientOptions) => {
  clientOptions = options;
};

export const getClientOptions = () => {
  if (!clientOptions) {
    throw new Error("Client options are not set");
  }
  return clientOptions;
};
