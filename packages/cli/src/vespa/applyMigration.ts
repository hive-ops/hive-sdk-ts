import { Command, OptionValues } from "commander";
import { getHSLFiles, getStackHRN, initializeClients, loadDotEnv, preActionHookListener } from "./utils";

export  const applyMigration = (opts: OptionValues) => {
  // Load environment variables
  loadDotEnv(opts);

  // Read schema files
  const files = getHSLFiles(opts);

  // Initialize client
  const { beekeeperClient } = initializeClients(opts);

  // Apply migration
  const res = beekeeperClient.applyMigration({
    stackHrn: getStackHRN(opts),
    hslFiles: files,
  });
};

export const applyMigrationCommand = new Command("apply").description("Apply vespa migration").hook("preAction", preActionHookListener).action(applyMigration);
