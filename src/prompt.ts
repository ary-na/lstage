import * as readline from "node:readline";

export type Selection = {
  toStage: number[];
  toUnstage: number[];
  stageAll?: boolean;
  unstageAll?: boolean;
};

export type ParseResult = {
  selection: Selection;
  invalid: string[];
};

export function parseInput(input: string): ParseResult {
  const tokens = input.trim().split(/\s+|,/);
  const toStage: number[] = [];
  const toUnstage: number[] = [];
  const invalid: string[] = [];
  let stageAll = false;
  let unstageAll = false;

  for (const token of tokens) {
    if (!token) continue;
    if (token === "a") { stageAll = true; continue; }
    if (token === "-a") { unstageAll = true; continue; }
    const num = Number(token);
    if (!Number.isInteger(num) || num === 0) {
      invalid.push(token);
      continue;
    }
    if (num > 0) toStage.push(num);
    if (num < 0) toUnstage.push(Math.abs(num));
  }

  return { selection: { toStage, toUnstage, stageAll, unstageAll }, invalid };
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
