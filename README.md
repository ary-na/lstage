# 🎯 lstage

> Interactive git staging tool. Select files by number, stage or unstage instantly.

[![npm version](https://img.shields.io/npm/v/%40ariian%2Flstage?color=black&style=flat-square)](https://www.npmjs.com/package/@ariian/lstage)
[![npm downloads](https://img.shields.io/npm/dm/%40ariian%2Flstage?color=black&style=flat-square)](https://www.npmjs.com/package/@ariian/lstage)
[![license](https://img.shields.io/npm/l/%40ariian%2Flstage?color=black&style=flat-square)](./LICENSE)
[![node](https://img.shields.io/node/v/%40ariian%2Flstage?color=black&style=flat-square)](https://nodejs.org)

---

I built lstage because I kept finding myself either staging everything with `git add .` when I only wanted a few files, or tediously typing out full file paths one by one. I wanted something that just shows me what's changed, lets me pick by number, and gets out of the way.

---

## Install

```bash
npm install -g @ariian/lstage
```

---

## Usage

```bash
lstage
lstage --version   # print version and exit
lstage -v          # alias for --version
```

You'll see your unstaged and staged files in two numbered sections:

```
UNSTAGED
   1  modified   src/components/Button.tsx
   2  modified   src/components/Modal.tsx
   3  untracked  src/utils/helpers.ts

STAGED
  -1  modified   README.md
  -2  new file   src/index.ts

────────────────────────────────────────
Enter numbers — 1 2 3 to stage, -1 -2 to unstage, a / -a for all

> 1 2 -1
```

- Positive numbers → stage from the unstaged list
- Negative numbers → unstage from the staged list (the index shown is already the number to type)
- Mix freely: `1 2 3 -1 -2`
- `a` → stage all unstaged files at once
- `-a` → unstage all staged files at once

After each action, the updated file list is shown so you can confirm the result at a glance.

---

## How it works

```
1. you run      →  lstage
2. lstage reads →  git status --porcelain
3. lstage shows →  numbered list of unstaged + staged files
4. you type     →  1 3 -2
5. lstage runs  →  git add / git restore --staged
6. lstage shows →  updated file list (or ✓ Working tree is clean)
```

---

## Requirements

- Node.js `>=18`
- A git repository

---

## License

MIT © Arian Najafi Yamchelo — [arii.dev](https://arii.dev)
