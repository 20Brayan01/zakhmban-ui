# ADR 0003 — Token Representation and Artifact Contract

- **Status:** Accepted
- **Date:** 2026-09-18
- **Scope:** the **representation** of the Token Foundation V1 values that the
  Scoped Token Foundation V1 Owner Sign-off of 2026-09-18 froze — how they are
  named, where they are authored, how they are layered, how they are derived
  into a typed object and a Tailwind artifact, which of them are public, and
  what the implementing commit must prove. **No design value is created,
  changed, reinterpreted or replaced by this ADR**, and **nothing is
  implemented by it**.
- **Authority tier:** representation authority only, as
  [`../architecture/canonical-document-registry.md`](../architecture/canonical-document-registry.md)
  defines it. Value authority stays with the frozen architecture,
  `project-context/`, the approved owner rulings and UI System Specification
  v0.2. This ADR **supersedes no part of v0.2** and **resolves no deferred
  decision**. Where a value is deferred, this ADR records the deferral; it does
  not fill it.

## Context

The Scoped Token Foundation V1 Owner Sign-off of 2026-09-18 froze the V1 value
and semantic baseline and **authorized this ADR to define its representation**.
Its §5 lists precisely what was reserved here: CSS custom-property
representation, TypeScript token-object representation, Tailwind key
representation, authored source structure, generated artifact structure, public
and internal export paths, source/`dist` generation mechanics, raw-to-semantic
alias mechanics, alpha-derivation mechanics, composite-shadow representation,
`--shadow-none` representation, stacking-role public/internal exposure, the
font-asset internal path, and font asset-copy and source/`dist` parity
mechanics.

Three documents constrain the answer before it is written.

**UI System Specification v0.2 §2** fixes the source order and the entry point:

> One source, three generated representations, in strict order … (2) and (3)
> are **derived, never authored**, so they cannot drift from (1). A token added
> by hand to the preset but not to the CSS is a build error, not a style.

and

> A consumer imports the stylesheet once, at the application root, and gets
> every token: `import "@zakhmban/ui/styles"`.

It also fixes the two-layer model: *"a **palette layer** (`--green-500`) that
components never reference, and a **semantic layer** (`--success`,
`--text-primary`) that is the only public API."*

**UI System Specification v0.2 §7** fixes the authored file set — *"seven files
under `tokens/`: colors, typography, spacing, elevation, motion, fonts, base"*
— and the deep entries that are part of the contract: `/tokens`, `/styles`,
`/utils/format`.

**ADR 0001** fixes the Tailwind artifact's form and its relationship to the
source. Clarification 3 is load-bearing here:

> Tokens remain owned by `zakhmban-ui`. The authored token CSS is the single
> source of truth. The `@theme` artifact **references those custom properties
> rather than restating their values**, so the hex exists in exactly one file
> and the preset cannot become a second place a colour is defined.

Everything below is written to satisfy all three at once.

## Problem

The frozen values are decided. Nothing about their expression is. Ten questions
had accumulated on the Token Table's ADR 0003 input list — palette-to-semantic
aliasing, alpha over an opaque entry, composite `box-shadow` survival across
three representations, `--shadow-none`, radius naming, typography naming, a
component-specific geometry value, the Raw-Identity/Semantic-Action-Fill
distinction, two distinct roles sharing one value, and the stacking roles'
visibility — and the Owner Font Contract and Delivery Ruling added a further
set about internal paths, asset copying and parity.

**Two further questions were not on that list**, and both are decided here
because each blocks an artifact entirely.

**The first is the typed object's public shape.** v0.2 §2 asks for *"a typed
JS object for consumers that need values in script"* and §7 forbids a default
export, and that is the whole of what the canonical sources say. The export
name, the key form, the value form, the grouping, the type surface and the
immutability form were all undecided, and every one of them is a public API
whose later change is breaking under v0.2 §7's versioning rule. §11 fixes all
six.

**The second is a namespace clash: three canonical identifier prefixes coincide
exactly with Tailwind v4 theme namespaces.** `--text-*` is Tailwind's
font-size namespace and also the canonical prefix of the eight type steps
*and* of `--text-primary` and `--text-secondary`, which are colours.
`--shadow-*` is Tailwind's box-shadow namespace and also the canonical prefix
of `--shadow-nav`, `--shadow-sheet` and `--shadow-modal`. `--font-*` is
Tailwind's font-family namespace and is exactly `--font-ui`. A `@theme` entry
that references a `:root` property of the same name is circular and invalid,
so ADR 0001 clarification 3 cannot be satisfied naively for those families.

## Decision

Eighteen decisions. Each is binding on the implementing commit.

### 1 · One authored source of truth

**The authored CSS custom properties under `src/tokens/` are the single source
of truth for every Token Foundation value.** The typed object and the Tailwind
artifact are **generated from them and never authored**, preserving v0.2 §2's
strict order. A value that appears in a generated artifact but not in the
authored CSS is a build failure, not a style.

**No value literal may appear in more than one authored file.** Where two
tokens carry the same value, the second references the first with `var()`.

### 2 · Seven authored files, and what belongs in each

`src/tokens/` contains exactly the seven files v0.2 §7 names. No eighth token
file is created.

| File | Contents |
| --- | --- |
| `colors.css` | the 30 raw palette entries; every semantic colour; the two focus-indicator colours; `--overlay` |
| `typography.css` | the eight type steps (size, line height, weight, and the composite alias); the four weight tokens |
| `spacing.css` | the eight spacing steps |
| `elevation.css` | `--shadow-nav`, `--shadow-sheet`, `--shadow-modal` |
| `motion.css` | the three durations, the shimmer duration, the easing curve, the press scale |
| `fonts.css` | `--font-ui` |
| `base.css` | radius; control geometry; the two focus-indicator widths; the three stacking integers; and the `@import` of the other six files, in the order listed here |

`base.css` is the aggregation point, so `src/styles/index.css` imports one file
and the seven-file structure stays internal.

### 3 · `:root`, light theme only

**Every token is declared on `:root` in a single light theme.** No
`prefers-color-scheme` block, no `[data-theme]` selector, no `.dark` class, no
second declaration of any token anywhere in the package. Dark mode is deferred
by v0.1 decision 6 and v0.2 §2.1, and **a deferred decision must not be filled
by an implementer**.

### 4 · Two layers, joined by `var()`

**The raw palette holds every colour literal. Every semantic colour references
a palette entry with `var()` and restates no hex.** This discharges Decision 1
constraint 6 as a mechanical property rather than a convention:
`--brand-green: var(--green-500)`, not `--brand-green: #3C9220`.

**Two roles that share one value remain two properties.** `--background` and
`--surface` are separately declared and separately consumable although both
resolve to `#FFFFFF` (Decision 14); `--neutral-status-fg` and `--text-secondary`
are separately declared although both resolve to `#667085` (Owner Contrast
Ruling); `--info-fg`, `--action-blue-hover` and `--link-hover` are three
properties although all three resolve to `#0062AC` (Decision 13). **Equal values
never justify collapsing distinct roles**, and a generator that de-duplicates by
value is a defect.

**An alpha derivative is authored as a literal `rgba()` in the file its own
token family owns**, and carries a comment identifying the approved opaque raw
colour it derives from. It is **guarded by a test asserting that its `rgb`
triple equals that raw entry's** — `--overlay: rgba(0, 42, 94, 0.4)` in
`colors.css` and the three `box-shadow` values in `elevation.css`, all four
derived from **`--blue-900 #002A5E`**, which stays in `colors.css` with the
rest of the raw palette. The literal still exists once per derivative, and the
comment plus the test carry the derivation that a `var()` reference cannot,
because `rgba()` takes no colour reference. `color-mix()` is rejected below.

### 5 · Public surface and internal surface

| Layer | Public API | Reachable in CSS |
| --- | --- | --- |
| Raw palette (30) | **No** — Decision 1 constraint 2 | yes, by necessity |
| Semantic colour, typography, spacing, radius, elevation, motion, font, geometry, layering | **Yes** | yes |
| `--radius-checkbox` | **No** — Decision 9 forbids a public radius step | yes |
| `--_`-prefixed sources (§10) | **No** | yes |

**Raw palette entries, `--radius-checkbox` and `--_` sources appear in neither
the typed object nor the Tailwind artifact**, and a mechanical guard rejects a
consumer-facing reference to them, as the Incidental Accessibility Findings
Ruling requires.

**Mechanical tally at acceptance.** **118 public tokens** — 48 colour, 36
typography (24 step sub-properties, 8 composite aliases, 4 weight tokens), 8
spacing, 5 radius, 3 elevation, 6 motion, 1 font, 8 geometry (6 control values
and the 2 focus-indicator widths), 3 layering. **39 internal** — the 30 raw
palette entries, `--radius-checkbox`, and the 8 `--_` sources. **One logical
role is recorded without a literal and is not implemented:** `--radius-pill`.

**All three stacking roles are public.** Decision 15 left their visibility to
this ADR, and the answer follows from the component tiering: `Screen`,
`Portal` and overlay composition are application-owned (v0.2 §3.1, §3.6, §7.1),
so an application cannot honour *"ordinary content < Application Chrome < Scrim
< Dialog Surface"* without the integers. Keeping them internal would force each
application to hard-code 10, 20 and 30 — four copies of a value the package
owns.

### 6 · Canonical identifiers are preserved verbatim

**Every identifier already printed in a canonical source or fixed by an
approved ruling is used exactly as written**, with no prefix, no namespace, no
casing change and no "modernisation": the 30 palette names; `--brand-*`;
`--text-primary`; `--text-secondary`; `--surface`; `--surface-subtle`;
`--border`; `--border-strong`; `--divider`; the nine status names;
`--neutral-status-fg`; `--neutral-status-bg`; `--disabled-bg`;
`--disabled-text`; `--disabled-border`; `--overlay`; the eight type-step names;
`--shadow-nav`; `--shadow-sheet`; `--shadow-modal`; `--font-ui`; and the nine
`--action-*` identities, which are, in full:

| | rest | hover | press |
| --- | --- | --- | --- |
| green | `--action-green-rest` | `--action-green-hover` | `--action-green-press` |
| blue | `--action-blue-rest` | `--action-blue-hover` | `--action-blue-press` |
| red | `--action-red-rest` | `--action-red-hover` | `--action-red-press` |

**The six retired interaction identifiers are not implemented, not exported and
not aliased**: `--green-hover`, `--green-press`, `--blue-hover`, `--blue-press`,
`--red-hover`, `--red-press`. **`--text-muted`, `--focus-ring-green` and
`--focus-ring` as originally valued are likewise absent.** **`--font-numeric`
and `--font-sans` are not created.** **`--blue-700` and `--red-700` are palette
entries and nothing else.**

### 7 · Names for the values that had none

Every Token Foundation V1 value that no canonical source named is named here,
exhaustively. Each row states the value, its authority and the file it is
authored in. **No value in this table is invented; every one is quoted from an
approved source.**

**Surface, foreground and link roles**

| New identifier | Value | Authority |
| --- | --- | --- |
| `--background` | `var(--white)` `#FFFFFF` | Decision 14 — Page Background, a role distinct from `--surface` |
| `--on-brand-text` | `var(--white)` `#FFFFFF` | Decision 12a — the on-brand Text foreground of §3.1 |
| `--on-brand-icon` | `var(--white)` `#FFFFFF` | Decision 12b — kept separate from the Text contract, as 12b requires |
| `--link` | `var(--blue-500)` `#016FBB` | Decision 13 — inline text link, rest |
| `--link-hover` | `var(--blue-600)` `#0062AC` | Decision 13 |
| `--link-press` | `var(--blue-800)` `#01356F` | Decision 13 |

**Focus indicator — Decision 3b**

**Four independently addressable semantic scalars.** No composite focus token
is created, and **the two-ring composition is not written here** — whether it
is drawn with `box-shadow`, with `outline` plus `outline-offset`, or with a
pseudo-element belongs to the later Styles or component stage.

| New identifier | Value |
| --- | --- |
| `--focus-indicator-inner-color` | `var(--white)` `#FFFFFF` |
| `--focus-indicator-inner-width` | `2px` |
| `--focus-indicator-outer-color` | `var(--blue-900)` `#002A5E` |
| `--focus-indicator-outer-width` | `2px` |

The values are Decision 3b's, unchanged: `CONTROL -> 2px WHITE -> 2px NAVY ->
PAGE`. **The two widths stay separate identifiers although both resolve to
`2px`**, for the same reason `--background` and `--surface` stay separate at
`#FFFFFF` — equal values never justify collapsing distinct roles, and
Decision 3b fixes the two rings independently. The two colours differ, white
inner and navy outer, and are separate for the same reason. **No superseded
`--focus-ring-inner`, `--focus-ring-outer` or `--focus-ring-width` identifier
exists, and no alias to one is retained.**

**Spacing — v0.2 §2.3, *"Allowed steps only: 4 8 12 16 20 24 32 40"***

| Identifier | `--space-1` | `--space-2` | `--space-3` | `--space-4` | `--space-5` | `--space-6` | `--space-7` | `--space-8` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Value | `4px` | `8px` | `12px` | `16px` | `20px` | `24px` | `32px` | `40px` |

The identifiers are **ordinal**: `--space-<n>` is the *n*th step of the
approved scale, not a px value spelled into a name. **No value-based
identifier such as `--space-40` exists, and no alias to one is retained** —
value-based naming also collides with itself, since `--space-4` would have to
mean 4px under one reading and 16px under the approved scale.

The scale is **the package's own and closed at eight steps**. **Steps 7 and 8
deliberately carry 32px and 40px rather than Tailwind's default 28px and
32px**, and the package scale is under no obligation to preserve Tailwind's
values at those keys. **No base spacing literal is created** — §12 resets
Tailwind's `--spacing` base rather than redefining it — and **no ninth step is
invented**; the gaps at 28px and 36px are the approved scale's, matching
Decision 1 constraint 10's treatment of an irregular scale.

**The V2 kit's `--space-<n>` is a 4px multiplier, not an ordinal**, so its
`--space-12` is 48px and its `--space-16` is 64px — the two steps Ruling B
clause 3 rejects. Under the owner's ordinal ruling the two conventions agree
at steps 1–6 and diverge at 7 and 8. **The kit is evidence, never authority**;
`--space-7` is **32px** and `--space-8` is **40px**, and neither may be
"corrected" back to a multiplier reading.

**Radius — v0.2 §2.3, Decision 5, Decision 6a, Decision 9**

| New identifier | Value | Authority |
| --- | --- | --- |
| `--radius-control` | `12px` | Decision 5 — the 10–12 band resolves to one value |
| `--radius-input` | `14px` | §2.3 *"14 input and button"* |
| `--radius-button` | `var(--radius-input)` | the same rule; one literal, two roles |
| `--radius-card` | `16px` | §2.3 *"16 card"* |
| `--radius-sheet` | `24px` | Decision 6a — **block-start corners only** |
| `--radius-checkbox` | `6px` | Decision 9 — **package-internal**, not a public step |
| `--radius-pill` | **no literal** | §2.3 assigns the role and states no number |

Role names are used and **no numeric radius ladder is created**. Decision 5 is
explicitly *"not a definition or closure of the complete radius family"* and
Decision 9 states that 6px is not *"a numeric radius-ladder entry"*; a
`--radius-12 / -14 / -16 / -24` ladder would read as the closed family neither
decision approved.

**`--radius-pill` carries no value.** §2.3 says only *"pill chip, badge,
search"*. The V2 kit's `--radius-pill: 999px` is evidence under Ruling B, not
authority, and **silence never creates permission**. The role is recorded here
so that it is not re-derived later from the kit; **the token is not implemented,
not exported and not mapped into Tailwind**, and the implementing commit must
omit it. A pill surface is expressed by the component until an owner supplies
the value.

**Control geometry — v0.2 §2.3**

| New identifier | Value | Authority |
| --- | --- | --- |
| `--control-min-target` | `44px` | §2.3 *"Tap minimum 44px"*; also carries Decision 10's Chip minimum |
| `--control-height-input` | `48px` | §2.3 *"input 48"* |
| `--control-height-button` | `52px` | §2.3 *"primary button 52"* |
| `--app-bar-height` | `56px` | §2.3 *"app bar 56"* |
| `--bottom-nav-height` | `64px` | §2.3 *"bottom nav 64"* |
| `--bottom-nav-safe-area` | `20px` | §2.3 *"+ 20 safe area"* |

Decision 10's Chip minimum **creates no Chip token**. Its value is the canonical
44px tap minimum and the ruling expresses it as minimum-height behaviour; a
component applies `min-block-size: var(--control-min-target)`. That satisfies
the input list's requirement that a minimum-height contract be represented
*"without implying a public scale step"*.

**Typography — v0.2 §2.2, Decision 7, Decision 8**

Each step is authored as three properties plus one composite alias.

| Step | `-size` | `-line-height` | `-weight` |
| --- | --- | --- | --- |
| `--text-display` | `32px` | `1.28` | `700` |
| `--text-page-title` | `22px` | `1.36` | `600` |
| `--text-section-title` | `19px` | `1.42` | `600` |
| `--text-card-title` | `16px` | `1.5` | `600` |
| `--text-body` | `15px` | `1.68` | `400` (Decision 7) |
| `--text-label` | `13px` | `1.5` | `500` |
| `--text-caption` | `12px` | `1.5` | `400` (Decision 8) |
| `--text-button` | `15px` | `1` | `600` |

| New identifier | Value |
| --- | --- |
| `--weight-regular` | `400` |
| `--weight-medium` | `500` |
| `--weight-semibold` | `600` |
| `--weight-bold` | `700` |

Each step's `-weight` property references the matching weight token, so the
four weights v0.2 §2.2 fixes exist in one place. **Decision 7 and Decision 8
resolved Body and Caption to 400; weight 500 is not approved for either**, and
the `Text` component's `weight` prop may offer only the four approved weights.
**Caption's four-use role scope is a component contract, not a token
constraint**, and this ADR neither widens nor narrows it.

**Motion — v0.2 §2.4, §2.1**

| New identifier | Value | Authority |
| --- | --- | --- |
| `--duration-fast` | `120ms` | §2.4 *"120ms for hover and press colour"* |
| `--duration-base` | `200ms` | §2.4 *"200ms default"* |
| `--duration-slow` | `320ms` | §2.4 *"320ms for sheet entry and progress fills"* |
| `--duration-shimmer` | `1400ms` | §2.4 *"skeleton shimmer (1400ms)"* |
| `--easing-standard` | `cubic-bezier(.2, 0, 0, 1)` | §2.4 — the only curve |
| `--press-scale` | `0.98` | §2.1 *"press darkens further + 0.98 scale"* |

**Layering — Decision 15**

| New identifier | Value |
| --- | --- |
| `--z-chrome` | `10` |
| `--z-scrim` | `20` |
| `--z-dialog` | `30` |

**No base or zero role is published**, per Decision 15: ordinary content stays
at `z-index: auto` and receives no token.

### 8 · Composite values stay composite

**A composite value is one custom property holding the complete CSS value.**
`--shadow-nav: 0 -2px 12px rgba(0, 42, 94, 0.06)` is one property, not four; the
focus indicator is **not** a composite, because Decision 3b describes two
independent rings whose widths and colours a component composes.

The rule is that **a composite property exists where CSS accepts the whole value
in one place** — `box-shadow` does, so shadows are composite; a focus indicator
drawn as `box-shadow` or `outline` plus `outline-offset` is assembled by the
component from the four focus-indicator scalars, which keeps the component
free to choose the technique. Across the three representations a composite
survives as one CSS declaration, one string in the typed object, and one
`@theme` entry, which is the answer the input list asked for.

**Type steps are the deliberate exception**, and the reason is mechanical: CSS
offers `font` shorthand, but it resets `font-family`, `font-stretch` and
`font-variant` as a side effect, so a single composite type property would
silently clear `--font-ui` and the `font-variant-numeric: tabular-nums` rule
v0.2 §2.2 requires for money, scores and countdowns. Three properties plus a
composite alias avoid that.

### 9 · `--shadow-none` is omitted

**`--shadow-none` is not implemented, not exported and not mapped.** It is
recorded as deferred by Decision 4 and remains so. The absence of elevation is
expressed as `box-shadow: none`, which needs no token; a token would also
suggest a general elevation family that Decision 4b deferred.

### 10 · Three families need an internal source property

Where a public identifier occupies a Tailwind v4 theme namespace **exactly**,
`@theme { --x: var(--x) }` is circular and invalid, so ADR 0001 clarification 3
cannot be met by a direct reference. For those families only, the authored file
declares a **package-internal source property prefixed `--_`**, the public
property aliases it, and the Tailwind artifact references the internal source.
The literal still exists exactly once.

```css
/* elevation.css */
--_shadow-nav: 0 -2px 12px rgba(0, 42, 94, 0.06);
--shadow-nav: var(--_shadow-nav);
```

```css
/* the generated @theme artifact */
--shadow-nav: var(--_shadow-nav);
```

**Eight internal sources exist and no more:** `--_shadow-nav`,
`--_shadow-sheet`, `--_shadow-modal`, `--_font-ui`, `--_radius-control`,
`--_radius-input`, `--_radius-card`, `--_radius-sheet`. **Typography needs no
`--_` form**, because its `-size`, `-line-height` and `-weight` properties are
public in their own right and the Tailwind artifact references those.
`--radius-checkbox` needs none, because it is never mapped.

### 11 · The TypeScript token artifact

Generated from the authored CSS into `src/tokens/index.ts`, compiled to
`dist/tokens/index.js` and `dist/tokens/index.d.ts`, and exported at
`@zakhmban/ui/tokens`. It satisfies v0.2 §2's second representation — *"a typed
JS object for consumers that need values in script"*.

**Exactly one runtime export, named `tokens`.** No default export, per v0.2 §7's
*"named exports only"*. **No per-token runtime export**, and **no helper
function** — no `token()`, no `cssVar()`, no lookup of any kind. The module is
data.

**Exactly three type exports**, each defined from the object rather than
restated:

```ts
export type Tokens = typeof tokens;
export type TokenName = keyof Tokens;
export type TokenValue = Tokens[TokenName];
```

**The object is flat.** No nested family objects, no second grouping layer.

**Every key is the canonical public CSS custom-property identifier, verbatim,
including the leading `--`.** `"--background"`, `"--text-primary"`,
`"--action-green-rest"`, `"--space-1"`, `"--focus-indicator-inner-width"`. The
leading dashes are **not** stripped, keys are **not** camel-cased, and **no
second logical naming system is introduced** — one identifier serves CSS,
TypeScript and the Tailwind mapping alike, so a grep for a token name finds
every use of it.

**The object contains exactly the 118 approved public tokens** counted in §5 —
no more, no fewer.

**Every value is a resolved terminal CSS value, represented as a string.**
`"#FFFFFF"` · `"4px"` · `"120ms"` · `"400"` · `"10"` · `".98"` ·
`"cubic-bezier(.2,0,0,1)"` · the complete approved shadow string · the complete
approved font-family stack.

**Values are resolved, never referential.** A semantic colour authored as
`--background: var(--white)` is exported as `"--background": "#FFFFFF"`, never
as `"var(--white)"`. The generator walks the alias chain to the raw entry and
emits its literal, which is precisely why script consumers can use the artifact
at all.

**Raw palette entries stay excluded even though the generator reads them** to
perform that resolution. They are its input, not its output. `--radius-checkbox`
and the eight `--_` sources are likewise absent, and **`--radius-pill` has no
entry until an owner supplies a literal**.

**Equal values never merge.** `"--background"` and `"--surface"` both appear
although both resolve to `#FFFFFF`; so do `"--neutral-status-fg"` and
`"--text-secondary"` at `#667085`, and `"--info-fg"`, `"--action-blue-hover"`
and `"--link-hover"` at `#0062AC`. A generator that de-duplicates by value is a
defect, exactly as in §4.

**Every value is a string, including the numeric-looking ones.** Weights stay
`"400"`, stacking roles stay `"10"`, the press scale stays `".98"`. They are CSS
values, not JavaScript numbers, and converting them would lose the distinction
between `.98` and `0.98` and invite arithmetic on a token.

**Immutability is compile-time only, through `as const`.** **No
`Object.freeze`** — it costs runtime work in four applications to defend against
a mutation TypeScript already rejects.

**Property order is lexicographic by the complete canonical identifier**, so
generation is deterministic and a review diff is stable. **Ordering exists for
generation and review; consumers must not treat property order as semantic API
behaviour**, and nothing may depend on it.

**No runtime dependency**, and **no widening of the root export** — the artifact
is reachable only at `@zakhmban/ui/tokens`.

#### Objective assertions the implementing commit must add for this artifact

1. the runtime exports are **exactly** `["tokens"]`;
2. the declaration exports include **`TokenName`, `TokenValue` and `Tokens`**;
3. **no default export**;
4. the object has **exactly 118 keys**;
5. **every key begins with `--`**;
6. the key set **equals the approved public semantic token set** of §5, exactly;
7. **no raw palette entry, no `--_` source and no `--radius-checkbox`** is
   present;
8. **`--radius-pill` is absent**;
9. **every value is a string**;
10. **every value is fully resolved** and contains no `var(`;
11. keys whose resolved values are equal are **all present** — the three groups
    of §4 checked by name;
12. the object and the three types are **generated, not hand-maintained** —
    `generate-tokens --check` is clean;
13. **generation is deterministic** — two runs produce identical bytes;
14. the emitted JavaScript is **dependency-free**;
15. the **root export is unchanged**;
16. the **public surface of `src/` and `dist/` matches** — the same export
    names and the same key set from both trees;
17. a **TypeScript consumer fixture imports all four named exports** —
    `tokens`, `TokenName`, `TokenValue`, `Tokens` — and type-checks.

### 12 · The Tailwind v4 artifact

Generated from the authored CSS into `src/tokens/tailwind-preset.css`, exported
at `@zakhmban/ui/tokens/tailwind-preset` exactly as ADR 0001 decided. It is a
single `@theme` block that **references custom properties and restates no
value**.

**The artifact resets every namespace it owns**, with `--color-*: initial`,
`--text-*: initial`, `--font-*: initial`, `--font-weight-*: initial`,
`--radius-*: initial`, `--shadow-*: initial`, `--ease-*: initial`,
`--spacing: initial` and `--spacing-*: initial`, before declaring the Zakhmban
keys. This is not a preference. §2.1 forbids orange, purple and turquoise; §2.2
states *"The scale is closed: eight steps"*; §2.3 states *"Allowed steps only"*;
§2.4 permits one easing curve; Decision 4b, Decision 6b and the pill literal are
deferred. Leaving Tailwind's defaults in place would put `bg-purple-500`,
`p-7`, `rounded-xl` and `ease-in-out` one keystroke away, which is exactly the
implementer-fills-a-deferral the registry's deferral rule prohibits. In
particular the `--spacing` base must be reset, or Tailwind's dynamic scale
generates every multiple of 4px and reopens the closed spacing scale.

**The mapping, in full.**

| Zakhmban identity | Tailwind v4 theme key | Utility |
| --- | --- | --- |
| every semantic colour `--x` | `--color-x: var(--x)` | `bg-x`, `text-x`, `border-x` |
| `--text-primary` | `--color-text-primary` | `text-text-primary` |
| `--text-secondary` | `--color-text-secondary` | `text-text-secondary` |
| `--focus-indicator-inner-color` | `--color-focus-indicator-inner` | `ring-focus-indicator-inner` |
| `--focus-indicator-outer-color` | `--color-focus-indicator-outer` | `ring-focus-indicator-outer` |
| type step `--text-<s>` | `--text-<s>: var(--text-<s>-size)` | `text-<s>` |
| its line height | `--text-<s>--line-height: var(--text-<s>-line-height)` | applied by `text-<s>` |
| its weight | `--text-<s>--font-weight: var(--text-<s>-weight)` | applied by `text-<s>` |
| `--weight-<w>` | `--font-weight-<w>: var(--weight-<w>)` | `font-<w>` |
| `--font-ui` | `--font-ui: var(--_font-ui)` | `font-ui` |
| `--space-1` … `--space-8` | `--spacing-1: var(--space-1)` … `--spacing-8: var(--space-8)` | `p-1` … `p-8`, `gap-<n>`, `m-<n>` |
| `--radius-<r>` | `--radius-<r>: var(--_radius-<r>)` | `rounded-<r>` |
| `--shadow-<e>` | `--shadow-<e>: var(--_shadow-<e>)` | `shadow-<e>` |
| `--easing-standard` | `--ease-standard: var(--easing-standard)` | `ease-standard` |

**One stated suffix rule, applied by the generator, not chosen ad hoc:** a
colour identifier ending in `-color` drops that suffix inside the `--color-*`
namespace, because the namespace already says colour. It applies to exactly
the two focus-indicator colours and to nothing else today.

**Four families are deliberately unmapped, because Tailwind v4 has no namespace
for them.** They are reached through the custom property, which is present for
every consumer via `@zakhmban/ui/styles`:

| Family | Consumer form |
| --- | --- |
| durations | `duration-[var(--duration-base)]` |
| press scale | `scale-[var(--press-scale)]` |
| stacking roles | `z-[var(--z-chrome)]` |
| control geometry | `h-[var(--control-height-input)]`, `min-h-[var(--control-min-target)]` |
| focus-indicator widths | `outline-[length:var(--focus-indicator-outer-width)]` |

`z-10`, `z-20` and `z-30` happen to equal the approved integers today. **They
must not be used for the stacking roles**: the coincidence is not a contract,
and a change to a role's integer would leave four applications silently wrong.
Geometry is not folded into `--spacing-*` for the same reason the spacing base
is reset — 44, 48, 52, 56, 64 and 20 are not spacing steps, and admitting them
would reopen the closed scale.

**Content scanning stays with the consumer.** `zakhmban-ui` supplies token
custom properties and the theme mappings over them; **it supplies no utility
classes**, because its own components are styled with static CSS. **Each
consuming application owns its own Tailwind content and source configuration**
for its own files, and **must not scan `zakhmban-ui` as a substitute for
importing the package-owned artifact** — scanning the package yields nothing
to generate, and the mappings arrive only through the import.

**No `--breakpoint-*` and no `--container-*` key is emitted.** Decision 16b is
deferred, Decision 16a approves no breakpoint, container role, container width
or responsive gutter, and 390px is a **reference design viewport only** and is
therefore **not a token**.

**No `--animate-*` key and no `@keyframes` are emitted.** §7 places `keyframes`
under `styles/`, and Styles has not begun.

### 13 · Three new public subpaths, and no fourth

| Subpath | Target | Content |
| --- | --- | --- |
| `./styles` | `dist/styles/index.css` | the stylesheet entry point of v0.2 §2 — at Token Foundation it imports the token CSS and nothing else |
| `./tokens` | `dist/tokens/index.js` and `dist/tokens/index.d.ts` | the generated typed object of §11 |
| `./tokens/tailwind-preset` | `dist/tokens/tailwind-preset.css` | the `@theme` artifact |

These are the three v0.2 §7 reserves and the three
`tests/architecture/exports-contract.test.ts` already names as *"still reserved
… and not yet declared"*. **No fourth subpath is added.** In particular **no
`@zakhmban/ui/fonts` subpath is created** — the Owner Font Contract and Delivery
Ruling refused one, font binaries are internal assets referenced by package CSS,
and consumers must not deep-import a font file. **If implementation proves that
an asset cannot resolve without a new public subpath, work stops and this ADR is
amended**; `docs/adr/README.md` makes adding an unnamed public subpath an ADR
trigger, and the exports test asserts the exact list with no wildcard.

The `./tokens` entry resolves to JavaScript, `./styles` and
`./tokens/tailwind-preset` to CSS. ADR 0001 already records the obligation that
follows: **extensionless subpath resolution through `@tailwindcss/postcss` must
be proven against a real Tailwind 4 consumer before release, not assumed.**

### 14 · Generation

A generator at `scripts/generate-tokens.mjs` parses the seven authored CSS files
and emits `src/tokens/index.ts` and `src/tokens/tailwind-preset.css`.

**`src/tokens/index.ts` is the canonical generated source, and this
representation ruling supersedes the illustrative `tokens.ts` filename that
UI System Specification v0.2 §7's package tree prints.** The subpath the
artifact is reached at is unchanged — `@zakhmban/ui/tokens` — and no value and
no public export changes. `index.ts` is used because the subpath is a
directory entry point and every other entry point in this package resolves the
same way.

- **It runs inside `pnpm build`, before `tsc`**, and `scripts/build.mjs` gains
  the CSS-copy step its own header comment already anticipates.
- **It has a `--check` mode** that regenerates into memory and fails on any
  difference, so a hand-edited artifact is a build error rather than a style.
- **It adds no dependency.** The authored subset of CSS is a flat list of
  custom-property declarations on `:root`; parsing it needs no PostCSS. The
  reviewed devDependency list in `tests/architecture/dependencies.test.ts` is
  therefore unchanged.
- **Generated files carry a header** naming the generator and stating that edits
  are discarded.
- **Generated files are committed**, because `dist/` is committed and the
  package has no `prepare` script.

**The generator never invents.** It fails, rather than guessing, on a property
it cannot classify, on a hex outside `colors.css`, on a raw palette entry
reaching a public artifact, and on a semantic colour that restates a literal
instead of referencing one.

### 15 · Source and `dist`

**CSS is copied byte-for-byte from `src/` to `dist/`, preserving relative
paths**, so a URL authored in `src/` resolves identically in `dist/`. `tsc`
emits only TypeScript; the copy step is `scripts/build.mjs`'s.

`pnpm verify:dist` already rebuilds and then fails on both a `dist` diff and an
untracked `dist` file, so it covers the copied CSS with no change. The
implementing commit must additionally assert **byte parity between each `src/`
CSS file and its `dist/` counterpart**, which is the source/`dist` parity the
font ruling requires and which a diff of the whole tree does not prove
file-by-file.

`package.json` already declares `"sideEffects": ["**/*.css"]`, and
`tests/architecture/package-metadata.test.ts` already asserts it. No manifest
change is needed for bundler correctness.

### 16 · The font boundary

**Token Foundation owns exactly one font token — `--font-ui` — and its complete
approved stack**, `"Vazirmatn", "Segoe UI", Tahoma, Arial, sans-serif`. That is
the whole of the font layer at this stage.

**`@font-face`, `font-display`, `font-synthesis`, the global body application
and `font-variant-numeric` belong to Styles** and are not written here. **The
binary, `OFL.txt` and the copyright notice belong to the package layer.**

The font ruling delegated the internal paths to this ADR, and they are:

| Artifact | Path |
| --- | --- |
| font binary | `src/styles/fonts/` |
| `@font-face` declaration | `src/styles/fonts.css` (Styles stage) |
| licence and copyright | `src/styles/fonts/OFL.txt`, alongside the binary |

The binary sits under `src/styles/`, not `src/tokens/`, because the `@font-face`
rule that references it is a Styles artifact and a relative URL should not cross
directories. **No font file, `@font-face`, licence file or checksum is added by
this ADR**, and the ruling's sixteen implementation acceptance gates stand
unchanged.

### 17 · Theme extensibility

**There is no theme provider, no theme context, no runtime theming and no theme
switching.** The two-layer structure would permit a themed override later — v0.2
§2.1 says so explicitly — but **nothing about one is specified and none is
built**.

**Consumers do not redefine, override, re-declare or shadow a token**, per v0.2
§2 and ADR 0001 clarification 4. An application that needs a value it cannot
express is missing a token, and that is a pull request against the package. A
consumer-side `--font-sans` or `--color-*` declaration that shadows a package
token is a migration defect, and the font ruling already lists removing them as
consumer migration work.

### 18 · What the implementing commit must prove

**Three existing guards must be amended in the same commit that ships the
files, and only there:**

| Guard | Amendment |
| --- | --- |
| `tests/architecture/source-entry.test.ts` | the forbidden-substring list drops `"tokens"` and `"tailwind"`, and the `.css` prohibition is replaced by an assertion that stylesheets appear only under `src/tokens/` and `src/styles/` |
| `tests/architecture/exports-contract.test.ts` | `DECLARED_SUBPATHS` gains `./styles`, `./tokens` and `./tokens/tailwind-preset`; the no-wildcard and target-resolution assertions are unchanged |
| `tests/architecture/root-export.test.ts` | unchanged if the root barrel does not widen — **and it does not**: tokens reach consumers through `./tokens` and `./styles`, never through `@zakhmban/ui` |

`tests/architecture/dependencies.test.ts` is unchanged, because §14 adds no
dependency.

**New assertions the commit must add:**

1. every token in the typed object exists in the authored CSS, and the reverse,
   excluding the raw palette, `--radius-checkbox` and the `--_` sources;
2. every `@theme` entry references a custom property and **contains no literal
   value**;
3. **no hex outside `colors.css`**;
4. **every semantic colour references a palette entry** and restates no hex;
5. **each alpha derivative's `rgb` triple equals its stated palette entry's**;
6. the six retired interaction identifiers, `--text-muted`,
   `--focus-ring-green`, `--focus-ring`, `--focus-ring-inner`,
   `--focus-ring-outer`, `--focus-ring-width`, `--font-numeric`,
   `--shadow-none`, `--shadow-xs`, `--shadow-sm`, `--shadow-md` and
   `--radius-pill` **appear nowhere**;
7. **no raw palette entry and no `--_` source reaches the typed object or the
   `@theme` artifact**;
8. `--space-1` … `--space-8` carry exactly 4, 8, 12, 16, 20, 24, 32 and 40 in
   that order, and **no `--space-*` identifier outside 1–8 exists** — which
   also keeps out the kit's rejected 48px and 64px steps and every value-based
   name;
9. the focus indicator is exactly the four scalars
   `--focus-indicator-inner-color`, `--focus-indicator-inner-width`,
   `--focus-indicator-outer-color` and `--focus-indicator-outer-width`, with
   **no composite focus token**;
10. the eight type steps are exactly the eight v0.2 §2.2 names, and no ninth
    exists;
11. the three stacking integers are 10, 20 and 30, in that order;
12. `generate-tokens --check` is clean;
13. **byte parity** between each `src/` CSS file and its `dist/` counterpart;
14. the roles that share a value are separately present — `--background` and
    `--surface`; `--neutral-status-fg` and `--text-secondary`; `--info-fg`,
    `--action-blue-hover` and `--link-hover`; and the two focus-indicator
    widths, both `2px`;
15. **the generated output passes the repository's existing gates** — Prettier
    and ESLint both own `src/`, so `src/tokens/index.ts` and
    `src/tokens/tailwind-preset.css` must be emitted already formatted and
    already lint-clean, or `pnpm format:check` and `pnpm lint` fail;
16. **a clean-clone Tailwind v4 consumer smoke test** proves that the
    extensionless subpath `@zakhmban/ui/tokens/tailwind-preset` resolves
    through `@tailwindcss/postcss` from a freshly installed copy of the
    package — the obligation ADR 0001 records, discharged rather than assumed;
17. **the README carries the exact ordered consumer import snippet** ADR 0001
    requires, because a `@theme` layer imported before the custom properties
    it references, or before `@import "tailwindcss"`, fails silently with
    unstyled output.

**The seventeen TypeScript-artifact assertions of §11 are additional to this
list**, and the implementing commit must add those too.

**Release.** The package is `0.0.0` and private; this ADR changes neither.
Adding tokens is additive under v0.2 §7's versioning rule, and the three new
subpaths widen the public surface additively. **Nothing here authorizes a
version bump, a tag, a release or a push.**

## What this ADR does not decide, and the gaps it reports rather than fills

Three things could not be derived from a canonical source. **Each is reported,
not invented**, as the sign-off's deferral rule requires.

**1 · The pill radius has no canonical literal.** §2.3 assigns the role and
states no number; the kit's `999px` is evidence, not authority. The role is
recorded in §7 above and **the token is excluded from implementation**. An owner
ruling is needed before a literal exists.

**2 · The four keyframes have meanings but no canonical names.** §2.4 fixes
*"skeleton shimmer (1400ms), fade-up 8px for dialogs, slide-up for sheets, spin
for loading"* and fixes that there are four and no more. It names none of them,
and naming them is a Styles decision — §7 places `keyframes` under `styles/`.
**This ADR names no keyframe and emits no `--animate-*` key.** The one value
§2.4 does supply, the 1400ms shimmer duration, is tokenised as
`--duration-shimmer`; the 8px fade-up distance is a keyframe internal and is
left to Styles.

**3 · `small control 40` is not exposed.** §2.3's control-geometry list includes
it, but **the Button size sm 40px-versus-44px conflict is explicitly open** and
is named in the sign-off's excluded list. Publishing a 40px geometry token would
decide that conflict by representation. **No token carries 40px**, and the value
returns when an owner closes the conflict. The same reasoning excludes the
**visible Checkbox square dimension**, which no canonical source states at all.

**Also not decided here**, because each is a value question belonging to an
owner or a later stage: Decision 4b's three general shadow tiers; Decision 6b's
Modal radius; Decision 11's final ScaleSelect behaviour; Decision 16b's
desktop/web contract; the visited-link colour; dark mode; the banner accent
contract; Chip state coverage; the BottomNav badge size defect; non-Card
Surface bindings; typography role assignment for error text, banner prose and
ListRow metadata; border widths, which §1.6 of the sign-off does not place in
the V1 radius-and-geometry scope and which arrive with the component contracts
that use them; the overlay-root and Portal technique; and simultaneous or
nested overlay policy.

## Consequences

### Positive

- **The hex exists in exactly one place.** Every colour literal is a raw
  palette entry in `colors.css`; semantics reference it; the typed object and
  the `@theme` artifact are generated. ADR 0001 clarification 3 holds
  mechanically rather than by review discipline.
- **Distinct roles survive equal values.** Three pairs and one triple that
  currently share a value stay separately declared, separately typed and
  separately mapped, so a future divergence is a one-line change rather than a
  migration.
- **Deferred decisions cannot be filled by accident.** Resetting the Tailwind
  namespaces removes `p-7`, `rounded-xl`, `bg-purple-500` and `ease-in-out`
  from the consumer's reach, which is the deferral rule enforced by the
  artifact instead of by a reviewer.
- **Every canonical identifier survives verbatim**, so no document, ruling or
  decision record needs rewriting, and a reader of v0.2 §2.1 finds the same
  names in the CSS.
- **The retired names cannot come back.** Nine identifiers are asserted absent
  by test, so a well-meaning compatibility alias fails CI.
- **The typed artifact has one shape, fixed in writing.** One runtime export,
  three type exports, canonical keys, resolved string values, `as const`. An
  implementer invents nothing, and a later change to any of it is a visible,
  reviewable breaking change rather than a drift.
- **The generator refuses rather than guesses**, which converts each of this
  ADR's rules into a build failure.

### Negative

- **Eight `--_`-prefixed internal properties exist** purely because three
  canonical prefixes collide with Tailwind v4 namespaces. They are noise in the
  authored file and a convention a reader must learn. The alternatives were
  renaming a canonical identifier or restating values in the artifact, and both
  are worse.
- **`text-text-primary` is an awkward utility.** Mapping `--text-primary` into
  Tailwind's colour namespace produces it. Renaming the token to `--color-ink-*`
  would read better and is refused: the identifier is canonical in v0.2 §2.1.
- **The spacing utilities diverge from Tailwind's defaults at steps 7 and 8.**
  `p-1` … `p-6` agree with stock Tailwind at 4, 8, 12, 16, 20 and 24px; `p-7`
  is 32px here against Tailwind's 28px, and `p-8` is 40px against 32px. The
  divergence belongs to the approved scale and is deliberate, and resetting
  the namespace means no unapproved step resolves at all — but a developer's
  muscle memory will be wrong at those two keys until they read the README,
  which must state the eight steps explicitly.
- **Resetting `--color-*` is a breaking change for two consumers.**
  `zakhmban-admin` and `zakhmban-website` take tokens and formatting only and
  use stock Tailwind colour utilities today; adopting the preset removes them.
  Recorded as migration work alongside the font ruling's consumer list. **No
  consumer repository is modified by this ADR.**
- **Durations, the press scale, the stacking roles and control geometry have no
  Tailwind utility.** Consumers write arbitrary values against the custom
  property. Tailwind v4 has no namespace for any of them, and inventing one by
  folding them into `--spacing-*` would reopen a closed scale.
- **Type steps are three properties plus an alias, not one.** More surface than
  a single composite, and the `font` shorthand's side effects make the single
  composite unsafe.
- **`--radius-pill` is a named role with no value**, so a pill surface stays a
  component concern until an owner rules. That is a visible gap, and it is the
  correct one: the alternative was inventing `999px`.
- **The implementing commit is large.** Seven authored files, two generated
  artifacts, a generator, a build step, three amended guards and the
  assertions of §11 and §18 land together, because each half is meaningless
  without the other.

## Alternatives considered

**1 · Author the values in TypeScript and generate the CSS.** A typed source
with CSS emitted from it is the more common modern arrangement.

Rejected: v0.2 §2 fixes the order — *"CSS custom properties … authored by hand;
the single source"*, with the typed object and the preset *"derived, never
authored"*. Reversing it is a governing-document change, not an ADR's to make.

**2 · Restate values in the `@theme` artifact instead of referencing them.**
Simpler generator, no `--_` properties, no collision problem.

Rejected: ADR 0001 clarification 3 requires the artifact to reference *"rather
than restating their values, so the hex exists in exactly one file and the
preset cannot become a second place a colour is defined"*. Generation makes
drift unlikely; the clarification makes it impossible, and that is the stronger
guarantee.

**3 · Prefix every token, `--zk-*` or `--ui-*`.** Every collision with Tailwind
disappears at a stroke, and the namespace becomes unmistakably the package's.

Rejected: it renames every canonical identifier printed in v0.2 §2.1–§2.4 and
fixed by the approved rulings. An ADR settles the form a decided value takes and
**does not invent or silently change the value itself**; a name is part of what
the Interaction Ladder Ruling and the Token Table decided.

**4 · Express alpha derivatives with `color-mix()`.** `color-mix(in srgb,
var(--blue-900) 40%, transparent)` would make even the alpha values reference
the palette, removing the last four literals.

Rejected on three grounds. §2.1 lists *"alpha-muted or `color-mix` text"* among
the forbidden, which sets the document's posture toward the function. The three
shadows would carry it inside `box-shadow`, where the computed value is harder
to inspect and to diff in a committed `dist/`. And assertion 5 of §18 gives the
same no-drift guarantee at zero runtime cost.

**5 · Leave Tailwind's default namespaces in place and only add Zakhmban keys.**
Least disruptive for the two token-only consumers.

Rejected: it leaves `bg-orange-500`, `p-7` and `rounded-full` available in four
applications whose governing document forbids the first, closes the scale the
second violates, and defers the pill literal the third implies. The registry's
deferral rule says a deferred decision *"must not be filled by an implementer, a
reference kit, a consumer implementation or an AI agent"*; defaults are exactly
that kind of filling.

**6 · A value-based spacing ladder, `--space-4` … `--space-40`.** Each
identifier would state its own px value, and the gaps at 28px and 36px would
be visible in the identifier set itself.

Rejected: the owner ruling fixes the canonical identifiers as the ordinal
`--space-1` … `--space-8`, and an ADR settles the form a decided value takes
rather than the name an owner has already chosen. The ladder is also
self-colliding — `--space-4` would mean 4px under it and 16px under the
approved scale — so **no alias to it is retained**.

**7 · A numeric radius ladder, `--radius-12` … `--radius-24`, with role
aliases.** The input list offered *"a numeric ladder, semantic role names, or
both"*.

Rejected: Decision 5 is *"not a definition or closure of the complete radius
family"* and Decision 9 states 6px is *"not a numeric radius-ladder entry"*. A
published ladder would read as the closed family neither decision approved, and
`--radius-pill` has no number to take a place in it.

**8 · Give `--radius-pill` the kit's `999px`.** Every other Token Table value
the kit supplied was eventually ratified, and 999px is the conventional idiom.

Rejected: Ruling B clause 2 — *"Candidate values present only in the kit remain
non-canonical until human ratification"* — and the registry's **silence never
creates permission**. This is the single place in this ADR where an invented
literal would have been easiest, which is the reason to refuse it plainly.

**9 · Publish a 40px small-control geometry token.** §2.3 does print the value.

Rejected: the Button sm 40-versus-44 conflict is explicitly open and explicitly
excluded from the sign-off. Exposing the token would settle it by
representation, which is precisely the boundary this ADR exists to respect.

**10 · Add a fourth public subpath for fonts.** It would make the binary
addressable and simplify a consumer preload hint.

Rejected: the Owner Font Contract and Delivery Ruling approved none, and
`docs/adr/README.md` makes an unnamed public subpath an ADR trigger. If
implementation proves one is technically necessary, work stops and this ADR is
amended — which is the outcome the ruling already prescribes.

## Sources

- **Scoped Token Foundation V1 Owner Sign-off**, 2026-09-18 — §1 signed-off
  scope, §3 supersessions applied, §4 excluded and deferred matters, §5
  representation reserved for ADR 0003, §7 implementation authorization
  boundary. Recorded in
  [`../architecture/token-table-ratification.md`](../architecture/token-table-ratification.md).
- **Token Table Ratification Worksheet** — Decisions 1, 1·A1, 1·A2, 2, 3a (as
  scope-amended), 3b, 4a, 4b, 5, 6a, 6b, 7, 8, 9, 10, 11, 12a–c, 13, 14, 15,
  16a, 16b, and the ADR 0003 input list.
- **Owner Contrast Ruling**, **Incidental Accessibility Findings Ruling**,
  **Owner Font Contract and Delivery Ruling**, **Owner Interaction Ladder
  Mapping Ruling**, all 2026-09-18 — same file.
- **Canonical Documentation Authority and Supersession Ruling**, 2026-09-18 —
  [`../architecture/canonical-document-registry.md`](../architecture/canonical-document-registry.md):
  the authority levels, the value-versus-representation split, the supersessions
  of record and the global supersession rule.
- **Token Design Authority Ruling (Ruling B)**, 2026-09-15 —
  [`../architecture/token-design-authority-ruling.md`](../architecture/token-design-authority-ruling.md):
  the kit is evidence, never authority.
- **UI System Specification v0.2** — §2 (ownership, the three representations,
  the entry point, the two layers), §2.1, §2.2, §2.3, §2.4, §3.1, §6, §7
  (package structure, Tailwind, Exports, Dependency policy, Versioning).
- **Frozen Technical Architecture v1.1** §2, §2.1, §2.2 — repository #3
  contents, what is shared, committed `dist/`.
- **ADR 0001 — Tailwind Token Delivery Strategy**, especially clarifications 1,
  3 and 4 and the negative consequence on extensionless subpath resolution.
- **ADR 0002 — Validation Helpers Public Contract** — the precedent that a
  public subpath widens only by a reviewed diff against its guard.
- This repository, inspected 2026-09-18: `package.json`, `scripts/build.mjs`,
  `scripts/verify-dist.mjs`, `tsconfig.build.json`, `.prettierignore`, and
  `tests/architecture/` — `source-entry.test.ts`, `exports-contract.test.ts`,
  `dependencies.test.ts`, `package-metadata.test.ts`, `root-export.test.ts`.
