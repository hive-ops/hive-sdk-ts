import { Command, Option } from "commander";
import { applyMigrationCommand } from "./applyMigration";
import { generateCodeCommand } from "./generateCode";
import { planMigrationCommand } from "./planMigration";

const vespaOptions: Option[] = [
  new Option("-d, --project-directory <projectDirectory>", "Project directory"),
  // new Option("-s, --stack-hrn <stackHRN>", "Stack HRN").env("HIVE_STACK_HRN"),
  // new Option("-a, --access-token <accessToken>", "Access token").env("HIVE_ACCESS_TOKEN"),
];

export const vespaCommand = new Command("vespa")
  .description("Vespa commands")
  .action(() => {
    console.log("Vespa commands");
  })
  .addCommand(planMigrationCommand)
  .addCommand(applyMigrationCommand)
  .addCommand(generateCodeCommand);

vespaCommand.commands.forEach((command) => {
  vespaOptions.forEach((option) => {
    command.addOption(option);
  });
});
