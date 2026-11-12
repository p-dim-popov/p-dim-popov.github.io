# p-dim-popov.github.io

This repository is the source of the personal Site of Petar Popov, published at <https://p-dim-popov.github.io/>.

## The Site

The Site introduces its owner and publishes the owner's writing. It has these parts:

- **Home** (`/`) introduces the owner, leads to the rest of the Site and lists the latest Posts.
- **Blog** (`/_/blog/`) lists every Post, newest first. Each Post has its own page at `/_/blog/<slug>/`.
- **CV** and **Projects** come later.

The build prerenders every page to static HTML, and GitHub Pages serves the files. Each page shows its full content before any JavaScript runs, and links work with JavaScript off. After the first page loads, the router moves between pages in the browser, with no full page load. An unknown URL gets the Site's own not-found page, with HTTP status 404. The Site also publishes a `sitemap.xml` and a `robots.txt` for search engines.

## Architecture

The Site uses [TanStack Start](https://tanstack.com/start), React, Vite and Tailwind CSS v4. [`GLOSSARY.md`](GLOSSARY.md) defines the names of the parts of the Site, and the code uses the same names. The decision records in [`docs/adr/`](docs/adr/) give the reasons behind each choice below:

| ADR                                                       | Decision                                                                      |
| --------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [0001](docs/adr/0001-root-site-with-underscore-prefix.md) | Serve the Site from the domain root, with every page but Home under `/_/`.    |
| [0002](docs/adr/0002-fully-static-prerendered-site.md)    | Prerender every route at build time. Run no server.                           |
| [0003](docs/adr/0003-platform-feature-modulith.md)        | Split the code into platform and feature modules, with no shared code folder. |
| [0004](docs/adr/0004-tailwind-over-panda.md)              | Use Tailwind CSS v4 instead of Panda CSS.                                     |

### URLs

GitHub Pages serves the Site at the root of `p-dim-popov.github.io`. The owner's other repositories publish their own GitHub Pages sites at `/<repo>/` on the same origin, and one of them is named `blog`. To stay clear of them, every URL other than Home and the files that crawlers expect at the root starts with `/_/`. The built assets are under `/_/assets/`. Every URL ends with `/`, because GitHub Pages serves each page as a directory index.

### Rendering

TanStack Start prerenders every route at build time and follows every internal link it finds. A broken internal link, a route error or a Post with invalid frontmatter stops the build. Route loaders run at build time and again in the browser, so all data that a loader reads ships to the browser. The not-found page is the router's own not-found render, saved as `404.html`.

### Modules

```text
src/
├── platform/
│   ├── design-system/   design tokens and generic UI primitives
│   └── site/            the Site's identity, document shell, head tags, nav, footer and not-found page
├── features/
│   ├── home/            Home
│   └── blog/            the Blog, with each Post as a Markdown file in posts/
├── routes/              file routes that connect each URL to a feature
├── router.tsx           the router
└── server.ts            the build-time server entry that saves 404.html
```

- **Platform modules** give capabilities to the features and know nothing about them. `design-system` imports no other module.
- **Feature modules** each own one part of the Site, including its layout. A feature can import platform modules and the public API of other features. Imports form no cycles.
- **Public API.** A module's `index.ts` is its only public surface. Other modules import it as `#platform/<name>` or `#features/<name>`.
- **Routes** only connect a URL to a loader, a head and a page component from a module's public API.
- **No shared code folder.** There is no `shared/`, `utils/` or `lib/`. Each piece of code lives in the module that it serves.

[dependency-cruiser](https://github.com/sverweij/dependency-cruiser) checks these rules on every pull request.

### Styling

`design-system` declares every design token and the values of the one theme. It removes the default Tailwind theme, so only these tokens produce utilities. Biome rejects arbitrary Tailwind values such as `p-[3px]` outside `design-system`.

### Posts

A Post is a Markdown file in `src/features/blog/posts/`. [Content Collections](https://www.content-collections.dev/) validates its frontmatter at build time, and `@tanstack/markdown` renders its body. Pages that only list Posts load no Post bodies.

## Development

Install [mise](https://mise.jdx.dev/) and pnpm. mise supplies the Node version in `mise.toml`. pnpm switches itself to the version in the `packageManager` field of `package.json`.

```sh
mise install       # install Node
pnpm install       # install the dependencies
pnpm dev           # start the development server
pnpm check         # run the pull-request checks: types, Biome, module boundaries, Vitest, build
pnpm build         # prerender the Site into dist/client/
pnpm serve:pages   # serve dist/client/ the way GitHub Pages does (port 4173)
```

[`AGENTS.md`](AGENTS.md) gives the full architecture rules, every command, the toolchain notes and the steps to check a change in a browser. Coding agents and people can both follow it.

## CI and deployment

- On every pull request, the `CI` workflow ([`ci.yml`](.github/workflows/ci.yml)) runs the same checks as `pnpm check`.
- On every push to `main`, the `Deploy` workflow ([`deploy.yml`](.github/workflows/deploy.yml)) prerenders the Site and publishes `dist/client/` to GitHub Pages.

## License

The code and the content have different terms:

- **Code:** the [MIT License](LICENSE).
- **Content:** all rights reserved. The content is the Posts, the CV text, the Project write-ups and all images.

[`LICENSE`](LICENSE) lists the exact paths of the content and gives the full terms.
