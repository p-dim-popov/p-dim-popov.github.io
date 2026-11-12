# Fully static: prerender every route with TanStack Start, no server runtime

Every route is prerendered to HTML at build time with TanStack Start, and GitHub Pages serves the result as static files. The HTML carries each page's full content, so pages read and navigate without JavaScript. After hydration, navigation is client-side. Nothing runs at request time.

## Considered Options

- **TanStack Router SPA with a hand-rolled prerender step:** reimplements what Start already does.
- **Start's SPA mode:** renders an empty shell that needs JavaScript before any content appears.

## Consequences

- No server functions. A `createServerFn` call requests `/_serverFn/…`, which returns 404 on a static host.
- Loaders run at build time and again in the browser on client-side navigation. Anything a loader reads, including Post bodies, ships in the client bundle.
- Unknown URLs are served `/404.html`, which is the router's own not-found render (the root route's `notFoundComponent`), prerendered at build time. Start's prerenderer only saves 200 responses, so a build-only `src/server.ts` relabels that one 404 response. The alternative, a literal `/404.html` route, also renders correctly, but every real 404 visit logs a hydration error: the HTML was rendered for that route while the browser's router matches the URL actually visited.
- A broken internal link fails the build, because the prerender crawler follows every link and stops on a 404.
