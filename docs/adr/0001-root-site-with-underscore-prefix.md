# Serve the Site from the user-site root, everything but Home under `/_/`

The Site is published from the `p-dim-popov.github.io` repo, so it is served at the domain root. Other repos on the same account publish GitHub Pages at `/<repo>/` on the same origin (one of them is named `blog`), so any Site URL could collide with a future repo. Every Site URL except the few that must sit at the root therefore lives under `/_/`, a segment no repo is expected to take. At the root: `/` (Home), `/sitemap.xml`, `/robots.txt`, `/404.html` and `/favicon.ico`. Under `/_/`: every other route, the built assets (`/_/assets/`) and the other public files.

## Considered Options

- **Custom domain:** removes the collisions entirely, but costs a domain. It stays open for later.
- **Source in one repo, build pushed to the `.github.io` repo:** keeps the profile-README repo name, but needs two repos and a deploy token.
- **Project-site subpath (`/p-dim-popov/`):** not a landing page.

## Consequences

- In file-based routes the segment is written `[_]`, because a bare leading `_` means a pathless layout.
- All URLs end with `/` (router `trailingSlash: 'always'`). GitHub Pages redirects `/x` to `/x/` for directory pages, so links without the slash would each cost a redirect hop and appear twice in the sitemap.
- The account's profile-README slot (a repo named `p-dim-popov`) is freed by the rename and can be recreated as a separate repo.
