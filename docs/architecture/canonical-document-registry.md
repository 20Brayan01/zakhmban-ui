# Canonical Document Registry

- **Status:** Approved
- **Date:** 2026-09-18
- **Decided by:** human design/product owner
- **Scope:** documentation governance for `zakhmban-ui` and its UI layer.
  **No token, value, component, export, font, build artifact or frozen
  behaviour is changed by this ruling.**

## Purpose and scope

This file is the **single precedence statement** for `zakhmban-ui`. It exists
because the same question was previously answerable only by reading five
separate statements that did not name the same documents:

> **When two documents disagree, which document governs?**

Every other document in this repository — `ARCHITECTURE.md`, `README.md`,
`docs/adr/README.md`, `tests/architecture/README.md` — now points here rather
than restating a chain of its own.

**Scope limit.** This registry governs **`zakhmban-ui` and its UI layer**. It
makes **no project-wide claim**, and it does not speak for the backend, the
applications' product behaviour, or any repository other than this one.

## Authority levels

Highest first. A level may override everything below it and nothing above it.

### 1 · Frozen Technical Architecture v1.1

**Location:** workspace `project-reference/architecture/`,
`ZAKHMBAN-V2-FROZEN-TECHNICAL-ARCHITECTURE-v1.1.md`

Governs **repository structure, package boundaries, the sharing model and the
frozen technical architecture**. It is the **highest package-relevant technical
authority currently available**. Nothing in this repository overrides it.

### 2 · `project-context/`

**Location:** workspace `project-context/` (ten approved documents)

Remains **canonical for product truth**. Nothing in this repository redefines
it.

**It does not override newer, explicitly approved package-local UI
architecture, owner rulings or accepted representation decisions when those
sources operate within their stated `zakhmban-ui` scope.** See
"`project-context/` boundary" below.

### 3 · Approved owner design/product rulings

Approved owner rulings govern **design values, classifications and explicit
interpretations**.

- **An owner ruling may supersede UI System Specification v0.2 only for the
  exact rules or values it explicitly names.**
- **Unmentioned parts of v0.2 remain in force.**
- **Owner rulings do not override Frozen Technical Architecture v1.1 or
  product truth.**

The inventory of approved rulings is below.

### 4 · UI System Specification v0.2

**Location:** `docs/architecture/zakhmban-ui-system-spec.md`
**Status: CANONICAL — SUPERSEDED IN PART**

Remains the **canonical baseline** for tokens, components, RTL, accessibility,
package responsibilities and documented UI scope.

**The amendments to it are listed in "Supersessions of record" below.** The
historical text inside v0.2 is **not rewritten** — the registry points at what
replaced it, and v0.2 continues to read as originally supplied.

### 5 · Accepted ADRs

**Location:** `docs/adr/`

Accepted ADRs govern **representation, delivery, packaging and public-contract
mechanics within their stated scope**. **They do not invent or silently change
design values.**

### 6 · Token Table Ratification Worksheet

**Location:** `docs/architecture/token-table-ratification.md`

The **canonical register** of individually approved token decisions, approved
owner rulings, amendments, deferred decisions and unresolved decisions.

**It is not an independent authority above the rulings and specifications it
records.** It is where they are written down.

- **Only entries explicitly marked approved or ratified are binding.**
- **Open, deferred or proposed entries are not implementation authority.**
- **The Token Table as a whole remains unsigned and partially ratified.**

### 7 · Pointer and orientation documents

`ARCHITECTURE.md`, `README.md` and `tests/architecture/README.md`. They
**point at this registry** and describe their own subordinate purpose. They
carry no independent authority and may not be cited against any level above.

### 8 · Evidence and legacy sources

The following **may supply evidence** but **may not define, change or override
canonical values**:

- the V2 reference kit;
- the V2 design canvas;
- the commissioning brief;
- the Phase 1 design kit;
- consumer implementations;
- migration evidence of every kind.

**Agreement with them is corroboration only.** A value is canonical because a
canonical source states it, never because an evidence source repeats it.

## Value authority versus representation authority

These are distinct and must not be conflated.

| | Value authority | Representation authority |
| --- | --- | --- |
| Answers | **what** a value, role or behaviour is | **how** it is named, expressed, generated and exported |
| Held by | Frozen v1.1 · `project-context/` · owner rulings · v0.2 | accepted ADRs |
| Examples | the approved palette; the approved weights; the stacking integers; the approved font family | the Tailwind delivery artifact (ADR 0001); the validation API shape (ADR 0002); CSS/TypeScript/Tailwind token representation (**ADR 0003**) |
| Recorded in | the Token Table | the ADR series |

A decision that fixes a value settles nothing about its representation, and an
ADR that fixes a representation settles nothing about the value.

## Global supersession rule

**A newer source supersedes an older canonical source only when all four of
the following hold:**

1. **it was explicitly approved by the authorized human owner;**
2. **it identifies the exact earlier rule, value or scope being replaced;**
3. **it states the new effective rule;**
4. **the supersession is entered in this registry or its linked decision
   register** (the Token Table).

**Recency alone never creates authority.**

**Silence never creates permission.**

**A deferred or unresolved decision must not be filled by an implementer, a
reference kit, a consumer implementation or an AI agent.**

## Canonical document inventory

| Document | Location | Status | Governs |
| --- | --- | --- | --- |
| Frozen Technical Architecture v1.1 | workspace `project-reference/architecture/` | **CANONICAL — CURRENT** | repository set, sharing model, five-primitive freeze, consumption model |
| `project-context/` (ten documents) | workspace | **CANONICAL — CURRENT** | product truth |
| UI System Specification v0.2 | `docs/architecture/zakhmban-ui-system-spec.md` | **CANONICAL — SUPERSEDED IN PART** | tokens, components, RTL, accessibility, §7 package architecture, §9 scope |
| Token Design Authority Ruling (Ruling B) | `docs/architecture/token-design-authority-ruling.md` | **HISTORICAL DECISION RECORD** — approved, immutable | classification of the V2 kit; six governance clauses |
| Token Table Ratification Worksheet | `docs/architecture/token-table-ratification.md` | **CANONICAL DECISION REGISTER** — open, partially ratified, **unsigned** | the record of every token decision and owner ruling |
| This registry | `docs/architecture/canonical-document-registry.md` | **CANONICAL — CURRENT** | documentation authority and supersession |
| ADR 0001 | `docs/adr/0001-tailwind-token-delivery.md` | **Accepted** | Tailwind delivery form |
| ADR 0002 | `docs/adr/0002-validation-helpers-contract.md` | **Accepted** | Validation Helpers public contract |
| ADR 0003 | `docs/adr/0003-token-representation-and-artifact-contract.md` | **Accepted** — 2026-09-18 | token representation and artifact contract |
| ADR 0004 | `docs/adr/0004-styles-keyframe-representation-contract.md` | **Accepted** — 2026-09-24 · **behaviour resolved 2026-09-25** | the four public keyframe names, their ownership, publicity and versioning rules, and the owner-decided behavioural contract each carries |
| ADR 0005 | `docs/adr/0005-icon-representation-contract.md` | **Accepted** — 2026-10-03 | the Icon registry's generated-and-committed representation and its per-glyph mirroring flag, the glyph-delivery method and licence rule, the eleven public names, and the root-export surface for `Icon` / `IconProps` / `IconName` |
| ADR 0006 | `docs/adr/0006-overlay-root-representation-contract.md` | **Accepted** — 2026-10-04 | the overlay-root DOM contract between the application-owned `Screen` and the package-owned `BottomSheet` — the two boolean attributes, the six structural obligations, the invalid-structure list, and delivery of the overlay styling through the existing `./styles` entry |
| `ARCHITECTURE.md` | repository root | pointer | where each rule lives |
| `README.md` | repository root | orientation | consumption and commands |
| `tests/architecture/README.md` | `tests/architecture/` | orientation | guard traceability |

## Owner-ruling inventory

All are **approved**. None is a numbered Token Table decision. Each is recorded
in full in the Token Table.

| Ruling | Date | Scope | Supersedes in v0.2 |
| --- | --- | --- | --- |
| **Token Design Authority Ruling (Ruling B)** | 2026-09-15 | classification of the V2 design kit as evidence | **nothing** — it states it confirms the chain unchanged |
| **Owner Contrast Ruling** | 2026-09-18 | the two documented contrast defects | **§2.1's `--neutral-status-fg` value**, and **§2.1's `--text-muted` token together with §2.1's and §6's eligibility clauses for it** |
| **Incidental Accessibility Findings Ruling** | 2026-09-18 | the four incidental findings; the control-boundary interpretation | **nothing** — IA-1 interprets §6's existing sentence and changes no value |
| **Owner Font Contract and Delivery Ruling** | 2026-09-18 | family, fallback stack, delivery model, pinned artifact, licensing basis | **nothing** — it confirms §2.2's family and settles delivery, which v0.2 never fixed |
| **Owner Interaction Ladder Mapping Ruling** | 2026-09-18 | the nine filled-action ladder identifiers for green, blue and red; retirement of Decision 3a's six | **§2.1's interaction-family shape and count summary** — *"`--*-hover` / `--*-press` · 6 tokens"* — replaced by three tone families × rest/hover/press = **nine** identities. It **also** supersedes **Decision 3a's six identifiers**, which v0.2 never prints. |
| **Scoped Token Foundation V1 Owner Sign-off** | 2026-09-18 | freezes the V1 value and semantic baseline; authorizes ADR 0003 to define its representation | **nothing** — it approves no new value and supersedes nothing; it fixes the standing of values already approved |
| **Typography Alias Ruling** | 2026-09-19 | the exact authored value of the eight public typography aliases — `--text-display`, `--text-page-title`, `--text-section-title`, `--text-card-title`, `--text-body`, `--text-label`, `--text-caption`, `--text-button` — each a **Semantic Typography Size Alias** authored as `--text-<step>: var(--text-<step>-size)` | **nothing in v0.2** — v0.2 never states an alias value. It supersedes **ADR 0003's ambiguous "composite alias" wording** for these eight properties only. No identifier, value, count or Tailwind mapping changes. |
| **Token Foundation V1 Implementation Authorization** | 2026-09-19 | authorizes Token Foundation V1 implementation only; discharges sign-off condition 3 subject to final audit | **nothing in v0.2** — it supersedes the **current-status statements** in this registry and the Token Table that said implementation was blocked or unauthorized. Publication, merge, tag, release, Styles, components and consumer integration stay unauthorized. |
| **Token Foundation V1 Publication Authorization** | 2026-09-20 | authorizes publication of Token Foundation V1 — branch push, pull request, merge and post-merge verification — after the final implementation audit passed against `cf39e03522c462b1061b3f47d9b01dc2c67aaa05` and closed BCG-1 and BDC-1 | **nothing in v0.2** — it supersedes, for publication only, the 2026-09-19 record's *"Publication, merge, tag and release remain unauthorized"*. **Tag, release and package publication stay unauthorized**, as do Styles, components, consumer integration and every deferred entry. |
| **Token Foundation V1 Release Preparation** | 2026-09-20 | authorizes release preparation, limited to wiring `pnpm smoke:tailwind` into `release.yml` before the first tag | **nothing in v0.2** — it supersedes no rule. It records the disposition of the release-only blocker carried by the publication authorization. **Version, tag, release, package publication, Styles, components and consumer integration stay unauthorized.** |
| **Owner Release Model Ruling** | 2026-09-20 | selects owner-triggered automated tagging: the owner supplies the version and the exact `main` SHA, the workflow validates first and only then creates and pushes the tag; an automated tag is verified in-run by `verify-created-tag`, since a `GITHUB_TOKEN` push starts no `push.tags` run | **nothing in v0.2** — it supersedes the earlier reading that a tag-triggered workflow could prevent a bad tag, and the *"release blocker cleared"* wording that rested on it. **Version change, GitHub Release and package publication remain unauthorized.** |
| **Token Foundation v0.1.0 Release-Sequence Ruling** | 2026-09-20 | allocates Token Foundation **v0.1.0**, Styles **v0.2.0**, Icons and the five primitives **v0.3.0**; Phase 6's **v1.0.0** target unchanged | **nothing in v0.2** — v0.2 §8's Phase 6 `v1.0.0` exit criterion is untouched. It supersedes only the two `README.md` roadmap placeholders (Styles → v0.1.0, Icons/primitives → v0.2.0), which were never ADR-frozen and never a consumer commitment. **No token, value, count, artifact or export changes.** |
| **Styles Foundation v0.2.0 Contract Ruling** | 2026-09-24 | the **reset contract** (D-1), the **global body contract** (D-2), the **focus-visible contract** (D-3), the **reduced-motion contract** (D-5), and the **allocation of the overlay-root and Portal question to v0.3.0** (D-6). Keyframe naming (D-4) is delegated to **ADR 0004** as representation. | **nothing in v0.2** — v0.2 §7 places `reset, global, keyframes` under `styles/` but states no reset rule, no body rule and no focus mechanism, so there is nothing for this ruling to replace; where v0.2 does state a value (§2.2's `text-wrap: pretty`, §2.4's reduced-motion duty, §5's document-level direction ownership) the ruling **applies** it. It supersedes, **for the overlay-root technique only**, the Release-Sequence Ruling's sentence placing that technique in v0.2.0. **No token identifier, value, count, artifact or export changes.** |
| **Styles Keyframe Behaviour and Procedural Ratification** | 2026-09-25 | **Part 1** procedurally ratifies the substantive content of local draft commit `6a6eae84`, clarifying that the disputed **STOP** barred inventing or silently filling undefined behavioural values and required implementation to stay blocked, but did not bar documenting the gap or creating the local draft. **Part 2** supplies the exact behavioural contract for all four keyframes — start and end frames, durations, timing functions, iteration, RTL invariance, static fallbacks — plus the repetition rule and a refined reduced-motion rule. | **two scoped clauses of v0.2 §2.4**, and nothing else: the single-curve statement is superseded **for `zakhmban-shimmer` and `zakhmban-spin` only**, which use `linear`; and the closed three-duration set is supplemented by **1000ms for `zakhmban-spin` only**, as an authored-Styles value that is **not a token** and does **not** reopen the set. Neither exception may be generalised. **No token identifier, value, count, artifact or export changes**, and **no keyframe name changes.** |
| **Icon Foundation Implementation Authorization** | 2026-10-03 | accepts **ADR 0005** and authorizes **preparation** of the eleven-name Icon foundation only — component, generated registry, pinned Lucide devDependency, verbatim licence, React peers, root exports, the mapped guard amendments and the IA-5 raw-palette guard | **nothing in v0.2** — it approves no design value and changes no token, count, artifact or export. It supersedes only the **current-status statements** in this registry, the Token Table and `README.md` saying Icons have not begun. **Merging any implementation pull request, the other primitives, BottomSheet/Portal, a semantic active/destructive colour mapping, version change, tag, release, publication, consumer migration and deployment all stay unauthorized.** |
| **Overlay-Root and Button sm Contract Ruling** | 2026-10-04 | **Decision A** — the overlay-root / `BottomSheet` modal boundary: the application-owned `Screen` supplies a document-level overlay root and identifies the background scope; the package-owned `BottomSheet` portals into it and owns focus entry and containment, Escape and scrim dismissal, focus return, body scroll locking and background unavailability to pointer **and** keyboard, restoring all of it on close and unmount; one sheet at a time; `Portal` and `FocusTrap` stay internal and unexported. **Decision B** — Button `sm` has a **minimum visible block size of 44px**, visible control and interactive target coinciding at ≥ 44 × 44px, as a minimum and not a fixed height | **v0.2 §9**'s *"Modal is expected to reuse the package's focus mechanics"* sentence; **v0.2 §2.3**'s *"small control 40"*; **v0.2 §3.2**'s *"sm 40"*; and **ADR 0003 §5**'s *"overlay composition is application-owned"* **only** where it would place `BottomSheet`'s internal portal behaviour outside the package. **No token identifier, value, count, artifact or export changes.** Implementation, ADR 0006, a sixth primitive, a public `Portal`/`FocusTrap`, a new subpath, version change, tag, release, publication, consumer migration and deployment all stay unauthorized. |
| **Overlay Failure-Signalling Channel Correction** | 2026-10-04 | **withdraws the final sentence of Decision A §A.4** — *"The mechanism for making it evident is representation and belongs to ADR 0006"* — so that **§A.9 governs** and the developer-visible failure-signalling channel is an **internal implementation choice**. The sentence is **struck in place, not deleted** | **nothing in v0.2.** It supersedes **one sentence of Decision A §A.4** and nothing else. **Both requirements §A.4 exists for remain binding**: invalid structure must produce a developer-observable failure and must never silently fall back to an inline sheet. §A.9 is unchanged. **No token, value, count, artifact or export changes**, and no implementation is authorized. |
| **BottomSheet Height Ruling** | 2026-10-04 | the sheet **grows with its content** up to a maximum block size of **`calc(100dvh - var(--control-min-target))`**; **long content scrolls inside the sheet** while **title and footer stay reachable**; **the sheet must not overflow the dynamic viewport** | **nothing in v0.2** — v0.2 specified no sheet height anywhere, so there is nothing to replace; this closes an **unrecorded gap**, not a listed deferral. **No token is created** — `--control-min-target` is an existing public token at `44px` — and **no count, artifact or export changes**. Decision 16b is **not** reopened. |
| **BottomSheet Implementation Authorization** | 2026-10-04 | authorizes **`BottomSheet` only** — a branch, implementation commits, a normal push and **one reviewable pull request** against the approved Decision A, Accepted ADR 0006 and height-ruling contracts | **nothing in v0.2** — it approves no design value and changes no token, count, artifact or export. It supersedes only the **current-status statements** saying the primitives have not begun. **Merging any pull request, `TextField`, `Select`, `OtpInput`, `Button`, Button `md`'s token representation, a sixth primitive, a public `Portal`/`FocusTrap`, a new subpath, version change, tag, release, publication, consumer migration and deployment all stay unauthorized.** |

Individually approved Token Table decisions carry the same authority as the
ruling that approved them, within the scope that decision names.

## Supersessions of record

Every amendment to UI System Specification v0.2 currently in force. Each is
documented in place in the Token Table; this table is the index.

| Superseding source | Exact v0.2 rule or value replaced | New effective rule |
| --- | --- | --- |
| **Decision 3b** (amended and approved, 2026-09-15) | §2.1's *"green ring on green fills"*; `--focus-ring-green`; `--focus-ring`; §6's *"3px ring"* wording | one fill-agnostic two-layer focus indicator, recorded in the Decision 3b block |
| **Owner Contrast Ruling** (2026-09-18) | §2.1's `--neutral-status-fg` value `#8A9384` | **`#667085`** (`--neutral-600`); `-bg` unchanged |
| **Owner Contrast Ruling** (2026-09-18) | §2.1's `--text-muted` token, its §2.1 eligibility clause and §6's *"permitted at 12px captions on white only"* | **retired as a semantic text token**; readable de-emphasis uses `--text-secondary` |
| **Owner Interaction Ladder Mapping Ruling** (2026-09-18) | §2.1's interaction-family **shape and count** summary — *"`--*-hover` / `--*-press` · 6 tokens"*. The row's **behavioural rule is not superseded**. | **three filled-action tone families** (green, blue, red) × **rest / hover / press** = **nine** logical semantic token identities, recorded in the Token Table |
| **Overlay-Root and Button sm Contract Ruling · Decision A** (2026-10-04) | §9's Note on Modal and BottomSheet — the sentence *"The application's Modal is expected to reuse the package's focus mechanics rather than re-implement them."* **The rest of the note is not superseded.** | for v0.3.0 the application-owned `Modal` **provides its own focus mechanics**; the package exports none, because `Portal` and `FocusTrap` stay internal to `BottomSheet` |
| **Overlay-Root and Button sm Contract Ruling · Decision B** (2026-10-04) | §2.3's Control-geometry term **`small control 40`**. The 44px tap minimum and every other entry in that list stand. | Button `sm` has a **minimum visible block size of 44px**; the visible control and the interactive target coincide at **≥ 44 × 44px** |
| **Overlay-Root and Button sm Contract Ruling · Decision B** (2026-10-04) | §3.2's Button row term **`sm 40`** in *"Sizes sm 40 / md 48 / lg 52"* | **`sm` ≥ 44px minimum**, not a fixed height; **`md` 48 and `lg` 52 unchanged** |

**Nothing else in v0.2 is superseded.** Every rule, value, component and
section not listed above remains in force exactly as printed.

**One further supersession is recorded that does not touch v0.2**, and is
listed here so the register is complete. The **Owner Interaction Ladder
Mapping Ruling** (2026-09-18) **also supersedes the six semantic identifiers
approved by Decision 3a** — `--green-hover`, `--green-press`, `--blue-hover`,
`--blue-press`, `--red-hover`, `--red-press` — and **replaces them with nine
state-aligned identifiers**, `--action-<tone>-rest`, `-hover` and `-press` for
green, blue and red, at the values Decision 12a already approved. Those six
came from **Decision 3a**, not from v0.2, which never printed them; the
ruling's v0.2 supersession is the separate §2.1 shape-and-count item listed in
the table above.

**This ruling is value and semantic authority.** It fixes which semantic
identity carries which approved value for which state, and it changes **no
value, no raw palette entry and no contrast result**. **ADR 0003 still owns
representation** — how these nine identities are expressed in CSS, TypeScript,
Tailwind, source, `dist` and public exports. **Every other part of UI System
Specification v0.2 remains effective**, including the behavioural rule in the
superseded row: hover darkens the fill, press darkens further plus
`scale(0.98)`. The ruling is recorded in full in the Token Table.

**v0.2 is not rewritten.** Its historical text stands; this index is how a
reader learns what replaced part of it.

## ADR inventory

| # | Title | Status | Authority kind |
| --- | --- | --- | --- |
| **0001** | Tailwind Token Delivery Strategy | **Accepted** — 2026-09-11 | representation / delivery |
| **0002** | Validation Helpers Public Contract | **Accepted** — 2026-09-13 | representation / public contract |
| **0003** | Token Representation and Artifact Contract | **Accepted** — 2026-09-18 | representation |
| **0004** | Styles Keyframe Representation Contract | **Accepted** — 2026-09-24 | representation / public contract |
| **0005** | Icon Representation and Glyph Delivery Contract | **Accepted** — 2026-10-03 | representation / public contract |
| **0006** | Overlay-Root Representation Contract | **Accepted** — 2026-10-04 | representation / public contract |

**ADR 0003 is accepted, 2026-09-18.** It settles the representation of the
Token Foundation V1 values the Scoped Token Foundation V1 Owner Sign-off froze
— names, CSS custom properties, the raw-to-semantic `var()` layer, the typed
object, the Tailwind v4 `@theme` artifact, the three public subpaths,
generation, source/`dist` parity, the font boundary and the test contract.

**Amended 2026-09-19** to add **§11, the TypeScript token public API** — one
runtime export `tokens`, three type exports `TokenName` / `TokenValue` /
`Tokens`, a flat object keyed by canonical CSS identifier and valued with
resolved strings, `as const`. This closed the one blocking gap the final
readiness audit found and **changed no design value**.

**Clarified 2026-09-19** by the **Typography Alias Ruling**, which supplies
the exact authored value of the eight typography aliases ADR 0003 named,
counted and placed but never valued, and replaces the ambiguous phrase
"composite alias" with **Semantic Typography Size Alias** for those eight
properties. **No design value, identifier, count or Tailwind mapping
changes**, and the local implementation required no correction.

**It creates and changes no design value**, supersedes no part of UI System
Specification v0.2, and resolves no deferred decision. **Nothing is implemented
by it.** Three values it could not derive from a canonical source are
**reported as gaps rather than invented**: the **pill radius literal**, which
§2.3 never states; the **four keyframe names**, which §2.4 describes without
naming and which belong to Styles; and the **40px small-control geometry**,
which cannot be published while the Button sm 40-versus-44 conflict is open.

**ADR 0004 is accepted, 2026-09-24.** It freezes exactly four public
`@keyframes` identifiers — **`zakhmban-shimmer`**, **`zakhmban-fade-up`**,
**`zakhmban-slide-up`** and **`zakhmban-spin`** — and the ownership,
publicity, generation and versioning rules that follow from publishing them.
**It closes ADR 0003's second reported gap for the names only.** It records
that the identifiers are package-owned and public, that CSS makes the
`@keyframes` namespace global so a consumer redefinition silently replaces the
package's animation, that the keyframes are **authored Styles CSS and not
generated token output**, that **no `--animate-*` Tailwind key is authorized
and the preset is unchanged**, and that each keyframe must end in the
element's static end state so the approved reduced-motion contract can
suppress it correctly. **It creates no motion value on its own authority**
and **nothing is implemented by it.**

**Behaviour resolved 2026-09-25.** As accepted, ADR 0004 reported that the
four keyframe **bodies** were not derivable from any canonical source and
listed each undefined field **as a gap rather than inventing one**. The
**Styles Keyframe Behaviour Owner Decision of 2026-09-25** supplied every
missing value before anything was published, and **§8 was rewritten to carry
the exact contracts**: start and end frames, durations bound to
`--duration-shimmer`, `--duration-base` and `--duration-slow` where an
existing public token resolves to the approved value, timing functions,
iteration rules, RTL invariance, per-keyframe reduced-motion fallbacks and
the repetition rule. **No behavioural field remains unresolved and ADR 0004
§8 is closed.** The four names, the ownership and publicity rules, the
authored-versus-generated line and the Tailwind position are **unchanged**,
and **no token was created**. ADR 0004 carries **two scoped supersessions of
v0.2 §2.4** that belong to the owner, not to the ADR — `linear` for the two
repeating keyframes, and 1000ms for `zakhmban-spin` as an authored-Styles
value — each narrow, each non-generalisable, and both recorded in the Token
Table. **Implementation remains unauthorized.**

**ADR 0005 is accepted, 2026-10-03.** It settles the **representation** of
the Icon abstraction whose existence, geometry, colour contract, API shape,
accessibility default and registry-owned mirroring rule UI System
Specification v0.2 §3.1, §5, §7 and §9 already fix: a **generated, committed,
`--check`-parity-verified** glyph registry on ADR 0003's precedent, each entry
carrying its RTL mirroring decision as an **explicit boolean**; glyph data
obtained by a **build-time generator from an exactly pinned Lucide
devDependency**, so `dependencies` stays `{}`; a **verbatim licence copy**
travelling to `dist/` beside the artifact on the `OFL.txt` precedent; and
`Icon`, `IconProps` and `IconName` reaching consumers through the **existing
root entry with no fourth public subpath**. Its inventory is **eleven public
names** — `back`, `chevron`, `search`, `close`, `check`, `alert`, `info`,
`camera`, `trash`, `plus`, `star` — of which **only `back` and `chevron`
mirror**.

**It creates and changes no design value.** Its §1.1 reads v0.2 §3.1's
approved prop list — `name†` `size` `color` `strokeWidth`, with **no `tone`**,
unlike Text, Button, StatusBadge and IconButton — and concludes that the
initial Icon defines only the **bound navy default** (`--text-primary`, per
the Token Table) and takes every other colour from the **use site** through
`color`. **No semantic active/destructive colour mapping is proposed or
approved**, and that mapping stays a **future owner decision**; finding
**IA-6** already scopes the unbound-icon-role gap to **InfoBanner and
ErrorBanner**, both Tier 2. ADR 0005 likewise invents nothing for the
overlay-root and Portal technique, the Button `sm` 40-versus-44 geometry or
`--radius-pill`, each of which it names in its own still-deferred list.

**Upstream verified before acceptance.** §3 recorded three facts as
unverified rather than asserting them. A read-only check against exactly
pinned **`lucide@1.51.0`** (`license: ISC`; `dist.shasum`
`942068b228d8068baa1f302ad48b6d82cd4fae82`) closed all three — all eleven
glyphs present as pure `[tag, attrs]` data, one package-root `LICENSE`
carrying **both** the ISC notice and the **Feather MIT** attribution, and a
deterministic generator feasible with no runtime dependency — so **§3's stop
rule is discharged** and **no clause of the ADR changed**. The verification is
**version-scoped**: a later Lucide version must be re-checked. **Nothing is
implemented by the ADR**; implementation is authorized separately and
narrowly by the record below.

**ADR 0006 is accepted, 2026-10-04.** It settles the **cross-boundary
representation** that Decision A of the Overlay-Root and Button sm Contract
Ruling reserved for it: the application marks a document-level overlay root
with **`data-zakhmban-overlay-root`** and the content a sheet must disable
with **`data-zakhmban-overlay-background`**; **six structural obligations**
fix where the root sits and that it is unique, outside the background and
rendered unconditionally; **four invalid structures** are enumerated, and an
invalid one yields **no inline sheet** plus a **developer-observable
failure**; and the overlay styling reaches consumers through the **existing
`./styles` entry** on the ADR 0004 precedent, with **no fifth subpath and no
`package.json` change**. Direction needs no package rule — a `<body>`-child
root inherits `dir="rtl"` from the document, so owner **D-2** stands.

**It creates and changes no design value**, and it is **not authority over
one**. It names no selector beyond the two attributes the two sides must
share, and **leaves every internal mechanism open** — the React portal
technique, the inertness and scroll-lock mechanisms, focusable-element
enumeration, the **failure-signalling channel** and the overlay stylesheet's
path. **It adds no token, export, subpath, sixth primitive, public `Portal`
or public `FocusTrap`.** It preserves the layering caveat it was corrected to
carry: **document-level placement escapes the `Screen`'s stacking and
clipping ancestors but does not by itself prove paint order**, which depends
on the stacking contexts a given layout creates together with Decision 15's
approved layering rules and **must be verified in a consumer layout**.

**Its earlier Proposed merge did not accept it.** ADR 0006 entered `main` as
**Proposed** through pull request #20, merge commit
`36681b393c1987df7c3505e1898a1a818314c668`; **a merge is not an acceptance**,
and the record above is. Acceptance became possible once the **Overlay
Failure-Signalling Channel Correction** of the same date closed its one open
item. **It is subordinate to Decision A**, which governs wherever the two
could be read differently, and **accepting it authorizes no implementation**:
`BottomSheet` still requires a separate owner implementation authorization,
on the pattern of the Icon Foundation Implementation Authorization of
2026-10-03.

## Token Table status

- It is the **canonical decision register**, not a rank above the sources it
  records.
- Entries explicitly marked approved or ratified are binding **only to the
  extent that they have not been explicitly superseded**; where an approved
  entry is superseded, **the later approved ruling governs**, and the
  historical entry stays in the record.
- **Open, deferred and proposed entries are not implementation authority.**
- **The Token Table as a whole is open, partially ratified and NOT signed
  off.**
- **Token Foundation implementation has begun** — **superseded 2026-09-19**;
  the bullet previously read *"Token Foundation implementation has not
  begun"*, which was correct at its own date. See the implementation
  authorization record below.

### Scoped Token Foundation V1 Owner Sign-off — 2026-09-18

**Two statuses are deliberately distinct and must not be conflated:**

| | Status |
| --- | --- |
| **Token Foundation V1 baseline** | **SCOPED OWNER SIGN-OFF — APPROVED** |
| **Complete future Token Table** | **OPEN FOR DEFERRED AND FUTURE-STAGE MATTERS** |

**Exact scope.** The V1 baseline — the raw palette, the semantic colour set,
the nine-identity filled-action family, the typography and font-value
contract, spacing, the radius and geometry values V1 needs, elevation,
motion, layering, and the remaining approved V1 values — is frozen at the
values and semantic mappings the Token Table records. The full manifest, the
incorporated decisions and rulings, the applied supersessions and the
excluded items are set out in the sign-off section of the Token Table.

**What it authorizes.** **ADR 0003 may proceed**, to define the
representation of the approved values. **ADR 0003 may represent them; it may
not change, reinterpret or replace them.** **ADR 0003 was written and accepted
on 2026-09-18** and changed no value.

**What remained blocked, as recorded on 2026-09-18 — SUPERSEDED 2026-09-19.**
The three conditions below are the sign-off's own, preserved as written. All
three are now discharged; see the implementation authorization record at the
end of this section. At their own date they read: **Token Foundation
implementation is not authorized**, and stays blocked until **all three** of
the following are complete:

1. **ADR 0003 is written and accepted** — **COMPLETE, 2026-09-18**;
2. **rescoped 2026-09-19.** The original condition named the
   `zakhmban-website` and `zakhmban-pwa` `SKILL.md` annotations. Those
   annotations are **valid wider-ecosystem hygiene** and remain recorded, but
   **neither repository is the active Therapist consumer** and their local,
   unpushed state **gates nothing in this scope**. The condition for
   Therapist scope is now **2′ — the Therapist consumer
   `20Brayan01/zakhmban-therapists` is identified and its `@zakhmban/ui`
   relationship verified and recorded** — **COMPLETE, 2026-09-19**, in the
   Token Table's Therapist consumer verification record;
3. **a final Token Foundation implementation-readiness audit passes against
   the corrected scope** — none has.

**Superseded 2026-09-19.** At the date above, one of the three remained
outstanding. **Condition 3 is now discharged** by the completed scoped
readiness audit and the completed implementation audit of
`caa1efe11fafcadb1a9ca307f5fd0eb6658b3c21`, subject to the corrected
implementation commit passing final audit, and **the owner authorized Token
Foundation V1 implementation**. The full record, including the two matters
the implementation audit referred to the owner, is in the Token Table's
**Token Foundation V1 Implementation Authorization** section.

**The sign-off also does not authorize** Styles, Icons, Primitives or any
component, any responsive or desktop value, or any consumer change; and it
**resolves no deferred decision**.

### Typography Alias Ruling — 2026-09-19

**Authority kind: representation value, owner tier.** It sits at authority
level 3 — approved owner design/product rulings — and governs the wording it
names.

**What it governs.** The exact authored value of the eight public typography
aliases, and nothing else:

| Alias | Authored value |
| --- | --- |
| `--text-display` | `var(--text-display-size)` |
| `--text-page-title` | `var(--text-page-title-size)` |
| `--text-section-title` | `var(--text-section-title-size)` |
| `--text-card-title` | `var(--text-card-title-size)` |
| `--text-body` | `var(--text-body-size)` |
| `--text-label` | `var(--text-label-size)` |
| `--text-caption` | `var(--text-caption-size)` |
| `--text-button` | `var(--text-button-size)` |

**Authority over the ambiguous wording.** ADR 0003 named, counted and placed
these eight but never stated their value, and called them *"composite
aliases"* — a phrase its own §8 reserves for a property holding a complete
CSS value in one place. **The ruling governs that wording**: for these eight
properties the term is **Semantic Typography Size Alias**, and ADR 0003's
current normative sections now use it. **ADR 0003 remains representation
authority**; the ruling supplies the one value ADR 0003 left unstated rather
than displacing it.

**What does not change.** No public identifier · no implemented value · no
Tailwind mapping · the **118 / 39 / 1** boundary · `--radius-pill` as the one
role without an approved literal.

### Token Foundation V1 Implementation Authorization — 2026-09-19

**The owner authorized Token Foundation V1 implementation** after the
documentation and contract package was merged and verified on `main`.
**Scope: Token Foundation V1 only.**

**The previous implementation gate is discharged.** Sign-off §7 conditions 1
and 2′ were already complete; **condition 3 is discharged** by the completed
scoped readiness audit and the completed implementation audit of local commit
`caa1efe11fafcadb1a9ca307f5fd0eb6658b3c21`, **subject to the corrected
implementation commit passing final audit**. Every current-status statement
in this registry and in the Token Table saying implementation is blocked,
unauthorized, not begun or may not begin is **superseded as of this date**;
the dated historical statements remain correct at their own dates and are not
withdrawn.

**Still prohibited, and not touched by this authorization:** publication ·
push · pull request · merge · tag · release · Styles · Icons · Primitives or
any component · dark mode · consumer-repository changes · Therapist
integration · font binary delivery · `@font-face` · every deferred Token
Table entry.

### Token Foundation V1 Publication Authorization — 2026-09-20

**The final implementation audit passed** against
`cf39e03522c462b1061b3f47d9b01dc2c67aaa05`, and **both blocking findings are
closed** — **BCG-1**, the Typography Alias contract gap, by the Typography
Alias Ruling of 2026-09-19; **BDC-1**, the authorization contradiction, by the
implementation authorization of 2026-09-19 together with the dated
supersession markers now carried by the four stale status statements.

**Authorized:** branch push of `feat/token-foundation-v1` · pull request
against `main` · merge after the required checks pass, using a true merge
commit · post-merge verification.

**Not authorized, and unchanged by this record:** version change · tag ·
release · package publication · Styles · Icons · Primitives or any component ·
consumer-repository change · Therapist integration · every deferred Token
Table entry. `@zakhmban/ui` stays **`0.0.0`** and **`private`**, with **no tag
and no release**.

**Release-only blocker carried forward:** `pnpm smoke:tailwind` must be wired
into `.github/workflows/release.yml` **before the first tag**, discharging
ADR 0001's *"before release, not assumed"* obligation for every later commit.
It does not gate this publication, which the implementing commit already
discharged under ADR 0003 §18 assertion 16.

**No token, value, count, artifact or implementation file changes** under this
authorization. The full record is in the Token Table.

### Token Foundation V1 Release Preparation — 2026-09-20

**Token Foundation V1 is merged and verified on `main`** — implementation
commit `5e979cf0d6bfcc47e18a4e21bed3f3012cd3a0a3`, via pull request #7, merge
commit `6e9c6d788fb8fcf5ed9f6c30e6136d3135674489`.

**Authorized, and limited to it:** making `pnpm smoke:tailwind` a required
release gate. **Corrected before publication:** the first draft wired it into
the tag-triggered workflow and called that prevention, which it is not — see
the **Owner Release Model Ruling** below, which selects owner-triggered
automated tagging instead.

**Frozen §2.2's *the tag IS the release* is unchanged.** Nothing is published
to a registry, and no GitHub Release is created.

**Not authorized:** version change · tag · GitHub Release · package
publication · Styles · Icons · Primitives or any component ·
consumer-repository change · Therapist integration · every deferred Token
Table entry. `@zakhmban/ui` stays **`0.0.0`** and **`private`**, with **no tag
and no release**.

**No token, value, count or artifact changes** under this authorization. The
full record is in the Token Table.

### Owner Release Model Ruling — 2026-09-20

**Owner-triggered automated tagging.** The owner starts `release.yml`
manually and supplies the semantic version and the exact 40-character
lowercase `main` SHA. The workflow validates that commit in full — install,
generator `--check`, format, lint, typecheck, test, build, `verify:dist`,
`smoke:tailwind` — and **only then** creates and pushes the annotated tag.

**Two modes, and they must not be conflated.** `workflow_dispatch` is
**pre-tag prevention**: no tag exists until the gates pass. `push.tags` is
**post-tag verification**; it reports on a tag that already exists and can
neither prevent nor remove one. **Describing the tag-triggered mode as
preventing a bad tag is an error this ruling corrects.**

**GITHUB_TOKEN recursion, corrected before publication.** `create-tag` pushes
with the repository `GITHUB_TOKEN`, and GitHub starts no new workflow run for
events created with it (`workflow_dispatch` and `repository_dispatch`
excepted). **An automatically created tag therefore does not start a
`push.tags` run.** Same-run assurance comes from **`verify-created-tag`**,
which re-reads the remote ref and proves it is present, annotated and
pointing at the validated commit. `push.tags` is retained for **manually or
externally pushed tags**. **No PAT, GitHub App or deploy key is introduced**
to force a second run.

**Dispatch from `main`.** `workflow_dispatch` executes the workflow file of
the branch it is started from, and that chain grants `contents: write` to tag
creation.

**Authority.** This is a mechanism ruling. ADR 0001 binds *"the commit that
implements it"* and ADR 0003 §18 assertion 16 is an assertion the commit must
add; **neither requires a workflow gate**, and the implementing commit
discharged the obligation. The workflow adds repeatable automated safety, not
a missing contract.

**Permissions.** Workflow default `contents: read`; all three validation
jobs — `validate-candidate`, `verify-created-tag`, `verify-tag` —
`contents: read`; **only the tag-creation job holds `contents: write`**, and
tag creation is the only automated write in the repository.

**Still unauthorized:** version change · GitHub Release · package publication
· Styles · components · consumer integration. `@zakhmban/ui` stays **`0.0.0`**
and **`private`**, with **no tag and no release**. The first tag additionally
requires this branch merged, a separate reviewed version-bump pull request,
and the owner starting the workflow.

### Token Foundation v0.1.0 Release-Sequence Ruling — 2026-09-20

**Authority kind: release-sequence allocation, owner tier.** Level 3 —
approved owner design/product rulings.

| Milestone | Version |
| --- | --- |
| Token Foundation | **v0.1.0** |
| Styles | **v0.2.0** |
| Icons and the five primitives | **v0.3.0** |
| Phase 6 · Harden | **v1.0.0 — unchanged** |

**What it supersedes.** Exactly two `README.md` roadmap placeholders — Styles
→ v0.1.0 and Icons/primitives → v0.2.0. Those numbers were carried only in an
orientation document, were never recorded in the Token Table, this registry
or any ADR, and bound no consumer: `zakhmban-therapists` declares no
`@zakhmban/ui` dependency and no tag has ever existed. **UI System
Specification v0.2 §8's Phase 6 `v1.0.0` exit criterion is unchanged.**

**What v0.1.0 ships.** Validation helpers, formatters, the Token Foundation
CSS, the generated TypeScript token API and the Tailwind v4 `@theme`
artifact, through the six existing exports. **It does not ship Styles** —
`@zakhmban/ui/styles` yields token custom properties only, with no font
delivery, no `@font-face`, no reset, no global body rules, no focus styles
and no overlay-root technique. Those arrive with Styles at v0.2.0, **an
additive change** under v0.2 §7's versioning rule.

**Unchanged:** every token identifier and value, the **118 / 39 / 1**
boundary, the generated artifacts, the exports, and `private: true`.

**Not authorized by it:** push · pull request · merge · tag · release-workflow
execution · GitHub Release · package publication · consumer integration. The
ruling covers local version-bump preparation only.

### Styles Foundation v0.2.0 Contract Ruling — 2026-09-24

**Authority kind: value and behavioural contract, owner tier.** Level 3 —
approved owner design/product rulings. **Implementation has not started.**

**What it closes.** The **Scoped Token Foundation V1 Owner Sign-off** of
2026-09-18 withheld authorization for the Styles layer in its §6. Those were
deferrals, and under the deferral rule below only an owner may close one.
This ruling is the owner closing four of them.

| Decision | Subject | Outcome |
| --- | --- | --- |
| **D-1** | Reset contract | **APPROVED** — a three-rule authored reset: `box-sizing: border-box` on `*`/`*::before`/`*::after`; `margin: 0` and `padding: 0` on `html` and `body`; `font: inherit` on `button`, `input`, `select`, `textarea`. **No dependency-based reset** — normalize.css, modern-normalize and Josh Comeau's reset are each explicitly not authorized, as are media-element defaults, list-style removal, heading/paragraph resets, link styling, image rules, border removal, form-appearance resets, button background/cursor rules and blanket min-width rules. |
| **D-2** | Global body contract | **APPROVED** — eight declarations, every one resolving through an existing public token: `font-family: var(--font-ui)` · `font-synthesis: none` · `background: var(--background)` · `color: var(--text-primary)` · `font-size: var(--text-body-size)` · `line-height: var(--text-body-line-height)` · `font-weight: var(--text-body-weight)` · `text-wrap: pretty`. **Excluded:** global `font-variant-numeric`, `-webkit-font-smoothing`, `-moz-osx-font-smoothing`, `text-rendering`, forced `direction`, forced `lang`, dark-mode rules, responsive or container rules. **The package must not set `direction: rtl`**; applications retain `<html lang="fa" dir="rtl">`, restating v0.2 §5. |
| **D-3** | Focus-visible contract | **APPROVED** — selector `:focus-visible`; Decision 3b's `CONTROL → 2px WHITE → 2px NAVY → PAGE` unchanged; **both layers painted**, never a transparent `outline-offset` gap; **two box-shadow rings derived only from the four existing focus-indicator tokens**; the default outline replaced only inside the same rule that installs the replacement; **no global `:focus:not(:focus-visible) { outline: none }`**; no focus removal without an immediately effective replacement; **no `overflow: hidden` ancestor** in package Styles or primitives that would clip the indicator. **No raw colour literal.** Rendered verification owed on `--surface`, `--surface-subtle` and all three approved soft tints. |
| **D-4** | Keyframe names | **DELEGATED TO ADR 0004** — naming is representation, not value. |
| **D-5** | Reduced-motion contract | **APPROVED** — every package-owned animation suppressed when `prefers-reduced-motion: reduce` matches, **leaving the element in its static end state**; **coupled to ADR 0004's end-state rule**; **no arbitrary ultra-short-duration workaround**; consumer-owned animation stays the consumer's responsibility unless it invokes a package-owned keyframe. |
| **D-6** | Overlay-root allocation | **APPROVED AS AN EXCLUSION** — all overlay-root and Portal techniques are **excluded from v0.2.0** and their decision work is **allocated to v0.3.0** alongside the five primitives. The deferral covers shared overlay-root selectors, Portal implementation, overlay container styling, simultaneous/nested overlay policy, body scroll locking, inert-background mechanics and pointer-event policy. **No implementation technique is approved by the allocation**, and Decision 15's position is restated, not amended. |

**What it supersedes.** **For the overlay-root technique only**, the sentence
in the Token Foundation v0.1.0 Release-Sequence Ruling of 2026-09-20 placing
that technique in Styles at v0.2.0. Font delivery, `@font-face`, resets,
global body rules and focus styles still arrive with Styles at **v0.2.0**; the
overlay-root technique moves to **v0.3.0**. **That dated record is preserved
unchanged.** Nothing else is superseded, and **no part of UI System
Specification v0.2 is superseded by this ruling.**

**Unchanged:** every token identifier and value, the **118 / 39 / 1**
boundary, the generated artifacts, the exports, `private: true`, version
`0.1.0`, the Owner Font Contract and Delivery Ruling in full, and repository
visibility.

**Still deferred:** the overlay-root and Portal technique, now at v0.3.0 ·
the four keyframe **bodies**, per ADR 0004 §8 — **closed 2026-09-25**, see
the Styles Keyframe Behaviour section below · `--radius-pill` · the 40px
small-control geometry and the Button sm 40-versus-44 conflict, which remain
**primitive scope** · container classes and **Decision 16b** · Decisions 4b,
6b and 11 · the banner accent contract · Chip state coverage · the Checkbox
visible-square dimension · the BottomNav badge-size defect · non-Card Surface
bindings · typography role assignment for error text, banner prose and
ListRow metadata · border widths · the visited-link colour · dark mode · LTR
direction · `--shadow-none` representation · any sixth primitive · any fourth
public subpath.

**Implementation status — stated plainly.** **Styles is not implemented, not
shipped and not released.** No CSS file, font binary, `OFL.txt`, `@font-face`,
reset, body rule, focus rule, keyframe or reduced-motion block exists in this
repository. `@zakhmban/ui/styles` continues to yield the approved token custom
properties and nothing more. **This ruling authorizes documentation only**;
Styles implementation is a **separate task**, and the version bump, tag,
release-workflow execution, GitHub Release, package publication and
`zakhmban-therapists` migration each remain **separate owner actions**.

### Styles Keyframe Behaviour and Procedural Ratification — 2026-09-25

**Authority kind: value decision plus a procedural clarification, owner
tier.** Level 3 — approved owner design/product rulings. **Implementation has
not started.**

**Part 1 — procedural ratification.** A read-only audit of the local draft
commit `6a6eae84c1694120d83212ba73761f566a69f636` reported one blocker: how
the uppercase **STOP** in the authoring instruction was to be read once the
four keyframe behaviours were found undefined. **The owner clarifies that
STOP prohibited inventing or silently filling undefined behavioural values
and required implementation to remain blocked while they were unresolved, but
did not prohibit documenting the gap, completing the documentation review or
creating the local draft commit.** The draft **invented no value** and
**nothing had been pushed, merged, tagged, released or published**. The
substantive content of `6a6eae84` is therefore **procedurally ratified**, the
sole audit blocker is resolved, and **no new ADR is created** for a
clarification that decides no value and no representation. **The ratification
does not authorize implementation.**

**Part 2 — the four behavioural contracts.** Every value is owner-supplied;
ADR 0004 §8 records them verbatim and adds none. **No token is created.**

| Keyframe | Start → End | Duration | Timing | Iteration |
| --- | --- | --- | --- | --- |
| `zakhmban-shimmer` | `background-position: 200% 0` → `-200% 0` | `var(--duration-shimmer)` · 1400ms | **`linear`** | infinite, **only while a real loading state is active** |
| `zakhmban-fade-up` | `opacity: 0` / `translateY(8px)` → `opacity: 1` / `translateY(0)` | **`var(--duration-base)`** · 200ms | `var(--easing-standard)` | exactly 1 |
| `zakhmban-slide-up` | `translateY(100%)` → `translateY(0)` | **`var(--duration-slow)`** · 320ms | `var(--easing-standard)` | exactly 1 |
| `zakhmban-spin` | `rotate(0deg)` → `rotate(360deg)` | **1000ms**, authored-Styles value, **not a token** | **`linear`** | infinite, **only while a real loading or in-progress state is active** |

Shimmer animates an owner-authorized gradient built from the existing public
tokens `--surface-subtle` (base) and `--surface` (highlight) at
`background-size: 200% 100%`; its physical coordinate movement is
**invariant under document direction and is not mirrored for RTL**. Slide-up
carries **no opacity animation**. Both repeating keyframes **must stop when
their state ends** and **must not be used as permanent decoration**.

**Repetition rule.** Fade-up and slide-up are **one-shot transitions**;
shimmer and spin **may repeat only while communicating a real loading or
in-progress state**. **Functional progress feedback is not decorative
looping**, and **permanent, ambient or ornamental looping remains
prohibited** — which closes v0.2 §2.4's *"looping decoration"* ambiguity.

**Reduced-motion, refined without weakening D-5.** All package-owned
animation is disabled under `prefers-reduced-motion: reduce`; **one-shot
animations leave their final usable static state**; **repeating indicators
use their documented static fallback** — a flat `var(--surface-subtle)`
skeleton surface, and the `0deg` resting state; **no ultra-short-duration
workaround**; consumers stay responsible for their own animation unless it
invokes a package-owned keyframe; and **no content, control or status may
become unavailable when motion is suppressed.**

**Two scoped supersessions of v0.2 §2.4**, both the owner's and both entered
in the Token Table: **`linear` for `zakhmban-shimmer` and `zakhmban-spin`
only**, leaving `--easing-standard` the only curve for every transition and
both one-shot keyframes; and **1000ms for `zakhmban-spin` only**, as an
authored value that **does not reopen the three-duration token set**.
**Neither exception may be generalised**, and nothing else in §2.4 is
superseded.

**Unchanged:** the four keyframe names · ADR 0004's ownership, publicity,
authored-versus-generated and Tailwind positions · **no `--animate-*` key and
no preset change** · every token identifier and value · the **118 / 39 / 1**
boundary · the exports · `private: true` · version `0.1.0` · the overlay-root
allocation to **v0.3.0** · `--radius-pill` and the 40px geometry, both still
deferred · repository visibility.

**Status.** **No behavioural field for the four keyframes remains
unresolved**, and **ADR 0004 §8 is closed** — a Styles implementation commit
may not vary a duration, curve, frame or iteration count in it. **Styles is
still not implemented, not tagged and not released.** **Implementation
becomes eligible only after this record is independently audited**, and the
version bump, tag, release-workflow execution, GitHub Release, package
publication and consumer migration each remain **separate owner actions**.

### Icon Foundation Implementation Authorization — 2026-10-03

**Authority kind: ADR acceptance plus a scoped implementation authorization,
owner tier.** Level 3 — approved owner rulings. **ADR 0005 itself carries
representation authority only (level 5) and is not made authority for any
design value by this record.**

**The owner accepts ADR 0005 and authorizes preparation of the Icon
Foundation. Scope: the accepted eleven-name Icon foundation only.** ADR 0005
entered `main` as **Proposed** through pull request #15, merge commit
`45341f015ae5b59629a2440705c575e91617e87a`; **a merge is not an acceptance**,
and this record is.

**Verified before authorization.** The three upstream facts ADR 0005 §3
recorded as unverified were checked read-only against **`lucide@1.51.0`**
(`license: ISC`; `dist.shasum` `942068b228d8068baa1f302ad48b6d82cd4fae82`):
all eleven approved glyphs exist as pure `[tag, attrs]` data under
`dist/esm/icons/`; the package-root `LICENSE` carries **both** the ISC notice
and the **Feather MIT** attribution in one file; and the data supports a
deterministic build-time generator with no runtime dependency. **§3's stop
rule is discharged and no clause of ADR 0005 changes.** The check is
**version-scoped** — a later Lucide version must be re-checked, not assumed.

**Authorized, and limited to it:**

- `src/icons/` — the `Icon` component, its **internal** registry and internal
  barrel;
- the **eleven** public names ADR 0005 §7 admits — `back`, `chevron`,
  `search`, `close`, `check`, `alert`, `info`, `camera`, `trash`, `plus`,
  `star` — with **`back` and `chevron` mirrored** and the other nine not. The
  registry stores the LTR-authored base glyph **plus** an explicit mirroring
  boolean; **storing a pre-mirrored glyph in place of the flag is not
  authorized**, because v0.2 §5 makes mirroring a declared property;
- a deterministic **build-time generator** and its `--check` parity mode,
  reading an **exactly pinned** Lucide source package held as a
  **devDependency**;
- a **verbatim copy** of that package's `LICENSE` into `src/icons/`, reaching
  `dist/icons/` byte-for-byte, attribution intact and unedited;
- **`react` and `react-dom` as `peerDependencies`** — the relationship v0.2 §7
  and §7.2 already state unconditionally — with ranges chosen from actual
  consumer compatibility and **not** claimed to be frozen by ADR 0005; plus
  the exactly pinned devDependencies needed to typecheck, render and test a
  React-bearing module;
- the three root exports — **`Icon`, `IconProps`, `IconName`** — through the
  **existing** entry, with `IconName` a closed union;
- the narrow amendments ADR 0005 §5 maps to `scripts/build.mjs`,
  `vitest.config.ts`, `eslint.config.mjs` and the architecture guards,
  **keeping every one of the five primitive names forbidden**;
- the **mechanical raw-palette usage guard** that finding **IA-5** makes due
  with the first component implementation commit, scoped to catch prohibited
  raw-palette use **without** rejecting the approved token definitions,
  documentation or generated data;
- the subordinate wording correction from *"the first primitive"* to **"the
  first React-bearing module"** in `ARCHITECTURE.md` and `vitest.config.ts`,
  **and nowhere else**;
- a branch, local commits, a normal push, and **one reviewable pull request**
  against `main`.

**Merging is not authorized by this record.** Preparing the work and opening
the pull request is as far as this goes: **each merge remains a separate
manual owner decision**, taken after review and after the required checks
pass. A green pipeline is evidence, not approval.

**Not authorized, and unchanged by this record:** `Button` · `TextField` ·
`Select` · `OtpInput` · `BottomSheet` · `Portal` or `FocusTrap` · any
overlay-root, scroll-lock, inert-background or pointer-event technique ·
`Skeleton` or any other Tier 2 component · a sixth primitive · a `./icons`
subpath or any fourth public subpath · a published runtime `iconNames` array ·
a **runtime Lucide dependency**, which stays prohibited and leaves
`dependencies` equal to `{}` · a `tone`, `state` or `variant` prop on `Icon` ·
any **semantic active/destructive colour mapping** · any new token, keyframe
or Tailwind key · distributed standalone `.svg` files · version change · tag ·
release · GitHub Release · package publication · `zakhmban-therapists` or any
other consumer-repository change · deployment · repository-visibility change.

**Still deferred, and untouched:** the overlay-root and Portal technique and
everything **D-6** lists with it · the 40px small-control geometry and the
**Button `sm` 40-versus-44** conflict · `--radius-pill` · Decision 6b's Modal
radius · Decision 4b's shadows · the banner accent contract (**IA-6**), which
still blocks InfoBanner and ErrorBanner · typography role assignment for error
text · border widths · every other open Token Table entry. **D-6 and Button
`sm` remain unresolved owner decisions and are neither settled nor implied
here.**

**The package stays `0.2.0` and `private`,** with `v0.1.0` and `v0.2.0`
unchanged and **no new tag**. **No token, value, count, artifact or design
decision changes under this authorization.**

### Overlay-Root and Button sm Contract Ruling — 2026-10-04

**Authority kind: value and behavioural contract, owner tier.** Level 3 —
approved owner design/product rulings. **Representation stays with the ADR
series**: the ruling names no selector, attribute, class, CSS rule or React
mechanism, and **creates no token**.

**Two decisions, separately numbered and separately scoped**, issued in one
dated ruling on the pattern of the Styles Foundation v0.2.0 Contract Ruling.
**Each carries its own supersession record because their targets differ**, and
neither depends on the other. **The ruling is recorded in full in the Token
Table.**

**Decision A — overlay root and `BottomSheet` modal boundary.** The
application-owned `Screen` supplies a **dedicated overlay root at document
level, outside the `Screen` content subtree and its stacking and clipping
contexts**, and **identifies the background content** that must become
unavailable. The package-owned `BottomSheet` **portals its scrim and surface
into that root** and owns **focus entry and containment · Escape and
scrim-click dismissal · focus return to the opener · body scroll locking ·
making the identified background unavailable to pointer *and* keyboard
interaction**, restoring every effect **on close and on unmount**. The scrim
takes pointer interaction and the background does not; **declared modal
semantics must match actual behaviour**, and **`aria-hidden` plus
`pointer-events` alone is not a substitute for preventing keyboard interaction
with the background**. A **missing overlay root or unidentified background
scope must not silently fall back** to an inline sheet that looks modal while
trapped by a stacking context or leaving the background operable. **One
package-owned `BottomSheet` at a time**; simultaneous `BottomSheet` and
application-owned `Modal`, nested dialogs and multiple scrims are
**unsupported in v0.3.0**; the package prevents a duplicate package-owned
sheet, and **coordinating the application's own `Modal` is the application's
responsibility — no package mechanism can enforce it, and none is claimed
to**. **`Portal` and `FocusTrap` stay internal to `BottomSheet`**: no sixth
primitive, no public `Portal` or `FocusTrap`, no new export subpath, no new
design value.

**Decision B — Button `sm`.** **A minimum visible block size of 44px**, with
the **visible control and the interactive target coinciding** at **at least
44 × 44px**. **A minimum, not an exact fixed height** — content, Persian line
height and text enlargement may make the button taller — and **no invisible
expanded-target model is created**, exactly as Decision 10 ruled for Chip.
**`md` 48 and `lg` 52 are unchanged**, **Button is not added to the
accessibility-exception register**, the 44px minimum resolves through the
existing **`--control-min-target`** role, **no 40px or other new token is
created**, and **Token Foundation stays 118 / 39 / 1**.

**What Decision A closes, preserves and narrows.** Of D-6's seven deferred
items it closes **Portal implementation · simultaneous/nested overlay policy ·
body scroll locking · pointer-event policy**, closes **overlay container
styling as to ownership** and **inert-background mechanics as to outcome**,
and leaves **the shared overlay-root selector open and reserved for ADR
0006**. **Decision 15's ownership table is preserved unchanged and
confirmed** — Decision A adds only what Decision 15 never assigned, which
party renders the overlay-root node; Styles still owns that node's rules.
**ADR 0003 §5 is reconciled, not left in parallel**: its sentence remains
correct for `Screen` and for overlay composition and still justifies the
public stacking integers, and is superseded only where it would place
`BottomSheet`'s internal portal behaviour outside the package. **v0.2 §9
unknown 12 is NARROWED, not closed** — answered for **`Portal` and
`FocusTrap`**, and **still open exactly as written for `Box`, `Stack`,
`Text`, `Screen` and `VisuallyHidden`**, each of which would still need the
same ADR as a sixth primitive.

**Reserved for ADR 0006 — scoped to the cross-boundary contract only.**
(**ADR 0006 was proposed and accepted on 2026-10-04**; the sentence below
described the position before it existed and is kept for the record.) **Mandatory:** the overlay-root DOM and
stylesheet contract; how the background scope is identified by the
application and read by the package, including any marking the application
must apply; that the no-fallback failure is **observable** to the application
developer rather than silent; and that the overlay CSS reaches consumers
through the **existing** `./styles` entry, adding **no** public subpath.
**Left to implementation and not frozen by ADR 0006:** the React portal
mechanism, the inertness mechanism, the scroll-lock mechanism, the signalling
mechanism for that failure, and where the overlay CSS file sits under
`src/styles/`, which ADR 0003 §18 already governs — **Decision A fixes the
observable outcome of each**, which is the part an owner approves. **The one
exception is interoperability:** a mechanism that turns out to require
something of the application stops being internal and joins the mandatory
contract. **ADR 0006 must preserve the no-new-export boundary, and no
mechanism is selected by this ruling.**

**One follow-up recorded and not resolved.** How Button **`md` 48** is
expressed through an appropriately named token is a **representation question
for the ADR series**: `--control-height-button` carries 52px and 48px exists
only as `--control-height-input`, a role named for a different control. **No
value is invented and no misuse of `--control-height-input` is authorized.**
It is a genuine blocker for a complete three-size Button.

**Still deferred and untouched:** `--radius-pill` · the banner accent contract
(IA-6), which still blocks InfoBanner and ErrorBanner · Decision 6b's Modal
radius · Decision 4b's shadows · typography role assignment for error text,
banner prose and ListRow metadata · the visible Checkbox square dimension ·
Chip state coverage · border widths · the BottomNav badge-size defect ·
non-Card Surface bindings · the visited-link colour · dark mode · LTR
direction · `--shadow-none` representation · Decision 16b · any sixth
primitive · any fourth public subpath.

**Authorizes no implementation.** Recording a decision is not an
implementation authorization, and merging the pull request that records it is
not one either. **`BottomSheet`** needs **ADR 0006 accepted and
registry-entered** and then a **separate owner implementation
authorization**, on the pattern of the Icon Foundation Implementation
Authorization of 2026-10-03; **`Button`** needs its own authorization and the
`md` representation answer; **`TextField`, `Select` and `OtpInput`** are
untouched here and need their own. **The package stays `0.2.0` and
`private`**, with `v0.1.0` and `v0.2.0` unchanged and **no new tag**.

### Overlay Failure-Signalling Channel Correction — 2026-10-04

**Authority kind: a scoped correction to an approved owner ruling, owner
tier.** Level 3 — approved owner rulings. **It decides no design value,
creates no token, changes no count, artifact or export, and authorizes no
implementation.**

**What it corrects.** The Overlay-Root and Button sm Contract Ruling of the
same date carried two clauses that could not both be followed. **§A.4** ended
*"The mechanism for making it evident is representation and belongs to ADR
0006."* **§A.9** listed *"the signalling mechanism for that failure"* among
the items **left to implementation**. Both sat inside the same approved
ruling, so neither the precedence chain nor the global supersession rule
separated them, and the deferral rule barred an implementer, a consumer or an
agent from choosing between them. ADR 0006 recorded the contradiction and
refused to settle it.

**The correction.** **§A.4's final sentence is WITHDRAWN**, and **§A.9
governs**: the developer-visible failure-signalling channel is an **internal
implementation choice**, not a representation question and not ADR 0006's to
settle.

**Unchanged and still binding.** Both requirements §A.4 exists for stand
exactly as written — **invalid structure must produce a developer-observable
failure**, and **must never silently fall back to an inline sheet**. **§A.9
is unchanged**, including its mandatory cross-boundary list and its
interoperability exception. Decision A §A.1, §A.2, §A.3, §A.5, §A.6, §A.7,
§A.8 and §A.10 are untouched, as is Decision B in full.

**Form.** The withdrawn sentence is **struck through in place and marked with
this date** in the Token Table, on the convention this register already uses
for a closed entry. **No approved text is deleted**, and the dated ruling is
otherwise preserved exactly as approved. The full record is in the Token
Table.

**Unchanged:** every token identifier and value · the **118 / 39 / 1**
boundary · the exports · `private: true` · version `0.2.0` · the `v0.1.0` and
`v0.2.0` tags · every open deferral.

**Not authorized by it:** implementation of `BottomSheet` or any primitive ·
any source, test, script, guard, manifest or artifact change · a sixth
primitive · a public `Portal` or `FocusTrap` · a new export subpath · a new
token or design value · version change · tag · release · publication ·
consumer-repository change · deployment.

### BottomSheet Height Ruling — 2026-10-04

**Authority kind: value and behavioural contract, owner tier.** Level 3 —
approved owner design/product rulings. **It creates no token and authorizes
no implementation.**

**The rule.** The sheet **grows with its content**, up to a maximum block
size of **`calc(100dvh - var(--control-min-target))`**. **Long content
scrolls inside the sheet** while **the title and the footer remain
reachable** at every height, and **the sheet must not overflow the dynamic
viewport**. `--control-min-target` is the **existing public token** authored
in `src/tokens/base.css`, resolved value **`44px`**, one of the approved
118 — **no new token or value is created**, and the Token Foundation
boundary stays **118 / 39 / 1**.

**What it closes.** `BottomSheet`'s block size was specified nowhere — not in
v0.2 §3.4, not in §2.3's control-geometry list, not in the Token Table, and
**not on the deferral list either**. It was an **unrecorded gap** rather than
a listed deferral, and it blocked implementation: §3.4's **"sticky footer
action"** presupposes a bounded sheet with a scrolling content region, and
without a bound a long filter list pushes the footer out of reach.

**Why the cap is independent of the AppBar.** The reserved strip is sized by
the **tap minimum**, not by whatever chrome sits above the sheet. The
**exposed scrim is a dismissal target** — §3.4 makes scrim click close the
sheet and §6 requires 44 × 44px for anything tappable — so
`--control-min-target` is applied in **its own role**, not borrowed from an
unrelated one; the inline axis is the full viewport width, so the block axis
was the only one needing a rule. A cap written against `--app-bar-height`
would tie the sheet's geometry to an **application-owned surface that is
sometimes absent**, making the sheet taller or shorter depending on someone
else's layout. The tap minimum is constant.

**Reachability is absolute, and a squeeze is not the same thing.** **No part
of the title, the content or the footer may be clipped or made unreachable**
at any viewport size or text-enlargement level — v0.2 §6's *"Layouts survive
200% text zoom without clipping"* applied to this component, with
**reachable** meaning reachable by scrolling **and** by sequential keyboard
navigation. A **layout squeeze**, where the scrolling region becomes small
while everything stays reachable, is **accepted** and is a **required
browser-test case**; a **loss of access is a contract failure**, not a
degraded layout, and browser testing may not sign it off.

**Only the footer is required to be pinned.** §3.4 names a *"sticky footer
action"* and says nothing about the title, which is therefore **not required
to be pinned and may scroll with the content**. That reading — not an
addition — is what keeps a usable scrolling region at constrained heights,
because the pinned area is the footer alone rather than the title plus the
footer.

**What it does not claim.** **A 44px visible strip does not by itself prove
any accessibility requirement.** It reserves space; it does not prove the
exposed scrim is perceivable or hittable on a given device, that browser
chrome or a system gesture area does not obscure it, or that the footer
stays reachable at large text sizes. **Those are rendered behaviours and
must be verified in a browser**, against a real layout and at the approved
text-zoom level.

**Constrained-height fallback — a narrow dated clarification of v0.2 §3.4,
2026-10-04.** **The footer remains sticky during normal operation.** **If
keeping it pinned would make any part of the title, the content or the
footer unreachable or inoperable, the entire bounded sheet may scroll
vertically; in that condition the footer may cease to be sticky so the
action remains reachable.** **This is a fallback for access, not an
alternative default layout** — it is reached only when the pinned layout
would otherwise break the reachability rule, and it is **not** a general
permission to unpin the footer. **It adds no numeric threshold, token,
height, prop or general permission**, because the trigger is the
reachability rule itself. §3.4 is otherwise unchanged. **This closes** the
open item the ruling previously raised, which is struck and marked closed in
the Token Table's open list.

**Browser verification covers both states.** The **ordinary sticky-footer
layout** and the **constrained fallback** must each be verified in a real
browser at **200% text enlargement**, on a **short viewport**, under
**keyboard navigation**, showing the title, content and footer all
**reachable and operable**, with the exposed scrim region and the approved
maximum block size holding in both. **No claim of complete accessibility
conformance follows from these checks.**

**Boundaries.** **Decision 16b is not reopened** — it owns breakpoints,
container roles, container maximum widths and responsive gutters, and a
viewport-relative maximum on one component is none of those. **§6's zoom
rule is unchanged**: this is a **maximum** on the sheet, not a fixed height
on a text container. Decision 6a's sheet radius, `--shadow-sheet`,
`--overlay`, `--z-scrim`, `--z-dialog` and `zakhmban-slide-up` are untouched.
**No count, artifact or export changes**, the package stays `0.2.0` and
`private`, and **no implementation is authorized**. The full record is in the
Token Table.

### BottomSheet Implementation Authorization — 2026-10-04

**Authority kind: implementation authorization, owner tier.** Level 3 —
approved owner rulings. **It decides no design value and creates no token.
Scope: `BottomSheet` only.**

**Preconditions, all met:** Decision A of the Overlay-Root and Button sm
Contract Ruling is effective · the **Overlay Failure-Signalling Channel
Correction** settles §A.4 against §A.9 · **ADR 0006 is Accepted** and entered
in this registry as representation authority · the **BottomSheet Height
Ruling** above closes the last open value.

**Authorized, and limited to it:** a branch · local implementation commits ·
a normal push · **one reviewable pull request** against `main` · `src/` work
implementing `BottomSheet` against v0.2 §3.4's five props (**`open†`
`title†` `onClose†` `footer` `children`**), the dialog duties of §3.4 and
§6, Decision A, Accepted ADR 0006 and the height ruling · **exactly pinned
development dependencies** for interaction testing, each justified in the
pull request, with **`dependencies` staying `{}`** · amendment of
`tests/architecture/styles-contract.test.ts`'s overlay guard **only in the
same commit that supplies the approved contract and its tests** · the other
guard amendments the work genuinely requires, **keeping the four remaining
primitive names forbidden**.

**Merging is not authorized.** Preparing the work and opening the pull
request is as far as this record goes: **each merge remains a separate
manual owner decision**, taken after review and after the required checks
pass. A green pipeline is evidence, not approval.

**Required boundary:** consume ADR 0006's overlay root and marked background
scope exactly as defined · **no public `Portal` or `FocusTrap`, no sixth
primitive, no new export subpath, no new token and no new design value** ·
**never a silent inline sheet** when the required structure is invalid, with
the failure **observable to the application developer** and the signalling
channel an **implementation choice** · enforce the **single package-owned
sheet** and **claim nothing** about the application-owned `Modal` policy ·
real modal behaviour — accessible name from the required `title`,
`role="dialog"` with `aria-modal`, focus entry and containment, **Escape**
and **scrim-click** dismissal, focus return to the opener, background
unavailable to **pointer and keyboard**, with **`aria-hidden` plus
`pointer-events` not a substitute for keyboard exclusion** · body scroll
locking and other temporary document effects **applied and reliably restored
on close, on unmount and on interrupted lifecycle paths** · **RTL
inheritance** and the approved scrim, surface, radius, shadow, stacking and
motion contracts preserved, **reduced motion respected** · **paint order
never inferred from DOM order alone** · package CSS reachable through the
**existing `./styles` entry**, with no fifth subpath.

**Acceptance outcomes:** test the **built** package, not only source ·
**meaningful interaction tests** rather than restatements of the
implementation — keyboard operation and focus containment, Escape and
scrim-click dismissal, focus return, background unavailable to pointer **and**
sequential keyboard navigation, each of ADR 0006's **four invalid
structures** producing no inline sheet and an observable failure, **a second
package-owned sheet refused**, and scroll-lock cleanup **including an
unmount-while-open path** · a **later rendered-browser check** for what
source cannot prove: actual **layering** against real application chrome,
**RTL** on the portalled sheet, **focus** in a real engine, **scroll**
locking and restoration, and the **height ruling** — the reserved scrim strip
and a reachable footer at maximum height, on a short viewport and at **200%
text enlargement** · **consumer-integration verification identified** and
located in the consuming application: one valid overlay root, **complete**
background marking across every application-controlled interactive region
including its own portal mounts, and layering in its real layout.

**Not authorized, and unchanged:** **merging any pull request** ·
`TextField` · `Select` · `OtpInput` · `Button` · **Decision B §B.4's Button
`md` token representation** · any Tier 2 component · a sixth primitive · a
public `Portal` or `FocusTrap` · a new export subpath · a new token or design
value · a runtime dependency · version change · **`v0.3.0` tag** · release ·
GitHub Release · package publication · `zakhmban-therapists` or any other
consumer-repository change · deployment · repository-visibility change.
**The package stays `0.2.0` and `private`**, with `v0.1.0` and `v0.2.0`
unchanged and **no new tag**.

## Missing design-system document — scoped disposition

**For Token Foundation scope only**, the authority role formerly assigned to

```text
ZAKHMBAN-V2-UI-DESIGN-SYSTEM.md
```

is **fulfilled and superseded** by the combined effective set of:

- **UI System Specification v0.2**;
- **explicitly approved owner rulings**;
- **individually approved Token Table entries**;
- **accepted ADRs** for representation and delivery.

Recorded with this disposition:

- **No claim is made that the missing document ever existed.** It is named at
  rank 4 of the workspace source order in
  `project-context/01-project-overview.md` and
  `project-context/07-ai-development-rules.md`, and no copy has ever been
  present in this workspace.
- **It is not created by this ruling**, and this ruling does not require it to
  be authored.
- **This is not a project-wide supersession claim.** It covers **Token
  Foundation and the documented `zakhmban-ui` UI-layer scope** and nothing
  else. Rank 4's standing for any other purpose is a workspace-side question
  and is untouched here.

## `project-context/` boundary

`project-context/README.md` records that documentation living inside the
application repositories is legacy material and that `project-context/`
governs where it conflicts. Workspace `CLAUDE.md` records the same rule with an
explicit exception: *"unless a newer, explicitly approved source exists."*

**That exception is invoked here.** The `zakhmban-ui` canonical documentation
set — UI System Specification v0.2, the approved owner rulings, the accepted
ADRs, the Token Table and this registry — **is a newer, explicitly approved
package-local source for `zakhmban-ui` UI-layer matters.**

- **`project-context/` remains authoritative for product truth**, without
  qualification.
- The exception reaches **UI-layer matters within `zakhmban-ui`'s stated
  scope** and nothing further.
- **Neither `project-context/` nor workspace `CLAUDE.md` is edited by this
  repository**, and neither is edited by this ruling.

## Workspace-side follow-ups

**Recorded as follow-up items, not as facts silently corrected by this
repository.** This repository may not edit workspace files, and has not.

| # | Item | Evidence |
| --- | --- | --- |
| **W1** | Workspace `CLAUDE.md` lists `zakhmban-ui` among repositories that *"do not exist yet… Their absence is implementation reality."* The repository exists, with a remote, a committed `dist/`, an architecture test suite, two accepted ADRs and its canonical documentation set. | `CLAUDE.md` repository rule |
| **W2** | Workspace `CLAUDE.md`'s governed-repository list names four repositories and omits `zakhmban-ui`. | `CLAUDE.md` opening paragraph |
| **W3** | The workspace source order names four documents that are not present: a `-FINAL`-suffixed spelling of the frozen architecture, the signed Phase 2 contract and technical appendix, `ZAKHMBAN-V2-PRODUCT-SYSTEM-BRIEF-v2.1.md`, and `supplementary-ui/*`. Only rank 1 resolves, and only after dropping the `-FINAL` suffix. | `project-context/01-project-overview.md`, `project-context/07-ai-development-rules.md` |
| **W4** | No workspace precedence rank names UI System Specification v0.2. | same |

**None of W1–W4 blocks Token Table sign-off from this repository's side.**
They are recorded so that a workspace-side correction has a written basis.

## Consumer-repository follow-ups

**No consumer repository is modified by this ruling.**

| # | Item | Status |
| --- | --- | --- |
| **C1** | `zakhmban-website/public/design-system/SKILL.md` and `zakhmban-pwa/design-system/SKILL.md` are **Phase 1 design-system skills**. They are **superseded for V2 and have no authority to generate V2 production values.** They are user-invocable and instruct production code in Phase 1 brand values, which contradict the canonical palette. | **ANNOTATED — 2026-09-19.** Both files now carry an explicit legacy notice; the original Phase 1 content is preserved in full and nothing was deleted. The two commits are **local and unpushed** — `zakhmban-website` `4438207`, `zakhmban-pwa` `68ec7e3`, each one ahead of its `main` on `docs/token-foundation-legacy-annotation`. Full record in the Token Table's external legacy cleanup section. **Classification corrected 2026-09-19: wider-ecosystem documentation hygiene, not a Therapist-scope prerequisite.** Neither repository is the active Therapist consumer, and the unpublished state of these commits gates no Therapist-scope work. The annotation itself is not withdrawn. |
| **C2** | Font-loader migration — Therapists and PWA remove `@fontsource` including the extra 900; Admin removes its Google Fonts CDN import; Website removes its local `@font-face` and conflicting stacks; all remove shadowing `--font-sans` declarations. | recorded by the Owner Font Contract and Delivery Ruling; future work |
| **C3** | The unused IRANYekan assets and the stale `public/fonts/README.md` in `zakhmban-website` require a separate cleanup after ownership and licensing are verified. **IRANYekan is neither approved nor redistributed.** | recorded by the Owner Font Contract and Delivery Ruling; future work |
| **C4** | **Therapist private-dependency access.** CI needs approved read access to the private package repository and Docker builds need a secure installation mechanism; **credentials must not be committed**. UI System Specification v0.2 §9 unknown 10 records this as infra-owned and UNKNOWN. | **Integration prerequisite, not a Token Foundation contract gap.** Future work, owned by infra and the Therapist repository |

### Therapist consumer — verified 2026-09-19

**`20Brayan01/zakhmban-therapists` is the active Therapist application and
the intended consumer** of `@zakhmban/ui`. Verified read-only: it declares
**no `@zakhmban/ui` dependency**, imports it nowhere, holds **no vendored or
local substitute**, has **no local token system**, **no `SKILL.md`**, **no
`design-system` directory** and **no Phase 1 palette guidance** — so **no
legacy annotation is required there**. Its own package-boundary rules already
reserve `@zakhmban/ui` as the Tier 1 authority and require an exact git-tag
pin, and integration waits for a published, tagged release.

**`zakhmban-website` and `zakhmban-pwa` are other applications in the wider
ecosystem, not the Therapist consumer.** Full evidence, the owner scope
ruling and the separately recorded future work — **C2** font migration, **C4**
private access, and Tailwind installation — are in the Token Table's
Therapist consumer verification record. **Nothing in `zakhmban-therapists`
was modified**, and **no Therapist integration is authorized.**

## Deferral rule

**A deferred or unresolved decision is a decision the owner has not yet
made.** It is not a gap.

- **No implementer, reference kit, consumer implementation or AI agent may
  fill one.**
- **Evidence never closes a deferral.** A value appearing in the V2 kit, the
  Phase 1 kit or a shipped application is evidence that something exists, never
  evidence that it is approved.
- A deferral closes **only** by an owner ruling that meets the four conditions
  of the global supersession rule.

`docs/adr/README.md` states the same rule for its own series: *"Where a
governing document is silent, that silence is a decision for an owner, not a
gap for an implementer to fill."*

## Change control for future canonical documents

**Every future canonical document, owner ruling or ADR must:**

- **state its scope and status;**
- **identify what it supersedes, if anything;**
- **be entered in this registry;**
- **identify whether it governs values or representation;**
- **avoid silently modifying an older rule.**

A document that does none of these has not entered the authority chain, and an
implementer may not treat it as canonical.

## What this ruling does not do

This section states what the **Canonical Documentation Authority and
Supersession Ruling of 2026-09-18** does, as at its own date. It is a dated
historical statement and is not a current status report.

- **It changes no token, value, role, component, export, font or build
  artifact.**
- **It does not sign off the Token Table**, which remains open, partially
  ratified and unsigned.
- **It did not create ADR 0003.** The number was still reserved when this
  ruling was recorded. **ADR 0003 was written and accepted separately on
  2026-09-18**; nothing in it is attributed to this ruling.
- **It does not begin Token Foundation implementation**, which had not begun
  at its date. **Implementation was authorized on 2026-09-19** and has since
  begun locally — see the implementation authorization section above.
- **It resolves no deferred decision** — Decisions 4b, 6b, 11 and 16b,
  `--shadow-none`, the banner accent contract and every other deferred item
  remain exactly as they were.
- **It creates no missing workspace document** and claims none was created.
- **It corrects no consumer repository** and claims none was corrected.
- **It edits neither `project-context/` nor workspace `CLAUDE.md`.**
- **It rewrites no historical ruling text**, and does not edit UI System
  Specification v0.2, the Token Design Authority Ruling, or any accepted ADR
  body.
