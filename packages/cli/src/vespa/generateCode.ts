import { getStackHRN } from "@hiveops/node";
import { Command, Option, OptionValues } from "commander";
import path from "path";
import { deleteDirectory, getHSLFiles, getProgrammingLanguage, initializeClients, loadDotEnv, ProgrammingLanguagesMap, writeFile } from "./utils";

const generateCode = async (opts: OptionValues) => {
  // Load environment variables
  loadDotEnv(opts);

  // Read schema files
  const files = getHSLFiles(opts);

  // Initialize client
  const { beekeeperClient } = initializeClients(opts);

  // Generate code
  const res = await beekeeperClient.generateCode({
    stackHrn: getStackHRN(),
    language: getProgrammingLanguage(opts),
    schemaFiles: files,
  });

  const directories = res.codeFiles.map((file) => path.join(...file.directoryPathElements));
  const uniqueDirectories = [...new Set(directories)];
  for (const directory of uniqueDirectories) {
    deleteDirectory(directory);
  }

  // Write code to files
  for (const file of res.codeFiles) {
    writeFile(file);
  }
};

export const generateCodeCommand = new Command("generate")
  .description("Generate vespa code")
  .option("-o, --output-directory <outputDirectory>", "Output directory")
  .addOption(new Option("-p, --programming-language <programmingLanguage>", "Programming language").choices(Object.keys(ProgrammingLanguagesMap)).makeOptionMandatory())
  .action(generateCode);
