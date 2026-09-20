# zakhmban-ui

Shared UI foundation for Zakhmban applications — `@zakhmban/ui`.

Repository **#3 of the 8** named in Frozen Technical Architecture v1.1 §2. It
ships design tokens, Persian/Jalali formatting, an icon abstraction, client-side
validation helpers, and exactly five primitives. It ships no product component,
no data fetching, no authentication, no routing, and no application-specific
string.

## Status

**Foundation.** The package, its toolchain and its architecture guards are in
place, and the first three capability areas have shipped. Every remaining
capability arrives in its own commit.

| Area                                                                     | State                                                                     |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| Package, TypeScript, ESLint, Prettier, Vitest, build, dist verification  | in place                                                                  |
| Formatting utilities (`./utils/format`)                                  | shipped                                                                   |
| Validation helpers (root entry, ADR 0002)                                | shipped                                                                   |
| Token Foundation V1 (`./tokens`, `./tokens/tailwind-preset`, `./styles`) | shipped — merged and verified on `main`; allocated **v0.1.0**, unreleased |
| Styles                                                                   | not yet — allocated `v0.2.0`                                              |
| Icons · the five primitives                                              | not yet — allocated `v0.3.0`                                              |
| Phase 6 · Harden (v0.2 §8)                                               | not yet — target `v1.0.0`, unchanged                                      |

**Token Foundation V1 is merged and verified on `main`**, through pull
request #7. The final implementation audit closed both blocking findings —
the **Typography Alias contract gap**, settled by the Typography Alias Ruling
of 2026-09-19, and the **authorization contradiction**, settled by the
implementation authorization of the same date.

**The release model is owner-triggered automated tagging** (Owner Release
Model Ruling, 2026-09-20). The owner starts the release workflow manually
with a version and an exact `main` SHA; the workflow validates that commit in
full and **only then** creates and pushes the tag. The same run then reads
the pushed ref back and proves it is annotated and points at the validated
commit. A separate tag-triggered mode validates tags pushed by hand — that
mode is **verification, not prevention**: the tag exists before it runs.

**The release sequence is allocated** (Token Foundation v0.1.0
Release-Sequence Ruling, 2026-09-20): **Token Foundation v0.1.0**, **Styles
v0.2.0**, **Icons and the five primitives v0.3.0**, with **v1.0.0** remaining
the Phase 6 target. The earlier roadmap numbers were placeholders in this
table; they were never ADR-frozen and bound no consumer.

**Version `0.1.0` is prepared locally on `chore/token-foundation-v0.1.0`.**
It is not merged. **Tag `v0.1.0` does not exist**, the release workflow has
**never been run**, **no GitHub Release exists**, **no package has been
published**, and **no consumer integration has begun**. The package remains
private. The first real release-workflow execution will be its first
end-to-end runtime proof.

**Styles, icons and components have not begun.**

Where the design values stand, precisely:

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
- **Token Foundation V1 is implemented** — seven authored token files, the
  generated typed object and Tailwind artifact, and the three public
  subpaths. **Styles is not implemented**: no `@font-face`, no font binary,
  no static styles, no keyframes.
- The **Typography Alias Ruling** (2026-09-19) fixes each of the eight
  typography aliases as a **Semantic Typography Size Alias**, authored
  `--text-<step>: var(--text-<step>-size)`. It changed no identifier, no
  value and no count, and required no correction to the implementation.
- **Implementation and publication authorizations are recorded canonically**
  (2026-09-19 and 2026-09-20), and sign-off condition 3 is discharged.
- **Nothing has been tagged or released**, no package has been published, and
  no consumer repository has been changed.
- **`pnpm smoke:tailwind` is a required gate in the pre-tag and post-tag
  validation modes**, guarded by `release-gate.test.ts`. ADR 0001's obligation was already
  discharged by the implementing commit; the workflow makes the proof
  repeatable and, in the manual mode, genuinely pre-tag.
- **The first tag needs three things**: this branch reviewed and merged, a
  separate owner-reviewed version-bump pull request, and the owner starting
  the workflow with the approved version and SHA.

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

| Subpath                               | Ships today                                                                                                                          |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `@zakhmban/ui`                        | `normalizeIranianMobile`, `isValidIranianNationalId` — the two ADR 0002 capabilities, and nothing else                               |
| `@zakhmban/ui/utils/format`           | `toPersianDigits`, `formatJalaliDate`, `formatToman`, `formatDuration`, `maskPhoneDisplay`, and their public types                   |
| `@zakhmban/ui/styles`                 | The stylesheet entry point of v0.2 §2. At Token Foundation it carries the token CSS and nothing else — static styles are Styles work |
| `@zakhmban/ui/tokens`                 | Generated typed token object — one runtime export `tokens`, plus the `TokenName`, `TokenValue` and `Tokens` types (ADR 0003 §11)     |
| `@zakhmban/ui/tokens/tailwind-preset` | Generated Tailwind v4 `@theme` CSS artifact, derived from the token CSS (ADR 0001, ADR 0003)                                         |

These four are the whole of the public surface. There is no fifth subpath and
no `@zakhmban/ui/fonts`: font binaries are internal assets referenced by
package CSS, and a consumer never deep-imports one.

## Tokens

118 public tokens: 48 colour, 36 typography, 8 spacing, 5 radius, 3 elevation,
6 motion, 1 font, 8 geometry and 3 layering. The raw palette, the eight `--_`
sources and `--radius-checkbox` are package-internal and reach no public
artifact. `--radius-pill` is a named role with **no approved literal** and is
deliberately not implemented.

The authored CSS custom properties under `src/tokens/` are the single source
of truth; the typed object and the Tailwind artifact are generated from them
by `scripts/generate-tokens.mjs` and are never authored. `pnpm build` runs the
generator, and `node scripts/generate-tokens.mjs --check` fails the build if a
generated artifact has been hand-edited.

**Every consumer imports the stylesheet once, at the application root**, and
gets every token:

```css
@import "@zakhmban/ui/styles";
```

**At v0.1.0 that import provides the approved token custom properties and
nothing else.** It does **not** yet provide font delivery, `@font-face`,
reset styles, global body rules, focus styles or the overlay-root technique.
Those are **Styles**, which is unimplemented and allocated **v0.2.0**.
**Styles is not included in v0.1.0.**

**A Tailwind v4 consumer adds the `@theme` artifact, and the order is the
contract.** A `@theme` layer imported before the custom properties it
references, or before Tailwind itself, fails quietly with unstyled output:

```css
@import "tailwindcss";
@import "@zakhmban/ui/styles";
@import "@zakhmban/ui/tokens/tailwind-preset";
```

The artifact resets the namespaces it owns, so no unapproved Tailwind default
resolves: no `bg-purple-500`, no `rounded-xl`, no `ease-in-out`, and no
spacing step outside the closed scale. **The spacing utilities agree with
stock Tailwind at `p-1`–`p-6` and deliberately diverge at `p-7` (32px, not
28px) and `p-8` (40px, not 32px)** — those are the approved scale's seventh
and eighth steps.

Durations, the press scale, the stacking roles and control geometry have no
Tailwind namespace and are reached through the custom property —
`duration-[var(--duration-base)]`, `z-[var(--z-chrome)]`,
`h-[var(--control-height-input)]`. `z-10`, `z-20` and `z-30` happen to equal
the approved stacking integers today; that coincidence is not a contract and
must not be used in their place.

Values are read in script through the typed object:

```ts
import { tokens } from "@zakhmban/ui/tokens";
import type { TokenName, TokenValue, Tokens } from "@zakhmban/ui/tokens";

tokens["--space-4"]; // "16px"
```

No consuming application defines, overrides, re-declares or shadows a semantic
token. An application that needs a value it cannot express is missing a token,
and that is a pull request against this package.

## Development

```bash
pnpm install
```

| Command               | Purpose                                                                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm lint`           | ESLint, including the structural boundary rules                                                                                                                                 |
| `pnpm typecheck`      | `tsc --noEmit` across source, tests and config                                                                                                                                  |
| `pnpm test`           | Vitest — the architecture suite in `tests/architecture/`                                                                                                                        |
| `pnpm build`          | Generates the token artifacts, `tsc` into `dist/`, copies CSS. No bundler.                                                                                                      |
| `pnpm verify:dist`    | Rebuilds and fails if the committed artifact differs                                                                                                                            |
| `pnpm format:check`   | Prettier, check only                                                                                                                                                            |
| `pnpm smoke:tailwind` | Packs the package, installs it into a throwaway Tailwind v4 consumer and proves the preset resolves. Needs the network, so it is a release gate rather than part of `pnpm test` |

## Releasing

Releases are **owner-triggered**. The owner runs the **Release** workflow from
the Actions tab and supplies:

- `version` — `0.1.0`, with **no** leading `v`, and it must already equal the
  `version` in `package.json` on `main`;
- `commit_sha` — the exact 40-character lowercase SHA of the `main` tip.

Run it **from `main`** — `workflow_dispatch` executes the workflow file of
the branch it is started from.

The workflow validates that commit in full and **creates and pushes the
annotated tag only if every gate passes**. A `verify-created-tag` job then
re-reads the ref from the remote in the same run and fails unless it is
present, annotated and pointing at the validated commit.

The tag is pushed with the repository `GITHUB_TOKEN`, and GitHub starts no
new workflow run for events created with that token, so **an automated tag
does not trigger a second run** — which is why the in-run check above exists.
The `push.tags` workflow remains for tags pushed **by hand or by another
credential**.

A version bump is a separate, owner-reviewed pull request: the workflow never
edits `package.json`, and refuses to release when the manifest and the
requested version disagree. Nothing is published to a registry and no GitHub
Release is created — the tag is the release.

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
