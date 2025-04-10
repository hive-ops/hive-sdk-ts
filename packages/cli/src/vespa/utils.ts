import { createSingletonBeekeeperClient, File, initialize, ProgrammingLanguage } from "@hiveops/node";
import { Command, OptionValues } from "commander";
import { configDotenv } from "dotenv";
import * as fs from "fs";
import * as path from "path";

export const getProjectDirectory = (opts: OptionValues): string => (opts.projectDirectory as string | undefined) || process.cwd();
export const getStackHRN = (opts: OptionValues): string => opts.stackHrn as string;
export const getAccessToken = (opts: OptionValues): string => opts.accessToken as string;

/**
 * Find all files with a specific extension in a directory and its subdirectories
 * @param directoryPath - The directory to search in
 * @param extension - The file extension to look for (e.g., '.hsl')
 * @returns Array of file paths with the specified extension
 */
export function findFilesWithExtension(directoryPath: string, extension: string): { dir: string; fileName: string }[] {
  let results: { dir: string; fileName: string }[] = [];

  if (!extension.startsWith(".")) {
    extension = "." + extension;
  }

  const files = fs.readdirSync(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results.push(...findFilesWithExtension(filePath, extension));
    } else if (path.extname(file) === extension) {
      results.push({
        dir: directoryPath,
        fileName: file,
      });
    }
  }

  return results;
}

export const readFile = (directory: string, fileName: string): File => {
  const filePath = path.join(directory, fileName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return new File({
    directoryPathElements: directory.split(path.sep),
    fileName,
    content: fileContent,
  });
};

export const writeFile = (file: File) => {
  // Ensure the directory exists
  const directory = path.join(...file.directoryPathElements);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
  const filePath = path.join(directory, file.fileName);
  console.log(filePath);
  fs.writeFileSync(filePath, file.content, "utf-8");
};

export const deleteDirectory = (directoryPath: string) => {
  if (fs.existsSync(directoryPath)) {
    fs.rmdirSync(directoryPath, { recursive: true });
  }
};

export const getHSLFiles = (opts: OptionValues): File[] => {
  const filePaths = findFilesWithExtension(getProjectDirectory(opts), ".hsl");
  const files = filePaths.map(({ dir, fileName }) => readFile(dir, fileName));

  console.log(`Found ${files.length} HSL files`);
  files.forEach((file, i) => console.log(`${i + 1}: ${path.join(...file.directoryPathElements, file.fileName)}`));

  return files;
};

export const initializeClients = (opts: OptionValues) => {
  initialize({
    stackHRN: getStackHRN(opts),
    accessToken: getAccessToken(opts),
  });

  return { beekeeperClient: createSingletonBeekeeperClient() };
};

export const loadDotEnv = (opts: OptionValues) => {
  const projectDirectory = getProjectDirectory(opts);
  const dotenvPath = path.join(projectDirectory, ".env");

  if (fs.existsSync(dotenvPath)) {
    configDotenv({ path: dotenvPath });
  }
};

export const ProgrammingLanguagesMap = {
  ts: ProgrammingLanguage.TYPESCRIPT,
};

export const getProgrammingLanguage = (opts: OptionValues): ProgrammingLanguage => {
  const programmingLanguage = opts.programmingLanguage as string | undefined;
  if (!programmingLanguage) {
    throw new Error("Programming language is required");
  }
  return ProgrammingLanguagesMap[programmingLanguage];
};

export const preActionHookListener = (thisCommand: Command) => {
  loadDotEnv(thisCommand.opts());
};
