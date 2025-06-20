import { HiveTokenPair, UserType } from "../../gen";
import { ClientOptions } from "./types";

let accessToken: string | undefined;
let userType: UserType | undefined;
let hiveTokenPair: HiveTokenPair | undefined;
let clientOptions: ClientOptions | undefined;

export const initialize = ({ token, type, hiveToken, options }: { token?: string; type: UserType; hiveToken?: HiveTokenPair; options: ClientOptions }) => {
  accessToken = token;
  userType = type;
  hiveTokenPair = hiveToken;
  clientOptions = options;
};

export const getAccessToken = () => accessToken;
export const getHiveTokenPair = () => hiveTokenPair;
export const getUserType = () => {
  if (!userType) {
    throw new Error("User type is not set");
  }
  return userType;
};
export const getClientOptions = () => {
  if (!clientOptions) {
    throw new Error("Client options are not set");
  }
  return clientOptions;
};
