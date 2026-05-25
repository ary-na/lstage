#!/usr/bin/env node

import { createRequire } from "module";
import chalk from "chalk";
import { getGitStatus } from "./git.js";
import { displayStatus } from "./display.js";
import { promptUser, parseInput } from "./prompt.js";
import { applySelection } from "./stage.js";

const require = createRequire(import.meta.url);
const { version } = require("../package.json") as { version: string };

const args = process.argv.slice(2);
if (args.includes("--version") || args.includes("-v")) {
  console.log(version);
  process.exit(0);
}

async function main(): Promise<void> {
  const status = getGitStatus();

  if (status.unstaged.length === 0 && status.staged.length === 0) {
    console.log(chalk.green("✓ Nothing to stage or unstage."));
    return;
  }

  displayStatus(status);

  const input = await promptUser();
  const { selection, invalid } = parseInput(input);

  if (invalid.length > 0) {
    console.log(chalk.yellow(`\n  Ignored: ${invalid.join(", ")} — only integers are valid`));
  }

  console.log();
  const acted = applySelection(status, selection);

  if (acted) {
    const updated = getGitStatus();
    if (updated.unstaged.length === 0 && updated.staged.length === 0) {
      console.log(chalk.green("\n✓ Working tree is clean."));
    } else {
      displayStatus(updated);
    }
  }

  console.log();
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
