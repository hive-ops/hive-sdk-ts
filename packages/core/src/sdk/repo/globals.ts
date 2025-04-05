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

export const initialize = async (options: { stackHRN: string; accessToken: string }): Promise<void> => {
  setAccessToken(options.accessToken);
  setStackHRN(options.stackHRN);
};
