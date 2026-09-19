# Architecture — Pointer

This repository does not restate the architecture. It points at it, so there is
exactly one place each rule lives and this file cannot drift from its source.

## Governing sources

| Source                             | Location                                           | Role                                                                                                                                                                                                                            |
| ---------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Frozen Technical Architecture v1.1 | workspace `project-reference/architecture/`        | **Governs.** §2 (repository #3 of 8), §2.1 (what is shared, and the five-primitive freeze), §2.2 (git-tag consumption, committed `dist/`, no prepare step, private-repository access).                                          |
| UI System Specification v0.2       | `docs/architecture/zakhmban-ui-system-spec.md`     | Tokens, the thirty-six component specifications, RTL rules, accessibility duties, §7 package architecture, §9 confirmed scope.                                                                                                  |
| Workspace product package          | workspace `project-context/`                       | Product truth. Nothing in this repository redefines it.                                                                                                                                                                         |
| V2 design kit                      | workspace `Therapist Kit Brief Review/_ds/`        | **Does not govern.** Upstream working material and evidence source, classified by the ruling below. Usable only as candidate evidence for unresolved design values, and only where it does not contradict a canonical document. |
| Approved owner rulings             | `docs/architecture/token-table-ratification.md`    | **Govern design values**, each within the scope it names. Inventoried in the canonical document registry.                                                                                                                       |
| Accepted ADRs                      | `docs/adr/`                                        | **Govern representation**, delivery, packaging and public-contract mechanics. They do not invent or silently change a design value.                                                                                             |
| Canonical document registry        | `docs/architecture/canonical-document-registry.md` | **The single precedence statement.** Authority levels, supersessions of record, the global supersession rule, the deferral rule and change control.                                                                             |

Precedence is stated in exactly one place:
[`docs/architecture/canonical-document-registry.md`](docs/architecture/canonical-document-registry.md).
Summarised, highest first — **Frozen Technical Architecture v1.1** (repository
structure, package boundaries, the sharing model) → **`project-context/`**
(product truth) → **approved owner design/product rulings** (design values,
classifications and explicit interpretations, each superseding UI System
Specification v0.2 only for the rules or values it names) → **UI System
Specification v0.2**, which is **CANONICAL — SUPERSEDED IN PART** → **accepted
ADRs** (representation, delivery, packaging and public-contract mechanics).
The registry carries the full chain, the supersessions of record and the
global supersession rule; this file does not restate them. Where v0.2 and the
frozen document disagreed, v0.2 records itself as corrected (its "Architecture
Alignment Update").

The design-authority question that precedence did not resolve on its own — what
standing the uncatalogued V2 design kit holds — was decided on 2026-09-15 and is
recorded in
[`docs/architecture/token-design-authority-ruling.md`](docs/architecture/token-design-authority-ruling.md).
It confirms the chain above unchanged and adds nothing to it. The Token Table
decisions it re-issued are tracked in
[`docs/architecture/token-table-ratification.md`](docs/architecture/token-table-ratification.md).

## What this package is

Tier 1 of the three-tier component model. It provides reusable visual primitives
and UI patterns, and nothing else: **no business workflows, no healthcare domain
logic, no maps, no product-specific cards, no backend or API concepts.** It knows
how a surface looks and behaves as a control; it never knows what a wound, a
proposal or an access fee is.

The scope is closed by frozen §2.1 and UI System Specification v0.2 §9:

- **Foundations** — design tokens, CSS variables, static styles, the permanent
  Icon abstraction and its registry, formatters, validation helpers.
- **Exactly five primitives** — `Button`, `TextField`, `Select`, `OtpInput`,
  `BottomSheet`. **A sixth requires an ADR in this repository.** Wanting one is
  not approval; the correct first move is to build it in the consuming
  application as Tier 2 and see whether a second application ever needs it.
- **Everything else is Tier 2** — thirty-one components specified in v0.2 §3 and
  built in the consuming application, including `Card`, `StatusBadge`, `Chip`,
  `Money`, `Modal`, `Checkbox` and `Switch`. Re-tiering changed their address,
  not their standard.
- **Excluded from both tiers** — maps and location providers, wallet and ledger
  components, business workflows, dark mode, LTR direction.

## Decisions recorded by this commit (C1)

Each of these is enforced by a test in `tests/architecture/`, so it fails a build
rather than a review.

| Decision                                              | Rationale                                                                                                                                                                                                                                                | Guard                                          |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **ESM only**, no CommonJS output                      | Every consumer is Next 16 / React 19 / Vitest 5 / Node 22 — all ESM-native. Dual output would double the committed artifact, double the diff a reviewer reads, and introduce the dual-package hazard. A proven CJS need is an ADR, not an improvisation. | `module-system.test.ts`                        |
| **`tsc` alone**, no Vite library mode, Rollup or tsup | The artifact is committed and read by people: per-file output mirrors `src/` one-to-one, so a one-line source change is a one-line artifact change. It also keeps a bundler out of the supply chain of something four applications trust.                | `scripts/build.mjs`                            |
| **`NodeNext` module resolution**                      | Forces explicit `.js` extensions on relative imports, which is what makes the unbundled emitted ESM resolve under plain Node as well as under every bundler. A git-installed package gets no bundler pass on the way out.                                | `module-system.test.ts`                        |
| **`dist/` committed, no lifecycle scripts**           | Frozen §2.2 pairs the two rules. Any `prepare`/`postinstall` key is install-time code execution in four consumer repositories and inside their Docker builds.                                                                                            | `dependencies.test.ts`, `build-output.test.ts` |
| **`private: true`**                                   | Consumption is by git tag, never by registry. A failed `pnpm publish` is the intended outcome. Flipping it is part of a registry-migration ADR against frozen §2.2, not a tooling change.                                                                | `package-metadata.test.ts`                     |
| **Zero runtime dependencies**                         | Every entry would become a transitive dependency four applications cannot resolve independently. Jalali and Persian numerals come from `Intl`, not a date library.                                                                                       | `dependencies.test.ts`                         |
| **Exports are an allow-list with no wildcard**        | A `./*` entry makes every internal module a public API and removes the package's ability to move a file. The declared list widens only by a reviewed diff.                                                                                               | `exports-contract.test.ts`                     |
| **`react` / `react-dom` peers deferred**              | The package's code needs nothing at this commit, and pnpm's default peer handling would install React for no reason. The peer contract lands with the first primitive.                                                                                   | —                                              |
| **Architecture tests are self-contained**             | A guard that depends on a shared helper can be defeated by editing the helper. The small duplication buys that property.                                                                                                                                 | `tests/architecture/README.md`                 |

## What this file is not

Not a second copy of the specification, not a design document, not a place for
product decisions, and **not a precedence statement of its own** — that is the
canonical document registry's job, and this file is subordinate to it. An ADR
under `docs/adr/` records anything touching frozen behaviour — the five-primitive freeze, the exports allow-list, the zero-dependency
rule, the ESM-only decision, the absence of lifecycle scripts, the token source of
truth, or a registry migration.
