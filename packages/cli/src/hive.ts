#!/usr/bin/env node

import { Command } from "commander";
import { vespaCommand } from "./vespa";

const main = () => {
  const figlet = require("figlet");

  console.log(figlet.textSync("Hive CLI"));

  const program = new Command();

  program.version("1.0.0").description("Hive CLI");

  program.addCommand(vespaCommand);

  program.parse(process.argv);
};

main();
