import { Command, OptionValues } from "commander";
import { applyMigration } from "./applyMigration";
import { generateCode } from "./generateCode";
import { programmingLanguageOption } from "./utils";

const generateAndApply = async (opts: OptionValues) => {
  await generateCode(opts);
  await applyMigration(opts);
};

export const generateAndApplyCommand = new Command("generate-and-apply")
  .description("Generate vespa code and apply migration")
  .option("-o, --output-directory <outputDirectory>", "Output directory")
  .addOption(programmingLanguageOption)
  .action(generateAndApply);
