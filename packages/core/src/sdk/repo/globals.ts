import { getEnvString } from "../utilities";

let accessToken = "";
let stackHRN = "";

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const getAccessToken = () => {
  return accessToken;
};

export const setStackHRN = (hrn: string) => {
  stackHRN = hrn;
};

export const getStackHRN = () => {
  return stackHRN;
};

export const initialize = (options?: { stackHRN: string; accessToken: string }): void => {
  setAccessToken(options?.accessToken || getEnvString("HIVE_ACCESS_TOKEN"));
  setStackHRN(options?.stackHRN || getEnvString("HIVE_STACK_HRN"));
};
