import { createFirebaseTokenManager } from "./token-manager";

import dotenv from "dotenv";

dotenv.config();

describe("TokenManager", () => {
  const tokenManager = createFirebaseTokenManager();

  it("should get firebase token without claims", async () => {
    const token = await tokenManager.getFirebaseTokenWithoutClaims();
    expect(token).toBeDefined();
  });

  // it("should return a Date object with correct expiry when expiresIn is a valid number string", () => {
  //   const expiresIn = "3600"; // 1 hour
  //   const now = Date.now();
  //   const response: FirebaseSignInResponse = {
  //     idToken: "token",
  //     email: "test@example.com",
  //     refreshToken: "refresh",
  //     expiresIn,
  //     localId: "localId",
  //   };
  //   const tokenResponse = new FirebaseTokenResponse(response);
  //   const expiry = tokenResponse.getExpiry();

  //   expect(expiry).toBeInstanceOf(Date);
  //   // Should be roughly now + 3600 * 1000 ms
  //   expect(expiry!.getTime()).toBeGreaterThanOrEqual(now + 3600 * 1000 - 1000);
  //   expect(expiry!.getTime()).toBeLessThanOrEqual(now + 3600 * 1000 + 1000);
  // });

  // it("should return null when expiresIn is not a number", () => {
  //   const response: FirebaseSignInResponse = {
  //     idToken: "token",
  //     email: "test@example.com",
  //     refreshToken: "refresh",
  //     expiresIn: "not-a-number",
  //     localId: "localId",
  //   };
  //   const tokenResponse = new FirebaseTokenResponse(response);
  //   const expiry = tokenResponse.getExpiry();

  //   expect(expiry).toBeNull();
  // });

  // it("should return null when expiresIn is an empty string", () => {
  //   const response: FirebaseSignInResponse = {
  //     idToken: "token",
  //     email: "test@example.com",
  //     refreshToken: "refresh",
  //     expiresIn: "",
  //     localId: "localId",
  //   };
  //   const tokenResponse = new FirebaseTokenResponse(response);
  //   const expiry = tokenResponse.getExpiry();

  //   expect(expiry).toBeNull();
  // });
});
