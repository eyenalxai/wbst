import { defineRailway, project, service } from "railway/iac"

export default defineRailway(() => {
  const web = service("web", {
    build: "bun run build",
    start: "cd apps/web && bun --bun dist/server/server.js",
    healthcheck: "/",
  })

  return project("wbst", {
    resources: [web],
  })
})
