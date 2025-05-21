import { VespaDatabaseStack } from "../../gen";
import { getEnvString } from "../utilities";

let accessToken = "";
let stackHRN = "";
export let databaseStack: VespaDatabaseStack | undefined = undefined;

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

export const vespaInit = (options?: { stackHRN: string; accessToken: string }): void => {
  setAccessToken(options?.accessToken || getEnvString("HIVE_ACCESS_TOKEN"));
  setStackHRN(options?.stackHRN || getEnvString("HIVE_STACK_HRN"));
};

export const setDatabaseStack = (stack: VespaDatabaseStack) => {
  databaseStack = stack;
};
