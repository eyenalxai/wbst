import { createFileRoute } from "@tanstack/react-router"

const IndexPage = () => (
  <>
    <h1>hello</h1>
    <ul>
      <li>
        <a className="underline" href="https://github.com/eyenalxai/rata">
          rata
        </a>
      </li>
      <li>
        <a className="underline" href="https://github.com/eyenalxai/vingroto">
          vingroto
        </a>
      </li>
    </ul>
  </>
)

const Route = createFileRoute("/")({
  component: IndexPage,
})

export { Route }
