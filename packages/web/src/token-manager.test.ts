import { getFirebaseTokenWithClaimsViaEmailPassword, tokenManager } from "@hiveops/core";
import dotenv from "dotenv";
import { initializeClient } from "./initialize";

dotenv.config({ path: ".env.staging" });

describe("TokenManager", () => {
  const firebaseAPIKey: string = process.env.FIREBASE_API_KEY || "";
  const email: string = process.env.USER_EMAIL || "";
  const password: string = process.env.USER_PASSWORD || "";

  initializeClient(() => getFirebaseTokenWithClaimsViaEmailPassword(firebaseAPIKey, email, password));

  it("should get firebase token claims", async () => {
    const token = await tokenManager.getFirebaseTokenWithClaims();
    expect(token).toBeDefined();
  });
});
