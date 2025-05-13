import { faker } from "@faker-js/faker";
import { getStackHRN, RecordItem, Records, vespaInit } from "@hiveops/core";
import dotenv from "dotenv";
import { createSingletonBeekeeperClient, createSingletonTokenClient, createSingletonVespaClient } from "./clients";

dotenv.config();

jest.setTimeout(30000);

describe("Hive SDK Clients", () => {
  vespaInit();

  const tokenClient = createSingletonTokenClient();
  const beekeeperClient = createSingletonBeekeeperClient();

  it("should create a singleton TokenClient", async () => {
    const res = await tokenClient.getSecureAppHiveToken({});
    expect(res).toBeDefined();
    expect(res.hiveToken).toBeDefined();
  });

  it("should create a singleton DroneClient", async () => {
    const res = await beekeeperClient.getVespaDatabaseStack({
      hrn: getStackHRN(),
    });
    expect(res).toBeDefined();
  });

  it("should perform crud operations in the vespa database", async () => {
    const res = await beekeeperClient.getVespaDatabaseStack({
      hrn: getStackHRN(),
    });
    const stack = res.stack!;
    expect(stack).toBeDefined();
    expect(stack.databases).toHaveLength(1);
    const database = stack.databases[0];

    const vespaClient = createSingletonVespaClient(database);
    const res2 = await vespaClient.insertRecords({
      databaseHrn: database.hrn,
      tableName: "User",
      records: new Records({
        columnNames: ["firstName", "lastName", "email", "age", "isActive", "lastLogin", "profileImage", "role"],
        items: [
          new RecordItem({ values: [faker.person.firstName(), faker.person.lastName(), faker.internet.email(), "30", "true", "2023-10-01T00:00:00Z", "https://example.com/image.jpg", "admin"] }),
        ],
      }),
    });
    expect(res2).toBeDefined();
    expect(res2.insertedIds).toHaveLength(1);
    expect(res2.insertedIds[0]).toBeDefined();
    expect(res2.insertedIds[0]).not.toBe("");
  });
});
