/**
 * Firebase Token Manager - TypeScript equivalent of the Go token-manager.go
 *
 * This file provides Firebase authentication token management functionality,
 * including caching and refreshing of tokens with and without custom claims.
 */

import { createDroneTokenClient } from "./token";

/**
 * Constants for token management
 */
const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes in milliseconds
const HTTP_TIMEOUT = 10000; // 10 seconds

/**
 * Firebase Sign-In Response structure
 */
export interface FirebaseSignInResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export class FirebaseTokenResponse {
  constructor(public data: FirebaseSignInResponse) {}

  getExpiry(): Date | null {
    const expiresInSec = parseInt(this.data.expiresIn, 10);
    if (isNaN(expiresInSec)) {
      return null;
    }
    return new Date(Date.now() + expiresInSec * 1000);
  }
}

/**
 * Firebase TokenManager manages Firebase ID tokens, including caching and refreshing.
 * This is the TypeScript equivalent of the Go TokenManager.
 */
export class FirebaseTokenManager {
  private tokenWithoutClaims: FirebaseTokenResponse | null = null;
  private tokenWithClaims: FirebaseTokenResponse | null = null;

  constructor() {}

  /**
   * Checks if a token is expired or within the refresh threshold.
   */
  private isTokenExpiredOrNearingExpiry(tokenResponse: FirebaseTokenResponse | null): boolean {
    if (!tokenResponse) {
      return true; // If token is null, treat it as expired
    }

    const expiry = tokenResponse.getExpiry();
    if (!expiry) {
      return true; // If expiry is null, treat it as expired
    }

    return new Date(Date.now() + TOKEN_REFRESH_THRESHOLD) > expiry;
  }

  /**
   * Signs in with email and password using Firebase Auth REST API.
   */
  private async signInWithEmailPassword(): Promise<FirebaseTokenResponse> {
    const firebaseApiKey = process.env.FIREBASE_API_KEY;
    if (!firebaseApiKey) {
      throw new Error("FIREBASE_API_KEY not set for REST API call");
    }

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`;

    const email = process.env.USER_EMAIL;
    const password = process.env.USER_PASSWORD;
    if (!email || !password) {
      throw new Error("USER_EMAIL and USER_PASSWORD environment variables must be set");
    }

    const requestBody = {
      email,
      password,
      returnSecureToken: true,
    };

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
        throw new Error(`Firebase sign-in failed with status ${response.status}: ${JSON.stringify(errorData)}`);
      }

      const result: FirebaseSignInResponse = await response.json();
      return new FirebaseTokenResponse(result);
    } catch (error) {
      throw new Error(`Failed to make sign-in request: ${error}`);
    }
  }

  /**
   * Signs in with a custom token using Firebase Auth REST API.
   */
  private async signInWithCustomToken(customToken: string): Promise<FirebaseTokenResponse> {
    const apiKey = process.env.FIREBASE_API_KEY;
    if (!apiKey) {
      throw new Error("FIREBASE_API_KEY not set for custom token sign-in REST API call");
    }

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${apiKey}`;

    const requestBody = {
      token: customToken,
      returnSecureToken: true,
    };

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

      const result: FirebaseSignInResponse = await response.json();
      return new FirebaseTokenResponse(result);
    } catch (error) {
      throw new Error(`Failed to make custom token sign-in request: ${error}`);
    }
  }

  /**
   * Forces a refresh of the token without claims.
   */
  private async refreshFirebaseTokenWithoutClaims(): Promise<void> {
    console.log("Refreshing Firebase token without claims...");

    try {
      const tokenResponse = await this.signInWithEmailPassword();
      this.tokenWithoutClaims = tokenResponse;
      console.log("Successfully refreshed Firebase token without claims.");
    } catch (error) {
      throw new Error(`Failed to sign in for token without claims: ${error}`);
    }
  }

  /**
   * Forces a refresh of the token with claims.
   */
  private async refreshFirebaseTokenWithClaims(): Promise<void> {
    console.log("Refreshing Firebase token with claims...");

    // First, ensure we have a valid token without claims to send to the custom server
    const tokenNoClaimsStr = await this.getFirebaseTokenWithoutClaims();

    // The following code would be used once the drone client is available:
    const droneTokenClient = await createDroneTokenClient(tokenNoClaimsStr);

    const customTokenWithClaimsRes = await droneTokenClient.getCustomTokenWithClaims({});

    // Use custom token to sign in to Firebase and get token with claims
    const tokenWithClaims = await this.signInWithCustomToken(customTokenWithClaimsRes.token);

    this.tokenWithClaims = tokenWithClaims;
    console.log("Successfully refreshed Firebase token with claims.");
  }

  /**
   * Gets a Firebase token without claims, refreshing if necessary.
   */
  public async getFirebaseTokenWithoutClaims(): Promise<string> {
    const currentTokenWithoutClaims = this.tokenWithoutClaims;

    if (this.isTokenExpiredOrNearingExpiry(currentTokenWithoutClaims)) {
      console.log("On-demand refresh triggered for token without claims.");
      try {
        await this.refreshFirebaseTokenWithoutClaims();
      } catch (error) {
        throw new Error(`On-demand refresh failed for token without claims: ${error}`);
      }
    }

    if (!this.tokenWithoutClaims) {
      throw new Error("Failed to retrieve Firebase token without claims: token is null after all attempts");
    }

    return this.tokenWithoutClaims.data.idToken;
  }

  /**
   * Gets a Firebase token with claims, refreshing if necessary.
   */
  public async getFirebaseTokenWithClaims(): Promise<string> {
    const currentTokenWithClaims = this.tokenWithClaims;

    if (this.isTokenExpiredOrNearingExpiry(currentTokenWithClaims)) {
      console.log("On-demand refresh triggered for token with claims.");
      try {
        await this.refreshFirebaseTokenWithClaims();
      } catch (error) {
        throw new Error(`On-demand refresh failed for token with claims: ${error}`);
      }
    }

    if (!this.tokenWithClaims) {
      throw new Error("Failed to retrieve Firebase token with claims: token is null after all attempts");
    }

    return this.tokenWithClaims.data.idToken;
  }
}

// Singleton pattern for FirebaseTokenManager
let firebaseTokenManager: FirebaseTokenManager | null = null;

/**
 * Creates or returns the singleton FirebaseTokenManager instance.
 */
export function createFirebaseTokenManager(): FirebaseTokenManager {
  if (!firebaseTokenManager) {
    firebaseTokenManager = new FirebaseTokenManager();
  }
  return firebaseTokenManager;
}
