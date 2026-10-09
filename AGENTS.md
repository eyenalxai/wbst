# wbst

wbst is a personal website. The site renders one page that says `hello`; the blog
comes later. The ui package holds the full component set on purpose; the trim
happens after the blog. See [docs/adr](./docs/adr) for decisions.

## Agent skills

### Issue tracker

Issues live in Linear, driven with the `rata` CLI. Every issue must carry a
priority and be assigned to the authenticated user. Wayfinder children are the
exception: the claim step assigns them. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary: `needs-triage`, `needs-info`,
`ready-for-agent`, `ready-for-human`, `wontfix`. See
`docs/agents/triage-labels.md`.

### Domain docs

Single-context layout: one `GLOSSARY.md` at the repo root plus ADRs in
`docs/adr/`. See `docs/agents/domain.md`.

## Working agreement

- **Use subagents.** Split independent tasks across subagents and run them in
  parallel. Do not serialize work that can run at the same time.
- **Change code in a rift.** `rift create --name <change>` makes the worktree and
  the `rift/<change>` branch. Commit the work there. When it is ready, rebase the
  rift onto `main`, bring the rift back into `main` with a fast-forward, then push. Never
  make a merge commit. Rift runs `bun install --frozen-lockfile` at creation. For a new
  dependency, run plain `bun install` and commit `bun.lock`.
- **Load the skills that match the task.** Load `grill-with-docs` and
  `domain-modeling` to sharpen a plan. Load the design, UI and shadcn skills
  for interface work.
- **No backwards compatibility.** Refactor when the long-term design needs it.
  Optimize for long-term maintenance and follow best practice.
- **Use Bun** for every command and script.
- **Place each file where it belongs.** Utilities go in `lib`, components in
  `components`. Follow the existing folder structure.
- **Read the source before you guess an API.** Search these checkouts:

| Library                   | Path                               |
| ------------------------- | ---------------------------------- |
| TanStack docs             | `~/Projects/other/tanstack-docs`   |
| TanStack Start and Router | `~/Projects/other/tanstack-router` |
| Turborepo docs            | `~/Projects/other/turborepo`       |
| oxlint and oxfmt source   | `~/Projects/other/oxc`             |
| Rift                      | `~/Projects/other/rift`            |

## Commands

```bash
bun install
bun run check               # format + lint + typecheck, every workspace
bun dev                     # web at https://wbst.localhost via portless
PORTLESS=0 bun dev          # bypass portless; Vite serves http://localhost:3000
bun run build               # production build

# Several tasks in one workspace. `--sequential` is required. Without it, Bun
# forwards the extra task names as CLI arguments to the first script.
bun run --filter @wbst/ui --sequential tsc lint format
```

## Layout

| Workspace                    | Responsibility                                                    |
| ---------------------------- | ----------------------------------------------------------------- |
| `apps/web`                   | The TanStack Start app. It holds the routes and the browser code. |
| `packages/ui`                | The shadcn components and the design tokens. Browser-only.        |
| `packages/oxlint-config`     | The shared oxlint configuration.                                  |
| `packages/typescript-config` | The shared tsconfig presets.                                      |

## Non-negotiables

- **No barrel files and no re-exports.** `oxc/no-barrel-file` is an error for barrel files. Import
  from the concrete module; do not re-export. A package exposes the modules that its consumers
  may import, so `@wbst/ui/lib/utils` resolves to `packages/ui/src/lib/utils.ts`.
- **No default exports.** `import/no-default-export` is an error. The only exceptions are oxlint config
  files and TanStack Start entry points.
- **Named exports only.** `import/no-default-export` plus `import/exports-last` and `import/group-exports`
  mean one export block at the bottom of the file.
- **`verbatimModuleSyntax` is off in `apps/web` only.** TanStack Start's build docs warn that it can cause
  server bundles to leak into client bundles. Every other workspace keeps it on, so write `import type`
  explicitly there too. It is a correctness habit, not a compiler requirement.
- **No relative parent imports.** `import/no-relative-parent-imports` is an error. Use the package's own
  `#` subpath imports (for example `#components/*` in `@wbst/ui`) or the `@wbst/*` package specifiers.
- **Do not suppress lint rules.** If a rule genuinely cannot apply, say so in your summary and let the
  maintainer decide. Never add `oxlint-disable` silently.
- **Never suppress an error.** Do not swallow a failure. Only the maintainer can allow an exception.
- **Never access `process.env`.** `node/no-process-env` is an error.
- **No comments** unless they answer a hard "why is it this way?" question.
- **Write documentation and comments in Simplified Technical English.** All documentation and code comments
  use ASD-STE100 Simplified Technical English: short sentences, active voice, one term for one concept.
- **No tests** unless they cover really tricky logic where a subtle bug is hard to catch by hand.

## UI components

The shadcn CLI generates `packages/ui` (`bun run --filter @wbst/ui ui -- add <name>`) against the `base-nova`
style on Base UI. You then fix the output by hand. Two post-steps are necessary on every `add`, because the
registry is written for Next.js:

1. **Repair `cn` imports.** shadcn 4.21.0 writes `import { cn } from "cn"` and installs the unrelated npm
   package `cn`. Every import must become `from "#lib/utils"`. Remove the `cn` dependency from
   `packages/ui/package.json`. Do this in the same commit as the `add`.
2. **Strip `"use client"`.** There is no RSC boundary in this app. The directive is dead code that only
   produces a bundler warning.

`packages/ui/src/components/**` is excluded from oxlint, so generated files are not linted. Composing them
correctly is a review responsibility, not a lint one.

Theming follows the operating system, and there is no toggle by decision. The dark tokens are in a
`@media (prefers-color-scheme: dark)` block, nothing sets a `dark` class, and no theme script runs before
paint. `color-scheme: light dark` on `:root` makes native controls follow the same setting.

`globals.css` scans an explicit `@source` list, not the whole package. A component that you add with the CLI
therefore renders unstyled until you name it there. The list names exactly the components that the app can reach.

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->
