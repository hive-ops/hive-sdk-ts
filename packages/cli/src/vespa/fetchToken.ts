import { Command, OptionValues } from "commander";
import { getHiveToken } from "../utils/getHiveToken";

export const fetchToken = async (_opts: OptionValues) => {
  try {
    const apiKey = await getHiveToken();
  } catch (error: any) {
    process.exit(1); // Exit with an error code on failure
  }
};

export const fetchTokenCommand = new Command("fetch-token")
  .description("Fetch Vespa token")
  .option("-s, --stack-hrn <stackHrn>", "Stack HRN")
  .option("-u, --username <username>", "Username for authentication")
  .option("-p, --password <password>", "Password for authentication")
  .action(fetchToken);
