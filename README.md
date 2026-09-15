# zakhmban-ui

Shared UI foundation for Zakhmban applications — `@zakhmban/ui`.

Repository **#3 of the 8** named in Frozen Technical Architecture v1.1 §2. It
ships design tokens, Persian/Jalali formatting, an icon abstraction, client-side
validation helpers, and exactly five primitives. It ships no product component,
no data fetching, no authentication, no routing, and no application-specific
string.

## Status

**Foundation.** The package, its toolchain and its architecture guards are in
place, and the first two capability areas have shipped. Every remaining
capability arrives in its own commit.

| Area                                                                    | State                          |
| ----------------------------------------------------------------------- | ------------------------------ |
| Package, TypeScript, ESLint, Prettier, Vitest, build, dist verification | in place                       |
| Formatting utilities (`./utils/format`)                                 | shipped                        |
| Validation helpers (root entry, ADR 0002)                               | shipped                        |
| Tokens · styles                                                         | not yet — released as `v0.1.0` |
| Icons · the five primitives                                             | not yet — released as `v0.2.0` |

Design values for the tokens are decided but **not implemented**. Where that
stands, precisely:

- The **scoped Token Foundation V1 baseline is signed off** — the approved
  values and semantic mappings are frozen.
- The **complete Token Table remains open**, partially ratified and **not
  signed off**, for every entry marked open, partial or deferred.
- **ADR 0003 is accepted**, fixing how the signed-off values are represented.
  Its **TypeScript public API correction is complete**, and the **final
  contract-readiness audit passed**.
- **`zakhmban-therapists` is the intended current consumer** — the active
  Therapist application. Its consumer relationship has been **audited**: it
  declares no `@zakhmban/ui` dependency yet, holds no local substitute and
  needs no legacy annotation. Integration waits for a published, tagged
  release.
- **`zakhmban-website` and `zakhmban-pwa` are other applications in the wider
  ecosystem**, not the Therapist consumer. Their Phase 1 design-system legacy
  annotations are **valid** and exist in **local, unpushed** documentation
  commits, but they are **outside the current Therapist gate**.
- The **Therapist consumer-scope correction and the final scoped readiness
  audit have both passed**, and **this documentation branch is approved for
  publication**.
- **Token Foundation implementation remains unauthorized** until this branch
  is merged and verified on `main`.
- **Token Foundation and Styles are not implemented.**
- **Nothing has been tagged or released.**

The record is `docs/architecture/token-table-ratification.md`, with precedence
in `docs/architecture/canonical-document-registry.md`.

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
import { normalizeIranianMobile, isValidIranianNationalId } from "@zakhmban/ui";
import {
  toPersianDigits,
  formatJalaliDate,
  formatToman,
  formatDuration,
  maskPhoneDisplay,
} from "@zakhmban/ui/utils/format";
```

One public entry with named exports only. No default export, and no deep import
into an internal path — path stability inside the package is not part of the
contract.

Declared subpaths, and what each ships today. The list below is the
`exports` map in `package.json`; `exports-contract.test.ts`, `root-export.test.ts`
and `format-export.test.ts` fail the build if either drifts.

| Subpath                     | Ships today                                                                                                        |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `@zakhmban/ui`              | `normalizeIranianMobile`, `isValidIranianNationalId` — the two ADR 0002 capabilities, and nothing else             |
| `@zakhmban/ui/utils/format` | `toPersianDigits`, `formatJalaliDate`, `formatToman`, `formatDuration`, `maskPhoneDisplay`, and their public types |

Reserved deep entries, declared by the commit that ships their files
(UI System Specification v0.2 §7). **None of these exists yet**, and nothing
behind them has been implemented:

| Subpath                               | Contents                                                                                                                         |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `@zakhmban/ui/styles`                 | token CSS and static styles                                                                                                      |
| `@zakhmban/ui/tokens`                 | Generated typed token object — one runtime export `tokens`, plus the `TokenName`, `TokenValue` and `Tokens` types (ADR 0003 §11) |
| `@zakhmban/ui/tokens/tailwind-preset` | Generated Tailwind v4 `@theme` CSS artifact, derived from the token CSS (ADR 0001, ADR 0003)                                     |

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

Precedence is stated in exactly one place — the canonical document registry.
Read it before citing any source below against another.

| Document                                                                                       | Role                                                                                               |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `docs/architecture/canonical-document-registry.md`                                             | **The single precedence statement.** Authority levels, supersessions of record, supersession rule. |
| `project-reference/architecture/ZAKHMBAN-V2-FROZEN-TECHNICAL-ARCHITECTURE-v1.1.md` (workspace) | Governs. §2, §2.1, §2.2.                                                                           |
| `project-context/` (workspace)                                                                 | Product truth.                                                                                     |
| `docs/architecture/token-table-ratification.md`                                                | The decision register — approved owner rulings, approved values, deferrals. Open and unsigned.     |
| `docs/architecture/zakhmban-ui-system-spec.md`                                                 | UI System Specification v0.2 — **canonical, superseded in part**. See the registry.                |
| `docs/adr/`                                                                                    | Accepted ADRs — representation, delivery and public contract.                                      |
| `ARCHITECTURE.md`                                                                              | What this repository decided, and where each rule lives. Subordinate to the registry.              |
