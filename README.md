# wbst

wbst is a personal website. TanStack Start and React run the app, Tailwind and the
shadcn/ui components give it a design system, and Bun and Turborepo provide the
tooling.
[AGENTS.md](./AGENTS.md) is the operating manual, and [docs/adr](./docs/adr) holds
the decisions.

The site is intentionally bare: it renders one page that says `hello`. The blog
comes later, and the ui package already holds the full component set for it.

## Requirements

- Bun 1.4.2

## Quickstart

```bash
bun install
bun dev                # https://wbst.localhost via portless
```

`PORTLESS=0 bun dev` bypasses portless. Vite then serves `http://localhost:3000`.

## Checks

```bash
bun run check          # format, lint and typecheck every workspace
bun run build          # production build of the app
```

## Layout

| Workspace                    | Responsibility                                                    |
| ---------------------------- | ----------------------------------------------------------------- |
| `apps/web`                   | The TanStack Start app. It holds the routes and the browser code. |
| `packages/ui`                | The shadcn components and the design tokens. Browser-only.        |
| `packages/oxlint-config`     | The shared oxlint configuration.                                  |
| `packages/typescript-config` | The shared tsconfig presets.                                      |

## What wbst deliberately lacks

wbst holds no database, no auth, no server stack, no Effect, no oRPC and no
environment variables. A personal website and its future blog do not need them. A
feature that does need a server adds one; see
[ADR 0001](./docs/adr/0001-wbst-carries-no-server-stack.md).
