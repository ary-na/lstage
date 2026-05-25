import { spawnSync } from "node:child_process";
import chalk from "chalk";
import type { GitStatus } from "./git.js";
import type { Selection } from "./prompt.js";

export function applySelection(status: GitStatus, selection: Selection): boolean {
  const { toStage, toUnstage } = selection;
  const { unstaged, staged } = status;

  let acted = false;

  // Stage files
  for (const num of toStage) {
    const file = unstaged[num - 1];
    if (!file) {
      console.log(chalk.red(`  ✗ No unstaged file at index ${num}`));
      continue;
    }
    const result = spawnSync("git", ["add", file.file], { stdio: ["inherit", "inherit", "pipe"] });
    if (result.status === 0) {
      console.log(chalk.green(`  ✓ Staged    ${file.file}`));
      acted = true;
    } else {
      const errMsg = result.stderr?.toString().trim();
      console.log(chalk.red(`  ✗ Failed to stage ${file.file}${errMsg ? ": " + errMsg : ""}`));
    }
  }

  // Unstage files
  for (const num of toUnstage) {
    const file = staged[num - 1];
    if (!file) {
      console.log(chalk.red(`  ✗ No staged file at index ${num}`));
      continue;
    }
    const result = spawnSync("git", ["restore", "--staged", file.file], { stdio: ["inherit", "inherit", "pipe"] });
    if (result.status === 0) {
      console.log(chalk.yellow(`  ✓ Unstaged  ${file.file}`));
      acted = true;
    } else {
      const errMsg = result.stderr?.toString().trim();
      console.log(chalk.red(`  ✗ Failed to unstage ${file.file}${errMsg ? ": " + errMsg : ""}`));
    }
  }

  if (!acted) {
    console.log(chalk.dim("\n  No changes made."));
  }

  return acted;
}
