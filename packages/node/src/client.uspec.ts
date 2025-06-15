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

  // vespaInit();
  const tokenClient = core.createTokenClient(core.getEnvString("HIVE_ACCESS_TOKEN"));
  // const beekeeperClient = createSingletonBeekeeperClient();
  it("should create a singleton TokenClient", async () => {
    const res = await tokenClient.getSecureAppHiveToken({});
    expect(res).toBeDefined();
    expect(res.hiveTokenPair).toBeDefined();
  });
  // it("should create a singleton DroneClient", async () => {
  //   const res = await beekeeperClient.getVespaDatabaseStack({
  //     hrn: getStackHRN(),
  //   });
  //   expect(res).toBeDefined();
  // });
  // // it("should perform crud operations in the vespa database", async () => {
  // //   const res = await beekeeperClient.getVespaDatabaseStack({
  // //     hrn: getStackHRN(),
  // //   });
  // //   const stack = res.stack!;
  // //   expect(stack).toBeDefined();
  // //   expect(stack.databases).toHaveLength(1);
  // //   const database = stack.databases[0];
  // //   const userData = generateTestUserData();
  // //   const record = marshalRecord(userData, UserColumnTypeMap);
  // //   const vespaClient = createSingletonVespaClient(database);
  // //   const res2 = await vespaClient.insertRecord({
  // //     databaseHrn: database.hrn,
  // //     tableName: "User",
  // //     record: record,
  // //   });
  // //   expect(res2).toBeDefined();
  // // expect(res2.insertedIds).toHaveLength(1);
  // // expect(res2.insertedIds[0]).toBeDefined();
  // // expect(res2.insertedIds[0]).not.toBe("");
  // // });
});
