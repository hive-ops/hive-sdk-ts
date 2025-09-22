import { getFirebaseTokenWithClaimsViaEmailPassword, tokenManager } from "@hiveops/core";
import dotenv from "dotenv";
import { initializeNodeClient } from "./initialize";

dotenv.config({ path: ".env.staging" });

describe("TokenManager", () => {
  const firebaseAPIKey: string = process.env.FIREBASE_API_KEY || "";
  const email: string = process.env.USER_EMAIL || "";
  const password: string = process.env.USER_PASSWORD || "";

  initializeNodeClient(() => getFirebaseTokenWithClaimsViaEmailPassword(firebaseAPIKey, email, password));

  it("should get firebase token claims", async () => {
    const token = await tokenManager.getFirebaseTokenWithClaims();
    expect(token).toBeDefined();
  });
});
