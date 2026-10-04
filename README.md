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

| Area                                                                     | State                                                                              |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| Package, TypeScript, ESLint, Prettier, Vitest, build, dist verification  | in place                                                                           |
| Formatting utilities (`./utils/format`)                                  | shipped                                                                            |
| Validation helpers (root entry, ADR 0002)                                | shipped                                                                            |
| Token Foundation V1 (`./tokens`, `./tokens/tailwind-preset`, `./styles`) | shipped — merged and verified on `main`; **released as `v0.1.0`**                  |
| Styles Foundation (`./styles` — fonts, reset, body, focus, keyframes)    | shipped — **released as `v0.2.0`** (annotated tag); consume it by pinning that tag |
| Icons (root entry — `Icon`, ADR 0005)                                    | implemented — merged and verified on `main`; **no tag carries it**                 |
| The five primitives · overlay-root and Portal                            | not yet — allocated `v0.3.0`                                                       |
| Phase 6 · Harden (v0.2 §8)                                               | not yet — target `v1.0.0`, unchanged                                               |

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

### Working rule — proportionate audits, and always a recommendation

**Project-execution guidance, not a canonical rule.** It binds how work is
reported here; it decides no value and overrides nothing in
[`docs/architecture/canonical-document-registry.md`](docs/architecture/canonical-document-registry.md).
It is a **standing requirement for future checklists and roadmap templates**.

**Audits.** Important implementation milestones get a proportionate precheck,
post-merge verification and an end-of-phase audit. **Depth matches risk.**
An audit that re-proves what a guard already enforces is ceremony, and
ceremony is a cost, not a safeguard.

**Recommendations.** Every audit or decision report that presents more than
one viable option **must name the option the agent recommends**. It must give
the reasoning, the benefits, the risks and the trade-offs, and **state the
exact next action**. The recommendation is **advisory and labelled as such**;
**the final decision is the owner's.** **PASS/BLOCK and "recommended" are
separate concepts** — a report can pass and still recommend a change, or
block and still recommend the cheapest route through.

**A report must not list options without saying which one it recommends**,
unless the evidence genuinely cannot distinguish them — in which case it says
so, and says what evidence would.

**Token Foundation is released as `v0.1.0`.** The **annotated tag `v0.1.0`
exists** — locally and on the remote — targeting
**`b870e19cc0390113ce7c43a0674dc117998ee8b4`**. The **Release workflow ran
successfully**: it validated that commit, created and pushed the tag, and
`verify-created-tag` re-read the ref from the remote and confirmed it is
annotated and points at the validated commit.

**A version in `package.json` is not a release.** The manifest records what
the source tree will be released _as_; a capability reaches consumers only
when an annotated tag carries it. **Read the tag list, not the manifest, to
learn what is available** — `git ls-remote --tags origin`.

What has **not** happened, and is not pending: **no GitHub Release object
exists** — the tag _is_ the release under frozen §2.2, so this is the
designed steady state, not a gap — and **the package has not been published
to npm**. `private: true` stays set, which is what makes a registry publish
fail by design. **It says nothing about the GitHub repository's visibility**,
which is a separate setting and is unchanged by any of this.

Consumers install from a tag. **Styles Foundation is released as `v0.2.0`**,
and that is the tag the supported Styles installation pins — pin whichever tag
carries the capability the application needs, and check
`git ls-remote --tags origin` for what exists:

```jsonc
"@zakhmban/ui": "github:20Brayan01/zakhmban-ui#v0.2.0"
```

**Styles Foundation is released as `v0.2.0`.** It is an **annotated tag**,
created by the owner-triggered Release workflow and pointing at commit
**`bd495bf493c519334a2525588d8d80edb0c6ac68`**; the run validated that commit
and the tag was read back from the remote and confirmed to be annotated and to
point at it. **The supported, versioned way to consume Styles is a pin to
`v0.2.0`.** As with `v0.1.0`, **no GitHub Release object and no npm
publication exists** — the tag _is_ the release under frozen §2.2.
`git ls-remote --tags origin` is the live answer to what exists. **Icons are
implemented and merged on `main` but are not released** — no tag carries
`Icon`, so a consumer pinned to `v0.2.0` does not receive it, and `v0.3.0`
does not exist. **The five primitives and the overlay-root/Portal technique
have not begun** and remain allocated to `v0.3.0`.

**What `@zakhmban/ui/styles` carries depends on which tag you pin.** The
**`v0.2.0` tag** carries the token CSS **and** the Styles layer: the approved
font delivery, the three-rule reset, the body defaults, the `:focus-visible`
rings and the four keyframes. **The `v0.1.0` tag is the earlier, historical
Token Foundation release; its `./styles` surface is token-only** — it predates
Styles and is unchanged by the `v0.2.0` release.

Where the design values stand, precisely:

- The **scoped Token Foundation V1 baseline is signed off** — the approved
  values and semantic mappings are frozen.
- The **complete Token Table remains open**, partially ratified and **not
  signed off**, for every entry marked open, partial or deferred.
- **ADR 0003 is accepted**, fixing how the signed-off values are represented.
  Its **TypeScript public API correction is complete**, and the **final
  contract-readiness audit passed**.
- **`zakhmban-therapists` is the intended current consumer** — the active
  Therapist application. As verified on **2026-10-04**, its `main` pins
  `github:20Brayan01/zakhmban-ui#v0.2.0` and **has migrated to Styles
  `v0.2.0`**, so it receives the full `./styles` surface; its lockfile
  resolves that pin to the `v0.2.0` tag object
  `957a397b2dc919459772344a3ea8b612ef4378a8`. It does **not** receive `Icon`,
  which no tag carries. Any later bump is a separate change in that
  repository, not part of this package; its own `package.json` is the live
  answer.
- **`zakhmban-website` and `zakhmban-pwa` are other applications in the wider
  ecosystem**, not the Therapist consumer. Their Phase 1 design-system legacy
  annotations are **valid** and exist in **local, unpushed** documentation
  commits, but they are **outside the current Therapist gate**.
- The **Therapist consumer-scope correction and the final scoped readiness
  audit have both passed**, and **this documentation branch is approved for
  publication**.
- **Token Foundation V1 is implemented** — seven authored token files, the
  generated typed object and Tailwind artifact, and the three public
  subpaths. It is **tagged and released as `v0.1.0`** through the
  owner-triggered tag workflow.
- **Styles Foundation is implemented and released as `v0.2.0`** — the
  approved Vazirmatn `@font-face` and its binary, the D-1 reset, the D-2 body
  defaults, the D-3 `:focus-visible` rings and the four D-4 keyframes with
  their D-5 reduced-motion definitions. **The supported consumption path is a
  pin to the annotated `v0.2.0` tag.**
- The **Typography Alias Ruling** (2026-09-19) fixes each of the eight
  typography aliases as a **Semantic Typography Size Alias**, authored
  `--text-<step>: var(--text-<step>-size)`. It changed no identifier, no
  value and no count, and required no correction to the implementation.
- **Implementation and publication authorizations are recorded canonically**
  (2026-09-19 and 2026-09-20), and sign-off condition 3 is discharged.
- **No package has been published to npm and no GitHub Release object exists**
  for any version — the annotated tags are the releases.
- **`pnpm smoke:tailwind` is a required gate in the pre-tag and post-tag
  validation modes**, guarded by `release-gate.test.ts`. ADR 0001's obligation was already
  discharged by the implementing commit; the workflow makes the proof
  repeatable and, in the manual mode, genuinely pre-tag.
- **A release tag needs the change reviewed and merged to `main`, the manifest
  version bumped, and the owner starting the workflow** with the approved
  version and exact SHA (see Releasing).

The record is `docs/architecture/token-table-ratification.md`, with precedence
in `docs/architecture/canonical-document-registry.md`.

## Consumption

The package is installed as an external dependency pinned to an **exact git
tag**, never a range, never `workspace:`, never `file:` or `link:`. The tag
below is the **Styles Foundation** release, `v0.2.0`, which carries the Styles
layer; substitute a later tag only when it carries a capability the
application needs. (`v0.1.0` is the earlier Token Foundation release, whose
`./styles` surface is token-only.)

```jsonc
"dependencies": {
  "@zakhmban/ui": "github:20Brayan01/zakhmban-ui#v0.2.0"
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
import {
  Icon,
  normalizeIranianMobile,
  isValidIranianNationalId,
} from "@zakhmban/ui";
import type { IconName, IconProps } from "@zakhmban/ui";
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

| Subpath                               | Ships today                                                                                                                                                                                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@zakhmban/ui`                        | `normalizeIranianMobile`, `isValidIranianNationalId` — the two ADR 0002 capabilities — plus `Icon` and its `IconName` / `IconProps` types (ADR 0005), **on `main` only; no tag carries `Icon`**. Nothing else. The glyph registry stays internal |
| `@zakhmban/ui/utils/format`           | `toPersianDigits`, `formatJalaliDate`, `formatToman`, `formatDuration`, `maskPhoneDisplay`, and their public types                                                                                                                               |
| `@zakhmban/ui/styles`                 | The stylesheet entry point of v0.2 §2. At the `v0.2.0` tag it carries the token CSS **and** the Styles layer — `@font-face`, reset, body defaults, focus rings and the four keyframes. The historical `v0.1.0` tag carries the token CSS only    |
| `@zakhmban/ui/tokens`                 | Generated typed token object — one runtime export `tokens`, plus the `TokenName`, `TokenValue` and `Tokens` types (ADR 0003 §11)                                                                                                                 |
| `@zakhmban/ui/tokens/tailwind-preset` | Generated Tailwind v4 `@theme` CSS artifact, derived from the token CSS (ADR 0001, ADR 0003)                                                                                                                                                     |

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

**What that import provides depends on the tag you pin.** At the **`v0.2.0`
tag** it provides the approved token custom properties **and** the Styles
layer: the Vazirmatn `@font-face`, the reset, the body defaults, the
`:focus-visible` rings, the four keyframes and their reduced-motion
definitions. **At the historical `v0.1.0` tag (Token Foundation) it provides
the token custom properties and nothing else** — that tag predates Styles and
is unchanged.

**Being in the source tree is not the same as being released.** Frozen §2.2
and v0.2 §7.3 fix consumption at an **exact tag** — never a range, never
`workspace:`, never `file:` or `link:`. **The supported way to consume the
Styles layer is a pin to the annotated `v0.2.0` tag**, which points at commit
`bd495bf493c519334a2525588d8d80edb0c6ac68`; a raw commit SHA is technically
resolvable by git but is **not a released version and is not the supported
path**. Later work on `main` is not released until a later tag carries it —
`git ls-remote --tags origin` is the live answer.

The allocation, corrected 2026-09-25 by the Styles Foundation v0.2.0 Contract
Ruling's **D-6**:

|                          |                                                                                                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Styles — v0.2.0**      | font delivery · `@font-face` · the approved reset · global body defaults · `:focus-visible` styling · reduced-motion handling · the four approved keyframes                     |
| **Excluded from v0.2.0** | the overlay-root and Portal technique                                                                                                                                           |
| **v0.3.0**               | overlay-root · Portal behaviour · nested-overlay policy · body scroll locking · inert-background mechanics · pointer-event policy — **alongside Icons and the five primitives** |
| **v1.0.0**               | Phase 6 · Harden, unchanged                                                                                                                                                     |

Earlier text placing the overlay-root technique in Styles v0.2.0 is
superseded for that technique only; everything else still arrives with
Styles.

### Consumer obligation — shimmer under reduced motion (Route A)

**This package publishes the `zakhmban-shimmer` keyframe body. It does not
ship a Skeleton selector, a public shimmer class, or any rule that reaches an
application-owned element** — v0.2 §9 makes `Skeleton` Tier 2 and frozen §2.1
limits this package to five primitives. The surface is applied by the
consumer.

**An application-owned `Skeleton` / `SkeletonCard` that uses the shimmer must
set `background-image: none` under `@media (prefers-reduced-motion: reduce)`,
on the same element that carries the shimmer background.**

The package's conditional static keyframe stops the _movement_ and nothing
more: a frozen `background-position` still paints the 200%-wide image, leaving
a static ramp from `--surface-subtle` to `--surface`. Removing the image is
what lets the already-applied `background-color: var(--surface-subtle)` remain
as the approved flat static skeleton. The obligation is **mandatory** and its
value is **fixed** — only the selector is application-owned. The full contract
is in ADR 0004 §8.1 and the Token Table §2.1 (owner ruling, 2026-09-28).

**Nothing in this repository can enforce it**, and a consumer that omits it
degrades an accessibility path silently.

**Carry this as an explicit item on the `zakhmban-therapists` Skeleton
checklist.** The obligation is **still future-facing, for one reason only**:
as verified on 2026-10-04 that repository now pins `v0.2.0`, so it **does**
receive the shimmer keyframe, but it has **no Skeleton and no shimmer
consumer**, so there is nothing there to satisfy the rule yet. It is **not
modified by this package's work**; it becomes live the moment that repository
builds a Skeleton, and its reduced-motion rule must then be tested there.

### Rendered verification — what was checked, and one observation

A read-only rendered verification ran against these implementation bytes in a
disposable Chromium consumer, with all non-localhost requests blocked. It
covered local font delivery, Persian/Arabic shaping, ZWNJ joining, Persian
digits, Latin and Latin-extended coverage, the four native weights, the
absence of synthetic italic, `:focus-visible` on all five approved surfaces,
the one-pass shimmer cadence, the Route A flat fallback with a negative
control, the three other keyframes at rest, and 200% zoom.

**One observation, recorded precisely.** Page zoom to 200% produced no
blocking issue: no horizontal overflow, nothing clipped, focus rings intact
and the page keyboard-operable. **Enlarging only the root font size did not
increase body text**, because D-2 sets `font-size: var(--text-body-size)` and
that token is an absolute `15px`. That is the approved typography contract and
is **not changed here**. **No claim of complete WCAG conformance is made** by
this note.

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

- `version` — for example `0.2.0`, with **no** leading `v`, and it must already equal the
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
