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

## Index

| # | Title | Status | Date |
| --- | --- | --- | --- |
| [0001](0001-tailwind-token-delivery.md) | Tailwind Token Delivery Strategy | Accepted | 2026-09-11 |
| [0002](0002-validation-helpers-contract.md) | Validation Helpers Public Contract | Accepted | 2026-09-13 |

## Format

Title · Status · Date · Scope · Authority tier · Context · Problem · Decision ·
Consequences (positive and negative) · Alternatives considered · Sources.

Record what was rejected and why. An ADR whose alternatives section is empty has
not finished explaining the decision.
