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

**It creates and changes no design value**, supersedes no part of UI System
Specification v0.2, and resolves no deferred decision. **Nothing is implemented
by it.** Three values it could not derive from a canonical source are
**reported as gaps rather than invented**: the **pill radius literal**, which
§2.3 never states; the **four keyframe names**, which §2.4 describes without
naming and which belong to Styles; and the **40px small-control geometry**,
which cannot be published while the Button sm 40-versus-44 conflict is open.

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
- **Token Foundation implementation has not begun.**

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

**What remains blocked.** **Token Foundation implementation is not
authorized.** It stays blocked until **all three** of the following are
complete:

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

**One of the three remains outstanding, so implementation is still
blocked.**

**The sign-off also does not authorize** Styles, Icons, Primitives or any
component, any responsive or desktop value, or any consumer change; and it
**resolves no deferred decision**.

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

- **It changes no token, value, role, component, export, font or build
  artifact.**
- **It does not sign off the Token Table**, which remains open, partially
  ratified and unsigned.
- **It did not create ADR 0003.** The number was still reserved when this
  ruling was recorded. **ADR 0003 was written and accepted separately on
  2026-09-18**; nothing in it is attributed to this ruling.
- **It does not begin Token Foundation implementation**, which has not begun.
- **It resolves no deferred decision** — Decisions 4b, 6b, 11 and 16b,
  `--shadow-none`, the banner accent contract and every other deferred item
  remain exactly as they were.
- **It creates no missing workspace document** and claims none was created.
- **It corrects no consumer repository** and claims none was corrected.
- **It edits neither `project-context/` nor workspace `CLAUDE.md`.**
- **It rewrites no historical ruling text**, and does not edit UI System
  Specification v0.2, the Token Design Authority Ruling, or any accepted ADR
  body.
