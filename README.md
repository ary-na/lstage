# 🎯 lstage

> Interactive git staging tool. Select files by number, stage or unstage instantly.

[![npm version](https://img.shields.io/npm/v/lstage?color=black&style=flat-square)](https://www.npmjs.com/package/lstage)
[![npm downloads](https://img.shields.io/npm/dm/lstage?color=black&style=flat-square)](https://www.npmjs.com/package/lstage)
[![license](https://img.shields.io/npm/l/lstage?color=black&style=flat-square)](./LICENSE)
[![node](https://img.shields.io/node/v/lstage?color=black&style=flat-square)](https://nodejs.org)

---

I built lstage because I kept finding myself either staging everything with `git add .` when I only wanted a few files, or tediously typing out full file paths one by one. I wanted something that just shows me what's changed, lets me pick by number, and gets out of the way — so I built it.

---

## Install

```bash
npm install -g @ariian/lstage
```

---

## Usage

```bash
lstage
```

You'll see your unstaged and staged files in two numbered sections:

```
UNSTAGED
────────────────────────────────────────
 1  modified   src/components/Button.tsx
 2  modified   src/components/Modal.tsx
 3  untracked  src/utils/helpers.ts

STAGED
────────────────────────────────────────
-1  modified   README.md
-2  new file   src/index.ts

────────────────────────────────────────
Enter numbers: 1 2 3 to stage, -1 -2 to unstage, 1 3 -2 for both

> 1 2 -1
```

- Positive numbers → stage from the unstaged list
- Negative numbers → unstage from the staged list
- Mix freely: `1 2 3 -1 -2`

---

## How it works

```
1. you run      →  lstage
2. lstage reads →  git status --porcelain
3. lstage shows →  numbered list of unstaged + staged files
4. you type     →  1 3 -2
5. lstage runs  →  git add / git restore --staged
6. done         →  ✔ files staged or unstaged
```

---

## Requirements

- Node.js `>=18`
- A git repository

---

## License

MIT © [arii.dev](https://arii.dev)
