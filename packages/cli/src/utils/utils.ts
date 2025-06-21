import { Command } from "commander";

/**
 * Wraps an action function with error handling
 * @param fn The original action function
 * @returns A wrapped function with error handling
 */
export function withErrorHandling(fn: (...args: any[]) => Promise<any> | any) {
  return async (...args: any[]) => {
    try {
      await fn(...args);
    } catch (error) {
      console.error("Error:", error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  };
}

/**
 * Sets up global error handling for all commands
 * @param program The commander program instance
 */
export function setupErrorHandling(program: Command): void {
  // Handle errors that occur within commander itself
  program.exitOverride();

  // Add global error handler
  process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err.message);
    process.exit(1);
  });

  // Add command error handler
  program.configureOutput({
    outputError: (str, write) => write(`Error: ${str}\n`),
  });
}

export const removeBoundingQuotesSlice = (str: string): string => {
  const startsWithQuote = str.startsWith('"') || str.startsWith("'");
  const endsWithQuote = str.endsWith('"') || str.endsWith("'");

  if (startsWithQuote && endsWithQuote && str.length >= 2) {
    const firstChar = str[0];
    const lastChar = str[str.length - 1];

    if ((firstChar === '"' && lastChar === '"') || (firstChar === "'" && lastChar === "'")) {
      return str.slice(1, -1);
    }
  }
  return str;
}
