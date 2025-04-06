import { Command } from "commander";

const planMigration = () => {
  console.log("Plan migration");
};

export const planMigrationCommand = new Command("plan").description("Plan vespa migration").action(() => {
  planMigration();
});
