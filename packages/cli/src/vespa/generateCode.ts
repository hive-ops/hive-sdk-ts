import { Command, OptionValues } from "commander";
import path from "path";
import {
  deleteDirectory,
  getHSLFiles,
  getProgrammingLanguage,
  getProjectDirectoryFromOptions,
  getStackHRNFromOptions,
  initializeClients,
  loadDotEnv,
  programmingLanguageOption,
  writeFile,
} from "./utils";

export const generateCode = async (opts: OptionValues) => {
  // Load environment variables
  loadDotEnv(opts);

  const projectDirectory = getProjectDirectoryFromOptions(opts);

  // Read schema files
  const files = getHSLFiles(opts);

  // Initialize client
  const { beekeeperClient } = initializeClients(opts);

  // Generate code
  const res = await beekeeperClient.generateCode({
    stackHrn: getStackHRNFromOptions(opts),
    language: getProgrammingLanguage(opts),
    schemaFiles: files,
  });

  const directories = res.codeFiles.map((file) => path.join(...file.directoryPathElements));
  const uniqueDirectories = [...new Set(directories)];
  for (const directory of uniqueDirectories) {
    deleteDirectory(path.join(projectDirectory, directory));
  }

  // Write code to files
  for (const file of res.codeFiles) {
    writeFile(projectDirectory, file);
  }
};

export const generateCodeCommand = new Command("generate")
  .description("Generate vespa code")
  .option("-o, --output-directory <outputDirectory>", "Output directory")
  .addOption(programmingLanguageOption)
  .action(generateCode);
