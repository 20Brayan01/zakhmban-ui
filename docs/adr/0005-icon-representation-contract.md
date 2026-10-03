# ADR 0005 — Icon Representation and Glyph Delivery Contract

- **Status:** Proposed
- **Date:** 2026-10-02
- **Scope:** the **representation** of the Icon abstraction whose existence,
  geometry, colour contract, API shape, accessibility default and
  registry-owned mirroring rule UI System Specification v0.2 already fixes —
  how the glyph data is obtained and distributed under this repository's
  zero-runtime-dependency decision, how the registry entry is shaped, how
  `Icon` and `IconName` reach consumers through the **existing** root export,
  which licence notice ships, and which guards an implementation commit must
  amend. It also records the `react` / `react-dom` **peer relationship** that
  v0.2 §7 and §7.2 already state, and the one subordinate-document wording
  correction that follows.
- **Out of scope, deliberately:** the five primitives; the overlay-root and
  Portal technique, which **D-6 defers to v0.3.0 decision work and approves
  no technique for**; the Button `sm` 40-versus-44 geometry, which remains an
  open owner deferral in primitive scope; `--radius-pill`; the real ZakhmBan
  glyph set of v0.2 §9 unknown 4, which **does not exist and is not knowable
  from this repository**. **This ADR invents no value for any of them.**
- **Authority tier:** **representation authority only**, as
  [`../architecture/canonical-document-registry.md`](../architecture/canonical-document-registry.md)
  defines it. Value authority stays with Frozen Technical Architecture v1.1,
  `project-context/`, the approved owner rulings and UI System Specification
  v0.2. Every geometry, colour and behavioural value in §1 below is **quoted
  from a canonical source, not decided here**. Where a canonical source is
  silent on a value, this ADR **records the gap rather than filling it** —
  exactly as ADR 0003 did for the pill radius, the keyframe names and the 40px
  small-control geometry.
- **Nothing is implemented by it.** No `src/icons/` directory, no component,
  no registry file, no generator, no licence file, no build change, no test
  change, no manifest change and no export change accompanies this ADR.

## Context

**Icons are frozen package payload, not a package preference.** Frozen
Technical Architecture v1.1 §2 lists repository #3's contents as *"design
tokens (CSS variables + Tailwind preset), Persian/Jalali date and number
formatting, Toman formatting, phone display masking, **icon set**, five
primitives … client-side validation helpers"*, and §2.1 repeats *"Design
tokens, Persian/Jalali/Toman formatting, **icons**, five primitives,
validation helpers"* against `zakhmban-ui`, adding that **"admin and website
consume tokens and formatting only."**

**The release sequence puts them next.** The Token Foundation v0.1.0
Release-Sequence Ruling of 2026-09-20 allocates **Icons and the five
primitives to `v0.3.0`**, and D-6 of the Styles Foundation v0.2.0 Contract
Ruling adds the overlay-root/Portal decision work to the same version. Token
Foundation shipped as `v0.1.0`; Styles shipped as `v0.2.0`. Icons are the one
item in the v0.3.0 allocation that depends on **no deferred owner decision**.

**v0.2 already decides what an Icon is.** §3.1 fixes the glyph box, stroke,
colour roles, API props, the decorative default and the labelling rule; §5
fixes that mirroring is **a property of the icon declared in its registry
entry**; §7's package tree places `icons/ registry + mirroring flags`; §9
lists *"the Icon abstraction and its registry"* among the **Foundations
shipped by the package**, separately from the five primitives; §8 Phase 7
makes the eventual swap to a real ZakhmBan glyph set a **wholesale
replacement behind an unchanged abstraction**. Design decision 5 of the v0.1
update records the abstraction as **permanent**: *"Lucide is an implementation
detail behind it; applications never import an icon library directly."*

**The Token Table decides nothing about icons, and that is not a deferral.**
The string `lucide` appears nowhere in
[`../architecture/token-table-ratification.md`](../architecture/token-table-ratification.md),
and no owner ruling addresses the abstraction, the registry, mirroring flags,
icon geometry tokens or icon licensing. The deferral rule applies to decisions
**an owner explicitly left open**; here the governing specification is not
silent, it is explicit, and the remaining questions are **how** its decided
behaviour is expressed, generated and distributed. That is this series' job.

**One real tension exists, and it is this ADR's problem.** v0.2 §7's
dependency policy says *"Zero runtime dependencies as the default. React and
react-dom are peers. **The icon set is the one exception:** Lucide is the
initial implementation behind the permanent Icon abstraction, isolated in the
registry so a later swap touches one file and no application code."* §7.2
softens the same rule to *"Zero runtime dependencies **preferred**"*, and §8
Phase 7's exit criterion — *"No third-party icon dependency; the package has
zero runtime dependencies"* — implies that a third-party icon dependency may
exist **before** Phase 7. Against that, this repository's own C1 commit
recorded **"Zero runtime dependencies"** flatly, and
[`../../tests/architecture/dependencies.test.ts`](../../tests/architecture/dependencies.test.ts)
enforces it mechanically: `expect(manifest["dependencies"]).toEqual({})`.
`docs/adr/README.md` places *"the **zero runtime dependency** rule"* in this
series. So the exception v0.2 §7 permits is one this repository decided not to
take, and changing or confirming that is an ADR, not a commit message.

## Problem

Four questions, none of which an implementation commit may answer on its own
authority:

1. **Where does the glyph data come from, and in what form does it reach a
   consumer**, given that `dist/` is committed, nothing builds at install, the
   package resolves under plain Node as unbundled ESM, and the enforced
   `dependencies` value is `{}`?
2. **Which glyph names exist**, when no canonical source enumerates them and a
   name is a public API the moment an application writes it?
3. **How do `Icon` and `IconName` become public** without adding a fourth
   public subpath, which the registry's deferral list closes?
4. **When does the `react` / `react-dom` peer contract land**, when
   `ARCHITECTURE.md` forecast it would arrive "with the first primitive" and
   the first module that needs React is a Foundation rather than a primitive?

## Decision

### 1 · Approved behaviour, restated and attributed — not decided here

Everything in this section is a **quotation of existing authority**. An
implementation commit may not vary any of it, and this ADR adds nothing to it.

| Property | Approved value | Source |
| --- | --- | --- |
| Glyph box | **24px** | v0.2 §3.1 |
| Stroke | **1.8px**, rounded caps | v0.2 §3.1 |
| Default colour | navy — **`--text-primary`** (`#002A5E`) | v0.2 §3.1; Token Table records the §3.1 Icon navy default as `--text-primary` |
| Active colour | **a colour family only — "green"**, bound to **no** token identifier by any canonical source | v0.2 §3.1; confirmed by owner finding IA-6 |
| Destructive colour | **a colour family only — "red"**, bound to **no** token identifier by any canonical source | v0.2 §3.1; confirmed by owner finding IA-6 |
| On brand fills | **`--on-brand-icon`** (`var(--white)`), kept separate from the Text contract | owner Decision 12b |
| API props | **`name†`** `size` `color` `strokeWidth` | v0.2 §3.1 |
| Accessibility default | **decorative — `aria-hidden`** | v0.2 §3.1 |
| Icon-only controls | *"must carry a label on the control, not the icon"* | v0.2 §3.1, restated in §6 Semantics |
| Abstraction | **permanent**; apps *"reference glyphs by name and never import an icon library"*; a direct icon-library import in app code *"is a spec violation"* | v0.2 §3.1, design decision 5 |
| Mirroring | **a property of the icon, declared in its registry entry — not a per-usage decision** | v0.2 §5 |
| Mirror these | back, forward, chevron, next/previous, trending, send, undo | v0.2 §5 |
| Never mirror these | clock, phone, map pin, lock, wallet, star, shield, and any brand illustration | v0.2 §5 |
| Direction ownership | the document owns `dir`; **the package must not set `direction`** | v0.2 §5; owner D-2 |
| Target size | an icon-only *control* is **44×44px** minimum; the glyph is not the target | v0.2 §6 Targets |
| Future swap | Lucide is replaced **wholesale behind the unchanged abstraction**, with no application code change | v0.2 §8 Phase 7 |

#### 1.1 · The colour contract — what the initial Icon defines, and what it does not

**The initial Icon needs no active or destructive colour mapping, and this ADR
proposes none.** The reason is in §3.1's own prop list, which is the whole of
the approved API: **`name†` `size` `color` `strokeWidth`**. There is no `tone`,
no `state`, no `active` and no `variant` prop. The contrast with its
neighbours is deliberate and informative — §3.1's **Text** carries
`tone` with seven named tones, §3.2's **Button** carries `tone`, §3.5's
**StatusBadge** carries `tone†`, and §3.3's **IconButton** carries `tone`.
**Icon does not.** That is consistent with the rule §3.1 states in the same
row and §6 Semantics restates: an icon-only control *"must carry a label on
the control, not the icon"* — semantics, and with them tone, live on the
**control**, never on the glyph.

**So the initial Icon defines exactly one colour behaviour:**

- **its default is navy, and that default is bound.** v0.2 §3.1 says "Navy
  default"; the Token Table binds it: *"its glyph uses the **§3.1 Icon navy
  default — `--text-primary` `#002A5E`**"*. The implementation resolves the
  default through that public token and authors no literal.
- **every other colour arrives at the use site through the `color` prop.** A
  green glyph on an active surface and a red glyph on a destructive one are
  the **caller's** colour, chosen by the component that owns the state —
  which is where §3.1 and §6 put the semantics. `--on-brand-icon`
  (`var(--white)`, owner Decision 12b) is likewise a value a use site passes
  when the glyph sits on a brand fill; Icon does not special-case it.

**What remains unresolved, stated as the owner left it.** No canonical source
binds "green when active" or "red when destructive" to a token identifier.
The owner recorded exactly that in finding **IA-6**: *"§3.1's Icon contract
names navy, green and red only, and no banner-accent or neutral icon role
exists. No component contract is invented or approved here."* The same finding
**scopes its own consequence**: the gap *"must be resolved before InfoBanner
or ErrorBanner implementation"*, and the classification table records it as an
**open component-stage gap** due at that point — not at Icon's. The palette
does contain several plausible green and red roles (`--success`,
`--success-fg`, `--brand-green`, the `--action-green-*` ladder; `--danger`,
`--danger-fg`, `--brand-red`, the `--action-red-*` ladder), and **that
plurality is the reason an implementer may not choose one**: picking the role
whose name reads best is exactly the move the deferral rule forbids.

**Therefore:** adding a **semantic** active/destructive mapping to Icon — a
`tone` prop, or named token bindings for the two colour families — is a
**future owner decision**, not an implementation choice and not something a
reviewer may settle in a pull request. Until it is made, Icon ships with the
bound navy default and the caller-supplied `color` prop, and **no Tier 1
primitive is blocked**: the owner's own scoping puts the only blocked
surfaces in Tier 2.

**One normative limit, stated narrowly.** The package's **own** defaults must
resolve through public semantic tokens and must author no colour literal and
no raw-palette reference — the rule that already binds its Styles CSS, and the
one the Token Table makes mechanical for component commits (see §5). What a
consuming application passes into `color` is the application's value under
v0.2 §2's standing rule that no consumer defines, overrides, re-declares or
shadows a semantic token; **this ADR adds no new obligation on consumers** and
the package cannot enforce one.

**A second gap, also recorded rather than filled:** **no icon size or stroke
token exists**, and none is created here — 24px and 1.8px are v0.2 §3.1
component values, like the 1px/1.5px border widths the Token Table says
*"arrive with the component contracts that use them"*.

### 2 · The registry is generated, committed and parity-checked

**The glyph registry is a generated artifact, authored nowhere by hand**, on
the pattern ADR 0003 already established for the token object and the Tailwind
preset: a generator reads an exactly pinned upstream source, emits a committed
file, and a `--check` mode fails the build if the committed artifact has been
hand-edited. **Which upstream package, and the shape of its data, is not
established by this ADR** — §3 records that as an implementation fact to
confirm rather than a finding. The reasons are the same as for tokens — transcribed path data is
unreviewable and silently wrong, and a committed artifact that nobody can
re-derive is not an artifact but a liability.

**Each registry entry carries exactly two fields**: the glyph's drawing
instructions, and its **mirroring decision as an explicit boolean**. The
mirroring flag is not inferred from the name, not defaulted, and not optional
— v0.2 §5 makes it a declared property, and a missing flag would silently
become "do not mirror", which is the wrong answer for every directional glyph.

**The registry is package-internal.** It is not exported, not reachable by a
deep import, and not published as a runtime list. §4 below states what is
public instead.

### 3 · Glyph data delivery — four options, one recommendation

The constraint set: `dependencies` is enforced to `{}`; consumers install
`dist/` verbatim from a **git tag** with no install-time build and no registry
resolution step; output is unbundled ESM that must resolve under plain Node;
`admin` and `website` consume tokens and formatting only and must not pay for
icons; and Phase 7 must be able to replace the glyph source **wholesale**
without touching application code.

| | Approach | Verdict |
| --- | --- | --- |
| **A** | **Generate from an exactly pinned Lucide source package at build time into a committed registry; that package is a devDependency; zero runtime dependencies preserved.** Which Lucide distribution, and its data shape, is **unverified here** — see below. | **Recommended.** |
| **B** | `lucide-react` as a **runtime dependency**, re-exported behind `Icon`. | Rejected. |
| **C** | `lucide-react` as a **peer** or optional peer. | Rejected. |
| **D** | Hand-transcribe path data into an authored registry; no upstream tooling. | Rejected. |

**A is recommended** because it is the only option that satisfies every
constraint at once and the only one that matches a pattern this repository has
already shipped twice. The upstream package sits in the **build** path, pinned
exactly, exactly where `typescript` already sits; the **consumer's** dependency
graph is unchanged, so a git-tag package stays installable without npm
resolution; `dist/` stays per-file readable because a generator emits one file
rather than a bundle; and Phase 7 becomes a change to the generator's input
plus a regenerated artifact — *"touches one file and no application code"*,
which is precisely what v0.2 §7 promises the registry will deliver.

**B is rejected** on this repository's own recorded reasoning, which the
exception in v0.2 §7 permits but does not compel: *"Every entry would become a
transitive dependency four applications cannot resolve independently."* A
runtime dependency also breaks the git-tag consumption model's main property —
a consumer installs a ready artifact and resolves nothing — and would make
Phase 7 a **breaking** dependency removal rather than a regeneration. Taking
v0.2 §7's exception would need this ADR to amend the C1 decision and the guard
that enforces it; A makes that unnecessary, which is the better outcome.

**C is rejected** by v0.2 §7.2 directly: *"No implementation library is forced
on a consuming application."* A peer is exactly that. The reference kit's
variant of C — reading `window.lucide` from a UMD build — is additionally
rejected: it is non-deterministic, unavailable during server rendering, and it
renders an empty box when the global has not loaded.

**D is rejected** because unreviewable transcription of vector path data is a
defect generator, and because it discards the parity check that makes a
committed artifact trustworthy.

**What is not verified here, and must not be assumed.** No Lucide package is
installed in this repository and none appears in `pnpm-lock.yaml`, so this ADR
**asserts nothing about upstream**. Three things are therefore recorded as
**open implementation facts to establish, not as findings**:

- **which** Lucide distribution the generator reads — the icon-data package,
  the static-asset package or another — and **what shape** its exported data
  takes. Option A names *a pinned Lucide source*, not an API: the
  implementation PR selects the distribution, pins it exactly, and states the
  shape it actually found. **This ADR claims no export name, module layout or
  file path upstream.**
- **the licence identifier** that distribution carries at the pinned version.
  The widely published terms for Lucide are ISC, with the upstream notice
  additionally carrying the MIT attribution for the Feather icons it derives
  from — **recorded here as expectation, not as verified fact**, because it
  has not been checked against a pinned artifact in this repository. If the
  pinned version's notice differs, **the notice governs and this paragraph is
  wrong**.
- **whether the notice covers the data actually used.** The implementation PR
  confirms that, rather than inferring it.

**What A requires shipped, exactly** — a rule about the copy, not a claim that
a copy has been made or checked:

- the implementation PR **copies the licence text verbatim** out of the
  exactly-pinned upstream package into **`src/icons/LUCIDE-LICENSE.txt`**. It
  does **not** retype, summarise, or reconstruct it from memory, and it does
  **not** substitute a licence identifier for the text. **No licence file has
  been copied, read or verified by this ADR.**
- the generator writes the upstream **package name and exact version** into
  the generated registry's header comment, so the artifact states its own
  provenance.
- `src/icons/LUCIDE-LICENSE.txt` reaches `dist/icons/LUCIDE-LICENSE.txt`
  **byte-for-byte**, on the precedent of `src/styles/fonts/OFL.txt`, which the
  Owner Font Contract and Delivery Ruling placed beside the binary it covers
  for the same reason: a notice that does not travel with the artifact has not
  been given. The build's copy allow-list **already admits `.txt`**, so no
  build-script extension is needed for the notice itself — only the guard
  amendments §5 lists.

**No `.svg` file is distributed.** Glyph data lives in the generated
TypeScript registry, so `dist/` gains no new asset type beyond the one `.txt`
notice, and the build's `.css` / `.woff2` / `.txt` allow-list is unchanged.

### 4 · The public surface — root export only, no fourth subpath

**`Icon`, `IconProps` and `IconName` are added to the existing root entry, and
nothing else is.** `src/index.ts` is the only public entry; v0.2 §7 fixes
*"one public entry … plus three deep entries"*, §7.2's import strategy says
consumers *"import from the root"*, and the registry's binding deferral list
closes **"any fourth public subpath"**. So:

- **`exports` in `package.json` does not change.** There is no `./icons`, no
  `./primitives`, and no wildcard.
- `IconName` is a **closed union type**, never `string`. An unknown name must
  be a compile error in the consuming application, because the alternative —
  the reference kit's behaviour — is an empty box at runtime with no error
  anywhere.
- the **registry object, the glyph path data and any runtime name array stay
  internal.** A published `iconNames` array was considered and rejected: it
  invites an application to iterate the set and build an icon picker, which
  makes every future addition and removal a consumer-visible behaviour change,
  and the closed type already gives a consumer everything it needs at compile
  time. If a genuine need appears, it is an additive change under v0.2 §7's
  versioning rule and a reviewed diff here.
- `verbatimModuleSyntax` is enabled, so the type exports must use
  `export type`.
- adding a glyph name is **additive**; removing or renaming one is
  **breaking**, under v0.2 §7 Versioning. The inventory should therefore start
  small, which §6 does.

**One consequence is stated rather than solved.** Because the root entry is
the only door, a consumer that imports only the validation helpers has the
icon module in its module graph and relies on bundler tree-shaking to drop it;
`sideEffects` is already `["**/*.css"]`, which is what makes the barrel
tree-shakeable, and the per-file unbundled `tsc` output is what makes it
analysable. Frozen §2.1's *"admin and website consume tokens and formatting
only"* is satisfied at the level of what those applications **use**; it is not
a licence to add a subpath, and this ADR does not add one.

### 5 · What a later implementation PR must change — mapped, not done

Recorded here so the implementation commit is reviewable against a list
written before it, and so nobody mistakes a guard amendment for a guard
weakening. **None of these changes is made by this ADR.**

**New source:**

| Path | Kind |
| --- | --- |
| `src/icons/registry.ts` | **generated**, committed, `--check`-verified |
| `src/icons/icon.tsx` | the component — the repository's first `.tsx` |
| `src/icons/index.ts` | internal barrel |
| `src/icons/LUCIDE-LICENSE.txt` | vendored notice, copied verbatim |
| `scripts/generate-icons.mjs` | generator with a `--check` mode |

**Changed source:** `src/index.ts` gains the three exports of §4;
`scripts/build.mjs` runs the icon generator before `tsc` — its own comment
already anticipates this: *"The icon generator is added to this file by the
commit that introduces it."*

**Guards that must be amended, each with the reason:**

| Guard | Why it must change |
| --- | --- |
| [`tests/architecture/source-entry.test.ts`](../../tests/architecture/source-entry.test.ts) | It currently fails on any `src/` filename containing `Icon` and on **any** `.tsx` under `src/`, and its asset allow-list admits non-TypeScript files **only** at `src/styles/fonts/*.{woff2,txt}`. All three assertions were written to hold the line until this work was authorized; the amendment must keep forbidding the five primitive names. **`Select` is absent from that list** — an apparent oversight that the amendment should close rather than inherit. |
| [`tests/architecture/root-export.test.ts`](../../tests/architecture/root-export.test.ts) | It asserts the root entry exports *"exactly the two ADR 0002 capabilities, and nothing else"*. |
| [`tests/architecture/build-output.test.ts`](../../tests/architecture/build-output.test.ts) | Its copied-asset inventory covers `styles/` only; the notice needs its own existence and byte-for-byte assertions, and an unapproved-type assertion for `dist/icons/`. |
| [`tests/architecture/dependencies.test.ts`](../../tests/architecture/dependencies.test.ts) | Its `ALLOWED_DEV_DEPENDENCIES` list is exhaustive and must admit the generator's upstream source and the React type/render devDependencies. `dependencies` **stays `{}`** — that assertion does not change. |
| `vitest.config.ts` | `include` is `tests/**/*.test.ts`, which excludes `.tsx`; the environment is `node`. See §6. |
| `eslint.config.mjs` | Its `no-restricted-imports` groups should gain the icon libraries, so §3.1's *"a direct icon-library import … is a spec violation"* is enforced inside the package too, not only in consumers. |
| `ARCHITECTURE.md` | One factual wording correction — see §6. It is a subordinate document, and this is a correction, not a decision. |

**One new guard is owed, by an owner ruling and not by this ADR.** The
Incidental Accessibility Findings Ruling's finding **IA-5** requires that *"a
mechanical Raw Palette usage guard must be introduced with the first component
implementation commit"*, and states plainly *"It is not implemented now"*; its
classification table files it as an **implementation migration rule** due
*"with the first component implementation commit"*. **The Icon PR is that
commit**, so it owes that guard — a test proving no component or Styles source
references one of the thirty internal raw-palette entries, whose internality
ADR 0003 §5 already fixes. It is named here so the obligation is not
discovered after the fact; **this ADR neither implements nor weakens it.**

**Not changed by the implementation PR:** `package.json` `exports`, `files`,
`sideEffects`, `private`, or `dependencies`; any token; any keyframe; the
Tailwind preset; `scripts/verify-dist.mjs`; the release workflow. **The
version bump, the tag, the release-workflow run and the consumer bump each
remain separate owner actions.**

**A frozen CI obligation is recorded for later, not now.** Frozen v1.1 §2.2
requires that this repository's *"CI builds a smoke page per primitive."* That
attaches to the **primitives**, not to Icon, and it is not discharged or
weakened here — it is named so the primitive PRs cannot forget it.

### 6 · React and react-dom peers — reconciled, with one wording correction

**The exact canonical text settles this, and it does not say "primitive".**

- **v0.2 §7, Dependency policy:** *"Zero runtime dependencies as the default.
  **React and react-dom are peers.**"* No timing, no condition.
- **v0.2 §7.2, Dependency policy row, status *Unchanged*:** *"Zero runtime
  dependencies preferred. **React and react-dom are peer dependencies.** No
  implementation library is forced on a consuming application."*
- **Frozen v1.1** states no dependency rule for this repository at all.

So the peer **relationship** is already canonical and unconditional.
Declaring it is compliance with v0.2, not a change to it.

**The "first primitive" wording is not a rule.** It appears in two
**subordinate** places, both describing the same trigger:

- `ARCHITECTURE.md`'s C1 table: *"**`react` / `react-dom` peers deferred** —
  The package's code needs nothing at this commit, and pnpm's default peer
  handling would install React for no reason. The peer contract lands with the
  first primitive."* Its Guard column is **empty**: no test enforces it.
- `vitest.config.ts`: *"Nothing in this package renders yet … A jsdom project
  is added by the commit that introduces the first primitive."*

`ARCHITECTURE.md` says of itself that it is **"not a precedence statement of
its own"** and is **subordinate to the registry**, and `docs/adr/README.md`
assigns it exactly this role: *"Routine implementation detail that changes no
frozen behaviour does not need [an ADR]. Decisions of that kind are recorded
in `ARCHITECTURE.md`."* Neither sentence is an owner ruling, neither is in the
registry's owner-ruling inventory, and neither is guarded.

**The stated rationale is the operative part, and it is conditional:** *"The
package's code needs nothing at this commit."* The trigger is **the package's
code needing React**. v0.2 §9 classifies Icon as a **Foundation shipped by the
package**, listed separately from the five primitives — and it is a React
component. So the trigger fires at Icon. The forecast's **label** was
imprecise because, when C1 was written, the next React-bearing module was
expected to be a primitive; the **trigger it describes** is unchanged. This is
a wording correction, not a reinterpretation, and it is stated openly here
rather than absorbed silently into an implementation diff.

**A peer dependency is not a runtime dependency.** `dependencies.test.ts`
asserts `dependencies` equals `{}` and separately forbids optional and bundled
dependencies; `peerDependencies` is untouched by it. v0.2 §7 lists "zero
runtime dependencies" and "React and react-dom are peers" as two coexisting
clauses of one policy, which is only coherent on that reading. **So this ADR
changes nothing about the zero-runtime-dependency rule**, and `dependencies`
stays `{}` after Icons ship.

**Decision, with two things deliberately not frozen.**

1. `react` and `react-dom` are declared as **`peerDependencies`** by the
   commit that introduces the first React-bearing module, which is **Icon**.
2. The **exact range is not frozen here.** It is a packaging detail the
   implementation PR sets, and it must admit the React the consumers actually
   pin today — `zakhmban-therapists` is on `19.2.8`. Freezing a range in a
   documentation commit would be this ADR deciding something it has no need
   to decide.
3. React and its types are added as **exactly-pinned devDependencies** —
   `.npmrc` sets `save-exact=true` and the guard requires `^\d+\.\d+\.\d+$` —
   so the package can typecheck and render in tests.
4. **Test environment:** rendering assertions should use
   `react-dom/server`'s static render under the existing **`node`**
   environment rather than introducing `jsdom` and a DOM testing library for
   Icon. Icon has no interaction to simulate; its contract is the rendered
   markup, the `aria-hidden` default, the mirroring attribute and the token
   resolution. Deferring `jsdom` to the first interactive primitive keeps
   three supply-chain entries out of this commit and matches
   `vitest.config.ts`'s own staging intent. The registry's own tests need no
   React at all — a flag per glyph is data.
5. `ARCHITECTURE.md`'s C1 row and `vitest.config.ts`'s comment get the same
   one-line correction: the trigger is **the first React-bearing module**, not
   "the first primitive".

**If the owner reads `ARCHITECTURE.md`'s sentence as a binding ordering rule
rather than a dated rationale**, the consequence is concrete and should be
stated: Icons would have to wait for a primitive, the first primitive
available to go first is `TextField` or `Select` — `Button` is partly blocked
and `BottomSheet` fully blocked — and `Button`'s `iconStart` prop would then be
retro-fitted. The decision brief accompanying this ADR carries that as a
confirmation item, not as an invented ruling.

### 7 · The initial glyph inventory

**Proposed by this ADR, not quoted from authority** — no canonical source
enumerates glyph names. Two admission rules keep the proposal honest:

1. **Canonical evidence for the glyph.** Either a canonical section **names
   the glyph** — v0.2 §5's two mirroring lists, or a §3 component description
   that names it outright — **or** a canonical section specifies a surface
   that **cannot render without one**. The second clause is stated explicitly
   because most of the inventory rests on it: §3.2's ImageUploader specifies
   an add target and a remove affordance without naming a `+` or a bin, and a
   name admitted that way is weaker evidence than a named glyph. The **Ev.**
   column below says which clause each row relies on — **N** for named, **R**
   for required by a specified surface.
2. **A specified surface must consume it.** A glyph that §5 mentions but no
   specified surface uses is **left out**, not speculatively added.
   `forward`, `next`/`previous`, `trending`, `undo`, `phone`, `map pin`,
   `lock`, `wallet`, `shield` and **`clock`** are all named by §5 and are all
   **deliberately excluded** on this rule — each is a one-line additive PR
   when a surface claims it. `clock` is excluded for exactly the reason the
   other nine are: §4.5 requires countdowns to be *shown as remaining
   duration* and to *"tick without animation"*, and names no glyph, so
   admitting it while excluding `lock` and `wallet` would be inconsistent.

| Name | Mirror | Ev. | Why this name exists |
| --- | --- | --- | --- |
| `back` | **yes** | **N** | §3.3 TopAppBar: *"Back is a 44px button labelled «بازگشت» with a **mirrored chevron**."* Named in §5's mirror list. |
| `chevron` | **yes** | **N** | §3.3 ListRow: *"trailing badge or **mirrored chevron**."* Named in §5's mirror list. The forward-pointing counterpart to `back`, which is why both exist and both mirror. **Not** claimed for §3.2 Select, whose canonical API is a native control that draws its own affordance. |
| `search` | no | **R** | §3.2 SearchInput: *"Pill field with **leading glyph**"* — the glyph is specified, its identity is not. |
| `close` | no | **R** | §3.2 SearchInput's `onClear` *"clear affordance"*, and §6 Targets' *"clear buttons"*. Non-directional. **No canonical surface yet requires a *dismiss* glyph** — owner finding IA-3 records that a banner dismiss control *"is not currently part of the canonical InfoBanner or ErrorBanner API"* — so this name covers the clear affordance today and nothing more. |
| `check` | no | **N** | Owner Decision 12b names *"appropriate **checkmarks**, remove glyphs and similar on-brand Icon/glyph cases"*. Consumed by §3.2 Checkbox's checked state and §3.3 Stepper's **complete** node. |
| `alert` | no | **R** | §3.4 ErrorBanner, plus §6 Non-colour signalling: *"Every state carries a word or glyph as well as a tone."* |
| `info` | no | **R** | §3.4 InfoBanner, same §6 requirement for the info and neutral tones. |
| `camera` | no | **R** | §3.2 ImageUploader: *"Clinical photo capture"* — the capture affordance is specified, the glyph is not named. |
| `trash` | no | **N** | Owner Decision 12b names *"**remove glyphs**"*. Consumed by §3.2 ImageUploader's `onRemove`; §6 Targets names *"thumbnail removals"* explicitly. |
| `plus` | no | **R** | §3.2 ImageUploader's `onAdd` and its *"empty target (dashed)"* state. The kit's green `+` appears in the Incidental Accessibility Findings evidence, which is **kit evidence about a Tier 2 surface and not authority** — cited for neither the name nor a colour. |
| `star` | no | **N** | Named in §5's **never mirror** list; consumed by §3.5 Rating: *"Read-only five-star average"*. |

**Eleven names, two of them mirrored, five resting on a named glyph and six on
a specified surface.** Two mirrored is the honest count the rules produce —
both are in §5's mirror list, no glyph from §5's never-mirror list is marked
mirrored, and none of the ten excluded names appears in the proposed union.
Padding either column would mean inventing consumers.

**Two names ship ahead of consumers the owner has blocked.** `alert` and
`info` are admitted on §3.4's ErrorBanner and InfoBanner, and finding IA-6
blocks both of those components until the banner accent contract exists. That
is deliberate and is the same shape as the keyframes: the registry publishes a
glyph and a mirroring flag, never a tone, so nothing in IA-6 is pre-empted or
filled by admitting the names.

**Most of these glyphs serve Tier 2, application-owned components, and that
is correct, not a boundary violation.** It is the same shape ADR 0004 already
accepted for the keyframes: *"Three of four keyframes serve components this
package does not ship."* Frozen §2.1 assigns the **icon set** to this
package; which destination, banner or row uses which glyph stays a product
decision in the application, exactly as v0.2 §7.1 says of the BottomNav
destinations and their icons.

**No claim is made about the complete future set.** v0.2 §9 unknown 4 —
*"the ZakhmBan glyph set that replaces Lucide behind the abstraction does not
exist yet"* — is untouched. This inventory is the **initial** Lucide-backed
set, and Phase 7 replaces its data source wholesale without renaming anything.

## Consequences

**Positive.**

- Icons can start now. They are the only item in the v0.3.0 allocation that
  waits on no deferred owner decision, and the abstraction is a prerequisite
  for `Button`'s `iconStart` and for most Tier 2 components.
- `dependencies` stays `{}`, so the git-tag consumption model is untouched and
  no consumer gains a transitive dependency.
- The glyph set becomes swappable by regeneration, which is the property v0.2
  §7 claims for the registry and the thing Phase 7 depends on.
- Every mirroring decision becomes a reviewable line of data instead of a
  per-usage judgement in four applications.
- The public surface widens by three named exports and no subpath, so the
  exports allow-list and its guard stand.

**Negative, and accepted.**

- The repository gains a **generator**, a **`.tsx` file**, **React
  devDependencies** and an **upstream icon source in the build path** — four
  supply-chain and review-surface increases in one commit. The parity check,
  the exact pins and the devDependency allow-list are what keep them
  reviewable.
- The licence notice adds a second vendored third-party artifact and the asset
  allow-list must widen to admit it. That is the cost of distributing the
  notice properly, and the font precedent already paid it once.
- Three architecture guards were written to **forbid** this work until it was
  authorized, so the implementation diff will read as if it is weakening them.
  §5 exists so a reviewer can tell authorized amendment from erosion.
- A consumer that uses no icon still has the module in its graph and depends
  on tree-shaking to drop it. Accepted: the alternative is a fourth subpath,
  which is deferred.
- Eleven names will not be enough. Growth is additive and cheap; the
  discipline is that each addition cites a surface.

## Alternatives considered

Delivery options **B**, **C** and **D** are compared and rejected with reasons
in §3, and a published runtime `iconNames` array in §4. In addition:

- **Ship Icons through a new `./icons` subpath.** Rejected: the registry's
  binding deferral list closes *"any fourth public subpath"*, and ADR 0003
  §13's precedent is that if implementation proves an asset cannot resolve
  through the existing entries, **work stops and the ADR is amended** rather
  than a subpath being added by inference.
- **Defer Icons and start with a primitive.** Rejected as the default, but
  retained as the contingency if the owner reads the "first primitive"
  sentence as binding — see §6. The cost is that `Button`'s `iconStart` gets
  retro-fitted, and `Button` is itself partly blocked by the open `sm`
  geometry.
- **Author the registry by hand to avoid a generator.** Rejected in §3 as
  option D, and separately inconsistent with ADR 0003's generated-artifact
  precedent, which exists so a committed artifact can be re-derived and
  proved.
- **Let the mirroring flag default to `false` and annotate only directional
  glyphs.** Rejected: v0.2 §5 makes mirroring a declared property, a missing
  flag reads as a decision nobody made, and the failure is silent and visual.
- **Infer mirroring from the glyph name.** Rejected for the same reason, with
  the added defect that it would break the moment a glyph is renamed.
- **Settle the Button `sm` geometry, the overlay-root technique, or the pill
  radius here to unblock more of v0.3.0.** Refused. Each is an open **owner**
  deferral, the deferral rule states that *"No implementer, reference kit,
  consumer implementation or AI agent may fill one"*, and an ADR carries
  representation authority only — it *"does not invent or silently change the
  value itself."*

## What this ADR authorizes, and what it does not

**Authorizes:** nothing to be built. It records a representation contract for
review.

**Does not authorize:** implementation of Icons or of any primitive · a
`src/icons/` directory, component, registry, generator or licence file · any
manifest, `exports`, guard, build, lint or test change · a peer-dependency
range · a push, pull request, merge, version bump, tag, release-workflow run,
GitHub Release, package publication, consumer bump, deployment or repository
visibility change.

**Still deferred, and untouched by this ADR:** the overlay-root and Portal
technique and everything D-6 lists with it · the 40px small-control geometry
and the Button `sm` 40-versus-44 conflict · `--radius-pill` · Decision 6b's
Modal radius · Decision 4b's shadows · the banner accent contract (IA-6),
which blocks InfoBanner and ErrorBanner implementation and would govern the
tone of their accent glyphs · **a semantic active/destructive colour mapping
for Icon — a `tone` prop or named token bindings for §3.1's "green" and "red"
— which §1.1 shows the initial API does not need and which this ADR
therefore leaves to the owner** · typography role assignment for error text ·
border widths · any sixth primitive · any fourth public subpath.

## Sources

- Frozen Technical Architecture v1.1 §2 (repository #3 of 8 and its contents),
  §2.1 (what is shared; *"admin and website consume tokens and formatting
  only"*; primitives frozen at five), §2.2 (git-tag consumption, committed
  `dist/`, no prepare step, *"its CI builds a smoke page per primitive"*) —
  workspace `project-reference/architecture/`.
- UI System Specification v0.2 — design decision 5 (Icons), §3.1 (Icon), §5
  (RTL and icon direction), §6 (Targets, Semantics, Non-colour signalling), §7
  (package structure, exports, dependency policy), §7.1 (boundary), §7.2
  (implementation architecture decisions), §7.3 (consumption model), §8
  (Phase 7), §9 (Tier 1 foundations, Tier 2, unknown 4) —
  [`../architecture/zakhmban-ui-system-spec.md`](../architecture/zakhmban-ui-system-spec.md).
- [`../architecture/canonical-document-registry.md`](../architecture/canonical-document-registry.md)
  — authority levels, value-versus-representation, the Release-Sequence
  Ruling's `v0.3.0` allocation, D-6, the deferral rule, change control.
- [`../architecture/token-table-ratification.md`](../architecture/token-table-ratification.md)
  — Decision 12b (`--on-brand-icon`, and its naming of checkmarks and remove
  glyphs), the §3.1 Icon navy default bound to `--text-primary`, the
  **Incidental Accessibility Findings Ruling** of 2026-09-18 — **IA-3** (a
  banner dismiss control is not canonical), **IA-5** (the raw-palette usage
  guard owed by the first component implementation commit) and **IA-6** (the
  banner accent contract, and the confirmation that §3.1's Icon contract
  names navy, green and red only, with no icon role bound to the latter two) —
  the open deferral list, and the absence of any ruling on the Icon
  abstraction, registry, mirroring flags or glyph licensing.
- [`0003-token-representation-and-artifact-contract.md`](0003-token-representation-and-artifact-contract.md)
  — generated-artifact precedent, the three-subpath limit, the gap-reporting
  discipline, stylesheet placement.
- [`0004-styles-keyframe-representation-contract.md`](0004-styles-keyframe-representation-contract.md)
  — the precedent for publishing an identifier whose consumer is Tier 2, and
  for adding a public contract without a new subpath.
- [`README.md`](README.md) — what belongs in this series, the ADR format, and
  the value-versus-representation boundary.
- [`../../ARCHITECTURE.md`](../../ARCHITECTURE.md) — the C1 decision table,
  including the `react` / `react-dom` row discussed in §6. Subordinate.
- Repository guards, read as evidence of the current contract:
  `tests/architecture/dependencies.test.ts`, `source-entry.test.ts`,
  `root-export.test.ts`, `exports-contract.test.ts`, `build-output.test.ts`,
  `package-metadata.test.ts`; `scripts/build.mjs`; `vitest.config.ts`;
  `eslint.config.mjs`; `.npmrc`.
