import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router"
import globalsCss from "@wbst/ui/globals.css?url"

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
