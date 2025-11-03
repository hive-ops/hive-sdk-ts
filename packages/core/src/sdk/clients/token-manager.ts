import { FirebaseToken, isTokenExpiredOrNearingExpiry } from "../firebase/utils";
import { GetFirebaseTokenFunc } from "./types";

export class TokenManager {
  private tokenWithoutClaims?: FirebaseToken;

  constructor(private getTokenWithoutClaimsFunc: () => Promise<FirebaseToken>) {}

  public async getFirebaseTokenWithoutClaims(): Promise<string> {
    const currentTokenWithoutClaims = this.tokenWithoutClaims;

    if (isTokenExpiredOrNearingExpiry(currentTokenWithoutClaims)) {
      console.log("On-demand refresh triggered for token without claims.");
      try {
        this.tokenWithoutClaims = await this.getTokenWithoutClaimsFunc();
      } catch (error) {
        throw new Error(`On-demand refresh failed for token with claims: ${error}`);
      }
    }

    if (!this.tokenWithoutClaims) {
      throw new Error("Failed to retrieve Firebase token without claims: token is null after all attempts");
    }

    return this.tokenWithoutClaims.idToken;
  }
}

// Singleton pattern for TokenManager
export let tokenManager: TokenManager;

export function createTokenManager(
  getTokenWithoutClaimsFunc: GetFirebaseTokenFunc,
  forceNew?: boolean): TokenManager {
  if (!tokenManager || !!forceNew) {
    tokenManager = new TokenManager(getTokenWithoutClaimsFunc);
  }
  return tokenManager;
}
