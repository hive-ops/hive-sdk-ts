import { faker } from "@faker-js/faker";
import { getStackHRN, initialize, RecordItem, Records } from "@hiveops/core";
import dotenv from "dotenv";
import { createSingletonBeekeeperClient, createSingletonTokenClient, createSingletonVespaClient } from "./clients";

dotenv.config();

jest.setTimeout(30000);

describe("Hive SDK Clients", () => {
  initialize();

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
      tableName: "Customer",
      records: new Records({
        columnNames: ["id", "firstName", "lastName", "email", "age"],
        items: [new RecordItem({ values: ["1", faker.person.firstName(), faker.person.lastName(), faker.internet.email(), "30"] })],
      }),
    });
    expect(res2).toBeDefined();
  });

  // it("should create a singleton BeekeeperClient", async () => {
  //   const client = createSingletonBeekeeperClient(token);
  //   const res = await client.getVespaDatabaseStack({});
  //   expect(res).toBeDefined();
  //   // expect(res.stacks).toBeDefined();
  // });

  // it("should create a singleton VespaClient", () => {
  //   const client = createSingletonVespaClient({ token, fqdn });
  //   expect(client).toBeInstanceOf(VespaClient);
  // });
});
