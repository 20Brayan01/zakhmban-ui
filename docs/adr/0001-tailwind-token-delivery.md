# ADR 0001 — Tailwind Token Delivery Strategy

- **Status:** Accepted
- **Date:** 2026-09-11
- **Scope:** `@zakhmban/ui` token delivery only. No component, no visual
  decision, no token value is touched.
- **Authority tier:** Reconciliation of a delivery *form* left contradictory by
  two governing documents. It does not relieve either requirement — both the
  frozen architecture's "Tailwind preset" and UI System Specification v0.2's
  `@zakhmban/ui/tokens/tailwind-preset` subpath survive this decision intact.

## Context

Three sources bear on how this package delivers Tailwind-compatible tokens, and
the first two were written before the third became true.

**1 · Frozen Technical Architecture v1.1 §2** fixes the package contents,
repository #3 of 8:

> design tokens (CSS variables + Tailwind preset)

The requirement is a *concept* — CSS variables as the token carrier, plus an
artifact that lets a Tailwind consumer reach the same tokens through Tailwind's
own theme keys. The frozen document does not state the artifact's file format.

**2 · UI System Specification v0.2 §7** states the form and the subpath:

> A plain JavaScript object mapping the same semantic tokens onto Tailwind theme
> keys, generated from the token CSS so the two cannot drift, exported at
> `@zakhmban/ui/tokens/tailwind-preset`.

and, in the same section:

> The preset is **not removed** and must not be removed without an explicit
> architecture decision.

§2 places it third in a strict generation order — authored token CSS is the
single source, the typed JS object is generated from it, and the Tailwind preset
is generated from it. §9 unknown 9 repeats the prohibition: *"Do not resolve this
by deleting the preset — that needs an explicit architecture decision, not an
inference from one consumer's current state."*

**3 · Tailwind v4 changed the configuration model.** The `presets: []` array that
a "plain JavaScript object mapping tokens onto theme keys" was written for
belongs to the v3 JavaScript configuration file. v4 is CSS-first: the theme is
declared in a `@theme` block in CSS, `tailwind.config.*` is legacy, and there is
no JS preset for a package to export into.

This is not a hypothetical version gap. Every Zakhmban frontend repository that
has Tailwind installed today has **Tailwind 4**: `zakhmban-pwa`,
`zakhmban-website` and `zakhmban-admin` each depend on `tailwindcss ^4` with
`@tailwindcss/postcss`. `zakhmban-therapists` has no Tailwind dependency at all
(spec §9 unknown 9). **No consumer is on Tailwind v3**, and none is planned to
be.

## Problem

How should `zakhmban-ui` deliver Tailwind-compatible tokens without introducing
an obsolete Tailwind v3 preset model?

Shipping the artifact literally as v0.2 §7 describes it would produce a JS object
that no consumer can consume, satisfying the letter of the specification while
delivering nothing. Dropping the artifact would satisfy Tailwind v4 while
violating frozen §2 and the explicit prohibition in v0.2 §7 and §9. Neither
literal reading is available.

## Decision

**The Tailwind preset is delivered as a Tailwind v4 `@theme` CSS artifact,
exported at the subpath UI System Specification v0.2 §7 names:
`@zakhmban/ui/tokens/tailwind-preset`.**

The artifact is generated from the authored token CSS, preserving §2's strict
generation order — one authored source, derived representations that cannot
drift from it. A token added to the preset by hand but not to the token CSS
remains a build error, not a style.

Four clarifications, each load-bearing:

1. **It is not a JavaScript Tailwind preset.** No `presets: []` entry, no
   `tailwind.config.*` contribution, no JS theme object. The word "preset" in
   frozen §2 and v0.2 §7 is read as naming the *semantic delivery artifact* —
   the thing that maps Zakhmban's semantic tokens onto Tailwind's theme keys —
   not the v3 mechanism that happened to be its only form when both documents
   were written.

2. **It is not a Tailwind runtime or peer dependency.** v0.1's refusal, restated
   in v0.2 §7 and §7.2, stands unchanged: the package's own styling is static
   CSS plus custom properties and never requires a consumer to run Tailwind. A
   consumer that uses Tailwind imports this artifact; a consumer that does not
   ignores it and loses nothing. `zakhmban-admin` and `zakhmban-website` take
   tokens and formatting only (frozen §2.1) and are unaffected either way.

3. **Tokens remain owned by `zakhmban-ui`.** The authored token CSS is the single
   source of truth. The `@theme` artifact references those custom properties
   rather than restating their values, so the hex exists in exactly one file and
   the preset cannot become a second place a colour is defined.

4. **Consumers do not redefine tokens.** v0.2 §2: *"No consuming application
   defines, overrides, re-declares or shadows a semantic token; an application
   that needs a value it cannot express is missing a token, and that is a pull
   request against the package."* The Therapist App's lint rule L5 — no hardcoded
   colour values — is the consumer-side half of the same rule. This ADR changes
   the artifact's format and nothing about that ownership.

## Consequences

### Positive

- **Tailwind v4 compatible.** The artifact works with the version every Tailwind
  consumer in the platform actually runs, rather than the version the
  specification's wording was drafted against.
- **Framework aligned.** It follows Tailwind's own current configuration model
  instead of freezing a deprecated mechanism into a package four applications
  depend on.
- **Preserves token ownership.** Generated from the authored CSS, in the strict
  order §2 requires, so the preset cannot drift from the source or become a
  second definition site.
- **Works with the CSS variable strategy.** Frozen §2's "CSS variables + Tailwind
  preset" becomes one coherent artifact family instead of a CSS carrier and a
  parallel JS carrier that must be kept in agreement by hand.
- **The subpath is unchanged.** `@zakhmban/ui/tokens/tailwind-preset` is exactly
  what v0.2 §7 specifies, so no consuming document, plan or integration note
  needs correcting.

### Negative

- **A Tailwind v3 consumer would need to migrate.** It could not consume this
  artifact at all. Recorded honestly as a cost, with its current size stated:
  **no Zakhmban consumer is on Tailwind v3 today**, so the cost is latent rather
  than incurred. Should a v3 consumer ever appear, migrating it to v4 is the
  remedy; reintroducing a v3 preset is not, and would need its own ADR.
- **"Preset" is reinterpreted.** The word is read as a semantic delivery
  artifact, not a JavaScript object. This is an interpretation of two governing
  documents, made explicitly and in writing rather than silently at
  implementation time — which is the whole reason this ADR exists.
- **The subpath now resolves to CSS, not JS.** Consumers reach it with a CSS
  `@import`, not a JS `import`. Two obligations follow for the commit that
  implements it: the `exports` entry must be added alongside the file it points
  at, per the exports allow-list rule in `ARCHITECTURE.md`; and the resolution of
  an extensionless package subpath through `@tailwindcss/postcss` must be proven
  against a real Tailwind 4 consumer before release, not assumed.
- **Import ordering becomes a consumer-visible failure mode.** A `@theme` layer
  imported before the custom properties it references, or before
  `@import "tailwindcss"`, fails quietly with unstyled output. It belongs in the
  README as an exact, ordered snippet.

## Alternatives considered

**1 · Tailwind v3 JavaScript preset.** The literal reading of v0.2 §7.

Rejected: incompatible with the Tailwind v4 direction. v4 has no `presets: []`
mechanism for such an object to enter, and every Tailwind consumer in the
platform is on v4. The artifact would satisfy the specification's wording while
being unusable by every consumer it was written for — the worst of the available
outcomes, because it looks delivered.

**2 · No Tailwind artifact.** Ship CSS custom properties only and let each
consumer map them to Tailwind theme keys itself.

Rejected: violates the frozen architecture requirement. Frozen §2 names the
Tailwind preset as package contents, and v0.2 §7 and §9 unknown 9 both forbid
resolving the version mismatch by deletion. It would also push the same mapping
into four repositories, which is precisely the duplication a shared token package
exists to prevent, and would put four independent copies of the token→theme
mapping outside the package that owns the tokens.

**3 · Ship both a v4 `@theme` artifact and a v3 JS object.** Cover every case.

Rejected: two artifacts generated from one source is two things to keep correct,
two things to review on every token change, and a standing invitation to consume
the deprecated one. No consumer needs the second. If one ever does, this ADR is
superseded rather than hedged against in advance.

## Sources

- Frozen Technical Architecture v1.1 §2 (repository #3 contents), §2.1 (what is
  shared), §2.2 (git-tag consumption, committed `dist/`).
- UI System Specification v0.2 §2 (token ownership; the one-source,
  three-representations order), §7 ("Tailwind, precisely"; Exports; Dependency
  policy), §7.2 (styling architecture), §9 unknown 9 (Tailwind's unverified
  status in the Therapist App, and the prohibition on deleting the preset).
- This repository's `ARCHITECTURE.md` — the exports allow-list rule and the list
  of decisions that require an ADR.
- Observed dependency state on 2026-09-11: `zakhmban-pwa`, `zakhmban-website` and
  `zakhmban-admin` each declare `tailwindcss ^4` with `@tailwindcss/postcss`;
  `zakhmban-therapists` declares no Tailwind dependency.

**Documentation defect noted, not amended.** UI System Specification v0.2 §7
directs the reader to "§5 for the token → CSS variable → preset relationship".
That relationship is in **§2 · Design Token Specification**; §5 is *RTL and
Localization Guidelines*. Recorded here so a reader following the pointer is not
misled. The specification is a source-of-truth document and is not edited by this
repository.
