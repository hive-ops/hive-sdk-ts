import dotenv from "dotenv";
import { Command, OptionValues } from "commander";
import { getHSLFiles, getStackHRN, initializeClients, loadDotEnv, preActionHookListener } from "./utils";
import { File } from "@hiveops/core";

dotenv.config();

jest.setTimeout(30000);

describe("Vespa Migration", () => {
  it("should apply migration", async () => {


    const opts: OptionValues = {}


    // Read schema files
    const files: File[] = [];

    // Initialize client
    const { beekeeperClient } = initializeClients(opts);

    // Apply migration
    const res = await beekeeperClient.applyMigration({
      stackHrn: getStackHRN(opts),
      hslFiles: files,
    });

    expect(res).toBeDefined();
  });
});
