# ADR 0006 — Overlay-Root Representation Contract

- **Status:** Accepted
- **Date:** 2026-10-04 · **accepted 2026-10-04**, after the Overlay
  Failure-Signalling Channel Correction of the same date closed the one item
  that blocked it. **No other clause changes on acceptance**: the attribute
  names, the six structural obligations, the invalid-structure list, the
  delivery route and the layering caveat all stand exactly as proposed.
  **Its earlier Proposed merge did not accept it** — that merge recorded a
  proposal, and this record is the acceptance.
- **Scope:** the **cross-boundary representation** that Decision A of the
  Overlay-Root and Button sm Contract Ruling (2026-10-04) reserved for this
  ADR — the DOM contract between the application-owned `Screen` and the
  package-owned `BottomSheet`. It names the two attributes the two sides must
  agree on, fixes where the overlay root sits and what makes the structure
  invalid, and settles how the overlay styling reaches consumers. **It
  decides no design value, creates no token, adds no export and no subpath,
  and authorizes no implementation.**
- **Out of scope, deliberately:** the React portal mechanism · the inertness
  mechanism · the scroll-lock mechanism · the focusable-element enumeration
  algorithm · the signalling channel for a structural failure · the file name
  and path of the overlay stylesheet. **Decision A §A.9 leaves each of those
  to implementation**, because none crosses the boundary and §A.2, §A.3 and
  §A.10 already fix the observable outcome of each. **Also out of scope:** the
  Button `md` 48 token-naming question of Decision B §B.4, which this ADR does
  not touch.
- **Authority tier:** **representation authority only**, as
  [`../architecture/canonical-document-registry.md`](../architecture/canonical-document-registry.md)
  defines it. Value and behavioural authority stay with Frozen Technical
  Architecture v1.1, `project-context/`, the approved owner rulings and UI
  System Specification v0.2. **Every behavioural requirement restated below is
  quoted from Decision A, not decided here.** Where a canonical source is
  silent on a value, this ADR **records the gap rather than filling it**, as
  ADR 0003, ADR 0004 and ADR 0005 each did.
- **Nothing is implemented by it.** No `BottomSheet`, no overlay stylesheet,
  no source, test, script, manifest, lockfile or artifact change accompanies
  it. **Accepting it is not an implementation authorization.**

## Context

**Decision A settled the boundary; it deliberately did not settle the DOM.**
Its §A.1 requires the application-owned `Screen` to supply *"a dedicated
overlay root at document level, outside the `Screen` content subtree and
outside its stacking and clipping contexts"* and to *"identify the background
content that must become unavailable"*. Its §A.2 gives `BottomSheet`
ownership of focus entry and containment, Escape and scrim dismissal, focus
return, body scroll locking and background unavailability to pointer **and**
keyboard. Its §A.9 then reserved for this ADR exactly four mandatory items —
the overlay-root DOM and stylesheet contract, background-scope identification
including any marking the application must apply, the observability of the
structural failure, and delivery through the existing `./styles` entry.

**Two sides must agree on something concrete, and today they agree on
nothing.** `Screen` is Tier 2 and lives in the consuming application;
`BottomSheet` is Tier 1 and ships from this package. The package imports
nothing from an application and knows none by name (v0.2 §7.3), so the only
thing that can join them is a **documented contract over the DOM**. Until it
is named, `Screen` cannot be built against it and `BottomSheet` cannot find
its root.

**The hazard is specific, not theoretical.** Decision 15 records that
*"`transform`, `opacity` below 1, `filter` and positioned ancestors may create
new stacking contexts"* and that *"A child with z-index 30 cannot escape an
ancestor stacking context"*. The approved `--press-scale: 0.98` is one such
transform, so a sheet rendered inside the subtree of a pressed control would
be trapped below the chrome it must cover, with `--z-dialog` set correctly and
no error anywhere. A document-level root is what removes that class of failure
by construction.

**The precedent for delivery already exists.** ADR 0004 shipped the four
keyframes through the **existing** `./styles` entry: *"No new public subpath
is created, and none is needed: a `@keyframes` block is delivered by the
stylesheet a consumer already imports once at its application root"*, and
*"`package.json` needs **no change** — not `exports`, not `files`, not
`sideEffects`, not `dependencies`."* Overlay rules are the same shape of
problem and take the same route.

## Problem

Four questions, none of which an implementation commit may answer on its own
authority, because each is a contract two repositories must share:

1. **How does the package find the overlay root**, without knowing the
   application's markup, id space or component tree?
2. **How does the application say which content must become unavailable**, so
   the package is not left guessing at a subtree it does not own?
3. **What exactly counts as invalid structure**, and what must happen when it
   is — given §A.4 forbids a silent inline fallback?
4. **How does the overlay styling reach a consumer** without a fifth public
   subpath, which the registry's deferral list closes?

## Decision

### 1 · Restated, not decided here

Quoted from Decision A. An implementation may not vary any of it, and this ADR
adds nothing to it: the overlay root is **application-supplied, at document
level, outside the `Screen` content subtree and its stacking and clipping
contexts** · `BottomSheet` **portals its scrim and surface into that root** ·
the package owns **focus entry and containment, Escape and scrim dismissal,
focus return, body scroll locking and background unavailability to pointer and
keyboard**, and **restores all of it on close and on unmount** · **the scrim
receives pointer interaction and background content does not** · **declared
modal semantics must match actual behaviour**, and **`aria-hidden` plus
`pointer-events` alone is not a substitute for preventing keyboard
interaction** · **a missing root or unidentified background must not silently
fall back to an inline sheet** · **one package-owned `BottomSheet` at a time**,
with the application responsible for coordinating its own `Modal`.

### 2 · The overlay root — `data-zakhmban-overlay-root`

**The application marks its overlay root with the boolean attribute
`data-zakhmban-overlay-root`.** Presence is the whole signal; the attribute
takes no value, and any value present is ignored.

```html
<body>
  <div data-zakhmban-overlay-background>
    <!-- the Screen: app bar, status strip, scroll region, docked action, bottom nav -->
  </div>
  <div data-zakhmban-overlay-root></div>
</body>
```

**Why an attribute and not an `id` or a class.**

- An **`id`** would claim a name inside the application's own global id space,
  which the package does not own and cannot audit, and ids are unique by
  specification — so a second one is a silent DOM error rather than a
  detectable contract violation the package can report.
- A **class** carries no uniqueness expectation at all; `class` is the one
  attribute every styling approach already crowds, and a collision would be
  invisible.
- A **`data-` attribute** collides with nothing, is greppable in a consumer
  repository, is queryable (`[data-zakhmban-overlay-root]`), is targetable
  from CSS by the same selector, and lets the package count occurrences and
  report **zero or more than one** as the distinct failures they are.

**Why the `zakhmban-` prefix.** ADR 0004 made this argument for `@keyframes`
identifiers and it transfers exactly: the attribute namespace is **global to
the document**, four applications and their dependencies share it, and an
unprefixed `data-overlay-root` arriving from anywhere else would be
indistinguishable. The prefix is load-bearing, not decoration.

### 3 · The background scope — `data-zakhmban-overlay-background`

**The application marks the content that must become unavailable with
`data-zakhmban-overlay-background`**, also boolean.

**One or more elements may carry it**, and the package makes **every** marked
element unavailable while a sheet is open. One is the expected case — a
`Screen` that wraps app bar, scroll region, docked action and bottom nav in a
single element marks that element. More than one is permitted because v0.2
§4.1's shell lists those parts as siblings, and an application that renders
chrome outside its main wrapper would otherwise be forced into a wrapper this
contract has no business requiring.

**Completeness is the application's duty, and it is the most consequential
obligation in this contract.** Marking **one** element satisfies the
*validity* check of §5; it does **not** satisfy §A.2. **The application must
mark every region of application-controlled interactive content that must
become unavailable while a sheet is open** — the `Screen` wrapper, any chrome
rendered outside it, and **the application's own other portal or overlay
mounts**, including the mount its Tier 2 `Modal` uses, a toast or notification
mount, and any persistent affordance rendered at document level. §A.5 already
makes coordinating the application's own `Modal` with `BottomSheet` the
application's responsibility; marking that mount is the representational half
of the same duty.

**What an unmarked interactive background region means for conformance.** It
is a **conformance defect in the application**, not a package failure, and it
has a specific consequence: that region stays operable behind the scrim, so
the background is **not** genuinely unavailable, and the
`role="dialog"` + `aria-modal="true"` the package declares becomes an untrue
claim — exactly what §A.3 forbids. **The correctness of the package's
`aria-modal` declaration is contingent on complete marking**, and that
contingency is stated here rather than left implicit.

**The package cannot detect this, and does not try.** It has no way to tell a
deliberately unmarked region from a forgotten one, and **it must not attempt
to discover or control DOM it does not own** — another library's portal, an
analytics or error-reporting mount, a browser extension's injection. §5's
validity check therefore catches *absence of any marking*, which is
mechanical, and **cannot** catch *incomplete marking*, which is not. Like the
Route A shimmer obligation, this is a duty the package states and documents
and a consumer must honour; the future verification plan in §10 puts the test
for it in the consuming application, where the markup lives.

**Why marking, rather than "everything except the overlay root".** The
package would then also disable nodes the application did not put there and
does not control. Decision 15 names what the scrim must cover: *"ordinary
page content · TopAppBar · BottomNav · docked action blocks · all other
Application Chrome"*. That is the application's content, and only the
application can delimit it. Explicit marking also makes the obligation
visible in the consumer's own source, which a negative rule never is.

### 4 · Structural obligations on the application

These are the **only** obligations this contract places on a consumer, and
each exists because the package cannot satisfy it from inside:

1. **Exactly one** element carries `data-zakhmban-overlay-root`.
2. **Every** region of application-controlled interactive content that must
   become unavailable carries `data-zakhmban-overlay-background` — see §3's
   completeness rule — and therefore **at least one** element carries it.
3. The overlay root is a **direct child of `<body>`**.
4. The overlay root is **not a descendant of any element carrying
   `data-zakhmban-overlay-background`**.
5. The overlay root appears **after** every background element in document
   order.
6. The application **renders the overlay root unconditionally** — it is part
   of the shell, not something mounted when a sheet opens.

**Why each is needed.**

**(3)** takes the root out of **the stacking and clipping ancestors the
`Screen` creates**, which is §A.1's requirement and the Decision 15 hazard
above; a root nested anywhere inside the application tree reintroduces exactly
the trap. **That escape is the whole of what document-level placement
guarantees, and this ADR claims no more.**

It does **not** by itself put the overlay and all background content in one
comparable context, and it does **not** make the published integers order them
correctly on its own. An application may still establish a stacking context at
document level — on its background wrapper, on the overlay root itself, or on
another `<body>` child — and a sheet inside a context whose **own** level sits
below the background's is ordered by that outer level, not by `--z-dialog`.
**Actual overlay precedence depends on the stacking contexts that apply in a
given layout, together with Decision 15's approved layering rules, and must be
verified in a consumer layout** rather than inferred from the markup shape.
Nothing here introduces a new integer, a CSS rule or a technique.

**(4)** guarantees the sheet is never inside the subtree being made
unavailable — without it the package would disable its own dialog, and §A.3's
truthful-semantics rule would be unsatisfiable.

**(5)** is a **supporting** guarantee and is deliberately not claimed as more.
**Document order does not establish paint order across stacking levels**: a
positioned background carrying `--z-chrome` paints above a later sibling at
`z-index: auto`, so ordering alone cannot stand in for the approved integers,
and this ADR does not pretend otherwise. **Paint order is established by the
approved layering rules as they apply within whichever stacking contexts a
consumer layout actually creates — see (3) — never by DOM order, and never by
DOM order standing in for focus containment.** What (5) does buy is narrower
and still worth requiring: a **predictable sequential-navigation and reading
order** in which the sheet's content follows the background, and a defined
arrangement for the moments **before** the sheet's containment engages and
**after** it is released on close. **Focus containment itself is not a consequence of document
order** — it is `BottomSheet`'s behavioural duty under §A.2, and it is owned,
implemented and proven there.

**(6)** means `BottomSheet` can validate the structure on open rather than
racing the application's mount.

**No lifecycle hook and no ordering callback is required.** The structure is
static markup in the shell; the package reads it and does not ask the
application to run anything.

**On wrapper elements, stated precisely.** This contract **mandates no extra
wrapper**: an application whose shell already gives **complete marked
background coverage** — one existing element it can mark, or several it marks
individually — adds nothing but the attributes. **An application without such
an element must either add one wrapper or mark every applicable region
separately**, and which of the two it chooses is the application's decision.
The contract asks for **coverage**, not for a particular element; §3's
completeness rule is the obligation, and a wrapper is one ordinary way to
satisfy it.

### 5 · Validity, and the observable failure

**Invalid structure is exactly:** zero elements carrying
`data-zakhmban-overlay-root`; more than one; a root that is a descendant of a
background element; or zero elements carrying
`data-zakhmban-overlay-background`.

**On invalid structure, `BottomSheet` must not render an inline sheet.** That
is §A.4, and it is the cross-boundary outcome: a sheet that looks modal while
trapped by a stacking context, or while leaving the background operable, is an
accessibility regression that reaches production silently.

**The failure must be observable to the application developer.** **The
channel is an internal implementation choice**, and this ADR does not select
one — not a throw, not a logged error, not a returned result state.

> **CLOSED 2026-10-04 by the Overlay Failure-Signalling Channel Correction.**
> As first written, Decision A carried two clauses that could not both be
> followed: **§A.4** ended *"The mechanism for making it evident is
> representation and belongs to ADR 0006"*, while **§A.9** listed *"the
> signalling mechanism for that failure"* among the items **left to
> implementation**. This ADR recorded the contradiction and refused to settle
> it, because an ADR may not resolve a conflict between two clauses of an
> owner ruling by inference. **The owner withdrew §A.4's sentence on
> 2026-10-04**, leaving **§A.9 to govern**, and the sentence is struck in
> place rather than deleted so the approved record survives.
>
> **What the correction did not touch, and what this ADR therefore still
> requires:** invalid structure must produce a **developer-observable
> failure**, and must **never silently fall back to an inline sheet**. §5's
> four invalid structures are unchanged. Only the **choice of channel** moved,
> and it moved to implementation.

### 6 · Styling delivery — through the existing `./styles` entry

**The overlay rules are authored Styles CSS, reaching consumers through the
`@zakhmban/ui/styles` entry a consumer already imports once at its application
root.** On the ADR 0004 precedent:

- **No new public subpath.** There is no `./overlay`, and the registry's
  deferral list still closes *"any fourth public subpath"*.
- **`package.json` needs no change** — not `exports`, not `files`, not
  `sideEffects`, not `dependencies`.
- **No new consumer action.** A consumer that already follows the documented
  import order receives the overlay rules automatically; nothing is added to
  the integration steps.
- The stylesheet lives under `src/styles/`, which **ADR 0003 §18 already
  requires** of every authored stylesheet. **Its file name and path are
  implementation** and are not fixed here.

**One styling outcome is cross-boundary and is required:** **an overlay root
that contains no open sheet must not affect layout, paint or hit-testing.**
The element is application-owned and always present, so rules that made an
empty root occupy space or swallow pointer events would break every screen
that has no sheet open. **How that is achieved is implementation.**

### 7 · Direction and language

**The package must not set `direction`** — owner D-2, enforced today by
`styles-contract.test.ts`. It does not need to. Because the overlay root is a
**child of `<body>`**, it inherits `dir="rtl"` and `lang="fa"` from the
document element exactly as the rest of the page does, and so does every node
`BottomSheet` portals into it.

**This is a reason for the document-level placement, not a side effect of
it.** A portal into the nearest positioned ancestor, or into a detached node
appended at open time, would both put the sheet somewhere whose inherited
direction depends on where the opener happened to be — which v0.2 §5's
RTL-only, document-owns-direction model does not contemplate.

### 8 · One overlay, representationally

§A.5 fixes the policy. Its representational consequence is small and stated
for completeness: **one overlay root, and at most one package-owned
`BottomSheet` mounted in it at a time.** The contract names nothing for
application-owned `Modal` to coordinate through, because §A.5 makes that the
application's responsibility and **no package mechanism can enforce it**.

### 9 · What acceptance would, and would not, do

**Would:** fix the two attribute names and the six structural obligations as
the cross-boundary contract, so `Screen` work in a consumer and `BottomSheet`
work in this package can proceed against the same shape; discharge the
**mandatory** half of Decision A §A.9; and close D-6's last open item, the
**shared overlay-root selector**.

**Would not:** authorize implementation of `BottomSheet` or anything else —
**a separate owner implementation authorization is still required**, on the
pattern of the Icon Foundation Implementation Authorization of 2026-10-03;
reopen any part of Decision A; create a token, a design value, an export, a
subpath, a sixth primitive, a public `Portal` or a public `FocusTrap`; change
the Token Foundation counts, the version `0.2.0`, `private: true`, or any tag;
or resolve Decision B §B.4's Button `md` question.

**Interaction with Decision A.** This ADR is **subordinate** to it. Every
behavioural outcome in §A.2, §A.3, §A.4, §A.5 and §A.10 survives unchanged,
and the **single-overlay** and **accessibility** outcomes in particular are
restated rather than reinterpreted. Where this ADR and Decision A could be
read differently, **Decision A governs** — the registry's precedence chain
puts owner rulings above accepted ADRs, and an ADR *"may not"* supersede a
rule it did not create.

### 10 · Future verification plan

**A plan, not an instruction to write tests now.** Nothing here is
implemented, and these obligations attach to the commit that ships
`BottomSheet`, under its own authorization:

| Area | What a later test must show |
| --- | --- |
| **Root placement** | the sheet renders inside the element carrying `data-zakhmban-overlay-root`, that element is a `<body>` child, and a sheet opened from inside a transformed ancestor still paints above application chrome |
| **Background identification** | every element carrying `data-zakhmban-overlay-background` is unavailable to pointer **and** to sequential keyboard navigation while open, and fully restored on close and on unmount |
| **Marking completeness** | **a consumer-side test, in the consuming application, not here** — with a sheet open, no application-controlled interactive region remains reachable by pointer or by sequential keyboard navigation, the application's own `Modal` and toast mounts included. The package cannot test this, because it cannot see the application's markup |
| **Missing or invalid root** | each of the four invalid structures of §5 produces **no inline sheet** and a developer-observable failure. **The channel is an implementation choice**, so the test asserts the two outcomes and the implementation's own chosen signal, not a channel this ADR named |
| **Styling delivery** | the overlay rules arrive through `@zakhmban/ui/styles`; the `exports` map is unchanged; **no fifth subpath** exists; and an empty overlay root affects neither layout nor hit-testing |
| **RTL** | with `dir="rtl"` on the document element, the portalled sheet computes `direction: rtl`, and **no package rule sets `direction`** |

Guards that the implementing commit would have to amend are named now so a
reviewer can tell an authorized amendment from erosion:
`tests/architecture/styles-contract.test.ts`, whose D-6 guard currently fails
the build on the literal strings `overlay-root`, `portal`, `inert`,
`pointer-events`, `position: fixed`, `overflow: hidden`, `scroll-lock` and all
three `--z-*` names in any Styles file; and
`tests/architecture/build-output.test.ts`, if a new Styles asset ships.
**`root-export.test.ts` and `exports-contract.test.ts` must NOT need
amending** — if either does, the no-new-export boundary has been crossed and
the work stops.

## Consequences

**Positive.** `Screen` and `BottomSheet` can be built in parallel in two
repositories against one written shape. The document-level root removes the
stacking-context trap by construction rather than by discipline. RTL
inheritance is free and needs no package rule, so D-2 stays intact. Delivery
adds nothing to the public surface, so the exports allow-list and its guard
stand unchanged. Two attribute names are cheap for a consumer to adopt and
trivial to grep for in review.

**Negative, and accepted.** The contract places **six obligations on every
consumer that uses `BottomSheet`**, and the package can enforce none of them
from inside — it can only detect and report, exactly like the Route A shimmer
obligation. An application that marks nothing gets no sheet, which is the
intended failure but is still a failure a developer must read about rather
than see. Two more names enter the global attribute namespace the four
applications share. And a consumer that renders its chrome in several places
must mark each one; the alternative was to require a wrapper, which would have
been a larger imposition.

## Alternatives considered

- **An `id` (`#zakhmban-overlay-root`) instead of a data attribute.**
  Rejected: it claims a name in the application's id space, and duplicate ids
  are a silent DOM error rather than a contract violation the package can
  count and report.
- **A class instead of a data attribute.** Rejected: no uniqueness
  expectation, and the most crowded attribute in any application.
- **"Everything in `<body>` except the overlay root" as the background.**
  Rejected: it disables nodes the application neither rendered nor controls,
  and it makes the obligation invisible in consumer source.
- **Portaling into the nearest positioned ancestor, or into a node appended
  to `<body>` at open time.** Rejected as the *contract*: both leave the
  sheet's inherited direction and stacking dependent on where the opener sat,
  and the second cannot be validated before it is needed. Note that the
  second remains available as an **internal** detail of how the package
  attaches to the approved root.
- **A package-rendered `<OverlayProvider>` or context component.** Rejected:
  it is a public component in all but name, which §A.6 forecloses — `Portal`
  and `FocusTrap` stay internal and unexported.
- **The native `<dialog>` element with `showModal()`.** This deserves recording
  rather than dismissal: the top layer escapes every ancestor stacking context
  and the user agent supplies inertness, which would make an
  application-supplied overlay root largely unnecessary. **It is foreclosed as
  an architecture by Decision A**, which already approved the
  application-supplied root, and an ADR may not overturn an owner ruling. It
  remains fully available as an **internal mechanism inside** the approved
  root, and §A.9 leaves that choice to implementation. **If the owner ever
  wants the root obligation removed in favour of the top layer, that is a new
  owner ruling amending Decision A, not an ADR.**
- **A fifth public subpath (`@zakhmban/ui/overlay`) for the styling.**
  Rejected: *"any fourth public subpath"* is a binding deferral, and ADR 0004
  already proved the `./styles` route carries exactly this kind of payload.
- **Specifying the file path of the overlay stylesheet.** Rejected as
  out-of-scope preference: ADR 0003 §18 already constrains placement to
  `src/styles/`, and §A.9 leaves the rest to implementation.

## What this ADR authorizes, and what it does not

**Authorizes:** nothing to be built. It records a representation contract for
review.

**Does not authorize:** implementation of `BottomSheet` or any primitive · an
overlay stylesheet, portal, focus trap, scroll lock or inertness mechanism ·
any source, test, script, guard, build, manifest or artifact change · a public
`Portal` or `FocusTrap` · a sixth primitive · any new export subpath · any new
token or design value · a version change, tag, release, publication, consumer
migration or deployment.

**Still deferred and untouched:** Decision B §B.4's Button `md` token naming ·
`--radius-pill` · the banner accent contract (IA-6) · Decision 6b's Modal
radius · Decision 4b's shadows · typography role assignment for error text ·
border widths · v0.2 §9 unknown 12 for `Box`, `Stack`, `Text`, `Screen` and
`VisuallyHidden` · every other open Token Table entry.

## Sources

- **Overlay-Root and Button sm Contract Ruling, 2026-10-04 — Decision A**,
  §A.1 to §A.10, and in particular §A.9's split between the mandatory
  cross-boundary contract and what is left to implementation —
  [`../architecture/token-table-ratification.md`](../architecture/token-table-ratification.md),
  indexed in
  [`../architecture/canonical-document-registry.md`](../architecture/canonical-document-registry.md).
- **Decision 15** (2026-09-18) — the three stacking roles, the ownership
  table, and the stacking-context constraint with no approved technique.
- **D-6** (Styles Foundation v0.2.0 Contract Ruling, 2026-09-24) — the
  allocation this ADR's subject descends from.
- **UI System Specification v0.2** — §3.4 (`BottomSheet` duties), §4.1 (the
  screen shell), §5 (RTL, document-owned direction), §6 (keyboard, focus,
  semantics), §7 (package structure, exports, directional rule), §9 (Tier 1
  and Tier 2, and unknown 12).
- [`0003-token-representation-and-artifact-contract.md`](0003-token-representation-and-artifact-contract.md)
  — §18's stylesheet-placement rule and the three-subpath limit.
- [`0004-styles-keyframe-representation-contract.md`](0004-styles-keyframe-representation-contract.md)
  — the precedent for delivering new Styles payload through the existing
  `./styles` entry with no manifest change, and for a prefixed global
  identifier.
- [`0005-icon-representation-contract.md`](0005-icon-representation-contract.md)
  — the precedent for a Proposed representation ADR that maps its guard
  amendments before any code.
- [`README.md`](README.md) — what belongs in this series, the format, and the
  value-versus-representation boundary.
- Repository evidence, read as the current contract:
  `tests/architecture/styles-contract.test.ts` (the D-6 guard and the
  no-`direction` guard), `src/styles/index.css` (the import order),
  `src/tokens/base.css` (`--z-chrome`, `--z-scrim`, `--z-dialog`),
  `package.json` (`exports`).
