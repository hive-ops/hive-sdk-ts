import { FirebaseToken, isTokenExpiredOrNearingExpiry } from "../firebase/utils";

export class TokenManager {
  private tokenWithClaims?: FirebaseToken;

  constructor(private getTokenFunc: () => Promise<FirebaseToken>) {}

  public async getFirebaseTokenWithClaims(): Promise<string> {
    const currentTokenWithClaims = this.tokenWithClaims;

    if (isTokenExpiredOrNearingExpiry(currentTokenWithClaims)) {
      console.log("On-demand refresh triggered for token with claims.");
      try {
        this.tokenWithClaims = await this.getTokenFunc();
      } catch (error) {
        throw new Error(`On-demand refresh failed for token with claims: ${error}`);
      }
    }

    if (!this.tokenWithClaims) {
      throw new Error("Failed to retrieve Firebase token with claims: token is null after all attempts");
    }

    return this.tokenWithClaims.idToken;
  }
}

// Singleton pattern for TokenManager
export let tokenManager: TokenManager;

export function createTokenManager(getTokenFunc: () => Promise<FirebaseToken>, forceNew?: boolean): TokenManager {
  if (!tokenManager || !!forceNew) {
    tokenManager = new TokenManager(getTokenFunc);
  }
  return tokenManager;
}
