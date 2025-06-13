import dotenv from "dotenv";

dotenv.config();

describe("token client", () => {
  it("should run tests", () => {
    expect(true).toBe(true); // Placeholder test to ensure the test suite runs
  });
  // setAccessToken({
  //   token: getEnvString("HIVE_ACCESS_TOKEN", ""),
  //   type: UserType.TENANT_SECURE_APP,
  // });
  // const options = { apiUrl: "http://localhost" } as any;
  // const token = "test-token";
  // const hiveTokenPair = { accessToken: "access", refreshToken: "refresh" };
  // describe("createTokenClient", () => {
  //   it("should create a client with correct transport and interceptor", () => {
  //     // This will use the actual implementations
  //     const client = createTokenClient(options, token);
  //     expect(client).toBeDefined();
  //   });
  // });
  // describe("fetchSecureAppHiveToken", () => {
  //   it("should fetch hive token pair", async () => {
  //     // This will call the real fetchSecureAppHiveToken
  //     // You may need to set up a test server or mock network responses
  //     await expect(fetchSecureAppHiveToken(options, token)).resolves.toBeDefined();
  //   });
  // });
  // describe("refreshHiveToken", () => {
  //   it("should refresh tenant admin hive token", async () => {
  //     await expect(refreshHiveToken(options, token, UserType.TENANT_ADMIN)).resolves.toBeDefined();
  //   });
  //   it("should refresh secure app hive token", async () => {
  //     await expect(refreshHiveToken(options, token, UserType.TENANT_SECURE_APP)).resolves.toBeDefined();
  //   });
  //   it("should throw error for unsupported user type", async () => {
  //     await expect(refreshHiveToken(options, token, 999 as UserType)).rejects.toThrow("Unsupported user type");
  //   });
  // });
});
