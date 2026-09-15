# Architecture Decision Records

## What belongs here

An ADR is required for anything touching **frozen behaviour** — behaviour fixed
by Frozen Technical Architecture v1.1 or by UI System Specification v0.2, which
this repository may not change on its own authority:

- the **five-primitive freeze** (`Button`, `TextField`, `Select`, `OtpInput`,
  `BottomSheet`) — a sixth primitive, or promoting a layout primitive into the
  package, needs one;
- the **exports allow-list** — adding a public subpath that no governing
  document names;
- the **zero runtime dependency** rule;
- the **ESM-only** decision, and any CommonJS output;
- the **absence of install lifecycle scripts**, paired with the committed
  `dist/`;
- the **token source of truth** and the form its derived representations take;
- a **registry migration** away from git-tag consumption.

An ADR here **records a decision**; it does not grant relief from a frozen rule
or create scope. Where a governing document is silent, that silence is a
decision for an owner, not a gap for an implementer to fill.

Routine implementation detail that changes no frozen behaviour does not need
one. Decisions of that kind are recorded in `ARCHITECTURE.md`.

## What does not belong here — owner design/product rulings

There is a third category, and it is not an ADR.

**An owner design/product ruling** is a decision by the authorized human owner
about a **design value, a classification or an explicit interpretation** — a
colour, a weight, a geometry, the standing of an external artifact, the
reading of an accessibility clause. Those are recorded in
[`../architecture/token-table-ratification.md`](../architecture/token-table-ratification.md)
and inventoried in
[`../architecture/canonical-document-registry.md`](../architecture/canonical-document-registry.md),
**not in this series**.

The boundary is **value authority versus representation authority**:

| | Value authority | Representation authority |
| --- | --- | --- |
| Answers | **what** a value, role or behaviour is | **how** it is named, expressed, generated and exported |
| Recorded as | an owner ruling or an approved Token Table entry | an **ADR** |
| Example | the approved palette; the approved weights; the approved font family | the Tailwind delivery artifact (0001); the validation API shape (0002); token representation (0003) |

An owner ruling **may supersede UI System Specification v0.2 for the exact
rules or values it names**; an ADR may not. An ADR settles the form a decided
value takes and **does not invent or silently change the value itself**.

The registry is the single precedence statement. When two documents disagree,
read it rather than inferring an order from this file.

## Index

| # | Title | Status | Date |
| --- | --- | --- | --- |
| [0001](0001-tailwind-token-delivery.md) | Tailwind Token Delivery Strategy | Accepted | 2026-09-11 |
| [0002](0002-validation-helpers-contract.md) | Validation Helpers Public Contract | Accepted | 2026-09-13 |
| [0003](0003-token-representation-and-artifact-contract.md) | Token Representation and Artifact Contract | Accepted | 2026-09-18 |

**ADR 0003 is accepted.** It settles the representation questions the Token
Table had accumulated — names, CSS custom properties, TypeScript exports,
Tailwind keys, generation mechanics, internal paths and artifact parity — for
the Token Foundation V1 values the Scoped Token Foundation V1 Owner Sign-off
froze. It **creates and changes no design value**, and **nothing is implemented
by it**: no token file, CSS variable, typed artifact, Tailwind artifact, font
binary, build change, test change or manifest change accompanies it. Three
values could not be derived from a canonical source — the **pill radius
literal**, the **four keyframe names**, and the **40px small-control
geometry**, whose Button sm conflict is open — and each is **reported as a gap
rather than invented**.

## Format

Title · Status · Date · Scope · Authority tier · Context · Problem · Decision ·
Consequences (positive and negative) · Alternatives considered · Sources.

Record what was rejected and why. An ADR whose alternatives section is empty has
not finished explaining the decision.
