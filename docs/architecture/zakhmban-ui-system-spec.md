# UI System Specification

**@zakhmban/ui** · extracted from the Zakhmban V2 Therapist App · **v0.2 — architecture-aligned**

Source of truth for implementation. Specification only — no code.

> **Precedence notice.** This revision aligns the specification with **Frozen Technical Architecture v1.1**, which outranks it. Where the two previously disagreed — package location, repository structure, pnpm workspace, and the size of the package's component surface — the frozen document governs and this specification has been corrected. No visual decision, token, or component design was changed to achieve that alignment.

---

## Design Decisions Update — v0.1

Eight architecture decisions confirmed. The sections below are updated in place; this block is the record of what changed and what remains open.

| Decision | Effect | Sections modified |
| --- | --- | --- |
| **1 · Maps** | Maps, map providers and location-rendering primitives are excluded from @zakhmban/ui. Any future map requirement belongs to the Therapist App and the Patient App. | 3.6 · 7 · 7.1 · 9 |
| **2 · Direction** | RTL-only product direction. No LTR mode, no direction switching, no bilingual direction handling. Logical properties remain mandatory as correct RTL practice, not as LTR preparation. | 5 |
| **3 · Switch** | Switch is required and enters the catalog: immediate boolean state change. | 3.2 · 9 |
| **4 · Checkbox** | Checkbox is required and enters the catalog: selection and confirmation. Documented as distinct from Switch. | 3.2 · 9 |
| **5 · Icons** | Icon abstraction confirmed as permanent. Lucide is an implementation detail behind it; applications never import an icon library directly. | 3.1 · 7 · 8 |
| **6 · Dark mode** | Deferred. No dark tokens, no dark variants, no theme switching. | 2.1 · 9 |
| **7 · Scope** | Confirmed component inventory recorded as the core scope, with the boundary exclusions stated explicitly. | 9 (new) |
| **8 · Philosophy** | The package provides reusable visual primitives and UI patterns only — no business workflows, healthcare domain logic, maps, product-specific cards or backend concepts. | 1 · 7 · 7.1 |

**Governance correction (this revision):** WalletBalance and LedgerRow removed from @zakhmban/ui as business-domain concepts, and the admission rule that produced that call written down as §3.7. Sections modified: 1 · 3 intro · 3.5 · 3.7 (new) · 7.1 · 8 · 9. No token, RTL, icon, Switch/Checkbox, styling, package or workspace decision was touched.

**Also recorded:** seven implementation-architecture decisions — package location, repository structure, pnpm workspace, import strategy, styling architecture, dependency policy and the workspace boundary-rule update — in the new §7.2. They change no component and no visual decision. ⚠️ **Three of those seven were superseded in v0.2** (package location, repository structure, workspace) and a fourth — the workspace boundary-rule update — was **withdrawn**. This paragraph is retained as the v0.1 record; see the Architecture Alignment Update below for what now governs.

**Removed or deferred:** LTR locale support and direction switching (removed from scope) · map components, map providers and location primitives (excluded) · dark mode tokens, variants and theme switching (deferred) · the Jalali date picker question (still open, see §9) · «Switch» and «Checkbox» removed from the deliberately-absent list. **Resolved from the previous open register:** items 1, 3, 4, 5 and 7.

---

## Architecture Alignment Update — v0.2

This revision changes **where the package lives, how it is consumed, and which components it ships**. It changes **nothing about how anything looks or behaves**. Every token, every component design, every RTL rule, every accessibility duty and every interaction pattern in §2–§6 stands exactly as written in v0.1.

The trigger: v0.1 §7.2 recorded seven implementation-architecture decisions that conflicted with **Frozen Technical Architecture v1.1 §2**, the highest-precedence source in this project. Three of those decisions were direct contradictions rather than gaps.

| # | Conflict in v0.1 | Frozen v1.1 §2 | Resolution in v0.2 |
| --- | --- | --- | --- |
| **1** | "@zakhmban/ui lives inside the existing repository at `packages/ui/`. No separate repository is created." | *"Multi-repository architecture; a monorepo is prohibited. **8 repositories total.**"* `zakhmban-ui` is **repository #3 of 8**. | Package moves to its own repository, `zakhmban-ui`. §7, §7.2 |
| **2** | "pnpm workspace support is introduced: a `pnpm-workspace.yaml` declaring `packages/*`." | No workspace. Consumers depend on **exact git tags** with a **committed `dist/`**. | Workspace requirement removed entirely. §7.2, §7.3 |
| **3** | "The previous prohibition on `pnpm-workspace.yaml` was correct only while the repository had no internal packages … a pnpm workspace is an approved architectural capability." | The prohibition derives from the monorepo ban and does not lapse. | **Clause withdrawn.** The prohibition stands unconditionally. §7.2 |
| **4** | Package ships **36 components**. | Package ships **five primitives** — `Button`, `TextField`, `Select`, `OtpInput`, `BottomSheet` — plus tokens, formatters, icon set and validation helpers. | Ownership re-tiered: 5 in the package, 31 application-owned. §3 intro, §7.1, §9 |
| **5** | "no Tailwind dependency" | Package contains *"design tokens (CSS variables + **Tailwind preset**)"*. | Reconciled, not overruled: Tailwind is not a **dependency**; the **preset is an exported artifact**. §5 · §7 |

**What did not change:** the palette, typography, spacing, elevation and motion tokens · all thirty-six component specifications in §3 · RTL-only direction · Persian-first content rules · the permanent Icon abstraction · the exclusion of maps · deferred dark mode · Checkbox and Switch · the admission rule in §3.7 · the product/UI boundary principle in §7.1 · every accessibility duty in §6.

**Re-tiering is not deletion.** The thirty-one components that moved to the application layer keep their full specification in §3. §3 remains the design authority for all thirty-six; §9 now records which repository *ships* each one. No design work is discarded and no component is removed from the product.

---

## 1 · UI System Overview

The Zakhmban Therapist App is a Persian-first, RTL, single-column mobile application built at a 390px design width. Its visual language is already frozen: white surfaces, hairline borders instead of shadows, green as the product and action colour, blue as information, red as error and blocking, dark navy as the only typographic ink. This specification formalizes that language as a reusable package. It adds no palette, no typeface, and no component that the Therapist App does not already use.

The system is deliberately small. Thirty-six components cover the entire application — authentication, a four-step verification flow, a masked request feed, structured proposals, a wallet, a five-step clinical session record, and a profile. The discipline that keeps it small is a rule about ownership: **@zakhmban/ui provides reusable visual primitives and UI patterns, and nothing else.** It does not provide business workflows, healthcare domain logic, maps, product-specific cards, or backend and API concepts. It knows how a surface looks and behaves as a control; it never knows what a wound, a proposal, or an access fee is.

### Five principles

1. **Border before shadow.** Separation is a 1px `#E2E6DD` line and space. Elevation is reserved for sheets, modals and the bottom nav.
2. **Four status tones, no more.** Green, blue, red, neutral. No orange: a non-blocking warning is blue, a blocking one is red.
3. **One primary action per screen.** Docked above the bottom edge in any flow step.
4. **Structured over free text.** Selects and chips carry clinical data; prose fields are the exception and always optional.
5. **Calm motion.** Colour and opacity, 120–320ms. The only transform in the system is a 0.98 press scale.

---

## 2 · Design Token Specification

Tokens ship as CSS custom properties in seven files under `tokens/`, mirrored as a typed JS object for consumers that need values in script. Two layers: a **palette layer** (`--green-500`) that components never reference, and a **semantic layer** (`--success`, `--text-primary`) that is the only public API. Renaming or retiring a semantic token is a breaking change; adding one is not.

**Token ownership and the three representations (v0.2).** The tokens are owned by `zakhmban-ui` and by nothing else. No consuming application defines, overrides, re-declares or shadows a semantic token; an application that needs a value it cannot express is missing a token, and that is a pull request against the package. The Therapist App's lint rule L5 — no hardcoded colour values — is the consumer-side half of this rule.

One source, three generated representations, in strict order:

| | Representation | Generated from | Consumed by |
| --- | --- | --- | --- |
| 1 | **CSS custom properties** — `tokens/*.css` | authored by hand; the single source | every consumer, always; the package's own static CSS |
| 2 | **Typed JS object** — `tokens.ts` | generated from (1) | consumers needing values in script |
| 3 | **Tailwind preset** — a plain JS theme object | generated from (1) | only consumers that use Tailwind; ignored by the rest |

(2) and (3) are **derived, never authored**, so they cannot drift from (1). A token added by hand to the preset but not to the CSS is a build error, not a style.

**Entry point.** A consumer imports the stylesheet once, at the application root, and gets every token: `import "@zakhmban/ui/styles"`. Nothing else in the application imports token CSS, and no component imports it individually — a token that is present twice is a cascade bug waiting for a specificity change.

### 2.1 Colour

The logo is the colour authority. Three families — green, blue, red — plus warm green-tinted neutrals. Nothing else recurs.

| Semantic token | Value | Role in the Therapist App |
| --- | --- | --- |
| `--brand-green` / `-dark` / `-soft` | #3C9220 · #0C7912 · #F0F8E7 | Primary button, active nav item, selected chip, finalized record, wallet credit, progress fill |
| `--brand-blue` / `-dark` / `-soft` | #0383CE · #002A5E · #EAF5FC | Information banners, links, wallet identity, deadline countdown, pending states |
| `--brand-red` / `-dark` / `-soft` | #EC1417 · #C80303 · #FDEBEC | Overdue record, blocked feed, failed payment, document correction, sign-out |
| `--text-primary` / `-secondary` / `-muted` | #002A5E · #667085 · #8A9384 | All ink. Muted is for 12px captions and hints only, never body copy |
| `--surface` / `--surface-subtle` | #FFFFFF · #F7F9F5 | White is page and card. Subtle is grouped data rows, skeletons, image wells — never a full canvas |
| `--border` / `-strong` / `--divider` | #E2E6DD · #A0A79C · #EDF0EA | Card outline · dashed upload target · row separator inside a card |
| `--success` `--info` `--danger` + `-fg` `-bg` | 3 tones × 3 roles | Every StatusBadge, banner and tinted surface. `-fg` is the accessible text pair for `-bg` |
| `--neutral-status-fg` / `-bg` | #8A9384 · #F7F9F5 | Fourth tone: archived, expired, withdrawn, closed |
| `--disabled-bg` / `-text` / `-border` | #F1F3EF · #A0A79C · #E2E6DD | Disabled is a colour swap, never opacity on the whole control |
| `--*-hover` / `--*-press` | 6 tokens | Hover darkens the fill; press darkens further + 0.98 scale |
| `--overlay` · `--focus-ring` · `--focus-ring-green` | rgba(0,42,94,.40) · 3px blue · 3px green | Sheet/modal scrim; focus ring on any focusable element (green ring on green fills) |

**Forbidden:** orange, purple, turquoise; gradients outside the logo artwork; alpha-muted or `color-mix` text; a fifth status tone; raw hex in component source.

**Dark mode is deferred (decision 6).** No dark tokens, no dark component variants and no theme switching are in scope. The two-layer structure would permit a themed override later, but nothing about one is specified and none should be built.

### 2.2 Typography

Vazirmatn at four weights (400 / 500 / 600 / 700), one family for Persian and Latin alike. The scale is closed: eight steps, each with a bound line height. 12px is the absolute floor.

| Token | Size / LH | Weight | Used for |
| --- | --- | --- | --- |
| `--text-display` | 32px / 1.28 | 700 | Launch screen, level score |
| `--text-page-title` | 22px / 1.36 | 600 | Step question, EmptyState title |
| `--text-section-title` | 19px / 1.42 | 600 | Section heading inside a scroll region |
| `--text-card-title` | 16px / 1.5 | 600 | Card heading, ListRow primary |
| `--text-body` | 15px / 1.68 | 400–500 | Default body. 1.68 is required for Persian ascenders |
| `--text-label` | 13px / 1.5 | 500 | Field label, data-row key, chip |
| `--text-caption` | 12px / 1.5 | 400–500 | Hint, timestamp, privacy note. Floor |
| `--text-button` | 15px / 1 | 600 | All button labels |

Rules: money, dimensions, scores, countdowns and codes set `font-variant-numeric: tabular-nums`. Prose caps at 46–62 characters per line. `text-wrap: pretty` on body, `balance` on headings. No letter-spacing on Persian text — it breaks the joins. No ALL CAPS, no italics (Vazirmatn has no true italic).

### 2.3 Spacing, shape and elevation

**Spacing · 8pt rhythm.** Allowed steps only: **4 8 12 16 20 24 32 40**. Page padding 16px. Card padding 16px, 12px for a dense row. Gap between sibling cards 12px; between sections 16px. Docked action block 16px inset, 32px from the bottom edge. Spacing is applied with flex/grid `gap`, never per-element margins.

**Shape.** Radii: **10–12** small control · **14** input and button · **16** card · **20–24** sheet · **pill** chip, badge, search. Borders 1px, 1.5px when a card is selected or in error. Dashed 1.5px `--border-strong` marks an empty upload target.

**Elevation.** Navy-tinted and soft. `xs` segmented control · `sm` raised card · `md` device frame · `nav` upward on the bottom nav · `sheet` upward on a bottom sheet · `modal`. Cards prefer a border; a shadow on a bordered card is a defect.

**Control geometry.** Tap minimum **44px** · small control 40 · input 48 · primary button 52 · app bar 56 · bottom nav 64 + 20 safe area. Design width 390px.

### 2.4 Motion

Three durations — **120ms** for hover and press colour, **200ms** default, **320ms** for sheet entry and progress fills — on `cubic-bezier(.2,0,0,1)`. Four keyframes exist and no more: skeleton shimmer (1400ms), fade-up 8px for dialogs, slide-up for sheets, spin for loading. Countdown values tick without animation. No bounce, spring, parallax, or looping decoration. Every animation must be suppressed under `prefers-reduced-motion: reduce`, leaving the end state.

---

## 3 · Component Catalog

Thirty-six components in five groups, plus three composed patterns that stay in the app.

> **Ownership vs. specification (v0.2).** This catalog specifies all thirty-six. It does **not** mean the package ships all thirty-six. Under Frozen Technical Architecture v1.1 §2 the package ships **five primitives**; the remaining thirty-one are built in the consuming application from those primitives and the shared tokens. The specification below is binding for all of them regardless of which repository implements them — that is what keeps the application-owned components on-system. §9 records the split.

The count follows one rule: each named component in the §9 inventory counts once, and a sub-export that only ever appears inside its parent (CardHeader, SkeletonCard) counts with that parent. Each entry gives purpose, variants, states, API shape and accessibility duty. Props marked † are required. Every component accepts `className`, `style`, `id`, `data-*` and `aria-*` pass-through, and forwards its ref to the outermost DOM node.

### 3.1 Foundations

| Component | Purpose, variants, states | API · accessibility |
| --- | --- | --- |
| **Icon** | UI glyph in a 24px box, 1.8px stroke, rounded caps. Navy default, green when active, red when destructive. A permanent abstraction layer (decision 5): applications reference glyphs by name and never import an icon library. Lucide is the initial implementation behind the registry. | `name†` `size` `color` `strokeWidth`. Decorative by default (`aria-hidden`); an icon-only control must carry a label on the control, not the icon. A direct icon-library import in app code is a spec violation. |
| **Illustration** | Reference to one of the 43 approved brand SVGs by name, optionally on a soft circular tile. Sizes 28–116px. Multicolour navy/green/red line art. | `name†` `size` `tinted` `alt`. Never flatten, recolour, redraw, or substitute generated art. Empty `alt` when adjacent text repeats the meaning. |
| **Text** | Typographic step + tone in one place, so a screen never hard-codes a size. Variants map 1:1 to the eight scale tokens; tones: primary, secondary, muted, success, info, danger, on-brand. | `as` `variant` `tone` `weight` `numeric` `truncate`. `as` must produce correct heading order; the visual step never dictates the tag. |
| **Stack** / **Box** | The only sanctioned layout primitives. Stack is flex + `gap` from the spacing scale; Box is a token-constrained surface (padding, radius, border, background, elevation). | Stack: `direction` `gap` `align` `justify` `wrap`. Box: `padding` `radius` `surface` `border` `elevation`. Reject arbitrary values at the type level. |
| **Screen** | The app shell: fixed app bar, one scroll region, optional docked action block, optional bottom nav, safe-area inset. Every Therapist screen is one of these. | `appBar` `statusStrip` `action` `nav` `scrollRef`. Owns `<main>`, the single H1, and focus restoration on back navigation. |

### 3.2 Inputs

| Component | Purpose, variants, states | API · accessibility |
| --- | --- | --- |
| **Button** | Variants `primary` · `secondary` (outline) · `text`; tones green (default), blue, red. Sizes sm 40 / md 48 / lg 52. States: default, hover, press, focus, disabled, loading. One primary per screen. | `variant` `tone` `size` `block` `disabled` `loading` `iconStart` `onClick`. Loading keeps the label, sets `aria-busy`, and blocks re-entry. Never disable without a visible reason nearby. |
| **TextField** | Single-line, multiline, and suffix-unit forms (تومان, سانتی‌متر). 48px, radius 14. States: empty, filled, focus (blue border + ring), error, disabled, read-only (verified phone). | `label†` `value` `onChange` `hint` `error` `required` `suffix` `multiline` `rows` `dir` `inputMode`. Label is a real `<label>`; hint and error wired via `aria-describedby`; `aria-invalid` on error. Never placeholder-as-label. |
| **Select** | Single choice from a closed list — the workhorse of the clinical record (site, stage, tissue, dressing, debridement, interval). Same geometry and states as TextField. | `label†` `options†` `value` `onChange` `hint` `error` `placeholder`. Native control unless a design need forces a listbox; if custom, full `role="listbox"` keyboard semantics. |
| **Checkbox** | **Selection and confirmation** — accepting terms, choosing several options, filtering. Takes effect when the surrounding form is submitted. States: unchecked, checked, indeterminate, focus, disabled, error. Radius 6, green fill when checked. | `label†` `checked` `indeterminate` `onChange` `error` `disabled`. Native `input[type=checkbox]` with a real `<label>`; the 44px target includes the label; groups use a labelled fieldset. **Checkbox ≠ Switch:** a checkbox records an intention, a switch performs an act. |
| **Switch** | **Immediate boolean state change** — notification settings, availability state, profile visibility, account preferences. No confirm step, no submit. States: off, on, disabled, loading (write in flight), error (the write failed and the control has reverted). | `label†` `checked†` `onChange†` `loading` `error` `disabled`. `role="switch"` with `aria-checked`; loading sets `aria-busy` and blocks re-entry; a failed write reverts the visual state and announces the failure. Never place a Switch inside a form with its own submit. |
| **Chip** | Two jobs: filter entry (opens a sheet, shows a count) and multi/single select inside a form (exudate, odour, infection signs, service tags). Tones green and blue. States: unselected, selected (tint + brand border + brand ink), disabled, with count. | `selected` `tone` `count` `disabled` `onClick`. A selecting group must expose `role="group"` with `aria-pressed` per chip; a filter chip is a button with `aria-expanded`. Minimum 40px height. |
| **OtpInput** | Five-cell code entry, the app's only authentication input. States: empty, partial, complete, error, resend cooldown. | `length` `value` `onChange` `onComplete` `error`. LTR digit order inside an RTL page; paste fills all cells; `autocomplete="one-time-code"`; result announced politely. |
| **SearchInput** | Pill field with leading glyph and clear affordance. States: empty, typing, results, no results, disabled. | `value` `onChange` `onClear` `placeholder`. `role="searchbox"`; result count announced politely; clear button is 44px. |
| **ImageUploader** | Clinical photo capture, up to N thumbnails. Per-item states: empty target (dashed), uploading (70% white veil + progress), uploaded, failed with retry, removable. Thumbnails are square, radius 12, hairline border — never full-bleed. | `label†` `items` `max` `hint` `onAdd` `onRemove` `onRetry`. Keyboard-reachable add and remove; upload progress and failure announced; every thumbnail needs a positional label. |
| **ScaleSelect** | The 0–10 discrete rating row used for patient pain. Eleven equal cells, selected cell takes the green tint. Generalized from the session record; the only genuinely new primitive in this specification. | `min` `max` `value` `onChange` `labelStart` `labelEnd`. `role="radiogroup"`, arrow-key traversal, each cell an accessible radio with a full-sentence label. 36px cells are below the 44px target — see the a11y exception register. |

**Deliberately absent:** Radio, DatePicker, Textarea-as-separate-component, Tooltip, Toast, Tabs. The Therapist App expresses single choices as Select or a chip group, dates as Select or a text field with a Jalali mask, and prose as `TextField multiline`.

**UNKNOWN / NEED DESIGN DECISION —** a real Jalali date picker; session `occurredAt` is currently a typed field and no picker has been designed.

### 3.3 Navigation

| Component | Purpose, variants, states | API · accessibility |
| --- | --- | --- |
| **TopAppBar** | Fixed 56px. Two forms: *root* (brand mark + title + optional subtitle) and *flow* (back affordance + title + step subtitle). Optional trailing IconButton. Never both brand and back. | `title†` `subtitle` `brand` `onBack` `trailing`. Back is a 44px button labelled «بازگشت» with a mirrored chevron. The title is the screen's H1 unless the content supplies one. |
| **IconButton** | 44px icon-only action for app bars and dense rows. Variants ghost and tinted; states mirror Button. | `label†` `onClick` `tone` `disabled`. `label` is required and becomes the accessible name — enforce it in the type signature. |
| **BottomNav** | The app's fixed four-item root navigation: آگهی‌ها · پرونده‌ها · کیف پول · پروفایل. Active item takes green icon + label; a numeric badge is allowed on آگهی‌ها only. Exactly four items — three or five is out of spec. | `items†` `active†` `onChange`. `<nav>` with a labelled list, `aria-current="page"` on the active item, first item at the right in RTL, badge counts read as «۳ آگهی جدید». |
| **SegmentedControl** | Two-to-three peer views inside one root screen — درخواست‌ها / پیشنهادهای من. Selected segment is a white card on the subtle track. Not a filter, not a tab bar for whole sections. | `items†` `value†` `onChange` `counts`. `role="tablist"` with arrow-key traversal and a linked panel, or a radiogroup if the content is not panel-shaped. |
| **Stepper** | Position inside a fixed linear flow — 4 registration steps, 5 session steps. States per node: complete, current, upcoming. Never scrolls, never more than five nodes. | `steps†` `current†` `onStepClick`. Announced as «مرحله ۲ از ۴»; a decorative rail is hidden from the reader; only completed steps may be interactive. |
| **ListRow** | Settings and menu row: leading glyph, title, optional description, trailing badge or mirrored chevron. States: default, pressed, disabled, destructive. | `icon` `title†` `description` `trailing` `onClick` `tone`. Renders as a button or link when actionable — never a clickable div. 44px minimum. |

### 3.4 Feedback

| Component | Purpose, variants, states | API · accessibility |
| --- | --- | --- |
| **InfoBanner** | Non-blocking explanation, in place, above or below the thing it explains. Tones info (default), success, neutral. Title plus one or two sentences. Carries the privacy explanations that make masking legible. | `tone` `title` `children` `action`. `role="status"` when it appears after an action, otherwise plain prose. Never used for a blocking condition. |
| **ErrorBanner** | Blocking or failed condition with the consequence stated and, where possible, a retry. Red tint, red border. The only correct surface for «دریافت درخواست جدید متوقف است». | `title†` `children` `retryLabel` `onRetry`. `role="alert"` when it appears in response to an action; focus moves to it when it blocks the primary flow. |
| **EmptyState** | Illustration + title + one explanatory sentence + at most one action. Variants full and compact. Covers no-matching-requests, hidden feed, session expired, submission received, approval, unlock success. | `illustration` `title†` `description` `action` `compact`. Illustration decorative; title is a heading at the right level; never used to report an error. |
| **Skeleton** / **SkeletonCard** | Shape-preserving load placeholder, 1400ms shimmer. SkeletonCard mirrors the real card's row count and avatar presence. Filters render disabled, not skeletal. | `rows` `avatar` `width` `height`. The region carries `aria-busy`; the shimmer is hidden from the reader; a single «در حال بارگذاری» is announced, not one per box. |
| **BottomSheet** | Secondary input without leaving the screen — filters, top-up. Radius 20–24, upward shadow, scrim, sticky footer action. Slides up 320ms. | `open†` `title†` `onClose†` `footer` `children`. Focus trap, Escape closes, scrim click closes, background inert, focus returns to the opener, `role="dialog"` + `aria-modal`. |
| **Modal** | Confirmation for an irreversible act — finalizing a session record, requesting a void. Title, consequence sentence, confirm and cancel. Fades up 8px. Not used for content. | `open†` `title†` `confirmLabel` `cancelLabel` `onConfirm` `onCancel` `tone`. Same dialog semantics as BottomSheet; initial focus on cancel when the act is destructive. |
| **ProgressIndicator** | Determinate bar for upload progress, record completion and level components. Tones green (default), blue, danger. Sizes sm and md. Optional label and value. | `value†` `max` `label` `tone` `size` `showValue`. `role="progressbar"` with min/max/now and a text alternative; never the sole carrier of a number. |

### 3.5 Data display

| Component | Purpose, variants, states | API · accessibility |
| --- | --- | --- |
| **Card** + **CardHeader** | The universal container: white, 1px border, radius 16, 16px padding. Variants default, selected (1.5px green + green tint), error (1.5px red + red tint), muted (neutral ink for closed items), interactive. | `variant` `padding` `onClick` `as`. Interactive cards render as a button or link with one accessible name; nested actions must not be swallowed by the card's own handler. |
| **DataRows** | Formalizes the key/value block that appears on almost every Therapist screen — proposal summary, wound specifications, payment breakdown. Rows separated by `--divider`; optional emphasized total row; optional subtle-surface variant for the inline 2–3 column stat strip. | `rows†` `emphasizeLast` `surface` `columns`. Real `<dl>` semantics so a reader pairs key and value; values may be nodes (Money, StatusBadge). |
| **StatusBadge** | Two-or-three-word state marker in the four tones. Sizes sm and md, optional leading dot. Green success/active/finalized · blue information/pending/in-review · red error/blocked/failed/overdue · neutral archived/expired/withdrawn. | `tone†` `size` `dot` `children†`. Colour is never the only signal — the word carries the meaning. `-fg` on `-bg` guarantees contrast. |
| **Money** | **A formatting and display primitive only.** Renders a given amount with a smaller trailing تومان, Persian digits, tabular figures, thousands separated by «٫». Tones default, credit (green), debit (red), muted. Optional explicit sign. Sizes sm/md/lg. It holds no wallet logic, performs no balance calculation, and knows nothing of transactions — the caller supplies a number and a tone. | `amount†` `tone` `size` `sign`. Reads as a full amount with currency, not digit-by-digit; never renders a bare number without تومان. |
| **Avatar** | Person mark from image or initials, sizes sm/md/lg/xl, tones green and blue. Only ever rendered for a party whose identity is already unmasked. | `name†` `src` `size` `tone`. Decorative when the name is beside it; must not become the only place a name appears. |
| **Rating** | Read-only five-star average with review count. No input variant — therapists are rated, they do not rate. | `value†` `count` `size`. Stars decorative; announced as «۴٫۸ از ۵ بر پایه ۶۲ نظر». |
| **Timeline** | Ordered longitudinal history — verification progress, sessions in a case, treatment episodes. Node tones green/blue/neutral, hollow for a planned future node, optional description and footer slot for a badge. | `items†`. Ordered list; the rail is decorative; each node's state is in its text, and a future node says so. |

### 3.6 Domain patterns — composed in the app, not in the package

Three recurring Therapist compositions are documented here as patterns so they stay consistent, but they are **not** package components: each one encodes product rules the UI layer must not learn.

| Pattern | Composition · why it stays in the app |
| --- | --- |
| **Masked request card** | Card + Illustration + StatusBadge (time remaining) + DataRows stat strip + condition chips + own-proposal state + Button. The masking rule — which fields may exist before unlock — is a product invariant and belongs to the app. |
| **Approximate-area map tile** | Card + a bounded area shape + a privacy caption; after unlock the same tile shows an exact pin, address and a directions action. Which precision is legal at which stage is product logic. **Maps are intentionally excluded from @zakhmban/ui (decision 1)** — no map component, provider binding or location-rendering primitive enters the package. The package contributes the Card, the caption typography and the Button; the map surface itself and the choice of provider belong to the Therapist App and the Patient App. |
| **Record status strip** | A slim strip under the app bar carrying draft state, `occurredAt` and remaining time, in three appearances: subtle (>12h), blue (<12h), red (overdue). The 48-hour rule and the feed-blocking consequence are product logic; the package supplies only the strip slot on Screen plus StatusBadge. |

### 3.7 Admission rule

**A component must not enter @zakhmban/ui if its name or API represents a business entity, a financial concept, a healthcare workflow, or a product operation.**

**Belongs in @zakhmban/ui** — Button · Input · Card · Avatar · Badge · Modal · table and data-row primitives · status indicators: generic visual primitives and generic interaction patterns.

**Belongs in the applications** — wallet views · ledger views · patient workflows · therapist workflows · appointment workflows: anything named for what the business does.

**Applied in this revision:** WalletBalance and LedgerRow were removed from the package. Wallet and ledger are financial concepts, not UI primitives; both are now composed in the Therapist App from Card, DataRows, Money, StatusBadge and Button.

---

## 4 · Interaction Patterns

### 4.1 Screen layout

One skeleton, universally: fixed 56px app bar · optional status strip · one scrolling region at 16px page padding · optional docked action block · fixed bottom nav on root screens only. Never two scroll regions, never a horizontally scrolling primary flow, never a second sticky element competing with the docked action. Root screens (the four nav destinations) show the brand mark and no back affordance; flow screens show a back affordance and a «مرحله ۲ از ۴» subtitle.

### 4.2 Multi-step forms

Stepper at the top of the scroll region, one titled group of fields per step, «ادامه» docked. Steps are linear and finite (four, then five); a step never scrolls the Stepper. Where work can be lost, the docked block splits into a secondary «ذخیره پیش‌نویس» plus the forward action, and the terminal step's forward action names the consequence («ثبت نهایی گزارش») and passes through a Modal. Validation is on blur for format and on submit for completeness; the first invalid field receives focus and its error is announced. A step whose forward action is unavailable shows a disabled Button with the reason immediately beneath it — never a disabled control with no explanation.

### 4.3 Lists, filters, detail

Lists are vertical stacks of Cards at 12px gaps, newest or most urgent first, each card carrying exactly one primary affordance. Every list defines five states: default, loading (SkeletonCards matching the real card shape, filters disabled), empty (EmptyState plus a clear-filters escape when filters are active), blocked (ErrorBanner stating the block and its remedy, with the count of what is hidden), and end-of-list. Filtering is a fixed row of filter Chips that open a BottomSheet with an «اعمال فیلتر» footer; an applied filter shows its count on the chip. There is no free-text search in the Therapist feed. Detail views repeat the list card's identity at the top, then DataRows, then history, and dock the single next action.

### 4.4 Money and irreversibility

Any charge shows the full breakdown before the action — fee, available credit, and the exact amount to be taken — with one primary action naming the method («تأیید و پرداخت از کیف پول»، «پرداخت ۶۰٫۰۰۰ تومان از درگاه»). Every payment surface defines pending (progress + «این صفحه را نبندید» + gateway reference), failed (ErrorBanner with the bank's reason, the refund window, and both retry paths), and success (EmptyState + a receipt DataRows block + remaining balance). Non-refundability is stated once, in caption ink, immediately above the action. Irreversible non-financial acts — finalizing a clinical record — use a Modal whose body states what becomes immutable and what the correction path is.

### 4.5 State, feedback and blocking

Feedback is in place, not floating: this system has no Toast. A result appears where the action was, as an InfoBanner, an ErrorBanner, or a full EmptyState confirmation screen when the outcome ends a flow. Blocking follows one rule — a block is announced on the surface it affects, states its cause in one sentence, states its remedy as the primary action, and tells the user what remains reachable. Countdowns are shown as remaining duration («۲۳:۱۴ باقی»، «۴۱ ساعت»), never as a raw deadline timestamp alone, and tick without animation.

---

## 5 · RTL and Localization Guidelines

**RTL-only product direction (decision 2).** Zakhmban is Persian-first and right-to-left, and that is the whole of the scope: no LTR mode, no direction switching, no bilingual direction handling. Persian is not a localization target — it is the design's native direction. `dir="rtl"` and `lang="fa"` are set once on the document; no component sets or reads direction on itself.

**Direction & layout.** Logical CSS properties only: `margin-inline`, `padding-inline`, `inset-inline`, `border-start`, `text-align: start`. No `left`/`right` in component source. Flex and grid order follows document order — the first BottomNav item sits at the right automatically. Reading order runs right-to-left: a card's identity leads, its status trails.

**Icon direction.** Mirror directional glyphs (back, forward, chevron, next/previous, trending, send, undo). Never mirror non-directional ones (clock, phone, map pin, lock, wallet, star, shield) or any brand illustration. Progress fills from the right. The rule is a property of the icon, declared in its registry entry — not a per-usage decision.

**Numbers, dates, money.** Persian digits everywhere in product copy. Jalali dates («۱۴ مرداد ۱۴۰۴»). Money as Persian digits, «٫» thousands separator, smaller trailing تومان, tabular figures. Times as remaining duration. Formatting lives in one `utils/format` module — never inline in a component.

**Mixed Persian / Latin.** Technical values stay Latin and LTR in an isolated inline span (`dir="ltr"`): request codes, wound codes, tracking numbers, filenames, version strings, phone entry, OTP cells, IBAN. Isolation is required — an un-isolated Latin token reorders the Persian sentence around it. ZWNJ is mandatory in compounds: `زخم‌بان`، `پیش‌نویس`، `پانسمان‌های نوین`.

Typography consequences: line height never below 1.5 (1.68 for body) because Persian ascenders and diacritics collide; no letter-spacing, which breaks glyph joins; no ALL CAPS or italics; truncation only at a word boundary with a full accessible name retained. Logical properties and direction-safe spacing remain mandatory — not as preparation for an LTR mirror, but because they are the technically correct way to build RTL. Hardcoded `left`/`right` assumptions are a defect even though only one direction ships.

---

## 6 · Accessibility Guidelines

Target: WCAG 2.2 AA. Accessibility is a component contract, not an application concern — a component that cannot be operated by keyboard and screen reader is not done.

| Area | Requirement |
| --- | --- |
| **Contrast** | 4.5:1 for text, 3:1 for 19px+ headings and for control boundaries. Status text uses the `-fg` token on its `-bg`, never the base tone. Full-opacity ink only — no alpha or `color-mix` on type. `--text-muted` is permitted at 12px captions on white only; it is not a body colour. |
| **Non-colour signalling** | Every state carries a word or glyph as well as a tone: a badge's label, a banner's title, a progress bar's value, a chip's pressed state. No state is distinguishable by colour alone. |
| **Targets** | 44×44px minimum for anything tappable, including icon-only actions, chips, clear buttons and thumbnail removals. Spacing may not be used to justify a smaller target. |
| **Keyboard** | Full operation without a pointer. Tab follows visual order; chip and segmented groups use arrow keys with a single tab stop; dialogs and sheets trap focus, close on Escape, restore focus to their opener; the docked action is reachable without traversing the whole form. |
| **Focus** | A 3px `rgba(3,131,206,.28)` ring on every focusable element, green ring on green fills, visible against white and every tinted surface. Never removed, never replaced by a colour change alone. |
| **Semantics** | Real elements first: `button`, `a`, `label`, `dl`, `ol`, `nav`, `main`. ARIA only where no element exists. One H1 per screen and no skipped heading levels. Icon-only controls require an explicit label prop. |
| **Announcements** | Errors `role="alert"`; success and progress `role="status"`; loading regions `aria-busy` with one message, not one per skeleton; a blocking condition receives focus. Countdowns are not live regions — they would announce continuously; the app announces the threshold crossings only. |
| **Motion & zoom** | `prefers-reduced-motion: reduce` suppresses shimmer, slide and fade, leaving end states. Layouts survive 200% text zoom without clipping — no fixed heights on text containers. |

**Exception register.** ScaleSelect's 0–10 cells are 36px tall, below the 44px minimum, because eleven targets must fit a 390px row. Accepted only with arrow-key operation and full per-cell labels. **UNKNOWN / NEED DESIGN DECISION —** whether to replace it with a Select at large text sizes.

---

## 7 · @zakhmban/ui Architecture

### Package location

**@zakhmban/ui is its own repository — `zakhmban-ui` — maintained independently of the Therapist App and of every other consuming application.**

It is repository **#3 of the 8** named in Frozen Technical Architecture v1.1 §2. It is not a directory inside a consuming application, and no consuming application contains a `packages/` directory on its behalf. The Therapist repository remains an **independent single-application repository** with no workspace, no internal packages, and no local substitute for this one.

Independent maintenance is the point, not a side effect: the package is consumed by the Therapist App, the Patient App, the Admin panel and the Website (the latter two take tokens and formatting only, per frozen §2.1). It cannot live inside any one of them.

### Package structure

```
zakhmban-ui/                    separate repository
  dist/                         COMMITTED — frozen §2.2; no prepare step
  package.json                  name: @zakhmban/ui; semver tags
  src/
    tokens/      colors, typography, spacing,
                 elevation, motion, fonts, base
                 (+ generated tokens.ts,
                    + generated tailwind preset)
    styles/      reset, global, keyframes
    primitives/  Button, TextField, Select,
                 OtpInput, BottomSheet
                 ── exactly five (frozen §2) ──
    icons/       registry + mirroring flags
    format/      money, jalali, digits,
                 duration, phone masking
    validation/  phone normalisation,
                 national-ID checksum
    index.ts     the only public entry
```

**What is no longer in this tree, and where it went.** `components/`, `patterns/` (Screen, FormStep, ListState) and the layout primitives (Box, Stack, Text, Illustration, VisuallyHidden, Portal, FocusTrap) are **not** package payload under frozen §2. They are specified in §3 and built in the consuming application — see §7.1 and §9. The `utils/rtl` and `utils/a11y` helpers are likewise application-side unless a named primitive requires them internally.

**Styling approach.** CSS custom properties plus static CSS shipped with the package — no runtime CSS-in-JS, no theme provider required for the default theme. Components expose no style props beyond token-constrained ones; escape hatches are `className` and `style`, and their use in app code is a review signal.

**Tailwind, precisely (v0.2).** v0.1 said "no Tailwind dependency"; frozen §2 says the package contains *"design tokens (CSS variables + Tailwind preset)"*. These are not in conflict once two different things are separated, and **both statements survive**:

| | Status |
| --- | --- |
| Tailwind as a **runtime or peer dependency** of the package | **No.** v0.1's refusal stands. The package's own components are styled with static CSS and custom properties, and never require a consumer to run Tailwind. |
| Tailwind **preset as an exported artifact** | **Yes — required by frozen §2.** A plain JavaScript object mapping the same semantic tokens onto Tailwind theme keys, generated from the token CSS so the two cannot drift, exported at `@zakhmban/ui/tokens/tailwind-preset`. A consumer that uses Tailwind imports it; a consumer that does not ignores it and loses nothing. |

The preset is **not removed** and must not be removed without an explicit architecture decision. See §5 for the token → CSS variable → preset relationship, and §9 unknown 9 for its unverified status in the Therapist App.

**Exports.** One public entry (`@zakhmban/ui`) with named exports only, plus three deep entries that are part of the contract: `/tokens`, `/styles`, `/utils/format`. No default export, no deep imports into `components/*` — path stability inside the package is not guaranteed. Every component ships its own types; `tokens.ts` is generated from the CSS so the two cannot drift.

**Dependency policy.** Zero runtime dependencies as the default. React and react-dom are peers. The icon set is the one exception: Lucide is the initial implementation behind the permanent Icon abstraction, isolated in the registry so a later swap touches one file and no application code. Applications write `<Icon name="calendar" />`, never `import Calendar from "lucide-react"`. No map library, under any circumstances. No date library — Jalali formatting is a small internal utility. No animation, styling or component library.

**Versioning.** Semver. Breaking: removing or renaming a semantic token, a component, or a prop; changing default variants; altering geometry tokens. Additive: new components, new variants, new non-required props.

### 7.1 Boundary with the Therapist App

Two boundaries operate here and must not be confused.

- **The ownership boundary (v0.2, frozen §2)** decides *which repository ships a component.* Five primitives ship from the package; thirty-one are built in the application. It is an architectural question.
- **The product/UI boundary (unchanged since v0.1)** decides *what a UI component is allowed to know.* It applies identically in both repositories: an application-owned `StatusBadge` is no more permitted to know what «عقب‌افتاده» means than a package-owned one would be. It is a design-discipline question, and §3.7's admission rule is its test.

Re-tiering moved components across the first boundary. **It moved nothing across the second.** The table below is the second boundary and is unchanged in substance.

| Belongs in the UI layer | Stays in the Therapist App as product |
| --- | --- |
| Tokens, the five primitives, the icon registry and its mirroring flags, formatting and validation utilities — all shipped by the package. Plus the thirty-one application-owned components of §3, which are UI-layer code living in the app repository: the Screen shell, dialog and focus mechanics, layout primitives | All Persian product copy, all clinical vocabulary (wound types, staging, tissue, dressings), the field sets of the registration and session forms |
| The four status *tones* and how each renders | Which product status maps to which tone, and its label — «عقب‌افتاده» → danger is a product decision |
| A BottomNav that renders exactly four items with one badge | The four destinations, their icons, their routes, and the badge count |
| ProgressIndicator, Stepper, Timeline, Modal, ErrorBanner as neutral mechanisms | The 48-hour rule, the 24-hour confirmation window, the access fee, the masking rule, level scoring, feed blocking — every invariant |
| Money's formatting and tones — digits, separator, currency suffix, credit/debit colour | Fee amounts, refundability wording, wallet rules, balance calculation, gateway reconciliation, and the wallet and ledger views themselves |
| Nothing named for a business entity — no WalletBalance, no LedgerRow, no appointment or patient component | The wallet balance hero and the ledger row, composed from Card, DataRows, Money, StatusBadge and Button |
| The Card variants a masked request card is built from | The masked request card, the approximate-area tile, the record status strip — all three compositions |
| Nothing map-related. **Maps are intentionally excluded from @zakhmban/ui.** | Every map surface, provider binding, tile style and location rendering — in the Therapist App and the Patient App alike |

The test, applied to every proposed addition: *could a surface with no notion of wounds, proposals or fees use this?* If not, it is a pattern for the app, documented in the app, however often it repeats. A second test guards the other direction: if the app restyles a component with `className`, either the component is missing a variant or the app is out of spec — resolve it, don't accumulate it.


### 7.2 Implementation Architecture Decisions

**Superseded and reissued in v0.2.** The v0.1 table recorded seven decisions, three of which contradicted Frozen Technical Architecture v1.1 §2. Those three are withdrawn and reissued below; the other four were never in conflict and stand unchanged. None of this changes a component or a visual decision.

| Area | Decision (v0.2) | Status |
| --- | --- | --- |
| **Package location** | @zakhmban/ui is a **separate repository, `zakhmban-ui`** — repository #3 of the 8 in frozen §2 — maintained independently of the applications that consume it. No consuming repository contains `packages/ui/`. | **Reissued.** v0.1 placed it at `packages/ui/`. |
| **Repository structure** | `zakhmban-therapists` remains an **independent single-application repository**: no internal packages, no `packages/` directory, no `apps/*` restructuring. A multi-app restructuring is not deferred — under a prohibited-monorepo architecture it is **not on the table at all**; each application is already its own repository. | **Reissued.** v0.1 described a single repository with internal packages. |
| **Workspace** | **No pnpm workspace.** No `pnpm-workspace.yaml` in any consuming repository. The package is an external dependency, not a workspace member. | **Reissued.** v0.1 introduced one. |
| **Boundary rule** | The prohibition on `pnpm-workspace.yaml` in consuming repositories **stands unconditionally**. v0.1's clause — that the prohibition "was correct only while the repository had no internal packages" — is **withdrawn**: the prohibition derives from the monorepo ban in frozen §2 and does not lapse when a package is planned. It is enforced mechanically in `zakhmban-therapists` by the P3 structural checks. | **Withdrawn and reversed.** |
| **Import strategy** | Consumers import from the root: `import { Button } from "@zakhmban/ui"`. Internal paths are never part of the contract — see the export rules in §7. | Unchanged. |
| **Styling architecture** | CSS variables plus static CSS, owned by the UI package. Not CSS-in-JS, not styled-components. Tailwind is not a package dependency; the **Tailwind preset is an exported artifact** required by frozen §2 — see §7 and §5. | Unchanged, with the Tailwind distinction made explicit. |
| **Dependency policy** | Zero runtime dependencies preferred. React and react-dom are peer dependencies. No implementation library is forced on a consuming application. | Unchanged. |

### 7.3 Consumption model

The package is consumed as an **external dependency pinned to an exact git tag**, exactly as Frozen Technical Architecture v1.1 §2.2 specifies for both shared packages.

```jsonc
// package.json of a consuming application
"dependencies": {
  "@zakhmban/ui": "github:<owner>/zakhmban-ui#v0.1.0"
}
```

| Requirement | Rule |
| --- | --- |
| **Exact version tags** | An exact tag, never a semver range, never `workspace:`, never `file:` or `link:`. `pnpm --frozen-lockfile` pins the resolved commit SHA. |
| **Committed `dist/`** | The built output is committed to the package repository. Consumers install a ready artifact. |
| **No `prepare` step** | Nothing builds during a consumer's install. This is why `dist/` is committed, and the two rules are a pair — neither works without the other. |
| **Private access** | CI authenticates with a fine-grained token (contents: read) via `git config url."https://x-access-token:${TOKEN}@github.com/".insteadOf`. Without it CI cannot install the package at all. See §9 unknown 10. |
| **Bump cadence** | Version bumps are ordinary pull requests in each consumer. Nothing forces co-release across applications. |
| **Local development** | Iterating on the package while developing an application is a package-repository workflow, not a workspace link. Any temporary local override is a developer-machine concern and is **never committed** — a committed override would reintroduce exactly the coupling the multi-repository architecture exists to prevent. |

**Directional rule.** The dependency points one way: applications depend on `@zakhmban/ui`; the package depends on no application and knows none of them by name. There is no circumstance in which the package imports from a consumer, and no build order in which a consumer must exist first.

---

## 8 · Implementation Roadmap

> **Two repositories, one sequence (v0.2).** The phases below were written when the package shipped thirty-six components. Under frozen §2 the package ships **five primitives plus the foundations**, so phases 2–5 now span two repositories: the package contributes tokens, styles, icons, formatters, validation and the five primitives, and the consuming application builds the rest from them in the same phase. The exit criteria are unchanged — a screen is still "rebuilt from the package" in the sense that it carries **no app-level CSS and no hardcoded token values**, whichever repository holds the component. Phase 0's reconciliation against the technical architecture is what produced this revision.
>
> Package-repository phases: **1** (foundation) and the primitive slices of **3** (TextField, Select, OtpInput) and **4** (BottomSheet), plus Button in **2**. Everything else in phases 2–5 is application work against a published tag. Phases **6** and **7** are package-repository work.

| Phase | Scope | Exit criterion |
| --- | --- | --- |
| **0 · Freeze** | Reconcile this specification against the technical architecture document and the real Therapist screens. Resolve every UNKNOWN or accept it as deferred. | Signed-off token table and component list; no open naming questions |
| **1 · Foundation** | Tokens (CSS + generated TS), reset and global styles, keyframes, format and RTL utilities, icon registry with mirroring flags, primitives. | A blank Screen renders correct type, direction and spacing with no app CSS |
| **2 · Core set** | Button, Card, DataRows, StatusBadge, Chip, Money, Avatar, ListRow, TopAppBar, IconButton, BottomNav, Screen. | Feed, cases list and profile rebuilt from the package with zero app-level CSS |
| **3 · Forms** | TextField, Select, OtpInput, SearchInput, ImageUploader, ScaleSelect, Stepper, SegmentedControl, FormStep pattern. | Registration (4 steps) and the session record (5 steps) rebuilt; keyboard-only completion passes |
| **4 · Feedback** | InfoBanner, ErrorBanner, EmptyState, Skeleton, BottomSheet, Modal, ProgressIndicator, ListState pattern. | All five list states and all six payment states render from the package; dialog focus behaviour verified |
| **5 · Data** | Timeline, Rating, Illustration coverage audit. The wallet balance hero and ledger rows are built *in the Therapist App* from Card, DataRows, Money, StatusBadge and Button — they are application-level implementations, not package components. | Wallet, case detail and level screens complete; every component the app holds locally is a business composition, not a restyled primitive |
| **6 · Harden** | Accessibility audit against §6, 200% zoom pass, reduced-motion pass, contrast lint, visual regression baseline, usage documentation per component. | v1.0.0 published; the exception register is the only open list |
| **7 · Icon swap** | Replace the Lucide implementation with the real Zakhmban glyph set behind the unchanged Icon abstraction, wholesale. No application code changes — that is the point of the abstraction. | No third-party icon dependency; the package has zero runtime dependencies |

---

## 9 · Confirmed Component Scope

The confirmed core scope is **thirty-six components** — unchanged in v0.2. What v0.2 adds is **which repository ships each one**. Every component below is specified in §3 and binding wherever it is implemented; none has been removed from the product.

### Tier 1 — shipped by `zakhmban-ui`

Frozen Technical Architecture v1.1 §2 fixes this list. **It is closed.**

**Foundations shipped by the package** — design tokens · CSS variables · static styles · the Icon abstraction and its registry · formatters (Jalali dates, Persian numerals, Toman, duration, phone display masking) · validation helpers (phone normalisation, national-ID checksum)

**The five primitives** — **Button** · **TextField** · **Select** · **OtpInput** · **BottomSheet**

> **A sixth primitive requires explicit architectural approval** — an ADR in the `zakhmban-ui` repository, per frozen §2.1. Wanting one is not approval, and neither is convenience: the freeze is the mechanism that stops a shared package accreting an application's component list. The correct first move when a sixth seems necessary is to build it in the application under Tier 2 and see whether a second application ever needs it.

### Tier 2 — application-owned

Thirty-one components, built in the consuming application from Tier 1 primitives and tokens. They are **UI-layer code** and remain bound by every rule in §3, §5 and §6 — re-tiering changed their address, not their standard.

**Foundations** — Text · Box · Stack · Screen · *Illustration*

**Inputs** — **Checkbox** · **Switch** · Chip · ImageUploader · *SearchInput · ScaleSelect*

**Navigation** — TopAppBar · BottomNav · Stepper · *IconButton · SegmentedControl · ListRow*

**Feedback** — ErrorBanner · Modal · Skeleton · *InfoBanner · EmptyState · ProgressIndicator*

**Data display** — Card · DataRows · StatusBadge · Money · Timeline · *Avatar · Rating*

Why these are Tier 2 and not candidates for the package: they are **presentation patterns and product-level compositions**. Frozen §2.1 assigns the package "five primitives" and nothing more, and frozen §2.2 makes every package change a tagged release consumed by pull request in four applications — a cost that a Card variant does not justify and a Button does.

**Note on Modal and BottomSheet.** BottomSheet is Tier 1 and Modal is Tier 2, which looks arbitrary and is not: the frozen five name BottomSheet. Both still owe the identical dialog, focus-trap and escape-handling duties of §3.4 and §6. The application's Modal is expected to reuse the package's focus mechanics rather than re-implement them.

**Explicitly excluded from both tiers** — Maps · location providers · product-specific business widgets · **wallet and ledger components** (WalletBalance, LedgerRow — composed in the app from Card, DataRows, Money, StatusBadge and Button) · business workflows · healthcare domain logic · backend and API concepts · dark mode · LTR direction

Components set in *italics* are specified in §3 and are in active use on real Therapist screens, but were not named in the confirmed scope list. They are retained rather than silently dropped — see open decision 3. Their tier is not in question: none of them is one of the frozen five, so all are Tier 2 regardless of how decision 3 resolves.

### Remaining unknown decisions

1. **Jalali date picker** — session `occurredAt` is a typed field; no picker has been designed.
2. **ScaleSelect target size** — 36px cells are an accepted a11y exception, or they need a Select fallback at large text sizes.
3. **Italicised components above** — confirm that Illustration, SearchInput, ScaleSelect, IconButton, SegmentedControl, ListRow, InfoBanner, EmptyState, ProgressIndicator, Avatar and Rating stay in scope. They are used by shipped screens; removing any of them moves work into the app.
4. **Real UI icon set** — the Zakhmban glyph set that replaces Lucide behind the abstraction does not exist yet.
5. **Product constants** — access fee, confirmation window, deadline length, level thresholds and code formats are app-side and unverified against the architecture document.
6. **Patient App fit** — this specification was extracted from the Therapist App only. Whether the same thirty-six components cover the Patient App is unverified.
7. ~~**Trigger for an `apps/*` restructuring**~~ — **closed in v0.2, not deferred.** Frozen §2 prohibits a monorepo and assigns each application its own repository. The Patient App will never enter the Therapist repository, so the trigger cannot occur and there is nothing to revisit.
8. **Package distribution cadence** — *partially closed in v0.2.* The **mechanism** is settled by frozen §2.2: a private repository consumed by exact git tag with a committed `dist/`, not a registry and not a workspace package. What remains open is the **release cadence** — how often tags are cut and whether a consumer bump is expected within a fixed window.
9. **Tailwind preset in the Therapist App** — the preset is required of the *package* by frozen §2 and is retained (§7). Whether the Therapist App *consumes* it is unverified: Tailwind is **not currently installed** in `zakhmban-therapists` and no `tailwind.config.*` exists there, although Technical Architecture §1.1 and Phase 0 deliverable 4 both specify Tailwind 4 wired to this preset. The package ships the preset either way. **Do not resolve this by deleting the preset** — that needs an explicit architecture decision, not an inference from one consumer's current state.
10. **CI access to a private package repository** — frozen §2.2 requires a fine-grained token (contents: read) and an `insteadOf` git config in every consumer's CI. State **UNKNOWN**; infra-owned. Until it exists, no consumer's CI can install `@zakhmban/ui` at all, which makes it a hard prerequisite for Tier 1 consumption rather than a detail.
11. **GitHub owner spelling** — the canonical documents spell the owner `20Bryan01`; the frozen architecture and the Therapist repository's own verified remote both spell it `20Brayan01`. Frozen §2.1 warns that a wrong owner is *"a silent `pnpm install` failure, not a caught error."* Must be confirmed **before any tag is pinned**.
12. **Ownership of the layout primitives** — Box, Stack, Text, Screen, VisuallyHidden, Portal and FocusTrap are placed in Tier 2 by v0.2 because frozen §2's package contents do not name them. They are arguably foundations rather than components, and an argument exists for Tier 1. **Recorded as an open question rather than assumed either way**; resolving it toward Tier 1 would require the same ADR as any sixth primitive.
