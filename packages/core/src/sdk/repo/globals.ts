import { UserType, VespaDatabaseStack } from "../../gen";
import { ClientOptions } from "../clients";
import { initialize } from "../clients/globals";
import { getEnvString } from "../utilities";

let stackHRN = "";
export let databaseStack: VespaDatabaseStack | undefined = undefined;

export const setStackHRN = (hrn: string) => {
  stackHRN = hrn;
};

export const getStackHRN = () => {
  return stackHRN;
};

export const vespaInit = (options: { stackHRN: string; accessToken: string; userType: UserType; clientOptions: ClientOptions }): void => {
  stackHRN = options?.stackHRN || getEnvString("HIVE_STACK_HRN");
  initialize({
    token: options?.accessToken || getEnvString("HIVE_ACCESS_TOKEN"),
    type: options.userType,
    options: options?.clientOptions,
  });
};

export const setDatabaseStack = (stack: VespaDatabaseStack) => {
  databaseStack = stack;
};
