# mise owns the toolchain and runs every task

mise installs every tool that is not an npm package (Node, pnpm, agent-browser) and runs every task, on a development machine and in CI. The npm tooling (Biome, TypeScript, Vite, Vitest, dependency-cruiser, Content Collections) stays in `devDependencies`: `pnpm-lock.yaml` pins it exactly, and editors and Vite plugins find it in `node_modules`. One tool owns the versions and the commands, CI runs the same `check` task as a development machine, and a task's dependencies run once instead of once per script that needs them.

The config has three layers. `mise.toml` holds Node, pnpm and every task, for every environment. `mise.dev.toml` holds the tools only a development machine needs, and `.miserc.toml` makes `dev` the default environment. CI sets `MISE_ENV=ci`, which loads `mise.toml` only, so CI never downloads agent-browser's browser. The config files name a major version (a minor for a 0.x tool), and `mise.lock` and `mise.dev.lock` hold each exact version with its checksum. CI installs with `--locked`.

## Considered Options

- **`packageManager` as the pnpm pin**, which pnpm and `pnpm/action-setup` read, or mise reading it as an idiomatic version file: Node and pnpm would be pinned in different files, and pnpm would switch itself whenever the two pins differ.
- **`package.json` scripts as the task runner**: the npm convention, but scripts have no dependency graph. `pnpm check` ran `pnpm content` three times and ran the checks one after another.
- **One CI step per check**: shows the failing check in the GitHub UI, but lists the checks a second time next to the `check` task. `mise run --continue-on-error check` reports every failure in one step.
- **`node_modules/.bin` on PATH through `[env] _.path`**: shorter task commands, but it pins nothing that `pnpm exec` does not, and it puts every package binary ahead of other commands in the project folder.

## Consequences

- `package.json` has no `scripts` and no `packageManager`. A new task goes in `mise.toml`.
- A development machine needs only mise. The first `mise install` or `mise run` in a clone trusts the config, which `mise.dev.toml` needs because it sets a `postinstall` command.
- A tool only CI needs goes in a new `mise.ci.toml`, with its own `mise.ci.lock`.
