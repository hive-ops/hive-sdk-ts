import { Command, OptionValues } from "commander";
import fs from "fs";
import inquirer from "inquirer";
import path from "path";
import { getProjectDirectory } from "./utils";

const initializeProject = async (opts: OptionValues) => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "stackHRN",
      message: "Stack HRN:",
      default: opts.stackHrn,
    },
    {
      type: "password",
      name: "accessToken",
      message: "Access token:",
      default: opts.accessToken,
    },
    {
      type: "confirm",
      name: "createBootstrapModels",
      message: "Do you want to create bootstrap models?",
      default: true,
    },
  ]);

  const { stackHRN, accessToken, createBootstrapModels } = answers;

  const projectDirectory = getProjectDirectory(opts);

  // Create .env file
  const envContent = `STACK_HRN=${stackHRN}` + `\n` + `ACCESS_TOKEN=${accessToken}`;

  const envFilePath = path.join(projectDirectory, ".env");

  fs.writeFileSync(envFilePath, envContent, { encoding: "utf8" });
  console.log(".env file created successfully.");

  // Check if .gitignore exists
  const gitignorePath = path.join(projectDirectory, ".gitignore");
  if (!fs.existsSync(gitignorePath)) {
    fs.writeFileSync(gitignorePath, "", { encoding: "utf8" });
  }

  // Add .env to .gitignore if it doesn't exist
  const gitignoreContent = fs.readFileSync(gitignorePath, { encoding: "utf8" }).split("\n");
  if (!gitignoreContent.includes(".env")) {
    fs.appendFileSync(gitignorePath, "\n.env\n", { encoding: "utf8" });
    console.log(".env added to .gitignore successfully.");
  } else {
    console.log(".env already exists in .gitignore.");
  }

  // Create Bootstrap models if the user wants to
  if (createBootstrapModels) {
    const hslContent = `model User {` + `\n` + `  id string;` + `\n` + `  firstName string;` + `\n` + `  lastName string;` + `\n` + `  email string;` + `\n` + `  age int;` + `\n` + `}`;

    const hslFilePath = path.join(projectDirectory, "src", "models.hsl");

    // Create the src directory if it doesn't exist
    const srcDirectory = path.join(projectDirectory, "src");
    if (!fs.existsSync(srcDirectory)) {
      fs.mkdirSync(srcDirectory, { recursive: true });
    }

    fs.writeFileSync(hslFilePath, hslContent, { encoding: "utf8" });
    console.log("models.hsl file created successfully.");
  }

  // Add scripts to package.json
  const packageJsonPath = path.join(projectDirectory, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: "utf8" }));
  packageJson.scripts = {
    ...packageJson.scripts,
    vespa: "vespa",
    "vespa:plan": "vespa plan",
    "vespa:apply": "vespa apply",
    "vespa:generate": "vespa generate",
  };
};

export const initializeProjectCommand = new Command("init").description("Initialize a project using VespaDB").action(initializeProject);
