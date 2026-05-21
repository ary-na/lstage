import chalk from "chalk";
import type { GitStatus } from "./git.js";

export function displayStatus(status: GitStatus): void {
  const { unstaged, staged } = status;

  if (unstaged.length === 0 && staged.length === 0) {
    console.log(chalk.green("✓ Nothing to stage or unstage."));
    process.exit(0);
  }

  // Unstaged section
  if (unstaged.length > 0) {
    console.log("\n" + chalk.bold.yellow("UNSTAGED"));
    console.log(chalk.yellow("─".repeat(40)));
    for (const f of unstaged) {
      console.log(
        chalk.green(String(f.index).padStart(2)) +
          chalk.dim("  " + f.status + "  ") +
          chalk.white(f.file),
      );
    }
  }

  // Staged section
  if (staged.length > 0) {
    console.log("\n" + chalk.bold.cyan("STAGED"));
    console.log(chalk.cyan("─".repeat(40)));
    for (const f of staged) {
      console.log(
        chalk.red("-" + String(f.index).padStart(2)) +
          chalk.dim("  " + f.status + "  ") +
          chalk.white(f.file),
      );
    }
  }

  console.log("\n" + chalk.dim("─".repeat(40)));
  console.log(
    chalk.dim("Enter numbers to toggle  ") +
      chalk.green("1 3") +
      chalk.dim(" to stage  ") +
      chalk.red("-1 -2") +
      chalk.dim(" to unstage"),
  );
}
