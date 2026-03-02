# Prototype

HCI course prototype built with React + Vite.

## Teammate Setup (After Clone)

This repo is pinned to Yarn `4.12.0` via `packageManager` in `package.json`.

1. Clone and enter the project:

```bash
git clone <repo-url>
cd Prototype
```

2. Install dependencies (no admin needed):

```bash
corepack yarn install
```

3. Start development server:

```bash
corepack yarn dev
```

## Optional: Enable Global `yarn` Command

If you want to use plain `yarn ...` instead of `corepack yarn ...`, run this once:

```bash
corepack enable
```

Note: On Windows, this may require opening PowerShell as Administrator.
If you see `EPERM: operation not permitted, open 'C:\Program Files\nodejs\yarn'`, use `corepack yarn ...` directly (steps above), or run `corepack enable` in an elevated terminal.

## Alternative (Without Corepack At All)

If you do not want to use Corepack, install Yarn globally first:

```bash
npm install -g yarn
yarn install
yarn dev
```

Note: Team-wide consistency is better with Corepack because it follows the Yarn version pinned in this repo.
