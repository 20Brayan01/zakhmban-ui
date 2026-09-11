# zakhmban-ui

Shared UI foundation for Zakhmban applications — `@zakhmban/ui`.

Repository **#3 of the 8** named in Frozen Technical Architecture v1.1 §2. It
ships design tokens, Persian/Jalali formatting, an icon abstraction, client-side
validation helpers, and exactly five primitives. It ships no product component,
no data fetching, no authentication, no routing, and no application-specific
string.

## Status

**Foundation only.** This commit establishes the package, its toolchain and its
architecture guards. The public surface is intentionally empty; every capability
arrives in its own commit.

| Area                                                                    | State                          |
| ----------------------------------------------------------------------- | ------------------------------ |
| Package, TypeScript, ESLint, Prettier, Vitest, build, dist verification | in place                       |
| Tokens · styles · formatters · validation                               | not yet — released as `v0.1.0` |
| Icons · the five primitives                                             | not yet — released as `v0.2.0` |

## Consumption

The package is installed as an external dependency pinned to an **exact git
tag**, never a range, never `workspace:`, never `file:` or `link:`.

```jsonc
"dependencies": {
  "@zakhmban/ui": "github:20Brayan01/zakhmban-ui#v0.1.0"
}
```

`dist/` is committed and nothing builds during a consumer's install — the two
rules are a pair, and neither works without the other. `pnpm install
--frozen-lockfile` pins the resolved commit SHA, so a re-pointed tag surfaces as
a lockfile diff rather than a silent change of artifact.

Two things bite on first integration:

- **Use the HTTPS `github:` form.** A developer configured for SSH produces a
  `git+ssh://` lockfile entry that differs from CI's. Standardise on
  `github:` plus a credential helper or `git config url."https://…".insteadOf`.
- **Private-repository access in CI and Docker.** CI authenticates with a
  fine-grained token (contents: read) via `insteadOf`. In a Docker build the
  token must arrive as a BuildKit secret (`RUN --mount=type=secret`), never as
  `ARG` or `ENV` — both persist in image history.

## Public API

```ts
import {} from /* nothing yet */ "@zakhmban/ui";
```

One public entry with named exports only. No default export, and no deep import
into an internal path — path stability inside the package is not part of the
contract.

Reserved deep entries, declared by the commit that ships their files
(UI System Specification v0.2 §7):

| Subpath                               | Contents                                                               |
| ------------------------------------- | ---------------------------------------------------------------------- |
| `@zakhmban/ui/styles`                 | token CSS and static styles                                            |
| `@zakhmban/ui/tokens`                 | generated typed token object                                           |
| `@zakhmban/ui/tokens/tailwind-preset` | Tailwind theme object, generated from the token CSS                    |
| `@zakhmban/ui/utils/format`           | Jalali dates, Persian numerals, Toman, duration, phone display masking |

## Development

```bash
pnpm install
```

| Command             | Purpose                                                  |
| ------------------- | -------------------------------------------------------- |
| `pnpm lint`         | ESLint, including the structural boundary rules          |
| `pnpm typecheck`    | `tsc --noEmit` across source, tests and config           |
| `pnpm test`         | Vitest — the architecture suite in `tests/architecture/` |
| `pnpm build`        | `tsc` into `dist/`. No bundler.                          |
| `pnpm verify:dist`  | Rebuilds and fails if the committed artifact differs     |
| `pnpm format:check` | Prettier, check only                                     |

Run `pnpm build` and commit the result with any source change. Never hand-edit
`dist/`, and resolve a `dist/` merge conflict by rebuilding rather than by hand.

## Sources of truth

| Document                                                                                       | Role                                                                   |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `project-reference/architecture/ZAKHMBAN-V2-FROZEN-TECHNICAL-ARCHITECTURE-v1.1.md` (workspace) | Governs. §2, §2.1, §2.2.                                               |
| `docs/architecture/zakhmban-ui-system-spec.md`                                                 | UI System Specification v0.2 — tokens, components, RTL, accessibility. |
| `ARCHITECTURE.md`                                                                              | What this repository decided, and where each rule lives.               |
