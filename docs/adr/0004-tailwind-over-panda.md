# Tailwind CSS v4 instead of Panda CSS

Styling uses Tailwind CSS v4. Panda CSS was the first pick, but Hallmark, the design workflow, works natively with Tailwind and plain CSS:

- It writes its tokens as CSS custom properties into Tailwind's `@theme`.
- Its linter reads Tailwind class strings and `tv()` calls statically. It cannot read Panda's `css({...})` objects, so with Panda its checks would only run against a rendered page.
- Panda would also need a preset that maps every Hallmark token into Panda's token system.

The trade-off is that token strictness becomes a lint-time check instead of a type-time one. The default palette is removed, so only declared tokens produce utilities, and arbitrary `[...]` values are banned outside `design-system`.

## Consequences

- `design-system` owns every token name and value. Primitives and features read tokens by name only.
- Per-part looks (for example, the Blog styled differently from Projects) are possible later, but we start with one theme. Token values live in one place, so a named theme can be added later as a scoped override set (`[data-theme]`) that a feature's layout selects. This needs no change to primitives.
