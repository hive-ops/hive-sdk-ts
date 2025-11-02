import { FirebaseToken, isTokenExpiredOrNearingExpiry } from "../firebase/utils";
import { GetFirebaseTokenFunc } from "./types";

export class TokenManager {
  private tokenWithClaims?: FirebaseToken;
  private tokenWithoutClaims?: FirebaseToken;

  constructor(private getTokenWithClaimsFunc: () => Promise<FirebaseToken>, private getTokenWithoutClaimsFunc: () => Promise<FirebaseToken>) {}

  public async getFirebaseTokenWithClaims(): Promise<string> {
    const currentTokenWithClaims = this.tokenWithClaims;

    if (isTokenExpiredOrNearingExpiry(currentTokenWithClaims)) {
      console.log("On-demand refresh triggered for token with claims.");
      try {
        this.tokenWithClaims = await this.getTokenWithClaimsFunc();
      } catch (error) {
        throw new Error(`On-demand refresh failed for token with claims: ${error}`);
      }
    }

    if (!this.tokenWithClaims) {
      throw new Error("Failed to retrieve Firebase token with claims: token is null after all attempts");
    }

    return this.tokenWithClaims.idToken;
  }

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

export function createTokenManager({
  getTokenWithClaimsFunc,
  getTokenWithoutClaimsFunc,
  forceNew,
}: {
  getTokenWithClaimsFunc: GetFirebaseTokenFunc;
  getTokenWithoutClaimsFunc: GetFirebaseTokenFunc;
  forceNew?: boolean;
}): TokenManager {
  if (!tokenManager || !!forceNew) {
    tokenManager = new TokenManager(getTokenWithClaimsFunc, getTokenWithoutClaimsFunc);
  }
  return tokenManager;
}
