import globalsCss from "@acme/ui/globals.css?url"
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router"

const RootDocument = () => (
  <html lang="en">
    <head>
      <HeadContent />
    </head>
    <body className="min-h-svh antialiased">
      <Outlet />
      <Scripts />
    </body>
  </html>
)

const Route = createRootRoute({
  head: () => {
    return {
      meta: [
        { charSet: "utf8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "wbst" },
      ],
      links: [{ rel: "stylesheet", href: globalsCss }],
    }
  },
  component: RootDocument,
})

export { Route }
