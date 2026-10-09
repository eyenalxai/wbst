# wbst carries no server stack by design

wbst started as a copy of the acme working tree. The starter carries a whole
server stack: a database, auth, oRPC, Effect, varlock environment machinery and a
worked example feature. wbst is a personal website. It keeps the app shell, the
ui package and the tooling, and it drops the server stack whole. Dead
infrastructure costs maintenance: versions to track, secrets to manage, services
to run and code to keep correct. The site needs none of it.

A feature that needs a server adds one at that time. The feature picks its own
stack and does not restore the removed one by default. The blog is the next
feature, and it may stay static. If it needs a server, it carries its own
decision.

## Consequences

- No database, no auth, no Effect, no oRPC and no environment machinery exist in
  the repository.
- `apps/web` holds no server routes.
- The site serves one page, `hello`.
- `bun run check` and `bun run build` cover the whole repository, with no service
  to start first.
