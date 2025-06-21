import * as fs from "fs";
import * as path from "path";
import { removeBoundingQuotesSlice } from "./utils";

const readDotEnv = (projectDirectory: string): [string, string][] => {
  const envFilePath = path.join(projectDirectory, ".env");
  if (!fs.existsSync(envFilePath)) {
    return [];
  }

  const envContent = fs.readFileSync(envFilePath, { encoding: "utf8" });
  return envContent.split("\n").reduce((acc: [string, string][], line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...valueParts] = trimmed.split("=");
      const value = valueParts.join("="); // Handle values that might contain =
      if (key) {
        acc.push([key.trim(), removeBoundingQuotesSlice(value.trim())]);
      }
    }
    return acc;
  }, []);
};

const writeDotEnv = (projectDirectory: string, envVars: [string, string][]) => {
  const envFilePath = path.join(projectDirectory, ".env");
  const envContent = envVars.map(([key, value]) => `${key}=${value}`).join("\n") + "\n";
  fs.writeFileSync(envFilePath, envContent, { encoding: "utf8" });
  console.log("✅ .env file updated successfully.");
};

const updateEnvEntry = (currentEnvVars: [string, string][], newEnvVars: [string, string][]): [string, string][] => {
  let updatedEnv = [...currentEnvVars];
  newEnvVars.forEach(([key, value]) => {
    const index = updatedEnv.findIndex(([k]) => k === key);
    if (index !== -1) {
      updatedEnv[index][1] = value; // Update existing entry
    } else {
      updatedEnv.push([key, value]); // Add new entry
    }
  });
  return updatedEnv;
};

export const updateDotEnv = (projectDirectory: string, envVars: [string, string][]) => {
  const envFilePath = path.join(projectDirectory, ".env");
  let envContent = "";
  const existingEnv = readDotEnv(projectDirectory);

  const updatedEnv = updateEnvEntry(existingEnv, envVars);

  // Convert back to .env format
  const newEnvContent = updatedEnv.map(([key, value]) => `${key}=${value}`).join("\n");

  fs.writeFileSync(envFilePath, newEnvContent + "\n", { encoding: "utf8" });
  console.log("\n✅ .env file " + (envContent ? "updated" : "created") + " successfully.");
};
