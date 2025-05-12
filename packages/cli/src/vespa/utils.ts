import { BeekeeperClient, File, ProgrammingLanguage } from "@hiveops/core";
import { createSingletonBeekeeperClient } from "@hiveops/node";
import { exec } from "child_process";
import { Command, Option, OptionValues } from "commander";
import { configDotenv } from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";

export const getProjectDirectoryFromOptions = (opts: OptionValues): string => (opts.projectDirectory as string | undefined) || process.cwd();
export const getStackHRNFromOptions = (opts: OptionValues): string => (opts.stackHrn as string) || process.env.HIVE_STACK_HRN || "";
export const getAccessTokenFromOptions = (opts: OptionValues): string => (opts.accessToken as string) || process.env.HIVE_ACCESS_TOKEN || "";

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

export const writeFile = (projectDirectory: string, file: File) => {
  // Ensure the directory exists
  const directory = path.join(projectDirectory, ...file.directoryPathElements);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
  const filePath = path.join(directory, file.fileName);
  console.log(filePath);
  fs.writeFileSync(filePath, file.content, "utf-8");
};

export const deleteDirectory = (directoryPath: string) => {
  if (fs.existsSync(directoryPath)) {
    fs.rmSync(directoryPath, { recursive: true });
  }
};

export const getHSLFiles = (opts: OptionValues): File[] => {
  const filePaths = findFilesWithExtension(getProjectDirectoryFromOptions(opts), ".hsl");
  const files = filePaths.map(({ dir, fileName }) => readFile(dir, fileName));

  console.log(`Found ${files.length} HSL files`);
  files.forEach((file, i) => console.log(`${i + 1}: ${path.join(...file.directoryPathElements, file.fileName)}`));

  return files;
};

export const initializeClients = (opts: OptionValues): { beekeeperClient: BeekeeperClient } => {
  // vespaInit({
  //   stackHRN: getStackHRNFromOptions(opts),
  //   accessToken: getAccessTokenFromOptions(opts),
  // });

  console.log({
    stackHRN: getStackHRNFromOptions(opts),
    accessToken: getAccessTokenFromOptions(opts),
  });

  return { beekeeperClient: createSingletonBeekeeperClient() };
};

export const loadDotEnv = (opts: OptionValues) => {
  const projectDirectory = getProjectDirectoryFromOptions(opts);
  const dotenvPath = path.join(projectDirectory, ".env");

  if (fs.existsSync(dotenvPath)) {
    console.log(`Loading environment variables from ${dotenvPath}`);
    configDotenv({ path: dotenvPath });
  }
};

export const ProgrammingLanguagesMap: Omit<{ [key in keyof typeof ProgrammingLanguage]: { shortName: string; fullName } }, "UNSPECIFIED"> = {
  TYPESCRIPT: { shortName: "ts", fullName: "Typescript" },
  GOLANG: { shortName: "go", fullName: "Golang" },
  PYTHON: { shortName: "py", fullName: "Python" },
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

export const programmingLanguageShortNames = Object.values(ProgrammingLanguagesMap).map((lang) => lang.shortName);
export const programmingLanguageFullNames = Object.values(ProgrammingLanguagesMap).map((lang) => lang.fullName);

export const programmingLanguageOption = new Option("-p, --programming-language <programmingLanguage>", "Programming language").choices(programmingLanguageShortNames).makeOptionMandatory();

const execPromise = promisify(exec);

/**
 * Runs a CLI command and returns the result
 * @param command The command to run
 * @param cwd The working directory to run the command in (optional)
 * @returns Promise with stdout and stderr
 */
export async function runCommand(command: string, cwd?: string): Promise<{ stdout: string; stderr: string }> {
  try {
    const options = cwd ? { cwd } : {};
    const { stdout, stderr } = await execPromise(command, options);
    return { stdout, stderr };
  } catch (error) {
    // If the command fails, the error will contain stdout and stderr
    if (error instanceof Error && "stdout" in error && "stderr" in error) {
      return {
        stdout: (error as any).stdout || "",
        stderr: (error as any).stderr || "",
      };
    }
    throw error;
  }
}

/**
 * Runs a CLI command and logs the output
 * @param command The command to run
 * @param cwd The working directory to run the command in (optional)
 * @returns Promise that resolves when the command completes
 */
export async function runCommandWithOutput(command: string, cwd?: string): Promise<void> {
  try {
    console.log(`Running: ${command}`);
    const { stdout, stderr } = await runCommand(command, cwd);

    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
  } catch (error) {
    console.error(`Command failed: ${command}`);
    console.error(error);
    throw error;
  }
}
