import { VespaDatabaseStack } from "../../gen";
import { ClientOptions, setClientOptions } from "../clients";
import { getEnvString } from "../utilities";

let stackHRN = "";
export let databaseStack: VespaDatabaseStack | undefined = undefined;

export const setStackHRN = (hrn: string) => {
  stackHRN = hrn;
};

export const getStackHRN = () => {
  return stackHRN;
};

export const vespaInit = (options: { stackHRN?: string; accessToken?: string; clientOptions: ClientOptions }): void => {
  stackHRN = options.stackHRN || getEnvString("HIVE_STACK_HRN");
  setClientOptions(options.clientOptions);
};

export const setDatabaseStack = (stack: VespaDatabaseStack) => {
  databaseStack = stack;
};
