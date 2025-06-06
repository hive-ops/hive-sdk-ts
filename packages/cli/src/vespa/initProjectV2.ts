import { createSingletonBeekeeperClient, createSingletonDroneClient } from "@hiveops/node";
import { Command, OptionValues } from "commander";
import fs from "fs";
import inquirer from "inquirer";
import path from "path";
import { getHiveToken } from "../utils/getHiveToken";
import { getProjectDirectoryFromOptions, runCommandWithOutput } from "./utils";

interface Organization {
  id: string;
  name: string;
}

interface SecureApp {
  id: string;
  name: string;
}

interface Project {
  id: string;
  name: string;
}

interface Database {
  id: string;
  name: string;
  hrn: string;
}

const initializeProjectV2 = async (opts: OptionValues) => {
  try {
    // Step 1: Get Hive Token through browser flow
    console.log("Starting authentication flow...");
    const token = await getHiveToken();

    // Initialize HiveClient
    const droneClient = createSingletonDroneClient(token);
    const beekeeperClient = createSingletonBeekeeperClient(token);
    // Step 2: Fetch and select organization
    console.log("\nFetching organizations...");
    const { organizations } = await droneClient.getOrganizations({});

    if (organizations.length === 0) {
      console.error("\n❌ No organizations found. Please visit https://hiveops.io to create one.");
      process.exit(1);
    }

    const { orgUUID } = await inquirer.prompt([
      {
        type: "list",
        name: "orgUUID",
        message: "Select an organization:",
        choices: organizations.map((org) => ({
          name: org.name,
          value: org.uuid,
        })),
      },
    ]);

    // Step 3: Fetch and select secure app
    console.log("\nFetching secure apps...");
    const { secureApps } = await droneClient.getSecureApps({ organizationUuid: orgUUID });

    if (secureApps.length === 0) {
      console.error("\n❌ No secure apps found. Please visit https://hiveops.io to create one in the selected organization.");
      process.exit(1);
    }

    const { appHRN } = await inquirer.prompt([
      {
        type: "list",
        name: "appHRN",
        message: "Select a secure app:",
        choices: secureApps.map((app) => ({
          name: app.name,
          value: app.hrn,
        })),
      },
    ]);

    // Step 4: Fetch and select project
    console.log("\nFetching projects...");
    const { projects } = await droneClient.getProjects({ organizationUuid: orgUUID });

    if (projects.length === 0) {
      console.error("\n❌ No projects found. Please visit https://hiveops.io to create one in the selected organization.");
      process.exit(1);
    }

    const { projectUUID } = await inquirer.prompt([
      {
        type: "list",
        name: "projectUUID",
        message: "Select a project:",
        choices: projects.map((project) => ({
          name: project.name,
          value: project.uuid,
        })),
      },
    ]);

    // Step 5: Fetch and select database stacks
    console.log("\nFetching database stacks...");
    const { stacks } = await beekeeperClient.listVespaDatabaseStacksByProject({
      organizationUuid: orgUUID,
      projectUuid: projectUUID,
    });

    if (stacks.length === 0) {
      console.error("\n❌ No databases found. Please visit https://hiveops.io to create one in the selected project.");
      process.exit(1);
    }

    const { stackHRN } = await inquirer.prompt([
      {
        type: "list",
        name: "stackHRN",
        message: "Select a database stack:",
        choices: stacks.map((stack) => ({
          name: stack.name,
          value: stack.hrn,
        })),
      },
    ]);

    // Step 6: Fetch access token and database HRN
    // console.log("\nFetching credentials...");
    // const [appAccessToken, stackDetails] = await Promise.all([droneClient.getSecureAppToken(appId), droneClient.getStackDetails(stackHRN)]);

    // const appAccessToken = await droneClient.getSecureAppAccessTokenSecret({ secureAppHrn: appHRN });

    const appAccessToken = "dferivnoskdlo";

    // Continue with the normal init flow
    const projectDirectory = getProjectDirectoryFromOptions(opts);

    // Create .env file
    const envContent = `
HIVE_STACK_HRN=${stackHRN}
HIVE_ACCESS_TOKEN=${appAccessToken}
`;
    const envFilePath = path.join(projectDirectory, ".env");
    fs.writeFileSync(envFilePath, envContent, { encoding: "utf8" });
    console.log("\n✅ .env file created successfully.");

    // Setup .gitignore
    const gitignorePath = path.join(projectDirectory, ".gitignore");
    if (!fs.existsSync(gitignorePath)) {
      fs.writeFileSync(gitignorePath, "", { encoding: "utf8" });
    }

    const gitignoreContent = fs.readFileSync(gitignorePath, { encoding: "utf8" }).split("\n");
    if (!gitignoreContent.includes(".env")) {
      fs.appendFileSync(gitignorePath, "\n.env\n", { encoding: "utf8" });
      console.log("✅ .env added to .gitignore successfully.");
    } else {
      console.log("ℹ️ .env already exists in .gitignore.");
    }

    // Ask about bootstrap models
    const { createBootstrapModels } = await inquirer.prompt([
      {
        type: "confirm",
        name: "createBootstrapModels",
        message: "Do you want to create bootstrap models?",
        default: true,
      },
    ]);

    if (createBootstrapModels) {
      const hslContent = `
model User = {
  firstName: string = 1
  lastName: string = 2
  email: string = 3
  age: int = 4
}

model Post = {
  userId: string   = 1
  title:  string  = 2
  body:   string  = 3
}
      `;

      const srcDirectory = path.join(projectDirectory, "src");
      if (!fs.existsSync(srcDirectory)) {
        fs.mkdirSync(srcDirectory, { recursive: true });
      }

      const hslFilePath = path.join(srcDirectory, "models.hsl");
      fs.writeFileSync(hslFilePath, hslContent, { encoding: "utf8" });
      console.log("✅ models.hsl file created successfully.");
    }

    // Setup package.json
    const packageJsonPath = path.join(projectDirectory, "package.json");
    if (!fs.existsSync(packageJsonPath)) {
      console.log("\nℹ️ package.json not found. Creating a new one...");
      await runCommandWithOutput("npm init -y", projectDirectory);
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: "utf8" }));
    packageJson.scripts = {
      ...packageJson.scripts,
      "vespa:generate": "hive vespa generate -p ts",
      "vespa:apply": "hive vespa apply",
      "vespa:generate-and-apply": "hive vespa generate-and-apply -p ts",
    };
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log("✅ Scripts added to package.json successfully.");

    console.log("\nInstalling dependencies...");
    // Install dependencies
    await runCommandWithOutput("npm install --save @hiveops/node@latest", projectDirectory);
    await runCommandWithOutput("npm install --save-dev @hiveops/cli@latest", projectDirectory);

    console.log("\n🎉 Project initialization completed successfully!");
    console.log("\nNext steps:");
    console.log("1. cd into your project directory");
    console.log("2. Create your models in src/models.hsl");
    console.log("3. Run 'npm run vespa:generate-and-apply' to generate and apply your schema");
  } catch (error: any) {
    console.error("\n❌ Error initializing project:", error.message);
    process.exit(1);
  }
};

export const initializeProjectV2Command = new Command("init-v2")
  .description("Initialize a project using browser-based authentication")
  .option("-p, --platform <platform>", "Platform (ts/go)")
  .option("-d, --directory <directory>", "Project directory")
  .action(initializeProjectV2);
