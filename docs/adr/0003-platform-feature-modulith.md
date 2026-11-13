# Platform/feature modulith with no shared code bucket

Code is split into **platform** modules (`src/platform/*`) and **feature** modules (`src/features/*`).

- **Platform modules** are capabilities that features build on and that know nothing about any feature: `design-system` (generic UI and all design tokens) and `site` (the Site's identity, URL scheme, chrome building blocks and head composition).
- **Feature modules** each own one part of the Site: `home`, `blog`, and later `cv` and `projects`.

There is no `shared/`, `utils/` or `lib/` folder. Every piece of code lives in the module whose meaning it serves.

## Rules

- A module's only public surface is its `index.ts`, which uses named re-exports only. Other modules import it through `#platform/<name>` or `#features/<name>`.
- Features may import platform modules and other features' public APIs, with no cycles.
- Platform modules never import features. `design-system` imports no other module.
- `src/routes/` and `src/router.tsx` are TanStack Start's defaults and form the composition root. A route file only wires a path, a loader, `head()` and a component from a feature. Nothing imports route files.
- The root route renders the document only. Each part of the Site owns its layout, so Home can look entirely different from the Blog. `site` provides optional chrome building blocks plus the nav entries, which are assembled once in the root route from each feature's exported entry. This lets a feature's nav list other features without importing them.
- Boundaries are checked on resolved file paths by dependency-cruiser. Biome's import rules match import strings, so they miss relative imports that cross modules.
