import { execSync } from "node:child_process";
import chalk from "chalk";
import type { GitStatus } from "./git.js";
import type { Selection } from "./prompt.js";

export function applySelection(status: GitStatus, selection: Selection): void {
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
    try {
      execSync(`git add "${file.file}"`);
      console.log(chalk.green(`  ✓ Staged    ${file.file}`));
      acted = true;
    } catch {
      console.log(chalk.red(`  ✗ Failed to stage ${file.file}`));
    }
  }

  // Unstage files
  for (const num of toUnstage) {
    const file = staged[num - 1];
    if (!file) {
      console.log(chalk.red(`  ✗ No staged file at index ${num}`));
      continue;
    }
    try {
      execSync(`git restore --staged "${file.file}"`);
      console.log(chalk.yellow(`  ✓ Unstaged  ${file.file}`));
      acted = true;
    } catch {
      console.log(chalk.red(`  ✗ Failed to unstage ${file.file}`));
    }
  }

  if (!acted) {
    console.log(chalk.dim("\n  No changes made."));
  }
}
