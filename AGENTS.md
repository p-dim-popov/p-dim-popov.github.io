## Agent skills

### Issue tracker

Issues live in GitHub Issues on `p-dim-popov/p-dim-popov.github.io`, managed with the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: each label string matches its role name (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Architecture

The Site is prerendered with TanStack Start and served as static files by GitHub Pages. Name things with the terms in `GLOSSARY.md`. The reasons behind each rule are in `docs/adr/`; ADR 0003 is the source of truth for modules.

- **Modules.** Platform modules live in `src/platform/<name>/` (`design-system`, `site`), feature modules in `src/features/<name>/` (`home`, `blog`, later `cv` and `projects`). Each piece of code lives in the module whose meaning it serves. There is no shared, utils or lib folder.
- **Public API.** A module's `index.ts` is its only public surface and holds named re-exports only. Other code imports it as `#platform/<name>` or `#features/<name>`.
- **Dependency direction.** Features import platform modules and other features' public APIs. Platform modules import no features. `design-system` imports no other module. Imports form no cycles.
- **Composition root.** `src/routes/`, `src/router.tsx` and `src/server.ts`. A route file wires a path, a loader, `beforeLoad`, `head()` and a component from a module's public API, with no markup or logic of its own. Only the generated route tree imports route files. The root route renders the document only, and each part of the Site owns its layout.
- **URLs.** Home is `/`. Every other page, the assets and every other public file live under `/_/`, written `[_]` in route paths (a bare leading `_` is a pathless layout). Every URL ends with `/` (ADR 0001).
- **Static only.** The Site has no server runtime, so server functions 404. Loaders run at build time and again in the browser, so whatever a loader reads ships in the client bundle (ADR 0002).
- **Not-found.** URLs that match no route reach not-found on their own; a route whose param matches nothing (an unknown Post slug) throws `notFound()`. The root route's not-found component is the one not-found page, and the build saves it as `404.html` through `src/server.ts` (ADR 0002 explains why a `/404` route breaks hydration).
- **Styling.** Tailwind CSS v4 (ADR 0004). `src/platform/design-system/tokens.css` declares every token with the one theme's values. The default theme is removed, so only those tokens produce utilities. Other modules style only through `design-system`'s primitives and token utilities, and each part of the Site lays out its pages with token utilities on its own elements. Biome's `nursery/noTailwindArbitraryValue` fails lint on an arbitrary `[...]` value outside `design-system`. It reads only `className`/`class` attributes and class helpers such as `clsx()`, so keep class strings there, not in plain variables.
- **Posts.** A Post is a Markdown file, `src/features/blog/posts/<slug>.md`, loaded with Content Collections (`src/features/blog/content-collections.ts`) and rendered with `@tanstack/markdown`. Its frontmatter is `title`, `description` and `publishedOn` (`YYYY-MM-DD`). A missing or invalid key, or any other key, fails the build. The body's headings start at `##`, because the title is the page's `<h1>`. `blog`'s public API keeps summaries (`postSummaries`, newest first) apart from bodies: the Post route's loader imports the bodies on demand, so a page that lists Posts never ships one.
- **Content and license.** Posts, CV text, Project write-ups and images are content, all rights reserved. Every other file is code under MIT. `LICENSE` draws the line by path, so keep content in files of its own, never inside code files. A change that puts content in a new place adds that path to the content list in `LICENSE`.
- **Nav.** Each feature exports its nav entry (`<feature>NavEntry`: a label and a route path) from its `index.ts`, and the root route lists them once, in nav order, in `createSiteDocument({ nav })`. That shell provides them to every page, the not-found page included. A layout reads them with `useNavEntries()` or renders `site`'s optional `SiteNav` and `SiteFooter`, so no feature imports another just to link to it. A new part of the Site exports its entry and adds it to the list in `src/routes/__root.tsx`. Typecheck rejects an entry whose path matches no route or lacks the trailing slash.
- **Head and sitemap.** A page's own route returns `pageHead()` from `#platform/site` in `head()`, which sets the title, description, canonical URL and Open Graph tags. The root route's head holds document-wide tags only: the router does not deduplicate links, so a canonical URL there would appear twice. Start's sitemap lists every static route that has a component and every link the prerender crawls, so a dynamic page (a Post) is listed once a prerendered page links to it. The `pages` entries in `vite.config.ts` keep `/_/` and not-found out.

`mise run boundaries` (dependency-cruiser) enforces the import rules; each error names the rule and how to fix it.

## Commands

mise installs the toolchain and runs every task (ADR 0005). First run: `mise install`. It installs Node and pnpm, and on a development machine also agent-browser and the browser it drives. Each task installs the npm dependencies first when `package.json`, `pnpm-lock.yaml` or `pnpm-workspace.yaml` has changed. `mise tasks ls` lists every task.

- `mise run check` runs what the pull-request workflow runs: `typecheck`, `lint` (Biome), `boundaries`, `test` (Vitest) and `build`, in parallel. It stops at the first failure; `mise run --continue-on-error check` reports every failure, as CI does. Run it before you call a change done.
- `mise run format` applies Biome's formatting and import order.
- `mise run content` validates every Post's frontmatter and generates the `content-collections` module into `src/features/blog/.content-collections/` (git-ignored). `typecheck`, `boundaries` and `build` depend on it, so each works on a fresh checkout. It is skipped when neither the Posts nor its config has changed.
- `mise run build` prerenders the Site into `dist/client/`. Invalid frontmatter, a broken internal link (in a Post too) or a failing route fails it.
- `mise run serve:pages <port>` serves `dist/client/` the way GitHub Pages does (see below). The port defaults to 4173.
- `mise run dev` starts the development server.

Toolchain gotchas:

- mise reads three files. `mise.toml` holds Node, pnpm and every task, for every environment. `mise.dev.toml` holds the tools only a development machine needs (agent-browser), and `.miserc.toml` makes `dev` the default environment. CI sets `MISE_ENV=ci`, so it loads `mise.toml` only. A CI-only tool goes in a new `mise.ci.toml`.
- `mise.toml` and `mise.dev.toml` name a major version (a minor for a 0.x tool). `mise.lock` and `mise.dev.lock` hold the exact versions and checksums for `linux-x64`. `mise upgrade` moves them within the major. After you edit a version, run `mise lock --platform linux-x64` (add `-E ci` once `mise.ci.toml` exists) and commit the lockfiles. CI installs with `--locked`, so a tool missing from a lockfile fails it.
- Tasks live in `mise.toml`, and mise pins pnpm, so `package.json` has no `scripts` and no `packageManager`. Tasks call package binaries with `pnpm exec <bin>`.
- In a new clone or worktree, run `mise install` first: it trusts the project's mise config and installs the tools. Until then, an activated shell warns that `mise.dev.toml` is not trusted.
- `src/routeTree.gen.ts` is generated from `src/routes/` by `mise run build` and `mise run dev`. Commit it and leave it unedited. After adding or renaming a route file, run `mise run build` before `mise run typecheck`.
- TypeScript stays on 6.x: dependency-cruiser reads `.ts` files through the TypeScript compiler API, which TypeScript 7 does not ship.
- Biome is pinned to an exact version: the arbitrary-value rule is a nursery rule, and nursery rules can change in any release. Upgrade Biome on purpose and re-check that the rule still fires.
- Build with `mise run build`, not a bare `vite build`. The Content Collections Vite plugin fails on invalid frontmatter only when `NODE_ENV` is `production`; `mise run content`, which `build` depends on, fails whatever `NODE_ENV` is.
- `package.json` declares `"sideEffects": ["**/*.css"]`, so the bundler drops the unused re-exports of a module's `index.ts`. Without it, every page shipped the Markdown renderer. A file that must run only for its side effects needs an entry there.
- `pnpm-workspace.yaml` approves esbuild's install script (`allowBuilds`), which Content Collections needs. pnpm fails the install on a dependency whose build script is not approved.
- Biome formats Markdown, and `markdown.parser.frontmatter` keeps it from rewriting a Post's frontmatter as a heading.
- Tests go in `src/**/*.test.ts(x)` and cover generic logic through a module's public API. Content, configuration, navigation and framework behaviour get no tests; the build and the browser check cover them.

## Verifying in a browser

Verify what ships: the prerendered build, served the way GitHub Pages serves it. `mise run dev` has no `404.html` and no Pages redirects, so it can't stand in.

Parallel agents share one machine, so each agent uses its own port and its own agent-browser sessions. Derive both from your issue number N: port `43N0` (issue #12 → `43120`) and sessions `t<N>-1`, `t<N>-2`, ….

1. Run `mise run build`, then `mise run serve:pages 43N0` in the background. It serves the last build, so rebuild after every change.
2. Check status codes with `curl -s -o /dev/null -w '%{http_code}\n' <url>`: real pages give 200, unknown URLs (at the root and under `/_/`) give 404, and a URL without its trailing slash gives 301.
3. Open each URL in a **fresh** session. agent-browser keeps page errors across navigations within one session, so a reused session blames a page for an earlier page's errors.

   ```sh
   agent-browser --session t<N>-<k> open http://localhost:43N0/<path>/
   agent-browser --session t<N>-<k> get text main
   agent-browser --session t<N>-<k> errors
   ```

   Any output from `errors` is a page error. A hydration mismatch shows up as `Minified React error #418`; `errors --json` prints the full text.
4. To confirm a page hydrated, click an internal link, then run `network requests`. A hydrated page fetches only `/_/assets/` scripts; a `(Document)` request means a full page load.
5. To check a page with JavaScript off, open it in a new session launched with `--args "--blink-settings=scriptEnabled=false"`. Content must read, and links must navigate with full page loads.
6. When done, run `agent-browser --session t<N>-<k> close` for each session and stop the server.

The check is done when every URL you touched shows the expected content, returns the expected status, and prints nothing from `errors`.
