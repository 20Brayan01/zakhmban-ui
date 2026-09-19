# Token Design Authority Ruling — Token Foundation Decision 17

- **Status:** Approved
- **Date:** 2026-09-15
- **Decided by:** human design/product owner
- **Repository state at ruling:** `main` @
  `c1cad42823a90a5d95c68ab24d1466001d9946f9`
- **Scope:** classification of external design material only. **No token value,
  no component, no export, no frozen behaviour is changed by this ruling.**
- **Authority tier:** a classification ruling. It confirms the existing
  authority chain rather than altering it, and it grants no relief from any
  frozen rule. See "Why this is not an ADR" below.

## Ruling

**APPROVED — RULING B.**

The uncatalogued V2 design kit at

```
Therapist Kit Brief Review/_ds/zakhmban-design-system-1b1633e2-90ea-4846-b6c2-bf76bc72aaf2/
```

is classified as **UPSTREAM WORKING MATERIAL / EVIDENCE SOURCE**.

- It is **not** a canonical design authority.
- It is **not** the missing `ZAKHMBAN-V2-UI-DESIGN-SYSTEM.md`.
- It may be used **only** as candidate evidence for unresolved design values,
  and **only** where it does not contradict a canonical document.

## Authority chain after this ruling — unchanged

```
Frozen Technical Architecture v1.1
  → UI System Specification v0.2
    → implementation preference
```

Nothing is inserted into this chain. Nothing is removed from it. The workspace
product package (`project-context/`) remains product truth and is not edited by
this ruling; `01-project-overview.md` continues to name
`ZAKHMBAN-V2-UI-DESIGN-SYSTEM.md` at rank 4 of its source order, and that
document continues not to exist.

## Governance rules established by this ruling

These are the operative clauses. Everything else in this record is evidence or
consequence.

1. **Values already present in UI System Specification v0.2 are canonical
   because of the specification, not because of the kit.** The kit's agreement
   with them is corroboration of provenance, never their source of authority. A
   value's canonical citation is always §2.1–§2.4 or §6 of the specification.

2. **Candidate values present only in the kit remain non-canonical until human
   ratification.** Each is an open decision. Agreement with the frozen values,
   internal consistency, and derivability from the brand palette are arguments
   for ratification; none of them is ratification.

3. **Kit scope extensions that contradict canonical closure remain rejected.**
   Specifically: the two extra type steps (`--text-display-web`,
   `--text-body-lg`) against §2.2's *"The scale is closed: eight steps"*; the
   two extra spacing steps (48px, 64px) against §2.3's *"Allowed steps only: 4
   8 12 16 20 24 32 40"*; and the two extra easing curves (`--ease-out`,
   `--ease-in-out`) against §2.4's single `cubic-bezier(.2,0,0,1)`.

4. **Kit font CDN delivery remains rejected.** The kit loads Vazirmatn from the
   Google Fonts CDN at weights 300–800. This is rejected on three independent
   grounds: it exceeds the four weights §2.2 fixes; the CDN is recorded as
   blocked in the target market by `zakhmban-website`'s own source comment; and
   a third-party font host is incompatible with the frozen CSP. The kit's own
   comment concedes the substitution — *"No local binaries were supplied with
   the asset hand-off … replace this import with @font-face rules"*. Font
   delivery remains the later Font Delivery Decision.

5. **`WalletBalance` remains rejected.** UI System Specification v0.2's
   governance correction removed `WalletBalance` and `LedgerRow` from the
   package as business-domain concepts. The kit predates that correction and
   still contains `WalletBalance`. The correction stands. The same applies to
   the kit's `PageHeader`, `SkeletonCard` and `CardHeader`, which the
   specification's confirmed scope does not name.

6. **Kit product-rule assumptions remain rejected.** The design canvas
   `Therapist App V2 Revision.dc.html` asserts a flat 150,000 Toman access fee,
   that first-access-free is not in V2, and that proposal revision is enabled.
   All three contradict the frozen architecture (`ACCESS_FEE_TOMAN` default
   350,000; `FIRST_AD_FREE_ENABLED` default true; `PROPOSAL_REVISION_ENABLED`
   false at launch). This was already recorded by the Therapist App UX
   specification and is reaffirmed here.

## Evidence on which the ruling rests

Summarised; the full comparison was produced for the owner at decision time.

**Timeline.** The kit is dated 2026-09-06. UI System Specification v0.2 was
committed to this repository on 2026-09-11 (`e0c8183`). The kit is five days
older than the document it corroborates, and older than the Therapist App
documents that first classified it.

**Value overlap.** Sixty-four tokens that the specification prints with both a
name and a value across §2.1, §2.2, §2.3, §2.4 and §6 were compared against the
kit's seven token files: **64 identical, 0 differing, 0 missing**, on token name
and value alike. The specification's token set is a proper subset of the kit's
149 tokens.

**Structural overlap.** §2's *"seven files under `tokens/`"* matches the kit's
seven; §7's file list matches their names; §2.1's hover/press *"6 tokens"*
matches the kit's six exactly; §2.4's *"Four keyframes exist and no more"*
matches the kit's four, including the 1400ms shimmer and the 8px fade-up.

**Direction of derivation.** Every component difference is the specification
performing a change it documents: it adds `Checkbox` and `Switch` per v0.1
decisions 4 and 3, adds `ScaleSelect` which §3.2 calls *"the only genuinely new
primitive in this specification"*, and drops `WalletBalance` per the v0.2
governance correction. The kit is the pre-decision state.

**Decisive against the alternative reading.** The brief that commissioned the
kit — `Therapist Kit Brief Review/uploads/CLAUDE-DESIGN-THERAPIST-APP-REVISION.md`
— instructs that it be used *together with* `ZAKHMBAN-V2-UI-DESIGN-SYSTEM.md`.
The kit is therefore a consumer of the missing document, and an artifact cannot
be its own required input.

**Prior classification, consistent with this ruling.** The Therapist App
documents placed the kit at the bottom of their precedence tables — *"Supporting
design references only — checked for consistency, never used to add scope"* —
and named `@zakhmban/ui` itself as the intended colour authority.

## Open provenance question this ruling does not close

The kit's readme lists its sources as the SVG asset directory and a *"Brand &
revision brief supplied in chat: frozen palette, typography scale, geometry,
component inventory, navigation language, status system, SVG asset policy,
product rules, quality bar, required screen states"*. It names
`ZAKHMBAN-V2-UI-DESIGN-SYSTEM.md` neither as supplied nor as missing.

Whether that chat brief was the missing document's content cannot be determined
from the workspace. Ruling B does not depend on the answer: under either
reading the kit's unratified values require the owner's approval, and the
ruling was chosen partly because it is inexpensive to revisit. If the answer is
later established, it strengthens the ratification decisions without disturbing
this classification.

## What this ruling does not do

- It does not create, edit or delete a token, a CSS file, a style, a Tailwind
  artifact or any source file.
- It does not resolve any Token Table decision. It changes the **form** seven of
  them take, from open design questions to candidate ratifications, and leaves
  the answers to the owner.
- It does not add `ZAKHMBAN-V2-UI-DESIGN-SYSTEM.md` to the workspace, supersede
  it, or amend `project-context/`. Whether the signed Token Table supersedes
  that document for Token Foundation scope is a separate, still-open decision.
- It does not begin Token Foundation implementation.

## Why this is not an ADR

`docs/adr/README.md` requires an ADR for anything touching frozen behaviour,
and lists *"the token source of truth and the form its derived representations
take"* among the triggers. This ruling is deliberately recorded outside that
series, for three reasons:

1. **It changes no frozen behaviour.** It confirms the authority chain exactly
   as `ARCHITECTURE.md` already states it. An ADR records a decision that moves
   something; this one records that nothing moved.
2. **It decides nothing about the token source of truth.** That decision — the
   authored CSS, its derived representations, and their generated-source
   strategy — belongs to ADR 0003, which is not yet written and which this
   ruling explicitly does not pre-empt.
3. **Its subject is external material, not this package.** It classifies a
   workspace directory. The ADR series governs this repository's own frozen
   surface.

This paragraph exists so that a future reader does not conclude the ADR rule was
avoided. When ADR 0003 is written, it should cite this record as an input.

## Consequences for the Token Table

Recorded in full in
[`token-table-ratification.md`](token-table-ratification.md). In summary:

| Decisions            | Status after this ruling                                |
| -------------------- | ------------------------------------------------------- |
| 1, 2, 3, 4, 12, 13, 14 | **Candidate ratification** — a stated candidate with provenance, awaiting APPROVE / AMEND / REJECT |
| 5, 6, 7, 16          | **Unresolved**, with the kit's values retained as starting evidence |
| 8, 9, 10, 11, 15     | **Unresolved original work** — the kit holds nothing relevant |

No candidate is approved by this ruling.

## Sources

- Frozen Technical Architecture v1.1 §2, §2.1, §2.2 — workspace
  `project-reference/architecture/`.
- UI System Specification v0.2 §2, §2.1–§2.4, §3, §6, §7, §9 —
  `docs/architecture/zakhmban-ui-system-spec.md`.
- `project-context/01-project-overview.md` — authoritative source order, rank 4.
- `project-context/07-ai-development-rules.md` §2 — source precedence.
- `project-reference/LEGACY-DOCUMENTATION-INVENTORY.md` — the kit is not
  catalogued there; the Phase 1 design kit at brand green `#479B11` is a
  different artifact and is.
- `Therapist Kit Brief Review/_ds/zakhmban-design-system-1b1633e2-90ea-4846-b6c2-bf76bc72aaf2/`
  — `readme.md`, `styles.css`, `tokens/*.css`, `_ds_manifest.json`.
- `Therapist Kit Brief Review/uploads/CLAUDE-DESIGN-THERAPIST-APP-REVISION.md` —
  the commissioning brief.
- Workspace `therapist-docs/` — `THERAPIST-APP-UX-SPECIFICATION.md` §0.1–§0.2,
  `THERAPIST-APP-TECHNICAL-ARCHITECTURE.md`,
  `THERAPIST-APP-IMPLEMENTATION-ROADMAP.md` F-05, F-18. Uncatalogued prior-stage
  material; persuasive as precedent, not binding as authority.
- This repository's `ARCHITECTURE.md` and `docs/adr/README.md`.
