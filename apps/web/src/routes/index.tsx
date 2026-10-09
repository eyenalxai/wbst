import { createFileRoute } from "@tanstack/react-router"

const IndexPage = () => <h1>hello</h1>

const Route = createFileRoute("/")({
  component: IndexPage,
})

export { Route }
