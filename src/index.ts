#!/usr/bin/env node

import { getGitStatus } from "./git.js";
import { displayStatus } from "./display.js";
import { promptUser, parseInput } from "./prompt.js";
import { applySelection } from "./stage.js";

async function main(): Promise<void> {
  const status = getGitStatus();
  displayStatus(status);

  const input = await promptUser();
  const selection = parseInput(input);

  console.log();
  applySelection(status, selection);
  console.log();
}

main();
