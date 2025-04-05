import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import { createSingletonBeekeeperClient, createSingletonDroneClient, createSingletonTokenClient, getVespaClient, RecordItem, Records, setAccessToken } from "./clients";

dotenv.config();

jest.setTimeout(30000);

describe("Hive SDK Clients", () => {
  process.env.HIVE_ENV = "dev";
  setAccessToken(process.env.SECURE_APP_ACCESS_TOKEN || "");
  const fqdn = "test-fqdn";

  const tokenClient = createSingletonTokenClient();
  const droneClient = createSingletonDroneClient();
  const beekeeperClient = createSingletonBeekeeperClient();

  it("should create a singleton TokenClient", async () => {
    const res = await tokenClient.getSecureAppHiveToken({});
    expect(res).toBeDefined();
    expect(res.hiveToken).toBeDefined();
  });

  it("should create a singleton DroneClient", async () => {
    const stackHrn = process.env.STACK_HRN || "";
    const res = await beekeeperClient.getVespaDatabaseStack({
      hrn: stackHrn,
    });
    expect(res).toBeDefined();
  });

  it("should perform crud operations in the vespa database", async () => {
    const stackHrn = process.env.STACK_HRN || "";
    const res = await beekeeperClient.getVespaDatabaseStack({
      hrn: stackHrn,
    });
    const stack = res.stack!;
    expect(stack).toBeDefined();
    expect(stack.databases).toHaveLength(1);
    const database = stack.databases[0];

    const vespaClient = getVespaClient(database);
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
