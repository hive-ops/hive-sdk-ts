import { createDroneTokenClient } from "../clients";

const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes in milliseconds
const HTTP_TIMEOUT = 10000; // 10 seconds

export type FirebaseSignInResponse = {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
};

export type FirebaseToken = FirebaseSignInResponse & {
  expiry: Date;
};

export const isTokenExpiredOrNearingExpiry = (firebaseToken?: FirebaseToken): boolean => {
  if (!firebaseToken) {
    return true; // If token is null, treat it as expired
  }

  return new Date(Date.now() + TOKEN_REFRESH_THRESHOLD) > firebaseToken.expiry;
};

const signInToFirebase = async (signInType: string, firebaseApiKey: string, requestBody: Record<string, any>): Promise<FirebaseToken> => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWith${signInType}?key=${firebaseApiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      signal: AbortSignal.timeout(HTTP_TIMEOUT),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Firebase custom token sign-in failed with status ${response.status}: ${JSON.stringify(errorData)}`);
    }

    const res: FirebaseSignInResponse = await response.json();
    return {
      ...res,
      expiry: new Date(Date.now() + parseInt(res.expiresIn, 10) * 1000),
    };
  } catch (error) {
    throw new Error(`Failed to make custom token sign-in request: ${error}`);
  }
};

export const signInWithEmailPassword = async ({ firebaseApiKey, email, password }: { firebaseApiKey: string; email: string; password: string }): Promise<FirebaseToken> => {
  return signInToFirebase("Password", firebaseApiKey, {
    email,
    password,
    returnSecureToken: true,
  });
};

export const signInWithCustomToken = async ({ firebaseApiKey, customToken }: { firebaseApiKey: string; customToken: string }): Promise<FirebaseToken> => {
  return signInToFirebase("CustomToken", firebaseApiKey, {
    token: customToken,
    returnSecureToken: true,
  });
};

export const getFirebaseTokenWithClaimsViaEmailPassword = async (firebaseApiKey: string, email: string, password: string): Promise<FirebaseToken> => {
  const tokenWithoutClaims = await signInWithEmailPassword({ firebaseApiKey, email, password });

  const droneTokenClient = createDroneTokenClient(tokenWithoutClaims.idToken);

  const customTokenWithClaimsRes = await droneTokenClient.getCustomTokenWithClaims({});

  return signInWithCustomToken({ firebaseApiKey, customToken: customTokenWithClaimsRes.token });
};
