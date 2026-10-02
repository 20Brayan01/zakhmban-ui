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
| [0004](0004-styles-keyframe-representation-contract.md) | Styles Keyframe Representation Contract | Accepted | 2026-09-24 · behaviour resolved 2026-09-25 |
| [0005](0005-icon-representation-contract.md) | Icon Representation and Glyph Delivery Contract | **Proposed** | 2026-10-02 |

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

**ADR 0004 is accepted.** It freezes exactly four public `@keyframes`
identifiers — `zakhmban-shimmer`, `zakhmban-fade-up`, `zakhmban-slide-up` and
`zakhmban-spin` — closing **ADR 0003's second gap for the names only**. It
records that they are package-owned public CSS identifiers in a namespace CSS
makes global, that they are **authored Styles CSS rather than generated token
output**, that **no `--animate-*` Tailwind key is authorized** and the preset
is unchanged, and that each keyframe must end in the element's static end
state so the approved reduced-motion contract can suppress it correctly. It
**creates no motion value on its own authority** and **nothing is implemented
by it**.

**Behaviour resolved 2026-09-25.** As accepted, ADR 0004 reported that the
four keyframe **bodies** were undefined by every canonical source and listed
each missing field **as a gap rather than inventing one** — the same
discipline ADR 0003 applied. The **Styles Keyframe Behaviour Owner Decision
of 2026-09-25** supplied every value before anything was published, and
**§8 now carries the exact contracts**. **No behavioural field remains
unresolved**; the four names and every ownership, publicity and Tailwind
position are unchanged; **no token was created**. The §8 values are the
owner's, recorded verbatim — including two deliberately narrow supersessions
of v0.2 §2.4 that belong to the owner and not to the ADR. **Implementation
remains unauthorized and is a separate task.**

**ADR 0005 is proposed, not accepted.** It is the first documentation step of
the `v0.3.0` allocation — **Icons and the five primitives** — and covers
**Icons only**. It records how the Icon abstraction that UI System
Specification v0.2 §3.1, §5, §7 and §9 already decide is **represented**:
a generated, committed, parity-checked glyph registry carrying an explicit
per-glyph mirroring flag; Lucide glyph data obtained by a **build-time
generator from an exactly-pinned devDependency**, so `dependencies` stays
`{}` and no consumer gains a transitive dependency; the vendored ISC licence
notice travelling beside the artifact on the `OFL.txt` precedent; and `Icon`,
`IconProps` and `IconName` reaching consumers through the **existing root
entry with no fourth public subpath**. It proposes an **eleven-name initial
inventory** under two stated admission rules — canonical evidence for the
glyph, and a specified surface that consumes it — recording per name whether
that evidence is a **named** glyph or a **surface that requires one**, and it
**makes no claim about the future ZakhmBan glyph set** of v0.2 §9 unknown 4.
Its §3 is explicit that **no Lucide package is installed or locked in this
repository**, so the upstream distribution, its data shape and its licence
text are **implementation facts to establish, not findings**: the ADR states
a verbatim-copy rule and claims no licence has been copied or verified.

**§1.1 settles the Icon colour question without an owner decision.** v0.2
§3.1's approved prop list is `name†` `size` `color` `strokeWidth` — no `tone`,
unlike Text, Button, StatusBadge and IconButton — so the initial Icon defines
only the **bound navy default** (`--text-primary`, per the Token Table) and
takes every other colour from the **use site** through `color`. A semantic
active/destructive mapping is therefore **not required by the initial API**
and is left as a **future owner decision**; owner finding **IA-6** already
records that §3.1's contract *"names navy, green and red only"* with no icon
role bound to the latter two, and scopes that gap to **InfoBanner and
ErrorBanner** — Tier 2 — so **no Tier 1 primitive is blocked**. §5 additionally
records the **raw-palette usage guard** that finding **IA-5** makes due with
the first component implementation commit.

It also reconciles the `react` / `react-dom` **peer timing**: v0.2 §7 and
§7.2 state the peer relationship unconditionally and name no trigger, while
`ARCHITECTURE.md`'s unguarded C1 row and `vitest.config.ts`'s comment both
forecast "the first primitive". §6 reads the operative rationale — *"the
package's code needs nothing at this commit"* — as the trigger, notes that
v0.2 §9 lists Icon as a **Foundation** rather than a primitive, and treats the
wording as a **correction owed to two subordinate documents** rather than a
rule to reinterpret silently. A peer dependency is not a runtime dependency,
and **the zero-runtime-dependency rule is unchanged**.

It **creates no design value**, **invents nothing for the deferred
decisions** — the overlay-root/Portal technique, the Button `sm`
40-versus-44 geometry and the pill radius are each left exactly as the owner
left them — and **nothing is implemented by it**: no source file, generator,
licence file, manifest change, guard change or export change accompanies it.

## Format

Title · Status · Date · Scope · Authority tier · Context · Problem · Decision ·
Consequences (positive and negative) · Alternatives considered · Sources.

Record what was rejected and why. An ADR whose alternatives section is empty has
not finished explaining the decision.
