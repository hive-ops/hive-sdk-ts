import * as fs from "fs";
import * as path from "path";

const readDotGitIgnore = (projectDirectory: string): string[] => {
  const gitignoreFilePath = path.join(projectDirectory, ".gitignore");
  if (!fs.existsSync(gitignoreFilePath)) {
    return [];
  }

  const gitignoreContent = fs.readFileSync(gitignoreFilePath, { encoding: "utf8" });
  return gitignoreContent.split("\n").reduce((acc: string[], line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      acc.push(trimmed);
    }
    return acc;
  }, []);
};

const writeDotGitIgnore = (projectDirectory: string, gitIgnoreEntries: string[]) => {
  const gitignoreFilePath = path.join(projectDirectory, ".gitignore");
  const gitignoreContent = gitIgnoreEntries.join("\n") + "\n";
  fs.writeFileSync(gitignoreFilePath, gitignoreContent, { encoding: "utf8" });
  console.log("✅ .gitignore file updated successfully.");
};

const updateGitIgnoreEntries = (currentGitIgnoreEntries: string[], newGitIgnore: string[]): string[] => {
  let updatedGitIgnore = [...currentGitIgnoreEntries];
  newGitIgnore.forEach((entry) => {
    if (!updatedGitIgnore.includes(entry)) {
      updatedGitIgnore.push(entry);
    }
  });
  return updatedGitIgnore;
};

export const updateDotGitIgnore = (projectDirectory: string, gitIgnoreEntries: string[]) => {
  const gitignorePath = path.join(projectDirectory, ".gitignore");
  if (!fs.existsSync(gitignorePath)) {
    fs.writeFileSync(gitignorePath, "", { encoding: "utf8" });
  }

  const existingGitIgnoreEntries = readDotGitIgnore(projectDirectory);

  const updatedGitIgnore = updateGitIgnoreEntries(existingGitIgnoreEntries, gitIgnoreEntries);

  writeDotGitIgnore(projectDirectory, updatedGitIgnore);
};
