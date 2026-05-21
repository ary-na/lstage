import { execSync } from "node:child_process";

export type FileStatus = {
  index: number;
  status: string;
  file: string;
};

export type GitStatus = {
  unstaged: FileStatus[];
  staged: FileStatus[];
};

function resolveLabel(code: string): string {
  switch (code) {
    case "M":
      return "modified ";
    case "A":
      return "new file ";
    case "D":
      return "deleted  ";
    case "R":
      return "renamed  ";
    case "C":
      return "copied   ";
    case "?":
      return "untracked";
    default:
      return code;
  }
}

export function getGitStatus(): GitStatus {
  let output: string;

  try {
    output = execSync("git status --porcelain", { encoding: "utf8" });
  } catch {
    console.error("Not a git repository.");
    process.exit(1);
  }

  const unstaged: FileStatus[] = [];
  const staged: FileStatus[] = [];

  for (const line of output.split("\n")) {
    if (!line.trim()) continue;

    const indexStatus = line[0]!;
    const workStatus = line[1]!;
    const file = line.slice(3).trim();

    if (indexStatus !== " " && indexStatus !== "?") {
      staged.push({
        index: staged.length + 1,
        status: resolveLabel(indexStatus),
        file,
      });
    }

    if (workStatus !== " ") {
      unstaged.push({
        index: unstaged.length + 1,
        status: resolveLabel(workStatus),
        file,
      });
    }
  }

  return { staged, unstaged };
}
