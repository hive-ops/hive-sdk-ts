let accessToken = "";
let stackHRN = "";

export const setAccessToken = (token?: string) => {
  token = token || process.env.HIVE_SECURE_APP_ACCESS_TOKEN;

  if (!token) {
    throw new Error("Access token is required. Please provide it or set it in the environment HIVE_SECURE_APP_ACCESS_TOKEN");
  }

  accessToken = token;
};

export const getAccessToken = () => {
  return accessToken;
};

export const setStackHRN = (hrn?: string) => {
  hrn = hrn || process.env.HIVE_VESPA_STACK_HRN;

  if (!hrn) {
    throw new Error("VespaStack HRN is required. Please provide it or set it in the environment HIVE_VESPA_STACK_HRN");
  }

  stackHRN = hrn;
};

export const getStackHRN = () => {
  return stackHRN;
};

export const initialize = async (options?: { stackHRN?: string; accessToken?: string }): Promise<void> => {
  setAccessToken(options?.accessToken);
  setStackHRN(options?.stackHRN);
};
