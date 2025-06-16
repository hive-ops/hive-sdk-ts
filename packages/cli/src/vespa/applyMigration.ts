import { Command, OptionValues } from "commander";
import { getHSLFiles, getStackHRNFromOptions, initializeClients, loadDotEnv, preActionHookListener } from "./utils";
import { createBeekeeperClient, getEnvString } from "@hiveops/core";

export const applyMigration = async (opts: OptionValues) => {
  // Load environment variables
  loadDotEnv(opts);

  // Read schema files
  const files = getHSLFiles(opts);

  // Initialize client
  const { beekeeperClient } = initializeClients(opts);

  const client = createBeekeeperClient();
  const resA = await client.getVespaDatabaseStack({
    hrn: getEnvString("HIVE_STACK_HRN"),
  });

  const resB = await beekeeperClient.getVespaDatabaseStack({
    hrn: getStackHRNFromOptions(opts),
  });

  // Apply migration
  const res = await beekeeperClient.applyMigration({
    stackHrn: getStackHRNFromOptions(opts),
    hslFiles: files,
  });

  console.log("Migration applied successfully:", res);
};

export const applyMigrationCommand = new Command("apply").description("Apply vespa migration").hook("preAction", preActionHookListener).action(applyMigration);
