import dotenv from "dotenv";
import { getFirebaseTokenWithClaimsViaEmailPassword } from "../firebase";
import { createTokenManager, tokenManager } from "./@hiveops/core";

dotenv.config({ path: ".env.dev" });

describe("TokenManager", () => {
  const firebaseAPIKey: string = process.env.FIREBASE_API_KEY || "";
  const email: string = process.env.USER_EMAIL || "";
  const password: string = process.env.USER_PASSWORD || "";

  createTokenManager(() => getFirebaseTokenWithClaimsViaEmailPassword(firebaseAPIKey, email, password));

  it("should get firebase token claims", async () => {
    const token = await tokenManager.getFirebaseTokenWithClaims();
    expect(token).toBeDefined();
  });
});
