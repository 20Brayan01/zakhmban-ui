# ADR 0004 — Styles Keyframe Representation Contract

- **Status:** Accepted
- **Date:** 2026-09-24 · **behaviour resolved 2026-09-25** by the Styles
  Keyframe Behaviour Owner Decision, which supplies the exact keyframe
  contracts this ADR first recorded as gaps. §8 is rewritten to carry them.
  **No name, ownership rule, publicity rule or Tailwind position changes.**
- **Scope:** the **names** of the four keyframes UI System Specification v0.2
  §2.4 fixes the existence and meaning of, the ownership, publicity,
  generation and versioning rules that follow from naming them, and — from
  2026-09-25 — the **exact owner-approved behavioural contract** each one
  carries. **This ADR creates no motion value on its own authority**: every
  value in §8 is owner-supplied and recorded verbatim. **Nothing is
  implemented by it** — no CSS file, no `@keyframes` rule, no token, no
  artifact, no build change, no test change and no manifest change
  accompanies it.
- **Authority tier:** representation authority only, as
  [`../architecture/canonical-document-registry.md`](../architecture/canonical-document-registry.md)
  defines it. Value authority stays with the frozen architecture,
  `project-context/`, the approved owner rulings and UI System Specification
  v0.2. **The §8 behavioural values are owner values recorded here, not ADR
  values**, and the two scoped supersessions of v0.2 §2.4 they carry are the
  owner's, entered in the Token Table and the registry. Where a canonical
  source was silent, this ADR **recorded the gap rather than filling it**
  until the owner closed it — exactly as ADR 0003 did for the pill radius,
  these names and the 40px small-control geometry.

## Context

**UI System Specification v0.2 §2.4 fixes that four keyframes exist and what
each one is for, and names none of them:**

> Four keyframes exist and no more: skeleton shimmer (1400ms), fade-up 8px
> for dialogs, slide-up for sheets, spin for loading.

§7's package tree places them:

```text
    styles/      reset, global, keyframes
```

**ADR 0003 refused to name them, and said why.** Its gap 2 reads: *"The four
keyframes have meanings but no canonical names. §2.4 fixes… and fixes that
there are four and no more. It names none of them, and naming them is a
Styles decision — §7 places `keyframes` under `styles/`. This ADR names no
keyframe and emits no `--animate-*` key."* It tokenised the one value §2.4
supplies, the 1400ms shimmer duration, as `--duration-shimmer`, and left the
8px fade-up distance as *"a keyframe internal… left to Styles."*

**Styles is now in scope.** The **Token Foundation v0.1.0 Release-Sequence
Ruling** of 2026-09-20 allocates Styles to **v0.2.0**, and the **Styles
Foundation v0.2.0 Contract Ruling** of 2026-09-24 settles the reset, body,
focus-visible and reduced-motion contracts and delegates the keyframe
naming question here.

**The behavioural half followed a day later.** As first written, this ADR
froze the four names and reported that no canonical source stated their
bodies, listing each undefined field rather than inventing one. The **Styles
Keyframe Behaviour Owner Decision of 2026-09-25** supplied every missing
value before anything was published, and **§8 now carries the exact
contracts** instead of the gap table. The sequence is the point: the names
had to be fixed before a consumer could write one down, and the bodies could
only ever come from an owner.

**Two facts make naming urgent rather than cosmetic.** First, a CSS
`@keyframes` identifier lives in a **single global namespace per document**:
two stylesheets that both define `spin` do not coexist, the later definition
silently wins, and no build step warns. Second, **three of the four keyframes
serve Tier 2, application-owned components** — Skeleton, Modal and the
loading indicator are all built in the consuming application under v0.2 §9 —
so the names are not a package internal. An application will write
`animation-name:` and a package-owned identifier, which makes that identifier
a **public contract** the moment Styles ships.

## Problem

What are the four keyframes called, who owns those identifiers, and what
follows from publishing them?

Leaving them unnamed is not available: Styles cannot author a `@keyframes`
block without an identifier, and letting each implementation pick one would
put four spellings of the same animation into four repositories — precisely
the duplication a shared package exists to prevent. Naming them casually at
implementation time is equally unavailable: an identifier a consumer writes
into its own CSS cannot be renamed later without breaking that consumer, and
`docs/adr/README.md` places anything that widens the package's public surface
in this series rather than in a commit message.

## Decision

### 1 · The four public keyframe names

**Exactly four `@keyframes` identifiers are authorized, and they are:**

| # | Identifier | Meaning fixed by v0.2 §2.4 | Consumed by |
| - | ---------- | -------------------------- | ----------- |
| **1** | **`zakhmban-shimmer`** | skeleton shimmer, **1400ms** | `Skeleton` / `SkeletonCard` — Tier 2 |
| **2** | **`zakhmban-fade-up`** | fade-up **8px**, for dialogs | `Modal` — Tier 2 |
| **3** | **`zakhmban-slide-up`** | slide-up, for sheets | `BottomSheet` — Tier 1, **v0.3.0** |
| **4** | **`zakhmban-spin`** | spin, for loading | loading indicators — Tier 2 |

**A fifth keyframe is prohibited without a new decision.** v0.2 §2.4 states
*"Four keyframes exist and no more"*, and §2.4's prohibition on *"bounce,
spring, parallax, or looping decoration"* stands unchanged.

### 2 · The `zakhmban-` prefix is load-bearing

The prefix is **not** decoration and **not** a naming preference. CSS
`@keyframes` identifiers are **global to the document**, share one namespace
with every other stylesheet the application loads, and **collide silently**:
a consumer's own `spin`, or one arriving from any third-party CSS, would
replace the package's definition with no error at build time and no warning
at runtime. The prefix makes that collision impossible in practice while
keeping the identifier readable in a devtools animation panel.

It also matches the package's existing posture on namespaces: ADR 0003 §10
records that `--font-*`, `--radius-*` and `--text-*` are Tailwind theme
namespaces and that the package aliases package-internal `--_` sources rather
than colliding with them. The same reasoning applied to a global CSS
namespace produces a prefix.

### 3 · These are package-owned public CSS identifiers

- **The package owns them.** They are authored in `zakhmban-ui` and nowhere
  else.
- **They are public.** A Tier 2 component in a consuming application may
  reference them by name — that is what they are for.
- **Consumers may reference only these four names**, and **may not redefine,
  override or shadow them.** A consumer that redeclares `@keyframes
  zakhmban-spin` silently replaces a package animation for the whole
  document; it is a migration defect of the same kind as a consumer-side
  `--font-sans` declaration, which the Owner Font Contract and Delivery
  Ruling already lists as removal work.
- **An application that needs an animation it cannot express is missing a
  keyframe**, and that is a pull request against the package — the same rule
  v0.2 §2 states for tokens. It is **not** licence to author a fifth
  locally under a package-looking name.

### 4 · Authored, not generated

**The four keyframes are authored Styles CSS. They are not generated token
output.**

- They are **authored by hand** under `src/styles/`, in the same sense that
  the seven token CSS files are authored by hand.
- **`scripts/generate-tokens.mjs` does not read, write, parse or validate
  them.** Its input is the flat list of custom-property declarations on
  `:root` under `src/tokens/`; a `@keyframes` block is not a custom property
  and the generator would fail on it rather than guess — ADR 0003 §14: *"The
  generator never invents."*
- **No keyframe appears in the typed token object.** `@zakhmban/ui/tokens`
  exports exactly the **118** approved public tokens (ADR 0003 §11), and a
  keyframe name is not a token.
- **The one motion value a keyframe shares with the token layer is
  `--duration-shimmer`**, which ADR 0003 already tokenised. The shimmer
  keyframe's *duration binding* therefore reads a token; the keyframe
  *identifier* does not become one.

### 5 · Source and `dist` expectations, at the architectural level

No new mechanism is required, and none is introduced.

- The keyframes are authored in a stylesheet under **`src/styles/`**, which
  `tests/architecture/source-entry.test.ts` already permits: its placement
  rule admits stylesheets under `src/tokens/` and `src/styles/` and rejects
  them anywhere else.
- **ADR 0003 §15 already governs the copy:** CSS is copied byte-for-byte from
  `src/` to `dist/` preserving relative paths, and the implementing commit
  owes a **per-file byte-parity assertion** between each `src/` stylesheet
  and its `dist/` counterpart.
- The keyframes reach consumers through the **existing** `./styles` entry
  point. **No new public subpath is created**, and none is needed: a
  `@keyframes` block is delivered by the stylesheet a consumer already
  imports once at its application root.
- `package.json` needs **no change** — not `exports`, not `files`, not
  `sideEffects`, not `dependencies`.

### 6 · Reduced-motion coupling

**Each keyframe must end in the element's normal static end state.**

This is not a stylistic preference; it is what makes the approved
reduced-motion contract achievable. v0.2 §2.4 requires that every animation
be *"suppressed under `prefers-reduced-motion: reduce`, leaving the end
state"*, and §6 repeats it for shimmer, slide and fade. The **Styles
Foundation v0.2.0 Contract Ruling**'s D-5 approves suppression and records
the coupling explicitly.

Suppression can only leave the end state if the final frame **is** that state.
A keyframe authored so its last frame differs from the element's static CSS
cannot be suppressed correctly — removing the animation would strand the
element in its *start* state, which is the opposite of the requirement, and
the only way to hide that defect is the forced near-zero duration D-5
prohibits.

**The two rules are a pair.** This ADR owns the authoring constraint; D-5
owns the suppression requirement; neither is sufficient alone.

**Refined 2026-09-25, without weakening.** The owner decision distinguishes
the two shapes the rule takes, because a one-shot transition and a repeating
loading indicator cannot be suppressed the same way:

- **One-shot keyframes — `zakhmban-fade-up`, `zakhmban-slide-up`.**
  Suppression leaves the element in the keyframe's **final usable static
  state**, which §8 fixes as `opacity: 1` / `translateY(0)` and
  `translateY(0)` respectively. The end frame *is* the resting state, so
  disabling the animation is visually complete rather than truncated.
- **Repeating keyframes — `zakhmban-shimmer`, `zakhmban-spin`.** A repeating
  animation has no end frame to land on, so each carries an **explicitly
  documented static fallback** in §8 instead: a flat
  `var(--surface-subtle)` skeleton surface, and a non-rotating indicator at
  its `0deg` resting state. **For shimmer that fallback is reached by two
  declarations, not one** — the package's conditional static keyframe stops
  the movement, and the consumer that owns the shimmer surface must also set
  `background-image: none` under the same media query, which §8.1 states in
  full. `zakhmban-spin` needs no consumer declaration: `rotate(0deg)` is
  itself the resting appearance.
- **No ultra-short-duration workaround** is permitted, in either shape.
- **No content, control or status may become unavailable when motion is
  suppressed.** A loading state must still be perceivable — through the
  `aria-busy` region and its single announcement that v0.2 §6 already
  requires — when its animation is off.
- **Consumers remain responsible for consumer-owned animation**, unless it
  invokes a package-owned keyframe, in which case the package's suppression
  applies.

### 7 · No Tailwind preset change

**No `--animate-*` Tailwind preset key is authorized in v0.2.0, and the
Tailwind preset remains unchanged.**

- ADR 0003 §12 already records the position for the Token Foundation artifact:
  *"No `--animate-*` key and no `@keyframes` are emitted."*
- `--animate-*` is a Tailwind v4 theme namespace. Emitting keys into it would
  widen a **generated** public artifact to carry **authored** Styles content,
  crossing the authored-versus-generated line §2 draws and the one this ADR
  draws in §4 above.
- **No consumer needs it.** `zakhmban-therapists` has no Tailwind dependency
  and no `tailwind.config.*`; v0.2 §9 unknown 9 records that status and it is
  unchanged.
- Should a Tailwind consumer ever need utility-class access to these
  animations, that is an **amendment to ADR 0003**, whose §12 owns the
  artifact — not a change made in passing by a Styles commit.

### 8 · The four behavioural contracts — owner-decided 2026-09-25

**Superseded in place, deliberately.** As first written on 2026-09-24 this
section was headed *"What is NOT defined — recorded as gaps, not invented"*
and reported that no canonical source stated the four keyframe bodies. **That
was accurate at its own date**, and the local draft recorded the gap rather
than filling it. **The owner closed the gap on 2026-09-25**, before anything
was published, and the exact contracts below replace the gap table. **No
value here was chosen by this ADR.**

**Canonical values the contracts reuse**, each already approved and already
tokenised — nothing below introduces a token:

| Value | Token | Source |
| ----- | ----- | ------ |
| 1400ms shimmer | `--duration-shimmer` | v0.2 §2.4; §3.4 |
| 200ms default | `--duration-base` | v0.2 §2.4 |
| 320ms sheet entry | `--duration-slow` | v0.2 §2.4; §3.4 *"Slides up 320ms"* |
| the standard curve | `--easing-standard` | v0.2 §2.4 |
| skeleton surface | `--surface-subtle` | v0.2 §2.1 |
| skeleton highlight | `--surface` | v0.2 §2.1 |

#### 8.1 · `zakhmban-shimmer`

| | Contract |
| --- | --- |
| Animated property | **`background-position`** |
| Start frame | `background-position: 200% 0` |
| End frame | `background-position: -200% 0` |
| Duration | **`var(--duration-shimmer)`** — currently 1400ms |
| Timing function | **`linear`** |
| Iteration | **`infinite`, only while a real loading state is active** |
| Direction | the physical coordinate movement above is **invariant under document direction and is not mirrored for RTL** |

**The surface the keyframe animates**, owner-authorized and stated here so the
keyframe's start and end frames are meaningful:

```text
base:              var(--surface-subtle)
highlight:         var(--surface)
gradient:          linear-gradient(
                     90deg,
                     var(--surface-subtle) 0%,
                     var(--surface) 50%,
                     var(--surface-subtle) 100%
                   )
background-size:   200% 100%
background-repeat: no-repeat
background-color:  var(--surface-subtle)
```

**The last two declarations are normative, added by owner decision on
2026-09-25.** They were the one remaining way two conforming implementations
could look different, and the audit that found it is recorded with the
decision.

- **`background-repeat: no-repeat` is mandatory.** **The CSS default,
  `background-repeat: repeat`, is NOT conforming.**
- **Exactly one central highlight band crosses the element per 1400ms
  cycle.** With `background-size: 200% 100%` the image is twice the element's
  width, so CSS resolves `200%` to an offset of `-2W` and `-200%` to `+2W`:
  a **4W** sweep against a **2W** tile. Un-repeated, the single central
  highlight enters and leaves the element **once**. Tiled, a second copy
  follows it and the element shimmers roughly **twice** per cycle — the same
  keyframe, a visibly different result, which is why the property is frozen
  rather than left to the implementation.
- **`background-color: var(--surface-subtle)` is the permanent base fill.**
  A `no-repeat` image 200% wide is **partly or wholly outside the painting
  area for most of the cycle**; without the base colour the skeleton would
  fall through to whatever is behind it instead of holding
  `--surface-subtle`. The base is a **declaration in its own right**, not
  merely the gradient's `0%` and `100%` colour stops.
- **It must stop when loading ends.**
- **It must not be used as permanent decoration.**
- **Reduced-motion fallback — corrected by owner ruling, 2026-09-28
  (Route A).** It takes **two** declarations, one on each side of the
  package boundary, and the earlier wording of this bullet was wrong to
  imply the second was unnecessary.

  1. **The package** publishes the conditional static `@keyframes
     zakhmban-shimmer` in `src/styles/keyframes.css`, which **stops the
     movement**.
  2. **The application-owned consumer** that applies the shimmer surface —
     `Skeleton` / `SkeletonCard`, Tier 2 under v0.2 §9 — **must also set
     `background-image: none` under `@media (prefers-reduced-motion:
     reduce)`** on the same element that carries the shimmer background.

  **Stopping the movement does not remove the gradient.** A frozen
  `background-position` still paints the 200%-wide image, so the element
  would show a static ramp from `--surface-subtle` to `--surface` rather
  than a flat surface. Only removing the image lets the already-applied
  **`background-color: var(--surface-subtle)` remain as the flat static
  skeleton**.

  **The consumer obligation is mandatory, not optional**, and **its value is
  fully decided**: the property is `background-image`, the value is `none`,
  and the media query is `prefers-reduced-motion: reduce`. **No consumer
  design choice remains** — **only the selector is application-owned**,
  because it names an element this package does not ship.

  **The package ships no Skeleton class and no component selector**, and
  **no package selector or public class is authorized** to carry this: v0.2
  §9 makes Skeleton Tier 2, frozen §2.1 limits the package to five
  primitives, and the Scoped Sign-off §6 does not authorize container or
  component classes. **No `animation-duration` workaround and no `0.01ms`
  workaround is permitted** on either side.
- **Unchanged by this correction:** the gradient, `background-position: 200%
  0 → -200% 0`, `background-size: 200% 100%`,
  `var(--duration-shimmer)` at 1400ms, `linear` timing, the physical
  unmirrored movement under RTL, and repetition only during a real loading
  state.
- **No colour token and no motion token is created.** Every colour is an
  existing public token; the gradient, the repeat rule and the base fill are
  authored Styles CSS.

#### 8.2 · `zakhmban-fade-up`

| | Contract |
| --- | --- |
| Start frame | `opacity: 0` · `transform: translateY(8px)` |
| End frame | `opacity: 1` · `transform: translateY(0)` |
| Duration | **200ms**, applied as **`var(--duration-base)`** — the existing public token resolves to exactly 200ms, so **no token name is invented and no value is authored loose** |
| Timing function | **`var(--easing-standard)`** |
| Iteration count | **exactly 1** |
| Fill behaviour | must leave the element in the **final static state** |

The 8px travel is v0.2 §2.4's *"fade-up 8px for dialogs"* and §3.4's *"Fades
up 8px"*, unchanged.

#### 8.3 · `zakhmban-slide-up`

| | Contract |
| --- | --- |
| Start frame | `transform: translateY(100%)` |
| End frame | `transform: translateY(0)` |
| Duration | **320ms**, applied as **`var(--duration-slow)`** — the existing public token resolves to exactly 320ms, so **no token name is invented** |
| Timing function | **`var(--easing-standard)`** |
| Iteration count | **exactly 1** |
| Opacity | **none — no opacity animation belongs to this keyframe** |
| Fill behaviour | must leave the element in its **final static state** |

`translateY(100%)` is relative to the animated element's own height, which is
what makes one keyframe correct for a sheet of any height. It closes the
travel-distance question §8 previously recorded as open.

#### 8.4 · `zakhmban-spin`

| | Contract |
| --- | --- |
| Start frame | `transform: rotate(0deg)` |
| End frame | `transform: rotate(360deg)` |
| Duration | **1000ms**, an **owner-approved authored-Styles value** |
| Timing function | **`linear`** |
| Iteration | **`infinite`, only while a real loading or in-progress state is active** |

- **It must stop when that state ends.**
- **It must not be used as permanent decoration.**
- **`360deg` is visually equivalent to the static `0deg` resting state**,
  which is why a repeating rotation still satisfies §6's end-state rule.
- **No token is added for 1000ms.** The owner approved it as an authored
  value; creating `--duration-spin` would reopen v0.2 §2.4's closed
  three-duration set by representation, which is exactly the move ADR 0003
  §12 refused for geometry.

#### 8.5 · Repetition rule — the "looping decoration" ambiguity, closed

v0.2 §2.4 forbids *"bounce, spring, parallax, or looping decoration"* while
prescribing a 1400ms shimmer and a loading spin. The owner resolves the
tension explicitly:

- **`zakhmban-fade-up` and `zakhmban-slide-up` are one-shot transitions.**
- **`zakhmban-shimmer` and `zakhmban-spin` may repeat only while
  communicating a real loading or in-progress state.**
- **Functional progress feedback is not decorative looping.**
- **Permanent, ambient or ornamental looping remains prohibited.**

**Scoped supersession, recorded.** Two clauses of v0.2 §2.4 are superseded
**only** as stated, and **only** for the two repeating keyframes:

| v0.2 §2.4 as written | Effective rule from 2026-09-25 |
| --- | --- |
| the three durations *"on `cubic-bezier(.2,0,0,1)`"*, which `src/tokens/motion.css` reads as *"the only curve in the system"* | **`linear` is the approved timing function for `zakhmban-shimmer` and `zakhmban-spin`.** `--easing-standard` remains the only curve for every transition and for the two one-shot keyframes. A continuously repeating animation on an ease curve pulses visibly at each restart, which is why the owner approved `linear` for exactly these two. |
| the closed set of three durations — 120 / 200 / 320ms | **1000ms is approved for `zakhmban-spin` as an authored-Styles value and is not a token.** The three-duration token set is unchanged and is **not** reopened; `--duration-shimmer` already showed that a keyframe-internal duration need not join it. |

**Nothing else in §2.4 is superseded**, and the four-and-no-more rule, the
prohibition on bounce, spring and parallax, and the reduced-motion duty all
stand.

#### 8.6 · Status

**No behavioural field for the four keyframes remains unresolved.** Start
frame, end frame, duration, timing function, iteration, direction behaviour,
repetition eligibility and reduced-motion fallback are fixed for all four.

**The keyframes are therefore implementable as a contract** — but **this ADR
implements nothing**, and a Styles implementation task remains a separate,
separately authorized piece of work.

### 9 · Explicit non-decisions

**This ADR does not decide:**

- **any motion value** — no duration, distance, opacity, rotation, colour,
  easing or iteration count is created here;
- **which components use which keyframe**, beyond repeating the mapping §2.4
  and §3.4 already state;
- **any component contract** — Skeleton, Modal, BottomSheet and the loading
  indicator keep their §3 specifications untouched;
- **the press-scale transform**, which is Decision 3a's behavioural contract
  and not a keyframe;
- **the overlay-root or Portal technique**, excluded from v0.2.0 and
  allocated to v0.3.0 by D-6;
- **any Tailwind artifact change**, per §7;
- **any token identifier, value or count.** The boundary remains
  **118 / 39 / 1**;
- **the version, tag, release or publication state** of this package.

### 10 · Amendment conditions

**This ADR is amended, not worked around, if any of the following becomes
true:**

- **a fifth keyframe is required** — which needs an owner decision against
  §2.4's *"four and no more"* first, and then an amendment here;
- **a name must change** — see the versioning consequences in §11 below;
- **`--animate-*` keys become necessary** for a real Tailwind consumer —
  which is an **ADR 0003 §12 amendment**, with this ADR updated to match;
- **implementation proves a keyframe cannot be delivered through the existing
  `./styles` entry** — in which case **work stops**, exactly as the Owner
  Font Contract and Delivery Ruling and ADR 0003 §13 require of any
  unforeseen public subpath;
- **an owner changes one of the §8 behavioural values** — that is an owner
  decision recorded in the Token Table, and §8 is updated to match it. §8's
  values are the owner's; this ADR carries them and may not vary them. The
  2026-09-25 decision closed the original gap this way, and it is the only
  route by which a §8 value moves.

**§8 is closed. A Styles implementation commit may not reopen it by choosing
a different duration, curve, frame or iteration.**

**An implementation commit may not amend this ADR by diverging from it.**

## Compatibility and versioning implications

- **Adding the four names in v0.2.0 is additive.** UI System Specification
  v0.2 §7's versioning rule treats new capability as additive and reserves
  breaking status for removing or renaming a semantic token, a component or a
  prop. Nothing is removed or renamed here.
- **After publication, renaming or removing one of the four is a
  public-contract change.** Once a tag ships these identifiers, a Tier 2
  component in a consuming application may hold `animation-name:
  zakhmban-spin` in its own CSS. Changing that identifier breaks that
  consumer's animation **silently** — the property still parses, it simply
  matches nothing. Such a change is therefore **breaking** under v0.2 §7 and
  requires an amendment to this ADR, a major-version consideration and a
  consumer migration note.
- **Consumption is by exact git tag** (frozen §2.2), so no consumer is
  upgraded without a reviewed pull request. That contains the blast radius; it
  does not make a rename non-breaking.
- **This ADR does not itself change the version.** The package remains
  `0.1.0` and `private`; the v0.2.0 bump, tag and release are separate owner
  actions.

## Consequences

### Positive

- **The identifier exists in exactly one place.** Four applications reference
  one spelling of each animation instead of inventing four.
- **Collisions become impossible in practice.** The prefix removes an entire
  class of silent failure that no build step in this repository could catch.
- **The authored/generated line stays clean.** Keyframes are authored CSS,
  tokens are generated artifacts, and neither leaks into the other's
  pipeline.
- **The reduced-motion requirement becomes achievable rather than aspirational.**
  §6's end-state rule is what makes §2.4's *"leaving the end state"*
  implementable without the workaround D-5 prohibits.
- **No new public subpath, no manifest change, no Tailwind change, no
  dependency.** The package's surface widens by four CSS identifiers and
  nothing else.
- **The gap was visible instead of latent, and it closed cleanly.** §8 made
  it impossible for a Styles commit to invent four animation bodies and have
  that read as delivery; the owner then supplied them on 2026-09-25, before
  anything was published, and §8 now carries a complete contract.

### Negative

- **The names are a public contract from the first tag that carries them**,
  and a public contract is harder to change than an internal one. Recorded
  honestly: the alternative was four uncoordinated spellings, which is worse
  and irreversible in a different way.
- **The ADR was briefly a half-contract**, naming four keyframes whose
  bodies it declared unwritable. That was deliberate — the name is the part
  that has to be fixed before any consumer writes it down, and the body is
  the part only an owner can supply. It cost one owner decision to close.
  Fixing them in the wrong order is what produces an invented motion value.
- **§8 now carries two scoped supersessions of v0.2 §2.4** — `linear` for the
  two repeating keyframes, and a 1000ms spin duration outside the three-token
  set. Both are the owner's and both are narrow, but they are the first
  exceptions to *"the only curve in the system"* and to the closed duration
  set, and a future reader must not generalise either one.
- **`zakhmban-` is verbose** in a devtools panel and in authored CSS. Accepted
  as the cost of a global namespace the package does not control.
- **Three of four keyframes serve components this package does not ship.**
  The package therefore publishes identifiers it does not itself consume until
  v0.3.0 brings BottomSheet. That is a consequence of the Tier 1 / Tier 2
  split in v0.2 §9, not of this ADR.

## Alternatives considered

**1 · Unprefixed generic names** — `shimmer`, `fade-up`, `slide-up`, `spin`.

Rejected: `@keyframes` identifiers share one global namespace per document,
and `spin` in particular is among the most common identifiers in CSS. A
consumer stylesheet, or any third-party CSS an application loads, that defines
`spin` **silently replaces** the package's animation for the entire document.
There is no build error, no runtime warning and no test in this repository
that could catch it. Readability is not worth a failure mode that is invisible
by construction.

**2 · Generated or randomised names** — hashed or content-derived identifiers,
in the manner of CSS Modules.

Rejected on three counts. It contradicts §4: keyframes are authored CSS and
this package deliberately has **no bundler** — `ARCHITECTURE.md` records
`tsc` alone, precisely so the committed artifact mirrors source one-to-one and
a one-line source change is a one-line artifact change. A generated identifier
would also be **unreferenceable by a Tier 2 consumer**, which is the entire
reason these names are public. And a name that changes with content is a
public contract that breaks on every edit.

**3 · Add `--animate-*` Tailwind preset keys now.**

Rejected: it would put authored Styles content into a **generated** artifact,
crossing the line §2 draws between the one authored source and its derived
representations, and the line §4 of this ADR draws between tokens and
keyframes. **No consumer needs it** — `zakhmban-therapists` has no Tailwind
at all. ADR 0003 §12 already records *"no `--animate-*` key and no
`@keyframes` are emitted"*, and reversing that is an amendment to the ADR that
owns the artifact, not a side effect of naming four identifiers.

**4 · Defer all keyframes to v0.3.0** and ship Styles without them.

Rejected: v0.2 §7's package tree places `keyframes` under `styles/`, and the
Release-Sequence Ruling allocates Styles to v0.2.0 — deferring them would
split one specified layer across two releases for no stated reason. It would
also leave three Tier 2 components with no package-owned animation to
reference through the whole of v0.2.0, inviting exactly the four local
spellings alternative 1 rejects. **Naming them now and implementing their
bodies when an owner closes §8 keeps the contract and the values in their
correct order.**

**5 · Add a fifth keyframe** — a press or pulse effect, for completeness.

Rejected: v0.2 §2.4 states *"Four keyframes exist and no more"* and forbids
*"bounce, spring, parallax, or looping decoration"*. Wanting a fifth is not
approval, and the correct first move is the one `ARCHITECTURE.md` prescribes
for a sixth primitive — build it in the consuming application and see whether
a second application ever needs it. A fifth here would need an owner decision
against §2.4 before it needed an ADR.

**6 · Allow consumers to redefine package keyframe names** — treat the four as
defaults a consumer may override locally.

Rejected: a redefinition is **not** an override. CSS has no cascade for
`@keyframes` by origin in the way it does for declarations — the last
definition parsed wins for the whole document, so one application's local
`@keyframes zakhmban-spin` would replace the package's for every element,
including those inside package-owned primitives. It is the same failure
alternative 1 describes, with the collision invited rather than accidental. It
also contradicts v0.2 §2's ownership rule, which this ADR applies unchanged to
keyframes: an application that needs a value it cannot express is missing one,
and that is a pull request against the package.

## Sources

- **Styles Keyframe Behaviour Owner Decision**, 2026-09-25 — the exact start
  and end frames, durations, timing functions, iteration rules, RTL
  invariance, reduced-motion fallbacks and the repetition rule now carried by
  §8, together with the procedural ratification of the local draft. Recorded
  in
  [`../architecture/token-table-ratification.md`](../architecture/token-table-ratification.md).
- **Styles Foundation v0.2.0 Contract Ruling**, 2026-09-24 — D-4, which
  delegates keyframe naming here; D-5, the reduced-motion contract this ADR's
  §6 is coupled to; D-6, the overlay-root allocation. Recorded in
  [`../architecture/token-table-ratification.md`](../architecture/token-table-ratification.md).
- **Token Foundation v0.1.0 Release-Sequence Ruling**, 2026-09-20 — same
  file: Styles is allocated **v0.2.0**, Icons and the five primitives
  **v0.3.0**, Phase 6 **v1.0.0**.
- **Scoped Token Foundation V1 Owner Sign-off**, 2026-09-18 — same file: §1.8
  signs off the approved durations, easing, keyframes, press scale and
  reduced-motion requirements; §4's deferrals; §6's Styles boundary.
- **ADR 0003 — Token Representation and Artifact Contract**, 2026-09-18 —
  §11 (the typed object and its 118 keys), §12 (the Tailwind artifact; no
  `--animate-*` key, no `@keyframes`), §14 (generation; *"the generator never
  invents"*), §15 (source and `dist` parity), and **gap 2**, which this ADR
  closes for the names only.
- **ADR 0001 — Tailwind Token Delivery Strategy** — the preset's form and
  ownership, and clarification 4 on consumers not redefining what the package
  owns.
- **Canonical Documentation Authority and Supersession Ruling** —
  [`../architecture/canonical-document-registry.md`](../architecture/canonical-document-registry.md):
  the authority levels, the value-versus-representation split, and the
  deferral rule this ADR's §8 applies.
- **UI System Specification v0.2** — §2 (token ownership; consumers do not
  redefine), §2.1 (`--surface-subtle` as the skeleton surface), §2.4 (the
  four keyframes, durations, easing, the prohibitions, the reduced-motion
  duty), §3.4 (Skeleton 1400ms shimmer; BottomSheet *"Slides up 320ms"*;
  Modal *"Fades up 8px"*), §5 (RTL, and progress filling from the right), §6
  (motion and zoom; suppression leaving end states), §7 (`styles/ reset,
  global, keyframes`; Exports; Versioning), §9 (Tier 1 / Tier 2, and unknown
  9 on Tailwind's status in the Therapist App).
- **Frozen Technical Architecture v1.1** §2, §2.1, §2.2 — repository #3
  contents, the five-primitive freeze, committed `dist/` and git-tag
  consumption.
- **Owner Font Contract and Delivery Ruling**, 2026-09-18 — the precedent for
  a consumer-side redeclaration being a migration defect, and for work
  stopping rather than adding an unforeseen public subpath.
- This repository, inspected 2026-09-24: `package.json`,
  `scripts/build.mjs`, `scripts/generate-tokens.mjs`, `src/tokens/motion.css`,
  `src/styles/index.css`, and `tests/architecture/source-entry.test.ts`.
