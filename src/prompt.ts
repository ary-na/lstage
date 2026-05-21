import * as readline from "node:readline";

export type Selection = {
  toStage: number[];
  toUnstage: number[];
};

export function parseInput(input: string): Selection {
  const tokens = input.trim().split(/\s+|,/);
  const toStage: number[] = [];
  const toUnstage: number[] = [];

  for (const token of tokens) {
    if (!token) continue;
    const num = parseInt(token, 10);
    if (isNaN(num)) continue;
    if (num > 0) toStage.push(num);
    if (num < 0) toUnstage.push(Math.abs(num));
  }

  return { toStage, toUnstage };
}

export function promptUser(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question("\n> ", (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}
