import * as core from "@hiveops/core";
import dotenv from "dotenv";
import { clientOptions } from "./client-options";

dotenv.config();

jest.setTimeout(30000);

describe("Hive SDK Clients", () => {
  core.initialize({
    token: core.getEnvString("HIVE_ACCESS_TOKEN"),
    type: core.UserType.TENANT_SECURE_APP,
    options: clientOptions,
  });

  it("should run tests", () => {
    expect(true).toBe(true); // Placeholder test to ensure the test suite runs
  });

  it("should create a singleton TokenClient", async () => {
    const client = core.createTokenClient(core.getEnvString("HIVE_ACCESS_TOKEN"));
    const res = await client.getSecureAppHiveToken({});
    expect(res).toBeDefined();
    expect(res.hiveTokenPair).toBeDefined();
  });

  let vespaDatabaseStack: core.VespaDatabaseStack;
  let vespaDatabase: core.VespaDatabase;

  it("should test Beekeeper Client", async () => {
    const client = core.createBeekeeperClient();
    const res = await client.getVespaDatabaseStack({
      hrn: core.getEnvString("HIVE_STACK_HRN"),
    });
    expect(res.stack).toBeDefined();
    expect(res.stack?.databases).toBeDefined();

    // vespaDatabaseStack

    const res2 = await client.applyMigration({
      stackHrn: core.getEnvString("HIVE_STACK_HRN"),
      hslFiles: [],
    });
    expect(res2).toBeDefined();
    expect(res2.migration).toBeDefined();
  });
});
