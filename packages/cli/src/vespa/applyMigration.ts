import { getStackHRN } from "@hiveops/node";
import { Command, OptionValues } from "commander";
import { getHSLFiles, initializeClients, loadDotEnv, preActionHookListener } from "./utils";

const applyMigration = (opts: OptionValues) => {
  // Load environment variables
  loadDotEnv(opts);

  // Read schema files
  const files = getHSLFiles(opts);

  // Initialize client
  const { beekeeperClient } = initializeClients(opts);

  // Apply migration
  const res = beekeeperClient.applyMigration({
    stackHrn: getStackHRN(),
    hslFiles: files,
  });
};

export const applyMigrationCommand = new Command("apply").description("Apply vespa migration").hook("preAction", preActionHookListener).action(applyMigration);
