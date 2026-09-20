# Token Table — Ratification Worksheet

**Status — two distinct things, deliberately separated:**

- **Token Foundation V1 baseline: SCOPED OWNER SIGN-OFF — APPROVED**,
  2026-09-18.
- **Complete future Token Table: OPEN FOR DEFERRED AND FUTURE-STAGE MATTERS**,
  awaiting a human design/product owner on every entry still marked open,
  partial or deferred.

**Issued:** 2026-09-15, under
[Token Design Authority Ruling — Decision 17](token-design-authority-ruling.md)
(APPROVED — RULING B)
**Last decision recorded:** 2026-09-18 — **Scoped Token Foundation V1 Owner
Sign-off: APPROVED.** It freezes the V1 value and semantic baseline and
authorizes ADR 0003 to define its representation. **It does not authorize
implementation**, and **it does not sign off the Token Table as a whole**
**Last representation decision recorded:** 2026-09-18 — **ADR 0003, Token
Representation and Artifact Contract: ACCEPTED.** It defines the
representation of the signed-off V1 values and **changes no value**
**Repository state at issue:** `main` @
`c1cad42823a90a5d95c68ab24d1466001d9946f9`

This worksheet is the live half of the ruling. The ruling record is immutable
history; this file is ticked through and amended as decisions land.

**Reading note, added 2026-09-18 — ADR 0003 now exists.** Many entries below
were written while ADR 0003 was still a reserved number, and say so. **Those
sentences are preserved as the position at their own date and are not
rewritten.** The standing position is that **ADR 0003 — Token Representation
and Artifact Contract — was accepted on 2026-09-18**
([`../adr/0003-token-representation-and-artifact-contract.md`](../adr/0003-token-representation-and-artifact-contract.md)).
Every *"reserved for ADR 0003"* assignment below remains correct: ADR 0003 is
where those questions were answered. It **changed no design value**, so no
approved entry on this sheet is altered by it.

**Authority of this file, recorded 2026-09-18.** This is the **canonical
decision register** for Token Foundation: the place where individually
approved token decisions, approved owner rulings, amendments, deferred
decisions and unresolved decisions are written down. **It is not an
independent authority above the rulings and specifications it records.**
**The binding rule, corrected 2026-09-18.** Entries explicitly marked
approved or ratified are binding **only to the extent that they have not been
explicitly superseded**. **When an approved entry is superseded, the later
approved ruling governs**, and **the historical entry remains part of the
decision record** rather than being rewritten or removed. **Open, deferred and
proposed entries are not implementation authority.**

**The Token Foundation V1 baseline carries a scoped owner sign-off, recorded
2026-09-18** and set out in full in the sign-off section below. **The Token
Table as a whole is NOT signed off** — it stays open for every deferred and
future-stage matter. The single precedence statement — authority levels, the
supersessions of record and the global supersession rule — is
[`canonical-document-registry.md`](canonical-document-registry.md).

## Ratification state at a glance

| #      | Decision                                  | State                    |
| ------ | ----------------------------------------- | ------------------------ |
| **1**  | Raw palette layer                         | **APPROVED** — 2026-09-15 |
| **1·A1** | Amendment 1 — three interaction raw entries | **APPROVED** — 2026-09-15 |
| **1·A2** | Amendment 2 — two action-press raw entries | **APPROVED** — 2026-09-18 |
| **2**  | Semantic status colours                   | **APPROVED** — 2026-09-15 |
| **3a** | Interaction hover / press                 | **APPROVED** — 2026-09-15 · **IDENTIFIERS SUPERSEDED** — 2026-09-18 |
| **3b** | Focus indicator                           | **AMENDED AND APPROVED** — 2026-09-15 |
| **4a** | Elevation — nav / sheet / modal           | **APPROVED** — 2026-09-17 |
| **4b** | Elevation — `xs` / `sm` / `md`            | **DEFERRED** — 2026-09-17 |
| **5**  | Small-control radius                      | **APPROVED** — 2026-09-17 |
| **6a** | Sheet radius — BottomSheet                | **APPROVED** — 2026-09-17 |
| **6b** | Sheet radius — Modal                      | **DEFERRED** — 2026-09-17 |
| **7**  | Body weight                               | **APPROVED** — 2026-09-17 |
| **8**  | Caption weight                            | **APPROVED WITH EXPLICIT ROLE SCOPE** — 2026-09-17 |
| **9**  | Checkbox radius                           | **APPROVED** — 2026-09-17 |
| **10** | Chip height vs tap target                 | **APPROVED** — 2026-09-17 |
| **11** | ScaleSelect large-text behaviour          | **PARTIALLY APPROVED — FINAL BEHAVIOUR DEFERRED — PROTOTYPE REQUIRED** — 2026-09-17 |
| **12** | On-brand text colour                      | **APPROVED (12a · 12b · 12c)** — 2026-09-18 |
| **13** | Link colour / behaviour                   | **APPROVED** — 2026-09-18 |
| **14** | Page background vs surface                | **APPROVED** — 2026-09-18 |
| **15** | Stacking / z-index                        | **APPROVED** — 2026-09-18 |
| **16a** | Desktop / web — closure and ownership clauses | **APPROVED** — 2026-09-18 |
| **16b** | Desktop / web — positive token contract   | **DEFERRED** — 2026-09-18 |

**Decision 3 was split on 2026-09-15** into **3a — Interaction hover/press**
and **3b — Focus indicator**, on evidence that the two halves were ready at
different times. Both have since been approved, so Decision 3 is closed as a
whole. **Decision 1 Amendment 1** extends the approved Raw Palette from 25 to
28 entries; Decision 1 itself is otherwise unchanged.

**Decision 4 was split on 2026-09-17** into **4a — the three reserved-surface
shadows**, which are approved, and **4b — the three general tiers**, which are
deferred with their candidate values retained as evidence only. Decision 4 is
therefore **partially approved and not closed**: `--shadow-xs`, `--shadow-sm`
and `--shadow-md` are **not** approved public tokens and do **not** appear in
the approved Token Table. `--shadow-none` is **deferred to ADR 0003**.

**Decision 5 was approved on 2026-09-17** as a **band resolution**: the
canonical 10–12px small-control band resolves to **one** value, **12px**. No
second step at 10px is approved. The same ruling resolves the §2.3-internal
Button-sm conflict in favour of the explicit *"14 input and button"* rule. It
is **not** a definition or closure of the complete radius family.

**Decision 6 was split on 2026-09-17** into **6a — BottomSheet geometry**,
approved at **24px on the two block-start corners only**, and **6b — Modal
geometry**, which is **deferred**. Decision 6 is therefore **partially approved
and not closed**. **20px is not approved**: it remains an evidentiary Modal
candidate and does **not** appear in the approved Token Table.

**Decision 7 was approved on 2026-09-17** as a resolution of the **Body weight
cell only**: the canonical 400–500 Body band resolves to **400**. Body remains
one closed role at 15px / 1.68; no body-large, body-small, body-medium or
body-emphasis role is created, and Ruling B's rejection of the kit's additional
Body steps is unchanged. It is **not** a definition or closure of the complete
typography family.

**Decision 8 was approved on 2026-09-17 with explicit role scope**: the
canonical 400–500 Caption band resolves to **400**, covering **only** the four
uses canonical documentation names — hint, timestamp, privacy note, and the
§4.4 non-refundability sentence rendered in caption ink. **Typography role
assignment remains open** for error text, banner explanatory prose and ListRow
metadata; a shared font size does not create Caption membership.

**Decision 9 was approved on 2026-09-17** as **component-specific Checkbox
geometry**: the visible Checkbox box radius is **6px**. It is **not** approved
as a general radius-family step, a reusable public radius token, a numeric
radius-ladder entry, a replacement for Decisions 5 or 6a, or a closure of the
radius family. **The visible Checkbox square dimension remains open** — §3.2
never states one — and radius and target size are independent: the complete
interactive target is the **labelled** control and must meet the canonical
44px minimum, which the 6px radius neither provides nor affects.

**Decision 10 was approved on 2026-09-17**: the visible interactive Chip has a
**minimum height of 44px**, expressed as **minimum-height behaviour, not a
fixed height**. The visible Chip and its interactive target **coincide**; no
invisible expanded-target model is created. Canonical Chip is **always
interactive**; presentational state markers remain **StatusBadge**, and no
presentational or removable Chip variant is approved. **The Button size sm
40px-versus-44px conflict remains open** and is untouched by this ruling.

**Decision 11 was partially approved on 2026-09-17 — final behaviour
deferred, prototype required.** The partial ruling establishes **definitions
and boundaries only**: what *"200% text zoom"* means for the ScaleSelect
contract, that the **36px cell exception is limited to the default-text
presentation** and does not automatically extend to 200% enlargement, and that
at 200% the **no-clipping and no-fixed-height requirement governs**. **The
final ScaleSelect large-text layout is NOT approved.** The Select fallback is
the only remedy the canonical specification contemplates and is therefore the
first candidate a future prototype should evaluate — **it is not approved, and
its trigger is not defined**. **An operable prototype is required before the
final behavioural ruling.** Decision 11 is **not** fully approved and **not**
closed.

**Decision 1 Amendment 2 was approved on 2026-09-18**, additively: two entries
— **`--blue-700` `#045398`** and **`--red-700` `#B90304`** — taking the Raw
Palette from **28 to 30**. **No existing entry is changed, renamed or
removed.** Same additive mechanism as Amendment 1.

**Decision 12 was approved on 2026-09-18** as an **accessible action-fill and
on-brand foreground contract**, in three parts. **12a** supplies `#FFFFFF` as
the value of §3.1's **already-existing** on-brand Text role and approves three
**semantic action-fill ladders** — green `#347F1B → #0C7912 → #026E1E`, blue
`#0273B6 → #0062AC → #045398`, red `#D51013 → #C80303 → #B90304` — every rung
clearing 4.5:1 with one white foreground and **no inversion**. **12b** approves
`#FFFFFF` as the on-brand **Icon/glyph** foreground, as an additive amendment
to §3.1's Icon colour contract, kept **separate** from the Text contract.
**12c** rules that **outline and text Button labels use the action-rest value**
of their tone. **The Raw Brand Identity colours `#3C9220`, `#0383CE` and
`#EC1417` are unchanged, and are not approved as backgrounds for normal
on-brand Text.** Decision 2 status mappings are unchanged.

**Decision 3a was amended on 2026-09-18, additively and in scope only.** Its
six approved hover and press values are **not invalidated and not changed**;
Decision 12 distinguishes Raw Brand Identity from Semantic Action Fill, adds an
explicit action-**rest** rung, and shifts those approved values into the
accessible ladders above. Hover darkens, press darkens further, `scale(0.98)`
and 120ms are **all preserved unchanged**.

**Decision 13 was approved on 2026-09-18** as an **accessible inline text link
contract**: rest **`#016FBB` with a persistent underline**, hover **`#0062AC`**,
press **`#01356F`**, focus-visible by **Decision 3b unchanged**, scoped to
**inline text links only**, with the **visited state deferred**. Only §2.1's
*"links"* clause is reassigned away from `--brand-blue`; every other brand-blue
role stands. **`#01356F` is the link-press value and is not the blue
action-press value; `#045398` is the blue action-press value and is not the
link-press value.**

**Decision 14 was approved on 2026-09-18**: **Page Background and Surface/Card
are distinct semantic roles**, both valued **`#FFFFFF`** in the light theme and
both mapping to the approved Raw Palette **`--white #FFFFFF`**. They remain
**distinct roles while sharing one value**. **No Raw Palette value is added and
no visual colour change is introduced.** `--surface-subtle #F7F9F5` is
**reaffirmed as never a full-page canvas**. Card separation remains **border,
radius and space — not elevation**, preserving Decision 4. **Non-Card component
bindings for the Surface role are not approved by this ruling.** Final role
names and representation **remain reserved for ADR 0003**.

**Decision 15 was approved on 2026-09-18** as a **minimal global stacking
scale** of exactly three tokenised roles — **Application Chrome 10**, **Scrim
20**, **Dialog Surface 30** — ordered **ordinary content < Application Chrome
< Scrim < Dialog Surface**. **Ordinary content receives no stacking token** and
remains normal document flow at `z-index: auto`. The **Scrim covers all
Application Chrome**; **BottomSheet and Modal share one Dialog Surface layer**.
**No Dropdown, Menu, Popover, Tooltip or Toast role is approved**, and **local
component z-index values remain untokenised**. A **stacking-context
architectural constraint** is approved without approving any implementation
technique. **Decision 4 is preserved and no elevation surface is added.** Final
names and representation **remain reserved for ADR 0003**.

**Decision 16 was split on 2026-09-18** into **16a — the closure and ownership
clauses**, which are **approved**, and **16b — the positive desktop/web token
contract**, which is **deferred pending architecture and consumer evidence**.
**16a approves no value.** It fixes **390px as a reference design viewport
only**, holds the **spacing scale closed** and the **typography scale closed**,
confirms that page templates, grids, column counts, navigation information
architecture, sidebar widths, device-frame widths, marketing hero composition,
application tables and application-specific layout transitions are
**application-owned**, and adds **no shared desktop navigation component, no
shared desktop sidebar component, no BottomSheet-to-Modal transformation and
no responsive behaviour to any Tier 1 primitive**. **No breakpoint, container
width, container role or responsive-gutter token is approved.** Decision 16 is
therefore **partially approved and not closed**.

**The Owner Contrast Ruling was recorded on 2026-09-18**, closing **both**
canonical contrast defects. It is **not** a numbered Token Table decision and
**not** Decision 17. The binding priority is that **WCAG-readable text takes
precedence over preserving a visually distinct third de-emphasis ink tier**.
Two consequences follow. **`--neutral-status-fg` is remapped from `#8A9384`
(`--neutral-500`) to `#667085` (`--neutral-600`)**, measuring **4.6961:1** on
the unchanged `--neutral-status-bg #F7F9F5` — **PASS** at 4.5:1 for normal
text. **`--text-muted` is retired as a semantic text token before
implementation**; readable de-emphasis uses **`--text-secondary` `#667085`**.
**No raw palette entry is added and no public semantic token is added.**
`--neutral-500 #8A9384` **remains an approved Raw Palette entry** and is
neither deleted nor invalidated. The full ruling is recorded in the
resolved-defects section below.

**The Incidental Accessibility Findings Ruling was recorded on 2026-09-18**,
disposing of all four findings the contrast ruling had left open. It is **not**
a numbered Token Table decision. **No token value is changed, and no token is
added or removed.** Its binding clause is an **interpretation**: §6's *"3:1 …
for control boundaries"* applies to **visual boundary information required to
identify a user-interface component or its state**, in alignment with WCAG
1.4.11 — it does **not** require every decorative, reinforcing or
supplementary outline to reach 3:1 independently when other visible, compliant
information already identifies the control. On that reading the
**`--border-strong` Token Table blocker is CLOSED by authoritative scope
clarification, with the token unchanged at `#A0A79C` (`--neutral-400`)**. The
banner **dismiss control is not canonical today** and is deferred to the Tier 2
component contract; the **StatusBadge fill is a non-blocking visual-QA
concern**; **direct Raw Palette references remain prohibited**; and the
**banner accent glyph colour remains an open component-stage gap**. **No
full accessibility-conformance claim is made.**

**The Owner Interaction Ladder Mapping Ruling was recorded on 2026-09-18.** It
is **not** a numbered Token Table decision. It resolves the one rung-to-name
ambiguity left where **Decision 3a**'s six interaction identifiers met
**Decision 12a**'s three-rung action ladders: 3a's *hover* value had become
the ladder's **rest** value, 3a's *press* value had become the ladder's
**hover** value, and the ladder's **press** rung had no identifier at all.
**Nine state-aligned identifiers are approved** — `--action-<tone>-rest`,
`-hover` and `-press` for green, blue and red — and **the six Decision 3a
identifiers are retired**. **No value changes**, **no raw palette entry
changes**, and **no contrast result changes**. The full ruling is recorded in
its own section below.

Also still open, and **not** closed by any decision above:

- **the canonical colour contract for banner accent glyphs** across the info,
  success, danger and neutral tones — §3.1's Icon contract names navy, green
  and red only, and no banner-accent or neutral icon role exists. Recorded by
  the Incidental Accessibility Findings Ruling as a **Tier 2 component-stage
  gap**; it blocks **InfoBanner and ErrorBanner implementation** and blocks
  nothing else;
- ~~**font design decisions** — family, weight set, variable-vs-fixed intent,
  fallback stack~~ — **CLOSED 2026-09-18** by the Owner Font Contract and
  Delivery Ruling. What remains is **not** a design ambiguity but a set of
  **implementation acceptance gates** — upstream provenance, the SHA-256
  checksum of the adopted binary, `OFL.txt` and copyright-notice presence,
  glyph-coverage verification, CSS URL resolution, offline loading and
  source/dist byte parity — recorded with that ruling and owned by the
  implementation commit;
- **typography role assignment** for **error text**, **banner explanatory
  prose** and **ListRow metadata** — recorded under Decision 8 below. It does
  not block Caption weight for the four canonically named uses, but it does
  block complete typography coverage for the affected components;
- **the visible Checkbox square dimension** — §3.2 states a radius and a fill
  and **no dimension at all**. Recorded under Decision 9 below. It does not
  block the approved radius, but **Checkbox cannot be implemented without it**;
- **the Button size sm height conflict** — §3.2 documents Button sm at 40px
  while §6's 44×44 minimum applies to anything tappable. Recorded under
  Decision 10 below. **Decision 10 is scoped to Chip and does not resolve it**;
- **Chip state coverage** — whether Chip has a hover state, and whether
  "pressed" denotes `aria-pressed` selection or a transient pointer press.
  Recorded under Decision 10 below. Non-blocking for the approved 44px
  minimum;
- ~~the **missing-design-system-document supersession question**~~ —
  **CLOSED 2026-09-18** by the Canonical Documentation Authority and
  Supersession Ruling. **For Token Foundation scope only**, the authority role
  formerly assigned to the absent `ZAKHMBAN-V2-UI-DESIGN-SYSTEM.md` is
  **fulfilled and superseded** by the combined effective set of UI System
  Specification v0.2, explicitly approved owner rulings, individually approved
  Token Table entries, and accepted ADRs for representation and delivery. **No
  claim is made that the missing document ever existed, it is not created, and
  the disposition makes no project-wide supersession claim** outside Token
  Foundation and the documented `zakhmban-ui` UI-layer scope. Recorded in
  [`canonical-document-registry.md`](canonical-document-registry.md);
- **palette ↔ semantic representation details**, which are reserved for
  ADR 0003 and are explicitly **not** settled by Decision 1;
- **the final ScaleSelect large-text behaviour** — whether the row grows,
  wraps, scrolls, transforms or falls back to another control at 200% text
  enlargement. Recorded under Decision 11 below, together with the prototype
  it requires. Decision 11's partial ruling settles definitions and boundaries
  only;
- **the exact non-Card component bindings for the Surface/Card role** — Modal,
  BottomSheet, TopAppBar, BottomNav, the controls, knockout rings and markers.
  Recorded under Decision 14 below; their current kit bindings are
  **evidentiary only**, and this does **not** block Decision 14 itself;
- **dark mode**, which remains explicitly deferred and is **not** reopened by
  Decision 14 or Decision 15;
- **docked action versus BottomNav coexistence** — a Screen/layout question,
  not a stacking one. Recorded under Decision 15 below;
- **simultaneous Modal and BottomSheet, nested dialogs, and multiple
  simultaneous blocking overlays** — **none is approved**, and any future
  support requires a separate architecture ruling;
- **whether Select ever gains a custom listbox** — it remains native unless a
  later design decision authorises one, and no stacking capacity is reserved
  for it;
- **the exact overlay-root / Portal technique**, which remains for Styles and
  Primitives;
- **whether each stacking role is public or package-internal**, reserved for
  ADR 0003;
- **the positive desktop/web token contract — Decision 16b** — which V2
  applications require a shared responsive contract, the intended form factor
  of Website and Admin, the exact shared breakpoints and the named layout
  transition each one governs, the shared container roles and their exact
  maximum widths, and the responsive page-gutter mapping. **No value in that
  list is approved**, and Decision 16a does not supply one.

**The Token Table as a whole is NOT signed off.**

## How to read this file

Ruling B classified the V2 design kit as upstream working material and an
evidence source. It is **not** a design authority. Consequently:

- Every value quoted here as a **candidate** is **non-canonical** and carries no
  force until the owner marks it APPROVE or AMEND on this sheet.
- Every value quoted as **canonical** is canonical **because UI System
  Specification v0.2 prints it**, never because the kit agrees with it.
- **Decisions 1 (with Amendments 1 and 2), 2, 3a (as scoped-amended by
  Decision 12), 3b, 4a, 5, 6a, 7, 8, 9, 10, 12, 13, 14, 15 and 16a are
  approved, and Decision 11 is partially approved with its final behaviour
  deferred — all are recorded below**, Decision 8 with explicit role scope.
  **The Owner Contrast Ruling, the Incidental Accessibility Findings Ruling
  and the Owner Font Contract and Delivery Ruling, all of 2026-09-18, are
  approved alongside them**; none is a numbered decision, and each is recorded
  in its own section below.
  Approval is a design-value decision only: **nothing here has been
  implemented.** No token
  file, CSS variable, style, Tailwind artifact, font file, `@font-face`
  declaration or source file exists or was created by these approvals.
- **A geometry or typography approval records a value and the roles or surfaces
  it covers, and nothing else.** Decisions 5, 6a, 7 and 8 establish **no** CSS
  custom-property name, TypeScript name or prop type, Tailwind key, primitive or
  semantic alias, numeric scale name, public export path, runtime export, file
  structure, generated artifact or representation — and, for typography, no font
  family, font format, static-versus-variable delivery mechanic or fallback
  stack. Every naming and representation question remains reserved for
  **ADR 0003**, which is not written. **Font family and font delivery were
  since decided separately** by the Owner Font Contract and Delivery Ruling of
  2026-09-18 — not by Decisions 5, 6a, 7 or 8, none of which is reopened. Kit
  token identifiers appear below as **evidence provenance only**, never as
  approved names.
- **A deferral is not an approval and not a rejection.** Decision 4b's three
  values stay on this sheet as *evidence*, exactly as they were read from the
  kit. They are not public tokens, they are not part of the approved Token
  Table, and quoting them elsewhere as approved would be a misreading of this
  sheet.
- **Decision 3b additionally amends four canonical rules** — it removes *"green
  ring on green fills"*, retires `--focus-ring-green`, replaces `--focus-ring`,
  and replaces the *"3px ring"* wording. Those amendments are recorded in the
  3b block; **UI System Specification v0.2 itself is not edited by this
  worksheet.**
- **Every other decision on this sheet remains unapproved.**

**Provenance shorthand.** `kit:<file>` means
`Therapist Kit Brief Review/_ds/zakhmban-design-system-1b1633e2-90ea-4846-b6c2-bf76bc72aaf2/tokens/<file>`.
Every candidate cites the exact file and token it was read from.

**Contrast figures** are computed with the WCAG 2.x relative-luminance formula,
verified against published reference pairs (`#767676` on white = 4.54,
`#777777` on white = 4.48, black on white = 21.00). UI System Specification v0.2
§6 requires **4.5:1** for text and **3:1** for 19px-plus headings and control
boundaries. Button labels are `--text-button` at 15px / weight 600, which is
**not** WCAG large text, so 4.5:1 applies to them.

---

## Part 1 — Candidate ratifications (7 · 6 approved, 1 partially approved)

Converted from OPEN DESIGN QUESTION to CANDIDATE RATIFICATION by Ruling B.
Decisions **1** (plus **Amendment 1**), **2** and **3** — the last split into
**3a** and **3b** — have since been approved by the human owner, and
**Decision 4** is partially approved as **4a** with **4b** deferred; their
approval blocks are recorded in place below, beneath the evidence they were
decided on.

---

### Decision 1 · Raw palette layer

**Canonical requirement.** v0.2 §2 fixes the two-layer model: *"a palette layer
(`--green-500`) that components never reference, and a semantic layer
(`--success`, `--text-primary`) that is the only public API."* §2.1 fixes the
families: *"Three families — green, blue, red — plus warm green-tinted
neutrals."* The canonical sources contain **one** palette token name, given as
an example, and **zero** palette values.

**Candidate values** — `kit:colors.css`:

| Family   | Candidate entries                                                                                                                        |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Green    | `--green-50 #F0F8E7` · `-400 #68AB11` · `-450 #64A50C` · `-500 #3C9220` · `-600 #0C7912` · `-650 #1B7E17` · `-700 #03651D` · `-750 #026E1E` |
| Blue     | `--blue-50 #EAF5FC` · `-400 #0383CE` · `-500 #016FBB` · `-600 #0062AC` · `-800 #01356F` · `-900 #002A5E`                                    |
| Red      | `--red-50 #FDEBEC` · `-500 #EC1417` · `-600 #C80303`                                                                                       |
| Neutrals | `--white #FFFFFF` · `--neutral-25 #F7F9F5` · `-50 #F1F3EF` · `-100 #EDF0EA` · `-200 #E2E6DD` · `-400 #A0A79C` · `-500 #8A9384` · `-600 #667085` |

**Caveats.**

1. **The kit does not implement the two-layer model it would populate.** Its
   semantic tokens **restate** hexes (`--brand-green:#3C9220`) rather than
   aliasing the palette (`var(--green-500)`). Ratifying these values therefore
   does **not** answer the Part C aliasing question; that remains open
   regardless of the outcome here.
2. **The ramps are irregular.** Green runs 50/400/450/500/600/650/700/750; blue
   skips 700; neutrals run 25/50/100/200/400/500/600. This is a deliberately
   sparse, use-driven palette, not a uniform 50–900 scale. Whether that
   irregularity is acceptable is part of this decision.
3. `--green-500 #3C9220` equals the canonical `--brand-green`, and the
   specification's single palette example is literally `--green-500`. The two
   line up, which is corroboration of provenance and not authority.
4. `--green-600 #0C7912` is *darker* than `--green-500`, but `--blue-600` and
   `--red-600` follow the same direction, so the ramp direction is internally
   consistent.
5. Palette tokens are explicitly **not public API** under §2, so their names are
   not a semver contract — but their **values** propagate to every semantic
   token, so a later change is visually breaking across all four applications
   at once.

**Options.**

- **APPROVE** — adopt the 25 entries as the canonical palette layer, irregular
  ramps included.
- **AMEND** — adopt with changes: regularise the ramp steps, rename the
  families, add or drop entries, or restrict the palette to only those values
  the semantic layer actually consumes.
- **REJECT** — design the palette layer from scratch against the 64 frozen
  values, which it must reproduce exactly.

**Impact if approved.** Gives the token system a root. Every semantic colour
acquires a definition site, ADR 0001's *"the hex exists in exactly one file"*
becomes achievable, and §2's generation order (authored CSS → typed JS →
Tailwind `@theme`) acquires its authored source. Blocks nothing else in
Part 1 — but everything in Part 1 is cheaper to apply once this exists.

`[x] APPROVE   [ ] AMEND   [ ] REJECT`

---

#### DECISION 1 — APPROVED

**Decided by:** human design/product owner · **Date:** 2026-09-15
**Outcome:** the V2 design kit's 25-entry raw colour palette is approved as the
**internal Raw Palette baseline for Zakhmban V2**, preserved exactly as
evidenced above.

##### The 25 approved Raw Palette entries

Recorded here in full so the approved set is readable without consulting the
candidate table. **Values are reproduced unaltered.**

**Green — 8 entries**

| Token         | Value     | Token         | Value     |
| ------------- | --------- | ------------- | --------- |
| `--green-50`  | `#F0F8E7` | `--green-600` | `#0C7912` |
| `--green-400` | `#68AB11` | `--green-650` | `#1B7E17` |
| `--green-450` | `#64A50C` | `--green-700` | `#03651D` |
| `--green-500` | `#3C9220` | `--green-750` | `#026E1E` |

**Blue — 6 entries**

| Token        | Value     | Token        | Value     |
| ------------ | --------- | ------------ | --------- |
| `--blue-50`  | `#EAF5FC` | `--blue-600` | `#0062AC` |
| `--blue-400` | `#0383CE` | `--blue-800` | `#01356F` |
| `--blue-500` | `#016FBB` | `--blue-900` | `#002A5E` |

**Red — 3 entries**

| Token       | Value     |
| ----------- | --------- |
| `--red-50`  | `#FDEBEC` |
| `--red-500` | `#EC1417` |
| `--red-600` | `#C80303` |

**Warm green-tinted neutrals — 8 entries**

| Token           | Value     | Token           | Value     |
| --------------- | --------- | --------------- | --------- |
| `--white`       | `#FFFFFF` | `--neutral-200` | `#E2E6DD` |
| `--neutral-25`  | `#F7F9F5` | `--neutral-400` | `#A0A79C` |
| `--neutral-50`  | `#F1F3EF` | `--neutral-500` | `#8A9384` |
| `--neutral-100` | `#EDF0EA` | `--neutral-600` | `#667085` |

**Total: 25 entries** — 8 green + 6 blue + 3 red + 8 neutral. Three families
plus warm green-tinted neutrals, exactly as v0.2 §2.1 requires.

> **Cross-reference, 2026-09-18 — `--neutral-500 #8A9384`.** The Owner
> Contrast Ruling retired the public semantic text token `--text-muted`, which
> held this value. **`--neutral-500` itself is unchanged, un-renamed and
> remains an approved Raw Palette entry.** Decision 1 is **not** amended,
> reopened or reduced by that ruling. As for every Raw Palette entry,
> constraint 2 above continues to apply: components and consuming applications
> **must not** reference it directly.

##### Constraints of this approval

These are part of the decision, not commentary on it.

1. **The Raw Palette is INTERNAL design infrastructure.**
2. **Components and consuming applications MUST NOT reference Raw Palette
   tokens directly.** This restates v0.2 §2's *"a palette layer that components
   never reference"* as an approved constraint.
3. **Semantic colour tokens remain the only public colour API.**
4. **The approved palette is preserved exactly.** Missing numeric ramp steps
   must **not** be manufactured merely to regularise the scale.
5. **Existing canonical brand and semantic colour values remain unchanged.**
   Decision 1 changes no value printed in v0.2 §2.1–§2.4 or §6.
6. **The future architecture must ensure semantic tokens reference or alias the
   Raw Palette rather than independently duplicate the same hex values.** This
   is a requirement placed on the implementation, not a claim that it is done —
   the kit itself restates hexes rather than aliasing (caveat 1 above), and the
   representation mechanics are reserved for ADR 0003.
7. **No orange, purple or turquoise, and no additional status hues** are
   introduced by this approval, consistent with v0.2 §2.1's Forbidden list and
   §Five principles 2's four-tone closure.
8. **Alpha-derived values remain UNRESOLVED by Decision 1**, specifically:
   `--overlay`, the focus rings (`--focus-ring`, `--focus-ring-green`) and the
   six elevation shadows. The palette carries opaque colours only; how alpha
   derivatives relate to it is not decided here.
9. **Decision 1 does NOT automatically approve** semantic status colours,
   interaction hover/press colours, `--focus-ring-green`, elevation values, or
   any later ratification item. Each remains its own decision.
10. **The palette may remain numerically irregular.** Values such as missing
    100/200/300/700 steps must **not** be invented for aesthetic consistency.
    Green runs 50/400/450/500/600/650/700/750; blue skips 700; neutrals run
    25/50/100/200/400/500/600. That sparseness is approved as-is.

##### What this approval does not settle

- **The Part C aliasing question.** Constraint 6 states the requirement;
  the mechanism — whether a semantic token holds `var(--green-500)` or a
  literal, and how that survives into `tokens.ts` and the Tailwind `@theme`
  artifact — is ADR 0003 work and is untouched here.
- **Where alpha derivatives live** (constraint 8).
- **Nothing is implemented.** No token file, CSS variable or style was created.

---

#### DECISION 1 — AMENDMENT 1 — APPROVED

**Decided by:** human design/product owner · **Date:** 2026-09-15
**Outcome:** three entries admitted to the approved Raw Palette, at their
existing values, in vacant slots. **Raw Palette: 25 → 28 entries.**

##### The three admitted entries

| New raw token | Value | Sits strictly between | Luminance placement |
| ------------- | --------- | ------------------------------- | ----------------------------------- |
| `--green-550` | `#347F1B` | `--green-500` and `--green-600` | 0.21623 > **0.15988** > 0.13797 |
| `--blue-450`  | `#0273B6` | `--blue-400` and `--blue-500`   | 0.20708 > **0.15652** > 0.14963 |
| `--red-550`   | `#D51013` | `--red-500` and `--red-600`     | 0.18395 > **0.14564** > 0.12351 |

Each was placed against its family's **x00 round-number spine**, which was
tested and found **monotonic in all three families** (green 400·500·600·700;
blue 400·500·600·800·900; red 500·600). All three slots were vacant.

##### Why the amendment was needed

Decision 1 constraint 6 requires semantic tokens to reference or alias Raw
Palette values rather than independently duplicate hex values. The three
interaction hover semantics approved as Decision 3a had **no raw entry to
alias**. These three colours are **not newly invented** — they are the existing
validated hover values from the Decision 3 evidence.

##### Guarantees of this amendment

1. **No existing Raw Palette entry changes value.** Zero value changes.
2. **No existing entry is renamed.** Zero renames.
3. **No existing entry is removed.** Zero removals.
4. **No unrelated ramp step is manufactured.** Three additions only, each for
   an already-approved semantic.
5. **These are the minimum required additions** — exactly three semantics
   lacked an alias; exactly three entries were added.
6. **Decision 1's other ten constraints stand unchanged**, including
   constraints 1–3 (the palette is internal; components and applications must
   not reference it directly; semantic tokens remain the only public colour
   API).

##### Constraint-4 reading, as ruled

Constraint 4 forbids manufacturing missing ramp steps *"merely to regularize
the scale"*, and constraint 10 forbids inventing steps *"solely for aesthetic
consistency"*. The owner ruled that this amendment is **consistent** with both:
no colour is invented, the motive is constraint 6 rather than regularity, and
the amendment in fact leaves the green scale *less* regular, not more. Both
readings were put to the owner before the ruling; this one was chosen.

##### Preserved finding — the Green palette is not globally monotonic

**Recorded, deliberately not repaired.** Pre-existing inversions:
`--green-600 #0C7912` (0.13797) → `--green-650 #1B7E17` (0.15217), and
`--green-700 #03651D` (0.09415) → `--green-750 #026E1E` (0.11259). Green's x50
entries are **provenance positions sampled from the logo artwork**, not tonal
positions; blue, red and neutral are fully monotonic and carry no x50 entries.

**Consequence accepted with this amendment:** `--green-550` (0.15988) is
lighter than the existing `--green-650` (0.15217), adding a **third**
inversion. This is the pre-existing defect propagating, not a flaw in the new
key. **No attempt was made to repair or renumber the existing Green palette.**
Green ramp normalisation remains a separate, lower-priority item and is **not**
authorised by this amendment.

##### What this amendment does not settle

- **Representation mechanics** — reserved for ADR 0003.
- **Nothing is implemented.** No token file, CSS variable or style was created.

---

#### DECISION 1 — AMENDMENT 2 — APPROVED

**Decided by:** human design/product owner · **Date:** 2026-09-18
**Outcome:** **two** entries are admitted additively, to supply the press rungs
the Decision 12 action ladders require. The Raw Palette grows from **28 to 30**.

| New raw token | Value | Position | Relative luminance | White contrast | Step |
| ------------- | --------- | ------------------------------------------ | ---------- | -------- | ------------------------ |
| `--blue-700`  | `#045398` | perceptually **between** `--blue-600` and `--blue-800` | ≈ 0.08479 | ≈ **7.790:1** | ≈ **5.80 L\*** darker than `#0062AC` |
| `--red-700`   | `#B90304` | **below** `--red-600`                       | ≈ 0.10388 | ≈ **6.823:1** | ≈ **3.24 L\*** darker than `#C80303` |

##### Evidence

- **`--blue-700 #045398`** — fills the family's largest void, the 18.10 L\* gap
  between `--blue-600` (L\* 40.76) and `--blue-800` (L\* 22.65). **No collision
  with any existing approved Raw Palette entry.** It continues the ramp's own
  measured trajectory, in which chroma falls and hue rotates as the family
  darkens.
- **`--red-700 #B90304`** — **continues the existing red hue/chroma
  trajectory**, sitting essentially on `--red-600`'s own hue and saturation
  coordinates, so the ramp gains depth without a hue or chroma discontinuity.

##### Amendment discipline

- **No existing Raw Palette entry is changed.**
- **No existing entry is renamed.**
- **No existing entry is removed.**
- The change uses the **same additive mechanism as Amendment 1**.
- `--blue-700` and `--red-700` are approved **Token Table identifiers**. They
  **do not** mean that CSS variables, a Tailwind key, a typed export or any
  public package representation has been implemented. **Final delivery
  representation remains an ADR 0003 concern.**
- **No other Raw Palette value is added by this amendment.**

---

### Decision 2 · Semantic status colours

**Canonical requirement.** v0.2 §2.1: *"`--success` `--info` `--danger` + `-fg`
`-bg` | 3 tones × 3 roles | Every StatusBadge, banner and tinted surface. `-fg`
is the accessible text pair for `-bg`."* §6: *"Status text uses the `-fg` token
on its `-bg`, never the base tone."* §Five principles 2 closes the set at four
tones and forbids orange. Nine token names are fixed; nine values are absent.

**Candidate values** — `kit:colors.css`:

| Token          | Candidate | Token       | Candidate | Token           | Candidate |
| -------------- | --------- | ----------- | --------- | --------------- | --------- |
| `--success`    | `#3C9220` | `--info`    | `#0383CE` | `--danger`      | `#EC1417` |
| `--success-fg` | `#0C7912` | `--info-fg` | `#0062AC` | `--danger-fg`   | `#C80303` |
| `--success-bg` | `#F0F8E7` | `--info-bg` | `#EAF5FC` | `--danger-bg`   | `#FDEBEC` |

**Measured contrast of the `-fg` / `-bg` pairs** (§6 requires 4.5:1):

| Pair                            | Ratio    | Verdict  |
| ------------------------------- | -------- | -------- |
| `--success-fg` on `--success-bg` | **5.13** | PASS     |
| `--info-fg` on `--info-bg`       | **5.67** | PASS     |
| `--danger-fg` on `--danger-bg`   | **5.27** | PASS     |

All three candidate pairs satisfy the accessible-pair obligation §2.1 states and
§6 enforces.

**Caveats.**

1. **The info family breaks the derivation pattern.** Success and danger derive
   exactly as base = brand, `-fg` = brand-dark, `-bg` = brand-soft. Info does
   not: `--info-fg #0062AC` is **not** `--brand-blue-dark #002A5E`; it is the
   palette's `--blue-600`. Either the asymmetry is deliberate — `#002A5E` is
   also `--text-primary`, so using it as info ink would make an info badge
   indistinguishable from body ink — or it is drift. **Ratify it deliberately or
   correct it; do not wave it through.**
2. **The base tones duplicate the brand tones exactly.** `--success` equals
   `--brand-green`, `--info` equals `--brand-blue`, `--danger` equals
   `--brand-red`. Three pairs of names holding one value each is a standing
   drift risk. The decision is whether status is *identical to* brand (in which
   case consider aliasing) or merely *currently equal to* it.
3. The four-tone closure is respected: the kit introduces no orange and no fifth
   tone. `--neutral-status-fg` / `-bg` are already canonical and are not part of
   this decision — see the finding recorded at the end of this file.

**Options.**

- **APPROVE** — adopt all nine as written, including the info asymmetry.
- **AMEND** — most likely candidates: align `--info-fg` with
  `--brand-blue-dark`, or alias the three base tones to the brand tokens rather
  than restating them.
- **REJECT** — design nine values from scratch, subject to the same §6 pair
  obligation.

**Impact if approved.** Unblocks every StatusBadge, InfoBanner, ErrorBanner,
tinted surface, Timeline node tone, Chip tone and Money credit/debit tone across
four applications. These are semantic tokens: renaming or retiring one later is
a breaking change under §2.

`[x] APPROVE   [ ] AMEND   [ ] REJECT`

---

#### DECISION 2 — APPROVED

**Decided by:** human design/product owner · **Date:** 2026-09-15
**Outcome:** all nine semantic status values approved exactly as evidenced
above, **including the INFO asymmetry**, which is ratified as intentional.

##### The 9 approved semantic status values

**SUCCESS**

| Token          | Approved value |
| -------------- | -------------- |
| `--success`    | `#3C9220`      |
| `--success-fg` | `#0C7912`      |
| `--success-bg` | `#F0F8E7`      |

**INFO**

| Token       | Approved value |
| ----------- | -------------- |
| `--info`    | `#0383CE`      |
| `--info-fg` | `#0062AC`      |
| `--info-bg` | `#EAF5FC`      |

**DANGER**

| Token         | Approved value |
| ------------- | -------------- |
| `--danger`    | `#EC1417`      |
| `--danger-fg` | `#C80303`      |
| `--danger-bg` | `#FDEBEC`      |

##### Behavioural rules approved with these values

1. **Status text uses `-fg` on `-bg`.**
2. **Base status tones are NOT used as status text colours.**
3. **No orange warning/status family is introduced.**
4. **Non-blocking warning, pending and informational states map to INFO.**
5. **Blocking, failed, destructive and error states map to DANGER.**
6. **Positive, completed and approved states map to SUCCESS.**
7. **SUCCESS remains aligned to the Zakhmban green family.**
8. **DANGER remains aligned to the Zakhmban red family.**
9. **The INFO asymmetry is INTENTIONAL.** `--info-fg` is `#0062AC` while
   `--brand-blue-dark` is `#002A5E`. **Do not "correct" this merely to make the
   three families symmetrical.** `#0062AC` is deliberately the semantic
   information foreground blue. Caveat 1 above put the choice to the owner and
   the owner ratified the asymmetry; it is a decision, not drift. The reason
   caveat 1 records still holds: `#002A5E` is also `--text-primary`, so using it
   as info ink would make an info badge indistinguishable from body ink.
10. **The contrast evidence for the three `-fg`/`-bg` pairs is preserved** and
    is reproduced here as part of the approval record:

| Pair                             | Ratio    | §6 4.5:1 |
| -------------------------------- | -------- | -------- |
| `--success-fg` on `--success-bg` | **5.13** | PASS     |
| `--info-fg` on `--info-bg`       | **5.67** | PASS     |
| `--danger-fg` on `--danger-bg`   | **5.27** | PASS     |

##### Scope limit — the status system is NOT accessibility-approved as a whole

This approval covers **three** tones. The fourth — the canonical neutral status
pair — is **not** approved and **not** closed:

> `--neutral-status-fg #8A9384` on `--neutral-status-bg #F7F9F5` ≈ **3.01:1**,
> against the canonical 4.5:1 text requirement. **OPEN DEFECT.**

Both values are canonical in v0.2 §2.1 and **neither is changed by this
decision**. See the findings section below. **Do not record the status-colour
system as accessibility-approved while that pair stands.**

**Resolved 2026-09-18 by the Owner Contrast Ruling.** The pair now stands as
**`--neutral-status-fg #667085`** (`--neutral-600`) on the **unchanged**
`--neutral-status-bg #F7F9F5`, measuring **4.6961:1** — **PASS**. The scope
limit above is therefore lifted **for that pair only**: all four status
foreground/background text pairs now meet 4.5:1. **Decision 2's nine approved
values are unchanged**, and **rule 9's information-status ruling is neither
weakened nor reopened**. No broader accessibility conformance is claimed for
the status system beyond these four audited text pairs.

##### What this approval does not settle

- **Whether the base tones should alias the brand tokens** rather than hold
  equal values independently (caveat 2). Approved as values; the representation
  is ADR 0003 work.
- **Nothing is implemented.** No token file, CSS variable or style was created.

---

### Decision 3 · Interaction colours (hover, press, green focus ring)

**Canonical requirement.** v0.2 §2.1: *"`--*-hover` / `--*-press` | 6 tokens |
Hover darkens the fill; press darkens further + 0.98 scale"* — six tokens, none
named, none valued. And: *"`--overlay` · `--focus-ring` · `--focus-ring-green` |
rgba(0,42,94,.40) · 3px blue · **3px green**"*, with §6 requiring the ring be
*"visible against white and every tinted surface"*. `--focus-ring` is fully
canonical at `0 0 0 3px rgba(3,131,206,.28)`; its green sibling has a width and
a hue family only.

**Candidate values** — `kit:colors.css`:

| Token               | Candidate                       |
| ------------------- | ------------------------------- |
| `--green-hover`     | `#347F1B`                       |
| `--green-press`     | `#0C7912`                       |
| `--blue-hover`      | `#0273B6`                       |
| `--blue-press`      | `#0062AC`                       |
| `--red-hover`       | `#D51013`                       |
| `--red-press`       | `#C80303`                       |
| `--focus-ring-green` | `0 0 0 3px rgba(60,146,32,.24)` |

Exactly six hover/press tokens, matching §2.1's stated count. `rgba(60,146,32,…)`
is `#3C9220`, the canonical brand green.

**Caveats.**

1. **The green ring's alpha is `.24`; the canonical blue ring's is `.28`.**
   Ratify the asymmetry deliberately or normalise it. The green ring is the one
   used on green fills, which is the harder legibility case, so the lower alpha
   is the direction that warrants scrutiny rather than the safer one.
2. **Every `press` value equals that family's `-dark` token**, and therefore
   also its status `-fg`: `--green-press` = `--brand-green-dark` =
   `--success-fg`; `--blue-press` = `--info-fg`; `--red-press` =
   `--brand-red-dark` = `--danger-fg`. Consistent, but it means press states and
   status ink can never diverge without splitting them first.
3. **`--green-hover #347F1B` is not on the candidate palette ramp** (which
   offers `--green-450 #64A50C` and `--green-650 #1B7E17`). It is a one-off
   value. If decision 1 is approved, this token either needs a palette entry or
   becomes the system's first documented off-ramp colour.
4. §6 requires the ring to be visible against white **and every tinted surface**.
   That has **not** been verified against `--brand-green-soft #F0F8E7`,
   `--brand-blue-soft #EAF5FC` and `--brand-red-soft #FDEBEC`. A translucent
   ring's effective contrast depends on what it composites over, so this is a
   rendering check, not an arithmetic one, and it is outstanding work under any
   outcome.

**Options.**

- **APPROVE** — adopt the six plus the green ring as written, alpha asymmetry
  included.
- **AMEND** — normalise the green ring to `.28`; and/or move `--green-hover`
  onto the palette ramp.
- **REJECT** — name and value six interaction tokens and a green ring from
  scratch.

**Impact if approved.** Unblocks every Button variant, Chip, ListRow pressed
state, IconButton, BottomNav item and interactive Card, plus the focus ring on
every focusable element in four applications. Naming is the real contract here:
the six names enter component source immediately and are expensive to change
afterwards.

`[x] APPROVE` (as **3a**)   `[x] AMEND` (as **3b**)   `[ ] REJECT`

**Decision 3 was split.** Validation showed the interaction half ready and the
focus half defective, so the decision was divided rather than forced to remain
atomic. Both halves are recorded below.

---

#### DECISION 3a — INTERACTION HOVER / PRESS — APPROVED

**Decided by:** human design/product owner · **Date:** 2026-09-15
**Outcome:** all six interaction values approved exactly as evidenced, each
aliasing an approved Raw Palette entry.

##### The six approved interaction values

| Semantic token  | Approved value | Raw Palette alias | Alias source                |
| --------------- | -------------- | ----------------- | --------------------------- |
| `--green-hover` | `#347F1B`      | `--green-550`     | Decision 1 **Amendment 1**  |
| `--green-press` | `#0C7912`      | `--green-600`     | Decision 1 (original 25)    |
| `--blue-hover`  | `#0273B6`      | `--blue-450`      | Decision 1 **Amendment 1**  |
| `--blue-press`  | `#0062AC`      | `--blue-600`      | Decision 1 (original 25)    |
| `--red-hover`   | `#D51013`      | `--red-550`       | Decision 1 **Amendment 1**  |
| `--red-press`   | `#C80303`      | `--red-600`       | Decision 1 (original 25)    |

No value changed from the evidence. Decision 1 constraint 6 is satisfied: every
one of the six references a Raw Palette entry rather than owning an independent
hex value.

##### Behavioural contract — preserved unchanged

1. **Hover darkens the fill.**
2. **Press darkens further.**
3. **Press applies `scale(0.98)`** — the only transform in the system (§2.4).
4. **Hover/press colour transition is 120ms** (§2.4).

##### Supporting evidence preserved

`base → hover → press` is monotonically darker in all three families, on both
relative luminance and perceptual Lab L*:

| Family | base → hover → press (luminance) | Smallest step (Lab L*) |
| ------ | -------------------------------- | ---------------------- |
| Green  | 0.21623 → 0.15988 → 0.13797      | 3.02                   |
| Blue   | 0.20708 → 0.15652 → 0.11714      | 5.76                   |
| Red    | 0.18395 → 0.14564 → 0.12351      | 3.26                   |

Every step exceeds the ~2.3 just-noticeable threshold, so each state is
visually distinguishable. All six values clear 4.5:1 against white text.

##### Known coupling — ratified knowingly

| Press token     | Value     | Also equals                                              |
| --------------- | --------- | -------------------------------------------------------- |
| `--green-press` | `#0C7912` | `--green-600` · `--brand-green-dark` · `--success-fg`     |
| `--blue-press`  | `#0062AC` | `--blue-600` · `--info-fg`                                |
| `--red-press`   | `#C80303` | `--red-600` · `--brand-red-dark` · `--danger-fg`          |

**Future consequence, accepted with this approval.** Press-state colour and
status foreground colour currently share the same Raw Palette value. They could
only diverge later by **splitting the semantic aliases** — pointing `--*-press`
and `--*-fg` at different raw entries. That is not a value edit but a
structural split: a Decision 1 amendment plus a Decision 2 or 3a amendment,
landing together. Cheap while nothing is built; progressively more expensive
once four applications consume the tokens.

##### What this approval does not settle

- **Representation mechanics** — whether a semantic token holds
  `var(--green-550)` or a literal, and how aliasing survives into `tokens.ts`
  and the Tailwind `@theme` artifact — reserved for **ADR 0003**.
- **Decision 12 (On-brand text)** remains open. The three **base** brand fills
  still fall below 4.5:1 against white label text; that is a separate
  text-contrast question under SC 1.4.3 and is **not** resolved here.
- **Nothing is implemented.** No token file, CSS variable or style was created.

---

#### DECISION 3a — SCOPED AMENDMENT BY DECISION 12 — APPROVED

**Decided by:** human design/product owner · **Date:** 2026-09-18
**Classification: an additive / scoped amendment, NOT a supersession.**

**The six previously approved hover and press values are not invalidated and
not changed.** `--green-hover #347F1B`, `--green-press #0C7912`,
`--blue-hover #0273B6`, `--blue-press #0062AC`, `--red-hover #D51013` and
`--red-press #C80303` all keep their approved values exactly.

What Decision 12 does to this decision:

- it **distinguishes Raw Brand Identity colours from Semantic Action Fill
  colours**;
- it **adds an explicit semantic action-rest rung** to each family;
- it **shifts the approved interaction values into the accessible action
  ladders** recorded under Decision 12a;
- it **adds `--blue-700` and `--red-700` as the two required press entries**
  (Decision 1 Amendment 2).

**Preserved unchanged by this amendment:**

- **hover darkens the fill**;
- **press darkens it further**;
- **press uses `scale(0.98)`**;
- **transition duration remains 120ms**.

**Decision 2 and Decision 3b remain unchanged.**

> **Superseded in part, 2026-09-18 — the six identifiers above are RETIRED.**
> The **values** they carried are unchanged and remain approved. What is
> retired is the six **names** — `--green-hover`, `--green-press`,
> `--blue-hover`, `--blue-press`, `--red-hover`, `--red-press` — because after
> Decision 12a they no longer describe the states they name: 3a's *hover*
> value is the ladder's **rest** rung and 3a's *press* value is the ladder's
> **hover** rung. They are **replaced by nine state-aligned identifiers** in
> the Owner Interaction Ladder Mapping Ruling below. **None of the six may be
> implemented, exported, or retained as a compatibility alias.** Decision 3a
> and this amendment remain part of the historical record exactly as written;
> neither is rewritten.

---

#### DECISION 3b — FOCUS INDICATOR — AMENDED AND APPROVED

**Decided by:** human design/product owner · **Date:** 2026-09-15
**Outcome:** the candidate green ring is **rejected and retired**; the canonical
blue ring is **replaced**. One fill-agnostic two-layer indicator is approved,
in the **navy** outer-ring variant.

##### What was rejected

| Design                                          | Worst adjacency | SC 1.4.11 (AA) |
| ----------------------------------------------- | --------------- | -------------- |
| Candidate `--focus-ring-green` `rgba(60,146,32,.24)` | **1.33**   | FAIL           |
| Canonical `--focus-ring` `rgba(3,131,206,.28)`  | **1.44**        | FAIL           |

Both fall roughly 55% below the applicable 3:1 requirement. The blue ring is a
**canonical** value, so this approval corrects a defect in the frozen spec, not
only in the candidate.

##### The approved focus indicator

```
CONTROL  ->  2px WHITE  ->  2px NAVY  ->  PAGE
```

| Layer     | Width    | Colour    | Raw Palette source | Status                                              |
| --------- | -------- | --------- | ------------------ | --------------------------------------------------- |
| **Inner** | 2 CSS px | `#FFFFFF` | `--white`          | already approved (Decision 1)                       |
| **Outer** | 2 CSS px | `#002A5E` | `--blue-900`       | already approved; = `--text-primary` = `--brand-blue-dark` |

**Zero new Raw Palette entries required.** Net token count falls by one.

##### Contrast evidence preserved

**Outer navy against every tested light surface:**

| Surface              | Hex       | Ratio     |
| -------------------- | --------- | --------- |
| `--surface`          | `#FFFFFF` | **14.07** |
| `--surface-subtle`   | `#F7F9F5` | **13.28** |
| `--brand-green-soft` | `#F0F8E7` | **12.92** |
| `--brand-blue-soft`  | `#EAF5FC` | **12.70** |
| `--brand-red-soft`   | `#FDEBEC` | **12.24** |

**Inner white against every tested brand and interaction fill:**
`--brand-green` **3.94** · `--brand-blue` 4.08 · `--brand-red` 4.49 ·
`--green-hover` 5.00 · `--green-press` 5.59 · `--blue-hover` 5.08 ·
`--blue-press` 6.28 · `--red-hover` 5.37 · `--red-press` 6.05.

**Inner/outer separation: 14.07.**

> **Worst relevant adjacency: ≈ 3.94:1 — a 31% margin over the 3:1
> requirement.**

On a white or `--surface-subtle` control the inner ring merges with the control
and the **outer** ring carries the indication at 14.07, reading as a navy ring
with a white offset gap. That is the intended appearance.

##### Why this has materially more headroom

An alpha-composited single ring must satisfy **both** edges with **one**
colour: it lightens toward the page and loses contrast against the page, or
darkens toward the fill and loses contrast against the fill. The two-layer
design **decouples the edges** — the outer ring answers only to the page, the
inner only to the control — so neither is squeezed. Across all 25 originally
approved palette colours tested against all eight adjacencies, exactly one
(`--blue-900`, at 3.13) cleared 3:1 as a single solid ring; the two-layer form
reaches 3.94.

##### Navy chosen over green — a design ruling, recorded as such

The supported conclusion is narrow and is recorded precisely: **the previous
alpha-composited green focus design does not provide sufficient adjacent
contrast, and no current approved Green Raw Palette value provides a
sufficiently robust single-ring solution across the tested contexts.**

A green **outer** ring in two-layer form (e.g. `--green-700 #03651D`) reaches
the same 3.94 worst case and would also satisfy the requirement. The owner was
shown that alternative and chose **navy**, for its larger outer-edge margin
(12.24 against tested surfaces, versus 6.34) and because `#002A5E` is already
the system's primary ink. **This was a design preference, not an accessibility
necessity.**

##### Canonical rule amendments approved with this decision

| #   | Canonical rule                                       | Change                                        |
| --- | ---------------------------------------------------- | --------------------------------------------- |
| 1   | *"green ring on green fills"* (§2.1, §6)             | **REMOVED**                                   |
| 2   | `--focus-ring-green` as a token (§2.1)               | **RETIRED**                                   |
| 3   | `--focus-ring` = `rgba(3,131,206,.28)` (§6)          | **REPLACED** by the two-layer white + navy indicator |
| 4   | *"A 3px … ring"* (§6)                                | **REPLACED** by 2px inner + 2px outer         |
| 5   | *"Never removed"* (§6)                               | **PRESERVED unchanged**                       |
| 6   | *"Never replaced by a colour change alone"* (§6)     | **PRESERVED unchanged**                       |
| 7   | *"visible against white and every tinted surface"* (§6) | **PRESERVED unchanged** — now met numerically (12.24–14.07), not only qualitatively |

##### Accessibility basis — the two criteria kept separate

- **WCAG 2.2 SC 1.4.11 Non-text Contrast — Level AA** is the applicable
  acceptance requirement for the author-styled focus state, and is what this
  design is measured against. **MET**, worst case 3.94.
- **WCAG 2.2 SC 2.4.13 Focus Appearance — Level AAA** is **not** the governing
  project acceptance gate. The design would also satisfy it at 2+2px; that is
  recorded as a bonus and was never used to pass or fail anything.

##### What this approval does not settle

- **Representation mechanics.** `--focus-ring` becomes a **two-layer composite
  box-shadow** rather than a single shadow. How a composite shadow is expressed
  across authored CSS → typed `tokens.ts` → Tailwind `@theme` is an **ADR 0003**
  question and is flagged, not resolved.
- **Decision 12 (On-brand text)** remains open and independent: 3b is a
  non-text question under SC 1.4.11, Decision 12 is a text question under
  SC 1.4.3. If the brand fills are later darkened for Decision 12, the inner
  white ring's margin only widens.
- **The two remaining canonical contrast defects** — neutral-status (≈3.01) and
  `--text-muted` (≈3.19) — are untouched by Decision 3b. **Both were closed on
  2026-09-18 by the Owner Contrast Ruling**, which Decision 3b neither
  anticipated nor contributed to.
- **Nothing is implemented.** No token file, CSS variable or style was created.

---

### Decision 4 · Elevation

**Canonical requirement.** v0.2 §2.3: *"Navy-tinted and soft. `xs` segmented
control · `sm` raised card · `md` device frame · `nav` upward on the bottom nav
· `sheet` upward on a bottom sheet · `modal`. Cards prefer a border; a shadow on
a bordered card is a defect."* Six names, six assigned surfaces, two directional
constraints, one qualitative constraint — and no values.

**Candidate values** — `kit:elevation.css`:

| Token           | Candidate                         | Direction |
| --------------- | --------------------------------- | --------- |
| `--shadow-none` | `none`                            | —         |
| `--shadow-xs`   | `0 1px 2px rgba(0,42,94,.05)`     | down      |
| `--shadow-sm`   | `0 2px 8px rgba(0,42,94,.06)`     | down      |
| `--shadow-md`   | `0 8px 24px rgba(0,42,94,.08)`    | down      |
| `--shadow-nav`  | `0 -2px 12px rgba(0,42,94,.06)`   | **up**    |
| `--shadow-sheet` | `0 -12px 40px rgba(0,42,94,.14)` | **up**    |
| `--shadow-modal` | `0 16px 48px rgba(0,42,94,.18)`  | down      |

**Caveats.**

1. All six satisfy both canonical constraints: every value is
   `rgba(0,42,94,…)`, which is `#002A5E` — the canonical `--text-primary` and
   `--brand-blue-dark`, so *"navy-tinted"* holds literally; and `nav` and
   `sheet` carry negative Y, so *"upward"* holds.
2. **`--shadow-none` is a seventh token the specification does not name.**
   Adding a semantic token is additive and non-breaking under §2, and a
   component variant that must explicitly remove elevation needs it — but it is
   an addition and should be approved as one, not absorbed silently.
3. **`--shadow-md` is assigned to *"device frame"* by §2.3, and no product
   surface in §3 or §4.1 is a device frame.** The candidate supplies a value for
   a token whose only documented use may be showcase chrome. Consider whether
   `md` belongs in the shipped set at all.

**Options.**

- **APPROVE** — adopt all six, plus `--shadow-none` as an explicit seventh.
- **AMEND** — adopt six and drop `--shadow-none`; or drop `--shadow-md` pending
  a real surface for it.
- **REJECT** — author six values satisfying the navy-tinted, soft and
  directional constraints.

**Impact if approved.** Unblocks SegmentedControl, the raised Card variant,
BottomNav, BottomSheet and Modal. Lowest blast radius in Part 1: §2.3 confines
elevation to five surfaces, no layout depends on it, and later value changes are
visual-only. Admin and Website may render none of these surfaces.

`[ ] APPROVE   [x] AMEND   [ ] REJECT`

**Amended narrower than either listed AMEND variant.** Both variants above
assumed the six named tiers would ship together. The approved outcome adopts
**three** and defers **three**, on the canonical split recorded in 4a below.

---

#### DECISION 4a — ELEVATION, RESERVED SURFACES — APPROVED

**Decided by:** human design/product owner · **Date:** 2026-09-17
**Outcome:** three of the six candidate elevation values are approved as public
semantic tokens, **unchanged from the evidence**. The remaining three are
deferred — see 4b.

##### The three approved elevation values

| Semantic token   | Approved value                    | Surface            | Direction    |
| ---------------- | --------------------------------- | ------------------ | ------------ |
| `--shadow-nav`   | `0 -2px 12px rgba(0,42,94,.06)`   | Bottom navigation  | **Upward**   |
| `--shadow-sheet` | `0 -12px 40px rgba(0,42,94,.14)`  | Bottom sheet       | **Upward**   |
| `--shadow-modal` | `0 16px 48px rgba(0,42,94,.18)`   | Modal              | **Downward** |

No value changed from the candidate table. Both canonical constraints in §2.3
hold: every value is navy-tinted, and `nav` and `sheet` carry negative Y.

##### Why exactly these three

§1 principle 1 — *"Border before shadow … **Elevation is reserved for sheets,
modals and the bottom nav**"* — names three surfaces. §2.3 names six tiers. The
two canonical statements were never reconciled, and this decision reconciles
them **in favour of principle 1**: the approved public set is exactly the
surfaces for which the specification reserves elevation, and nothing else.

This is a scope ruling, not a quality judgement. The three deferred values are
**not** rejected as visually defective.

##### Colour source — no new Raw Palette entry

All three use `rgba(0,42,94,…)`, which is `#002A5E` — already approved in
Decision 1 as `--blue-900`, and canonically also `--text-primary` and
`--brand-blue-dark`. **Decision 4a introduces no new Raw Palette entry and no
new colour**; it introduces an alpha *usage* of an approved one. How alpha over
an opaque palette entry is represented remains the ADR 0003 question already
recorded under Decision 1.

##### Preserved elevation rules

Carried forward unchanged and binding on any later implementation:

1. **Elevation is reserved** for bottom navigation, sheets and modals (§1·1).
2. **Borders are preferred before shadows** (§1·1).
3. **A shadow on a bordered card is a design defect** (§2.3).
4. **Hover elevation is not part of the approved interaction model.** The
   approved hover/press contract (Decision 3a) is colour plus `scale(0.98)`;
   no canonical source specifies a hover lift, and none is approved here.
5. **A shadow is never the sole signal** for state, selection, hierarchy, a
   critical boundary, or any accessibility meaning. §6's non-colour-signalling
   duty applies to elevation exactly as it applies to colour.
6. **Existing Phase 1 shadow usage is migration evidence only.** It does not
   expand the approved V2 Token Table, and a Phase 1 surface that carries a
   shadow today acquires no claim to a token here.

##### What this approval does not settle

- **Decision 4b remains deferred** — `--shadow-xs`, `--shadow-sm`,
  `--shadow-md`.
- **`--shadow-none` is deferred to ADR 0003**, not approved.
- **Representation mechanics** — how a multi-part shadow value, and the alpha
  above, survive authored CSS → typed `tokens.ts` → Tailwind `@theme` — are
  **ADR 0003** work, exactly as for the composite focus ring under 3b.
- **Nothing is implemented.** No token file, CSS variable or style was created.

---

#### DECISION 4b — ELEVATION, GENERAL TIERS — DEFERRED

**Decided by:** human design/product owner · **Date:** 2026-09-17
**Outcome:** `--shadow-xs`, `--shadow-sm` and `--shadow-md` are **deferred**.
They are **not** approved public tokens and **must not** appear in the approved
Token Table.

| Candidate (evidence only) | Value                          | §2.3 surface       | Why deferred                                                                 |
| ------------------------- | ------------------------------ | ------------------ | ---------------------------------------------------------------------------- |
| `--shadow-xs`             | `0 1px 2px rgba(0,42,94,.05)`  | Segmented control  | No confirmed canonical product consumer for a general tier                    |
| `--shadow-sm`             | `0 2px 8px rgba(0,42,94,.06)`  | Raised card        | Its role conflicts with §2.3's own *"a shadow on a bordered card is a defect"* |
| `--shadow-md`             | `0 8px 24px rgba(0,42,94,.08)` | Device frame       | Design-presentation infrastructure, not a confirmed product surface           |

**These values are not rejected as visually defective.** They are deferred
because their **roles** are unconfirmed. Should a real product surface be
established for any of them, the value above is the first candidate to
reconsider — it does not have to be re-derived.

**The asymmetry is deliberate and is the reason for deferring rather than
rejecting or approving:** under §2 *adding* a semantic token later is additive
and non-breaking, while *publishing* a token and later removing it is a
breaking change across four applications. Deferral is the cheap direction; a
speculative approval is the expensive one.

---

#### `--shadow-none` — DEFERRED TO ADR 0003

**Not approved as a public design token.** The specification does not name it,
and whether "no elevation" is a *token* at all is a representation question
rather than a design-value one. ADR 0003 may later determine that it is:

- omitted entirely; or
- retained as an internal typed-union convenience in `tokens.ts`; or
- represented only as a structural reset in authored CSS.

Until ADR 0003 decides, `--shadow-none` is **not** an approved Token Table
value and must not be published as one.

---

### Decision 12 · On-brand text colour

**Canonical requirement.** v0.2 §2.1's ink row names exactly three tokens —
`--text-primary` / `-secondary` / `-muted` — and describes them as *"All ink."*
None of the three is legible on a brand fill, and the primary Button is a green
fill carrying a `--text-button` label at 15px / weight 600.

**Candidate value** — `kit:colors.css`: `--text-on-brand: #FFFFFF`.

**Measured contrast — this is the material finding on this decision.** Button
labels at 15px / 600 are not WCAG large text, so §6's 4.5:1 applies:

| Pair                                        | Ratio    | 4.5:1    | 3:1  |
| ------------------------------------------- | -------- | -------- | ---- |
| `#FFFFFF` on `--brand-green #3C9220` (rest)  | **3.94** | **FAIL** | PASS |
| `#FFFFFF` on `--brand-blue #0383CE` (rest)   | **4.08** | **FAIL** | PASS |
| `#FFFFFF` on `--brand-red #EC1417` (rest)    | **4.49** | **FAIL** | PASS |
| `#FFFFFF` on `--green-hover #347F1B`         | 5.00     | PASS     | PASS |
| `#FFFFFF` on `--green-press #0C7912`         | 5.59     | PASS     | PASS |

**White on the brand fills fails AA at rest and passes only once hovered or
pressed.** The brand fill values are already canonical, so this is not a defect
introduced by the candidate — the candidate merely makes it measurable. It
cannot be resolved by choosing a different ink: no colour clears 4.5:1 on
`#3C9220` while remaining legible as a button label except a much darker one,
which the white-first system does not use.

Realistically the owner is choosing between: accept the shortfall as a
documented exception in §6's register; raise the label to a size/weight that
qualifies as WCAG large text; or darken the brand fill for filled controls only
— which would touch a canonical value and is out of this worksheet's scope.

**Caveats.**

1. `#FFFFFF` is already the value of canonical `--surface` and of the candidate
   palette's `--white`. Approving adds a third name for one value. That is the
   same duplication question as decision 14 and should be answered consistently
   with it.
2. The token is additive under §2 and therefore non-breaking to add — but every
   component built before it exists will hardcode `#FFFFFF` or borrow
   `--surface`, and unwinding that later touches the package's own primitives.

**Options.**

- **APPROVE** — adopt `--text-on-brand: #FFFFFF`, and separately record how the
  3.94 / 4.08 / 4.49 shortfall is handled.
- **AMEND** — adopt the token with a different value, or bind it per family.
- **REJECT** — leave on-brand ink untokenised and rule on what component source
  may reference instead.

**Impact if approved.** Unblocks every primary and destructive Button label,
filled badges, the active BottomNav item and any ink over `--overlay`. **Does
not by itself resolve the AA shortfall**, which needs its own ruling either way.

`[ ] APPROVE   [x] AMEND   [ ] REJECT`

**Amended far beyond the three listed options.** The entry above framed the
choice as white-or-not against the **Raw Brand Identity** fills, and on those
fills no foreground resolves it. The approved ruling changes the *fills that
normal text sits on* instead, which makes `#FFFFFF` conformant everywhere it is
approved. Recorded as **12a**, **12b** and **12c** below.

#### Evidence record — corrected and completed, 2026-09-18

The entry above is **accurate but incomplete** on two counts, both material.

**First, the role already exists.** §3.1's Text component lists its tones as
*"primary, secondary, muted, success, info, danger, **on-brand**"*. The
on-brand Text role is therefore **already canonical**; only its value was
missing. The entry reads §2.1's three-token ink row alone and concludes no
role exists.

**Second, symmetry does not close the foreground space.** `contrast(A,B) =
contrast(B,A)` says nothing about a third colour against the same fill. Black
measures **5.3245 / 5.1416 / 4.6790** on the three base fills — it **passes**.
What is true, and what the complete sweep shows, is narrower: **no currently
approved Raw Palette value passes 4.5:1 on any base brand fill**, the closest
in all 28 being `--white` on red at 4.488.

**The finding that forced the architecture.** White and near-black cover
*disjoint* halves of each interaction ladder — white fails all three bases and
passes all six hover/press rungs; a near-black passes all three bases and fails
all six hover/press rungs. Per family a single foreground is **impossible**: a
light one would need L ≥ 1.1480 / 1.1069 / 1.0028 (white is 1.0) and a dark one
L ≤ −0.0082 / −0.0129 / −0.0114 (black is 0.0). With the Raw Brand Identity
values as fills there is **no compliant filled control at all**. Separating
identity from action fill is what resolves it.

**Third, a strand the entry did not measure.** Outline and text Buttons place
the Raw Brand Identity colour **as label text** on light surfaces, and fail
there too — 3.944 / 4.084 / 4.488 on `--surface` and **3.723 / 3.856 / 4.237 on
`--surface-subtle`**. That is recorded as **12c**.

---

#### DECISION 12 — APPROVED — ACCESSIBLE ACTION-FILL AND ON-BRAND FOREGROUND CONTRACT

**Decided by:** human design/product owner · **Date:** 2026-09-18
Recorded in three clearly separated parts: **12a** normal Text on semantic
action fills · **12b** Icon/glyph foregrounds on coloured fills · **12c**
outline and text Button foregrounds.

---

##### DECISION 12a — TEXT AND SEMANTIC ACTION FILLS — APPROVED

**Approved on-brand Text value: `#FFFFFF`.**

**The on-brand Text role already exists in §3.1. This ruling supplies its
value; it does not create a new Text tone.**

**Approved semantic action-fill ladders**

| Family | rest | hover | press | White contrast | ΔL\* |
| ------ | ---- | ----- | ----- | -------------- | ---- |
| **Green** | `#347F1B` | `#0C7912` | `#026E1E` | ≈ **5.003 / 5.586 / 6.458** | ≈ 3.02 / 3.93 |
| **Blue** | `#0273B6` | `#0062AC` | **`#045398`** | ≈ **5.084 / 6.282 / 7.790** | ≈ 5.76 / 5.80 |
| **Red** | `#D51013` | `#C80303` | **`#B90304`** | ≈ **5.367 / 6.052 / 6.823** | ≈ 3.26 / 3.24 |

- **`#045398` is the newly approved `--blue-700`.**
- **`#01356F` is *not* the blue action-press value** — it is the Decision 13
  link-press value.
- **`#B90304` is the newly approved `--red-700`.**

**Behavioural contract**

- **one consistent white foreground across rest, hover and press**;
- **no foreground inversion**;
- **hover darkens the action fill**;
- **press darkens it further**;
- the existing **`scale(0.98)`** press behaviour remains **unchanged**;
- the existing **120ms** timing remains **unchanged**;
- **every approved normal-text pairing clears 4.5:1.**

**Raw / Semantic distinction**

- **`#3C9220` remains the green Raw/Brand Identity colour.**
- **`#0383CE` remains the blue Raw/Brand Identity colour.**
- **`#EC1417` remains the red Raw/Brand Identity colour.**
- **These identity values are *not* approved as backgrounds for normal
  on-brand Text.**
- **Interactive filled controls consume the darker semantic action ladder.**
- **Raw Brand Identity values are not silently replaced or redefined.**
- **Decision 2 status mappings remain unchanged** — all nine `--success`,
  `--info` and `--danger` values keep their values and mappings.

**Documented normal-text uses that consume the action ladder**

- filled **green, blue and red Buttons**;
- **Modal confirmation / destructive Buttons**;
- **Stepper completed nodes containing numerals**;
- **BottomNav count badges**.

**BottomNav badge — recorded separately.** Switching its fill to the **red
action-rest** value resolves its **colour contrast pairing with white**. Its
evidenced **10px text still violates the canonical 12px floor** (§2.2, *"12px
is the absolute floor"*). **That size defect remains open and is not resolved
by Decision 12.**

**White Text is not approved on the original Raw Brand Identity fills.**

---

##### DECISION 12b — ICON AND GLYPH FOREGROUND — APPROVED

**Approved on-brand Icon/glyph foreground: `#FFFFFF`.**

Recorded as an **additive amendment to the §3.1 Icon colour contract**, whose
canonical list — *"Navy default, green when active, red when destructive"* —
gains this entry. **The Text tone contract is not widened to cover icons.**

- **Text and Icon remain separate canonical contracts.**
- **Normal Text uses the 4.5:1 threshold.**
- **Meaningful non-text graphics use the applicable 3:1 threshold.**
- **White glyphs already pass 3:1 on the original base brand fills** — 3.944 /
  4.084 / 4.488.
- **They pass with additional margin on the darker action fills** — from 5.003
  upward.
- The approved treatment covers **appropriate checkmarks, remove glyphs and
  similar on-brand Icon/glyph cases**.
- **Component bindings must still use the correct Raw, Semantic or
  component-level role** — this ruling supplies a foreground, not a binding.

**Original Raw Brand Identity colours may remain in non-text or decorative uses
only where the applicable contrast requirement against the actual adjacent
colour is satisfied. This is not a blanket accessibility pass for every
decorative use**, and each such use must be checked against its own adjacent
colour.

---

##### DECISION 12c — OUTLINE AND TEXT BUTTONS — APPROVED

**Approved rule: outline and text Button labels use the corresponding
action-rest value as their foreground. They do not use the lighter Raw Brand
Identity value as normal text.**

| Tone | Approved label foreground |
| ---- | ------------------------- |
| green | **`#347F1B`** |
| blue | **`#0273B6`** |
| red | **`#D51013`** |

**Evidence**

| Foreground | on `--surface` `#FFFFFF` | on `--surface-subtle` `#F7F9F5` |
| ---------- | ------------------------ | ------------------------------- |
| green `#347F1B` | ≈ **5.003** | ≈ **4.723** |
| blue `#0273B6` | ≈ **5.084** | ≈ **4.799** |
| red `#D51013` | ≈ **5.367** | ≈ **5.066** |

**All six pairings pass 4.5:1.**

The action-rest foreground **remains the label foreground for these variants
unless a later component-specific ruling explicitly defines another accessible
interaction treatment**. **No additional foreground value is invented.**

---

##### Scoped canonical section amendments

Decision 12 acts as a **scoped amendment / clarification** of:

| Section | Amendment |
| ------- | --------- |
| **§2.1** | distinguishes **Raw Brand Identity** from **Semantic Action Fill** |
| **§3.1 Text** | on-brand value = **`#FFFFFF`** |
| **§3.1 Icon** | **additive** on-brand Icon/glyph entry = **`#FFFFFF`** |
| **§3.2 Button** | filled variants consume the **action ladder**; outline and text variants consume the **action-rest foreground** |

**`zakhmban-ui-system-spec.md` is not edited by this ruling.** Where the older
canonical wording is ambiguous, or conflicts with the approved Raw/Semantic
distinction, **this later authority ruling governs.**

**The complete component implementation contract is not finished**, and nothing
here claims otherwise.

##### What this approval does not settle

- It **settles no token name beyond the two Raw Palette identifiers** and **no
  representation** — reserved for ADR 0003.
- It **does not resolve the BottomNav 10px size defect**.
- It **does not resolve** the `--text-muted` or neutral-status contrast
  defects. **Both were closed separately on 2026-09-18 by the Owner Contrast
  Ruling**, not by Decisions 12 or 13.
- **Nothing is implemented.** No token file, CSS variable, style or Tailwind
  artifact was created.

---

### Decision 13 · Link colour

**Canonical requirement.** v0.2 §2.1 assigns `--brand-blue` the role
*"Information banners, **links**, wallet identity, deadline countdown, pending
states."* That is the whole of it: no link token, and no hover, visited or
underline rule anywhere in §2, §3, §5 or §6.

**Candidate values** — `kit:colors.css` and `kit:base.css`:

| Concept          | Candidate                                                            |
| ---------------- | -------------------------------------------------------------------- |
| `--text-link`    | `#0383CE` (equals canonical `--brand-green`'s blue peer `--brand-blue`) |
| `--text-link-hover` | `#002A5E` (equals `--brand-blue-dark`, and also `--text-primary`)  |
| Rest state       | `text-decoration: none`; colour transition `var(--dur) var(--ease-standard)` |
| Hover            | colour → `--text-link-hover`, `text-decoration: underline`, `text-underline-offset: 3px` |
| Active           | colour → `--blue-press` `#0062AC`                                    |
| Focus            | `outline: none`; `box-shadow: var(--focus-ring)`; `border-radius: var(--radius-xs)` |
| Visited          | **not defined**                                                       |

**Measured contrast.** `--text-link #0383CE` on `--surface #FFFFFF` = **4.08 —
FAILS** §6's 4.5:1 for text; passes 3:1. Link text is body-sized prose, so the
4.5:1 threshold is the applicable one. This is the same family of finding as
decision 12 and needs an explicit answer.

**Caveats.**

1. **On hover, a link becomes `#002A5E` — exactly `--text-primary`.** A hovered
   link is therefore the same colour as surrounding body ink, distinguished only
   by the underline that appears at the same moment. Deliberate or not, it
   should be ratified knowingly.
2. **Links are not underlined at rest**, so a rest-state link is distinguished
   from body text **by colour alone**. §6 states: *"No state is distinguishable
   by colour alone."* Whether that clause governs link affordance or only
   component state is a genuine ambiguity and part of this decision.
3. The focus rule sets `border-radius: var(--radius-xs)`, which is **10px** in
   the kit — a value that is itself unresolved under decision 5. Approving this
   rule as written creates a dependency on that decision.
4. No visited state exists. On the Website — the link-dense, tokens-only
   consumer — visited styling is a normal expectation.

**Options.**

- **APPROVE** — adopt the two tokens and the four state behaviours as written.
- **AMEND** — likely candidates: keep the link colour distinct from
  `--text-primary` on hover; underline at rest; define a visited state; raise
  the rest colour to clear 4.5:1.
- **REJECT** — rule that links reference `--brand-blue` directly with no
  dedicated token, and specify the states separately.

**Impact if approved.** Unblocks legal pages, help content, the entire Website
marketing and blog surface, and the store hand-off links. Website-weighted:
frozen §2.1 gives the Website tokens and formatting only, so it cannot define
this itself.

`[ ] APPROVE   [x] AMEND   [ ] REJECT`

**Amended on every caveat the entry raised.** The rest colour is raised to
clear 4.5:1, the underline is made persistent, hover is kept distinct from
`--text-primary`, and the visited state is explicitly deferred.

#### Evidence record — completed, 2026-09-18

The entry measured the candidate on **white only**. Measured across **all six
documented light backgrounds**, `--brand-blue #0383CE` fails every one —
**4.08 / 3.86 / 3.69 / 3.75 / 3.55 / 3.66** — so the §2.1 link assignment
produces a failing colour everywhere a link can appear, not only on white.

`--blue-500 #016FBB` — **an approved Raw Palette entry bound to no semantic
role** — **passes on all six**. The kit's hover value `#002A5E` measures
**1.00:1 against body ink**, i.e. a hovered link would be *exactly*
`--text-primary`, which is why hover is amended.

---

#### DECISION 13 — APPROVED — ACCESSIBLE INLINE TEXT LINK CONTRACT

**Decided by:** human design/product owner · **Date:** 2026-09-18

| State | Approved treatment |
| ----- | ------------------ |
| **Rest** | **`#016FBB`**, with a **persistent underline at rest** |
| **Hover** | **`#0062AC`**, underline **remains present** |
| **Press** | **`#01356F`**, underline **remains present** |
| **Focus-visible** | the **existing Decision 3b focus indicator**. **No second link-specific focus-ring system.** |

##### Scope

- **inline text links only**;
- **the colour contract is not applied blindly to every `<a>` element**;
- **whole-surface Card and ListRow anchors are not inline text links** — §3.3
  and §3.5 allow both to render as anchors;
- **buttons styled as links are not automatically covered**.

##### Visited

- **Deferred. No visited colour is approved.**
- If a visited state is introduced later it **must be limited to appropriate
  content / history links**.
- **Navigation and application-action links must not automatically receive
  visited styling.**

##### Canonical reassignment

- **Only the *"links"* clause of §2.1 is reassigned away from
  `--brand-blue`.**
- **All other brand-blue roles remain unchanged** — information banners,
  wallet identity, deadline countdown, pending states.
- **`#0383CE` remains the Raw/Brand Identity blue.**
- **`#01356F` remains the Decision 13 link-press value.**
- **`#01356F` is not the blue action-press value.**

##### Evidence

**`#016FBB` passes 4.5:1 on all six documented light backgrounds** —
`--surface`, `--surface-subtle`, `--info-bg`, `--success-bg`, `--danger-bg`
and `--disabled-bg` — with a measured range of approximately **4.58:1 to
5.26:1**.

**The persistent underline satisfies the rule that link identification must not
depend on colour alone** (§6, *"No state is distinguishable by colour alone"*).

##### Shared raw values, separate semantic roles

**One Raw Palette value may support multiple semantic roles, but each semantic
role remains separately defined.** `#0062AC` carries `--info-fg` (Decision 2),
the blue action-hover rung (Decision 12a) and link-hover (this decision).
**These must not be treated as one semantic token merely because they share a
value.**

##### What this approval does not settle

- **Underline thickness, offset and other visual details are not defined** and
  are not approved here.
- It **settles no token name and no representation** — reserved for ADR 0003.
- **Nothing is implemented.**

---

### Decision 14 · Page background vs surface

**Canonical requirement.** v0.2 §2.1: *"`--surface` / `--surface-subtle` |
#FFFFFF · #F7F9F5 | **White is page and card.** Subtle is grouped data rows,
skeletons, image wells — never a full canvas."* The values are fixed; whether
"page" and "card" are one token or two is not.

**Candidate values** — `kit:colors.css` and `kit:base.css`:

| Token              | Candidate | Note                                              |
| ------------------ | --------- | ------------------------------------------------- |
| `--background`     | `#FFFFFF` | `base.css` binds `body { background: var(--background) }` |
| `--surface`        | `#FFFFFF` | canonical                                         |
| `--surface-subtle` | `#F7F9F5` | canonical                                         |
| `--surface-green`  | `#F0F8E7` | duplicate of `--brand-green-soft`                 |
| `--surface-blue`   | `#EAF5FC` | duplicate of `--brand-blue-soft`                  |
| `--surface-red`    | `#FDEBEC` | duplicate of `--brand-red-soft`                   |

**Caveats.**

1. The candidate answers the decision by **splitting the names while keeping the
   values equal** — `--background` and `--surface` both `#FFFFFF`. That reserves
   a future split (desktop surfaces at 1200px may well want a page tone distinct
   from card white) at the cost of two names for one value today. Splitting a
   semantic token later is a **breaking** rename under §2; splitting it now is
   free. That asymmetry is the substance of this decision.
2. **`--surface-green` / `-blue` / `-red` are a third set of names for values
   already carried by `--brand-*-soft` (canonical) and, if decision 2 is
   approved, by `--*-bg` as well.** Three names per value is over-aliasing and is
   recommended for separate treatment — approving decision 14 should not
   silently import them. They are listed here so the choice is explicit.
3. `--background` is named in no canonical source. Adding it is additive and
   non-breaking under §2.

**Options.**

- **APPROVE** — adopt `--background` as distinct from `--surface`, both
  `#FFFFFF`; **and separately decide** the three tinted-surface aliases.
- **AMEND** — adopt `--background` and explicitly reject
  `--surface-green` / `-blue` / `-red`; or keep one token for page and card and
  accept the later breaking rename if a split is ever needed.
- **REJECT** — one token for page and card; no `--background`.

**Impact if approved.** Sets the root background of every screen in four
applications, and decides whether the desktop surfaces of decision 16 have a
token to express a page tone with.

`[ ] APPROVE   [x] AMEND   [ ] REJECT`

**Amended: the roles split, the value does not.** The entry framed the choice
around the candidate `--background` token. The approved ruling separates the
**semantic roles** while keeping **one value**, and imports **no** candidate
name and **none** of the three tinted aliases.

#### Evidence record — completed, 2026-09-18

**§2.1 already names two things.** *"White is page and card"* enumerates
**page** and **card** as distinct nouns sharing a value. It does not say they
are one role, and no canonical rule requires them to remain coupled.

**The kit's two roles already have disjoint consumers.** `--background` is
referenced in exactly **five** places, all of them showcase-harness `body`
rules, plus the one product `body` rule in `kit:base.css`. **No kit component
consumes `--background`, and no kit page-level rule consumes `--surface`.**

**`--surface` is already doing at least five jobs** in the kit — card surface,
navigation/header surface, control surface, a knockout ring colour and a
hollow-marker fill. Of these, **only the Card is canonically assigned**
(§3.5). The rest are evidentiary.

**Phase 1 found the role useful.** Its kit and three shipped applications
carry a page role distinct from card white — `--surface-page` at `#F9FAF7`,
applied to `body` in the Website and hardcoded in Admin. **Supporting evidence
that the role is useful; not authority for its name or its value.**

**Migration surface is zero.** `zakhmban-ui` contains no CSS token
implementation at all, and `zakhmban-therapists` declares no page-background
value.

**Measured, for the surface-subtle boundary.** `--text-muted #8A9384` measures
**3.1879** on `#FFFFFF` and **3.0094** on `#F7F9F5`; a white Card on `#F7F9F5`
separates by only **1.0593:1**.

---

#### DECISION 14 — APPROVED — PAGE BACKGROUND AND SURFACE ARE DISTINCT SEMANTIC ROLES

**Decided by:** human design/product owner · **Date:** 2026-09-18
**Outcome: Option B.**

1. **Page Background is one semantic role.**
2. **Surface/Card is a separate semantic role.**
3. **Both roles map to the approved Raw Palette value `--white` `#FFFFFF`.**
4. **They remain distinct roles even while sharing the same value.**
5. **No Raw Palette value is added.**
6. **No visual colour change is introduced by this ruling.**

**This ruling determines semantic roles and light-theme values only.** It does
**not** determine final CSS-variable, TypeScript, Tailwind or public export
names. **Those representation decisions remain reserved for ADR 0003.**

##### The Page Background role

| | |
| --- | --- |
| **Semantic purpose** | the **outer page / document canvas** |
| **Light-theme value** | **`#FFFFFF`** |
| **Raw Palette mapping** | **`--white` `#FFFFFF`** |
| **Identity** | **it is not the Card/Surface role** |
| **Independence** | **changing its value later must not automatically repaint Cards, controls, navigation surfaces, Modal or BottomSheet surfaces** |

**No evidentiary name is imported as a final public name** — not
`--background`, not `--surface-page`, not `--color-background`. **The Phase 1
value `#F9FAF7` is not imported.**

**Where the role is applied in CSS is not defined here.** The body / global
page-background declaration **belongs to the later Styles stage**.

##### The Surface/Card role

| | |
| --- | --- |
| **Semantic purpose** | **foreground content / container surfaces** |
| **Current explicit canonical consumer** | **Card** (§3.5) |
| **Light-theme value** | **`#FFFFFF`** |
| **Raw Palette mapping** | **`--white` `#FFFFFF`** |
| **Independence** | **independent from Page Background despite sharing the same value** |

The existing `--surface` meaning is **narrowed and clarified** from *"page and
card"* to **the component / content-surface side of the split**.

**Decision 14 creates no final public token naming**, and **does not
automatically import the V2 kit's bindings.** In particular, this ruling
**does not by itself canonically bind**: **Modal · BottomSheet · TopAppBar ·
BottomNav · TextField · Select · OtpInput · SearchInput · Chip · secondary
Button · Avatar knockout rings · Timeline markers · Stepper markers.**

Their current kit bindings are **evidentiary only**. Their exact component
bindings remain **component / Styles decisions** unless another canonical rule
already governs them. **This does not block Decision 14 itself.**

##### The `--surface-subtle` boundary — reaffirmed

**`--surface-subtle` = `#F7F9F5`**, for **grouped data rows · skeletons ·
image wells · other already documented local subtle-surface uses** — and
**never a full-page canvas**.

**`#F7F9F5` is not approved as Page Background**, for three recorded reasons:

- using it for a full canvas would **contradict the existing canonical
  prohibition**;
- it would **worsen the existing `--text-muted` contrast pairing** from
  approximately **3.19:1 to approximately 3.01:1** — *superseded 2026-09-18:
  `--text-muted` was retired, and the equivalent figures for the replacement
  ink `--text-secondary #667085` are **4.9748:1 on `#FFFFFF`** and **4.6961:1
  on `#F7F9F5`**, both passing. **This reason no longer supports the
  rejection**; the other two below do, independently, and **Decision 14 is not
  reopened**;*
- a white Card against `#F7F9F5` would have only approximately **1.06:1**
  colour separation, so it **would not replace the canonical Card border**.

**The three evidentiary aliases `--surface-green`, `--surface-blue` and
`--surface-red` are not imported. They remain outside Decision 14.**

##### Card-separation contract — reaffirmed

Cards are separated from the page by: **a white Card surface · a 1px `--border`
`#E2E6DD` · radius 16px · canonical spacing** — and **no ordinary Card
elevation**.

**Decision 4 is preserved:**

- **elevation remains reserved for BottomNav, BottomSheet and Modal**;
- **a shadow on a bordered Card remains a design defect**;
- **hover elevation is not part of the approved interaction model**;
- **same-colour Page Background and Card Surface must not be used as a reason
  to add Card shadow.**

**On the border measurement.** The audit measured low contrast for `--border`
and `--border-strong`. **Decision 14 does not claim that the Card border
satisfies a 3:1 WCAG control-boundary requirement, and it does not establish
that an ordinary Card boundary is a UI component boundary requiring 3:1.**

> **Clarified 2026-09-18 by the Incidental Accessibility Findings Ruling, and
> Decision 14 is not reopened.** The control-boundary interpretation recorded
> there applies to the **interactive Card** consistently with every other
> control: **the existing low-contrast Card outline must not be the sole
> indicator that a Card is interactive.** An interactive Card must supply
> other perceivable interaction cues together with the approved focus
> treatment. **`--border` is unchanged, and no Card border token is invented.**
> Detailed Card interaction behaviour remains a **component-stage contract**.
Accordingly: **no new canonical accessibility defect is added for `--border`**,
**the observation is not claimed resolved**, and any component-specific
accessibility evaluation is **left to the relevant interactive component
contract**.

##### Rationale

- **§2.1 already names page and card as two distinct things sharing white.**
- **No canonical rule requires them to remain coupled.**
- **Adding a role now is additive and non-breaking** under §2.
- **Splitting one published role later would require a public API rename.**
- **No current V2 consumer migration is required.**
- **`zakhmban-ui` currently contains no CSS token implementation.**
- **`zakhmban-therapists` declares no page-background value.**
- **A future Page Background change must not repaint every Surface/Card
  consumer.**
- **Tokens-only consumers must not have to invent their own Page Background
  semantic role** — frozen §2.1 gives Admin and Website tokens and formatting
  only, and §2 forbids a consumer redefining a semantic token.

**Phase 1's use of a separate off-white page role is recorded as supporting
evidence that the role is useful — not as authority for its name or its
value.** **Dark mode is not relied on as justification.**

##### Ownership boundary

| Owner | Responsibilities |
| ----- | ---------------- |
| **Token Foundation** | existence of the two semantic roles · their light-theme values · their Raw Palette mapping · their semantic independence |
| **Styles** | body background declaration · where Page Background is applied · global layout CSS · Card border implementation · section composition · responsive background treatment |
| **ADR 0003** | final public role names · CSS-variable representation · TypeScript representation · Tailwind representation · aliasing mechanics · how two semantic roles sharing one Raw value remain separately consumable |

**ADR 0003 must not collapse the two roles merely because they currently share
`#FFFFFF`.**

##### Theme boundary

- **Only the light theme is defined.**
- **Dark mode remains explicitly deferred.**
- **No dark value is approved for either role.**
- **No theme-switching strategy is approved.**
- **Decision 14 does not reopen the dark-mode decision.**
- **Role separation is justified independently of dark mode.**

##### Relationship to prior decisions

| Decision | Effect |
| -------- | ------ |
| **Decision 1 — Raw Palette** | **unchanged** — both roles map to the already-approved `--white`; nothing added |
| **Decision 2 — status colours** | **unchanged** |
| **Decision 3b — focus indicator** | **unchanged** |
| **Decision 4 — elevation** | **unchanged and preserved** |
| **Decisions 5 and 6 — geometry** | **unchanged** |
| **Decision 12 — action fills / on-brand foreground** | **unchanged** |
| **Decision 13 — inline-link contract** | **unchanged** |
| **`--text-muted` contrast defect** | open at the time of this ruling — **closed by retirement on 2026-09-18** |
| **neutral-status contrast defect** | open at the time of this ruling — **closed by remapping on 2026-09-18** |
| **ADR 0003** | gains **two distinct semantic roles** to represent |

**No approved decision is superseded or reopened.**

##### What this approval does not settle

- **No final public token name**, for either role.
- **No component binding** beyond Card.
- **No CSS application point** — that is Styles.
- **No dark value** for either role.
- **Nothing is implemented.** No token file, CSS variable, style or Tailwind
  artifact was created.

---

## Part 2 — Evidence-led decisions (4 · 2 approved, 2 partially approved)

These began as **open design questions**. The kit's values were recorded as
starting evidence only and were **not** candidates for ratification, because in
each case the kit either failed to answer the question or answered it in a way
that breached a canonical closure rule.

**Decisions 5, 6 and 7 have since been decided by the owner**, each on a
completed evidence record — the original entries below were accurate but
incomplete, and each is followed by its completion and the ruling it was
decided on. **Decision 16 was split on 2026-09-18**: **16a — the closure and
ownership clauses — is approved**, and **16b — the positive desktop/web token
contract — is deferred**.

---

### Decision 5 · Small-control radius — 10–12 px must become one value

**Canonical:** §2.3 *"Radii: **10–12** small control · 14 input and button · 16
card · 20–24 sheet · pill chip, badge, search."*

**Kit evidence** — `kit:spacing.css`: ships **both** —
`--radius-xs: 10px` (comment: *"small control"*) and `--radius-sm: 12px`
(comment: *"small control / input"*).

**Why this was not a candidate.** The kit does not resolve the range; it ships
two steps where the specification describes one. It therefore **reframed** the
question rather than answering it: *is there one small-control radius, or two?*
Note also that decision 13's candidate focus rule references
`var(--radius-xs)`, so the two decisions are coupled.

**Recorded as still open at issue:** one value or two; and which §3 components
count as "small controls" — the specification fixes the height (40px) but never
enumerates them. Changing this later is **breaking** under §7 (*"altering
geometry tokens"*).

#### Evidence record — corrected and completed, 2026-09-17

The entry above is **accurate but incomplete**. Every statement it makes is
true, but it reads the band off §2.3 and the kit's two token comments alone. A
focused evidence audit added the following, and the ruling below is decided on
the completed record.

**Canonical evidence the entry omitted.**

| Source | Location | Value | Surface | Standing |
| ------ | -------- | ----- | ------- | -------- |
| UI System Specification v0.2 | §2.3 · Shape | **10–12** | "small control", unenumerated | Canonical — a **range**, not a value |
| UI System Specification v0.2 | §3.2 · ImageUploader | **12** — *"Thumbnails are square, radius 12, hairline border"* | ImageUploader thumbnail | **Canonical — an exact value bound to a named component. The only exact canonical radius anywhere inside the 10–12 band** |
| UI System Specification v0.2 | §2.3 · Control geometry | 40px | "small control" | Canonical — a **height**, not a radius; the only other place the phrase carries a number |

**Kit component-level evidence the entry omitted.** The kit's component sources
under `_ref/components/**`, which agree with the compiled `_ds_bundle.js` on
every radius binding, bind the two steps as follows. This is evidence of the
**kit's rendered behaviour**, never authority:

| Kit step | Bound to | Tier | Canonical backing |
| -------- | -------- | ---- | ----------------- |
| 10px | `IconButton` (44×44); `TopAppBar` back affordance (**36×36**); the link `:focus-visible` shape in `kit:base.css`; the `Skeleton` placeholder default | Tier 2 only | **none** |
| 12px | `Button` size **sm** (40px height); `ImageUploader` thumbnail and dashed add target; `OtpInput` cell; screen-level stat strips and image wells | **Tier 1** (`Button`, `OtpInput`) and Tier 2 | **ImageUploader — §3.2** |

Two observations carried into the ruling:

1. The kit's `TopAppBar` back affordance at **36 × 36** is non-conformant with
   §3.3 (*"Back is a 44px button"*) and with §6's 44×44 minimum. That lowers
   the weight of this consumer as evidence. It is **not** a claim that radius
   affects target size, which it does not.
2. **§2.3 conflicts with itself on `Button` size sm.** One line assigns
   *"10–12 small control"* and *"14 input and button"*; the control-geometry
   line fixes a small control at 40px; §3.2 gives Button *"Sizes sm 40"*.
   Button sm is therefore both, under two canonical clauses of equal rank in a
   single section, and precedence cannot resolve it. The kit resolves it to
   12px; the canonical text resolves it not at all. **Resolved by owner ruling
   below.**

**Phase 1 is not corroboration.** The Phase 1 design kit and the three Phase 1
applications carry a **different** radius scale (4 · 6 · 10 · 14 · 20 · 28 ·
pill) on a **different** brand green, and in it **10px is the inputs-and-buttons
radius** — the role V2 assigns to 14px. The numeric overlap is a coincidence of
value, not of role, and creates no support for 10px here.

---

#### DECISION 5 — SMALL-CONTROL RADIUS — APPROVED

**Decided by:** human design/product owner · **Date:** 2026-09-17
**Outcome:** the canonical **10–12px** small-control band resolves to **one**
approved geometry value: **12px**.

**This is a band resolution.** It is **not** a definition of the radius family,
**not** a closure of that family, and **not** a statement that the complete
radius scale is approved.

| Band | Canonical statement | Approved resolution |
| ---- | ------------------- | ------------------- |
| Small control | §2.3 *"10–12 small control"* | **12px — one value** |

##### Acceptance basis

1. The canonical specification **permits 12px as an endpoint** of the 10–12px
   small-control band (§2.3).
2. The **ImageUploader specification gives an exact canonical 12px radius** for
   its square thumbnails (§3.2).
3. The **V2 design kit corroborates 12px for ImageUploader geometry**.
4. The **V2 design kit also uses 12px for OtpInput cells**, and `OtpInput`
   belongs to the **frozen Tier-1 primitive** set.
5. **No exact canonical component binding supports 10px.** Canonically, 10
   appears only as a range endpoint.
6. The kit's **10px consumers are Tier-2 icon-oriented surfaces**, and one
   observed `TopAppBar` back affordance is **non-conformant with the canonical
   44×44 minimum target requirement**.

##### Scope rulings recorded with this approval

- **ImageUploader thumbnails use the approved 12px geometry.**
- **OtpInput cells use the approved 12px small-control geometry.**
- **No second 10px small-control step is approved.**
- **10px must not be represented as an approved public radius** merely because
  it exists in the evidence kit.
- **Existing kit usage of 10px is migration evidence only.** It confers no
  claim to an approved value here.

##### What this approval does not settle

- It **does not approve 10px**, in any form and under any name.
- It **does not define or close the radius family**; values outside the 10–12px
  band are untouched by it.
- It **settles no name and no representation** — see the ADR 0003 boundary
  recorded after Decision 6b.
- **Nothing is implemented.** No token file, CSS variable, style or Tailwind
  artifact was created.

---

#### BUTTON-SM CONFLICT — RESOLVED

**Decided by:** human design/product owner · **Date:** 2026-09-17

The canonical ambiguity is resolved explicitly. **The specification's explicit
*"14px input and button"* rule governs Button geometry at every Button size,
including Button sm.**

**Button sm having a 40px height does not move it into the 12px small-control
radius band.**

| Surface | Radius | Standing |
| ------- | ------ | -------- |
| Button size **sm** | **14px** | Governed by §2.3's *"14 input and button"* |
| Button size **md** | **14px** | Governed by §2.3's *"14 input and button"* |
| Button size **lg** | **14px** | Governed by §2.3's *"14 input and button"* |
| **TextField** | **14px** | Unchanged canonical value (§2.3; §3.2 *"48px, radius 14"*) |
| **Select** | **14px** | Continues to use the documented TextField geometry (§3.2 *"Same geometry and states as TextField"*) |

This resolves the three-way conflict between §2.3's *"10–12 small control"*,
§2.3's *"14 input and button"*, and §3.2's Button sm height of 40px.

**Control height is not radius ownership.** A control's height does not place
it in a radius band, and the 40px figure in §2.3's control geometry must not be
reinterpreted as assigning one.

**Decision 5 does not change the already canonical 14px input/button
geometry**, and **no Button-specific token name is created** by this
resolution.

**Consequence for the kit evidence:** the kit's `Button` size sm at 12px is
**superseded by this ruling** and is migration evidence only.

---

### Decision 6 · Sheet radius — 20–24 px must become one value

**Canonical:** §2.3 as above; §3.4 *"BottomSheet … Radius 20–24."*

**Kit evidence** — `kit:spacing.css`: ships **both** —
`--radius-xl: 20px` (*"bottom sheet"*) and `--radius-2xl: 24px` (*"large
sheet"*).

**Why this was not a candidate.** Same reframing as decision 5, and it implies
a size distinction — "bottom sheet" versus "large sheet" — that no canonical
source mentions.

**Recorded as still open at issue:** one value or two; and whether Modal shares
the sheet radius. §3.4 gives BottomSheet a radius and Modal none, and Modal is
application-owned, so an unstated Modal radius is a value four teams will each
invent. BottomSheet is one of the five frozen primitives, so this blocks
**package** work, not only application work. Breaking under §7.

#### Evidence record — corrected and completed, 2026-09-17

The entry above is **accurate but incomplete**. Every statement it makes is
true — §3.4 does give BottomSheet a radius and Modal none — but it reads the
kit off its **token comments** and does not record the kit's **component
bindings**. On the completed record the kit does not merely reframe the
question: it answers it for both surfaces, and its comments contradict its own
components.

**Kit component-level evidence the entry omitted**, from
`_ref/components/feedback/**`, agreeing with the compiled `_ds_bundle.js`:

| Surface | Kit component binding | Value | Corners |
| ------- | --------------------- | ----- | ------- |
| **BottomSheet** | `BottomSheet.jsx` — the two upper corner properties, each set to the kit's 24px step | **24px** | **Upper two only** |
| **Modal** | `Modal.jsx` — a single full-surface radius set to the kit's 20px step | **20px** | All four |

**The kit's token comments and its component bindings disagree.** The comment
labels the 20px step *"bottom sheet"*, yet the kit's bottom sheet renders at
**24px**; the comment labels the 24px step *"large sheet"*, and **no canonical
source has a "large sheet"**. The distinction the kit actually draws is
therefore **Sheet versus Modal**, not bottom sheet versus large sheet.

**Usage census across the V2 kit.** The 20px step has exactly **one** consumer
— `Modal`. The 24px step has exactly **one** consumer — `BottomSheet`, on its
two upper corners.

**Corner geometry is a canonical gap.** §3.4 gives BottomSheet a number and
says nothing about which corners it applies to. Both evidence sources — the V2
kit and the Phase 1 kit — independently round **only the two upper corners**,
though their numeric values differ (24px and 20px respectively). Both express
that with **physical** corner properties, which §5 forbids in component source.

**Phase 1 disagrees with the V2 kit on sharing.** In the Phase 1 kit, Sheet and
Modal both use one 20px step; in the V2 kit they differ. Phase 1 is a different
artifact on a different brand and a different radius scale, and is reference
evidence only.

**Canonical linkage between Modal and BottomSheet is behavioural, not
geometric.** §3.4 gives Modal *"Same dialog semantics as BottomSheet"*, and §9's
note says both *"owe the identical dialog, focus-trap and escape-handling
duties"* and that the application's Modal *"is expected to reuse the package's
focus mechanics"*. Semantics, focus and Escape — never geometry.

---

#### DECISION 6a — SHEET RADIUS, BOTTOMSHEET — APPROVED

**Decided by:** human design/product owner · **Date:** 2026-09-17
**Outcome:** the canonical **20–24px** Sheet band resolves, **for
BottomSheet**, to **24px**, applied to the **two block-start corners only**.

Decision 6 is **split** into **6a — BottomSheet geometry**, approved here, and
**6b — Modal geometry**, deferred below. Decision 6 is therefore **partially
approved and not closed**.

##### The approved geometry

| Surface | Approved radius | Corners it applies to | Remaining corners |
| ------- | --------------- | --------------------- | ----------------- |
| **BottomSheet** | **24px** | The two corners on the **block-start edge** — visually, its two upper corners | The **block-end** corners remain **unrounded** |

**Direction-safety is part of the approval.** The geometry is recorded in
RTL-safe conceptual terms: the *block-start* edge, never a left/right pair. A
future implementation must use logical corner treatment equivalent to
**border-start-start-radius** and **border-start-end-radius**. **Physical
left/right corner properties must not be copied into the future
implementation** — even though the two upper corners are symmetric and the
rendered result would be identical, §5 forbids `left`/`right` in component
source, and both evidence sources violate that rule.

No CSS, no implementation syntax and no token name is created by this approval.
The two logical property names above identify the **equivalent treatment** a
future implementation must use; neither is an approved public API.

##### Acceptance basis

1. **24px is a canonical endpoint** of the documented 20–24px Sheet band (§2.3,
   §3.4).
2. The V2 kit's **actual BottomSheet component renders with 24px on its two
   upper corners**.
3. **Both the V2 and Phase-1 evidence independently agree that BottomSheet
   rounds only its two upper corners**, although their numeric values differ.
4. **BottomSheet is a frozen Tier-1 primitive**, so leaving its geometry
   unresolved blocks package work in this repository.
5. Where the V2 kit's **token comment conflicts with the actual BottomSheet
   component binding**, the **component binding is the stronger evidence of the
   kit's rendered behaviour**.

**This evidence-ranking statement does not turn the kit into canonical
authority.** Ruling B stands unchanged: the kit remains upstream working
material and an evidence source. Point 5 ranks two layers *within* one evidence
source; it promotes neither the source nor the kit. **The owner is ratifying
24px from the available evidence**, exactly as Ruling B governance clause 2
contemplates.

##### What this approval does not settle

- It **does not approve 20px**. See 6b.
- It **does not approve a Modal radius**, and implies none.
- It **does not define or close the radius family**.
- It **settles no name and no representation** — see the ADR 0003 boundary
  below.
- **Nothing is implemented.**

---

#### DECISION 6b — SHEET RADIUS, MODAL — DEFERRED

**Decided by:** human design/product owner · **Date:** 2026-09-17
**Outcome:** Modal geometry is **deferred**. **20px is not approved.**

##### Findings recorded with this deferral

- **The canonical specification provides no exact Modal radius.** §3.4's Modal
  entry specifies title, consequence sentence, confirm and cancel, an 8px
  fade-up and dialog semantics — and no radius.
- **The V2 and Phase-1 kits provide evidence for a 20px Modal radius**,
  consistently and full-surface in both.
- **That evidence does not by itself create canonical authority.**
- **Canonical documentation links Modal and BottomSheet for dialog semantics,
  focus management, Escape handling and accessibility duties — not geometry**
  (§3.4, §6, §9).
- **No canonical rule requires Modal and BottomSheet to share a radius.**
- **A shared-radius rule must not be inferred** — not from that behavioural
  linkage, not from Decision 4a's pairing of the two surfaces under elevation,
  and not from Phase 1's practice of sharing one value between them.
- **Modal is Tier 2**, and its deferral does **not** currently block the Token
  Foundation package primitives.

##### Status of the 20px candidate

- **Approving BottomSheet at 24px does not approve 20px as part of the radius
  family.**
- **20px remains an evidentiary Modal candidate only.**
- **A later owner ruling may approve, reject or replace that candidate.**
- **Decision 6b remains open.**

As under Decision 4b, deferral is the cheap direction: under §2, *adding* a
value later is additive, while publishing one and later removing it is breaking
across four applications.

---

#### DECISION 9 BOUNDARY — NOT REACHED BY DECISIONS 5, 6a OR 6b

Recorded here so that no reader infers otherwise from Decisions 5, 6a or 6b.

> **Subsequently decided.** Decision 9 was approved on its own evidence on
> 2026-09-17 as **component-specific Checkbox geometry** — recorded in Part 3.
> Everything below remains true and unchanged: it records what Decisions 5, 6a
> and 6b did **not** do, and the later ruling reached Checkbox on canonical
> §3.2 evidence rather than through any radius band.

**Decision 9 — the Checkbox radius of 6px (§3.2) — was untouched by those
three rulings.** It is:

- **not approved** by Decisions 5, 6a or 6b;
- **not rejected**;
- **not renamed**;
- **not absorbed** into another radius;
- **not rounded** to the nearest approved value;
- **still a separate component-specific decision.**

**Decisions 5 and 6 do not define the complete radius scale.** Each resolves
one canonical band — the 10–12px small-control band and the 20–24px Sheet band.
The Checkbox value lies outside both, and nothing in either ruling reaches it.
In particular, no "nearest step" or "off-scale" argument from either ruling
transfers to Decision 9.

The Phase 1 numeric coincidence is not corroboration either way: the Phase 1
kit defines a 6px step, but its own Checkbox uses the 4px step.

---

#### ADR 0003 BOUNDARY FOR DECISIONS 5, 6a AND 6b

Decisions 5, 6a and 6b record **values and component/surface coverage only**.
They establish **none** of the following:

- CSS custom-property names;
- TypeScript names;
- Tailwind keys;
- primitive aliases;
- semantic aliases;
- numeric scale names;
- public export paths;
- implementation representation.

All representation and naming questions **remain reserved for ADR 0003**, which
is **not written**. Kit token identifiers appear in the evidence records above
as **provenance citations only**; none is an approved name, and none may be
used as one.

---

### Decision 7 · Body weight — 400–500 must become one value

**Canonical:** §2.2 *"`--text-body` | 15px / 1.68 | **400–500** | Default body."*

**Kit evidence** — `kit:typography.css` defines the four weight values
(`--weight-regular: 400`, `-medium: 500`, `-semibold: 600`, `-bold: 700`) but
**binds no weight to any type step**. `kit:base.css` sets
`body { font-weight: var(--weight-regular) }`, implying 400.

**Why this was not a candidate.** The kit expresses 400 as a **base-stylesheet
behaviour**, not as a declared token or a design statement. An implementation
default is not a design decision and must not be ratified as one.

**Recorded as still open at issue:** 400 or 500, declared. Consequence to
weigh: at 500, `--text-body` and `--text-label` share a weight and differentiate
on size alone (15px vs 13px). This is the single most-rendered value in the
product.

#### Evidence record — completed, 2026-09-17

The entry above is accurate. A focused evidence audit added the component-level
evidence it did not carry, and the ruling below is decided on the completed
record.

**Component-level kit evidence.** From `_ref/components/**`, agreeing with the
compiled bundle. This is evidence of the **kit's rendered behaviour**, never
authority:

| Body-size site | Weight | What it actually is |
| -------------- | ------ | ------------------- |
| Four sites declaring no weight (Select, SearchInput, Tag, one screen) | **inherited 400** | ordinary prose and control text |
| `ListRow` title | 500 | a **component title**, not prose — and it **conflicts** with §2.2, which assigns ListRow primary to the 16px / 600 card-title step |
| `Timeline` node title | 500 | a **component title**, not prose |
| Remaining sites | 600 / 700 | headings and emphasis surfaces, outside the Body role |

**No evidence source anywhere assigns weight 500 to ordinary Body prose.** Every
500 at Body size is a component title.

**The kit's governing pattern.** Where the specification states an **exact**
weight — label 500, button 600 — the kit binds it in component source. Where the
specification states a **range** — body 400–500, caption 400–500 — the kit binds
nothing and lets the base-stylesheet 400 carry it. The kit reproduces the
canonical ambiguity; it does not resolve it.

**Phase 1, reference evidence only.** The Phase 1 typography system resolved the
equivalent Body role to **400 declaratively** — bound in a role class in both
the Phase 1 kit and the shipped Website — on a different scale (16px body) and a
different brand. The role mapping is precedent; the sizes are not.

---

#### DECISION 7 — BODY WEIGHT — APPROVED

**Decided by:** human design/product owner · **Date:** 2026-09-17
**Outcome:** the canonical **400–500** Body weight band resolves to **400**.

**This resolves the Body weight cell only.** It is **not** a definition of the
typography family, **not** a closure of that family, and **not** a statement
that the complete typography system is approved.

| Band | Canonical statement | Approved resolution |
| ---- | ------------------- | ------------------- |
| Body weight | §2.2 *"`--text-body` \| 15px / 1.68 \| **400–500** \| Default body."* | **400** |

##### Acceptance basis

1. **400 is a canonical endpoint** of the documented Body range (§2.2).
2. The **V2 kit's inherited Body default renders at 400** (`kit:base.css`).
3. **Genuine body-prose sites that declare no special component weight render
   at 400.**
4. The **Phase-1 typography system resolved the equivalent Body role to 400
   declaratively.**
5. **No evidence source assigns 500 to ordinary Body prose.**
6. Kit occurrences using Body size with weight 500 are **component titles rather
   than prose**, and at least one — `ListRow` — **conflicts with the canonical
   Card-title / ListRow-primary assignment**.
7. Choosing 400 **preserves the canonical distinction between Body and the exact
   500-weight Label role**, which otherwise differentiate on size alone.
8. **Real Vazirmatn 400 files exist for the Arabic/Persian, Latin and Latin-ext
   subsets**, so **no synthetic weight is required**.

##### Body role — recorded with this approval

- **Body is one closed typography role.**
- **Body size remains 15px.**
- **Body line height remains 1.68.**
- **Body default weight is 400.**
- Decision 7 **does not create** body-large, body-small, body-medium or
  body-emphasis roles.
- **Ruling B's rejection of the kit's additional Body steps remains
  unchanged.**

##### The Text weight-prop ambiguity — resolved

§3.1 gives the canonical `Text` component a `weight` prop while §2.2 binds a
weight per type step. The two were never reconciled. They are reconciled here:

**The approved 400 value is the default for the Body role, not an absolute
prohibition on the canonical Text weight prop.** However:

- the weight prop **must not create a new typography role**;
- it **must not introduce a value outside the canonical closed weight set of
  400, 500, 600 and 700**;
- an override **must be supported by an explicit component or semantic
  contract**;
- **implementation convenience or visual preference is not sufficient
  justification**;
- **no currently approved ordinary Body-prose use requires an override from
  400.**

**This is behavioural scope only.** It defines **no** TypeScript prop type and
**no** implementation representation; those remain for ADR 0003 and the
implementation stage.

##### What this approval does not settle

- It **does not approve 500** for Body, in any form or under any name.
- It **does not define or close the typography family**, and does not approve
  the complete typography system.
- It **settles no name and no representation**, and **no font family, font
  format, delivery mechanic or fallback stack** — see the typography ADR 0003
  boundary recorded after Decision 8.
- **Nothing is implemented.** No token file, CSS variable, style, Tailwind
  artifact, font file or `@font-face` declaration was created.

---

### Decision 16 · Desktop / web scale for Website and Admin

**Canonical:** §1 and §2.3 fix a **390px design width**; §2.2 closes the type
scale at eight steps; §2.3 permits **only** the spacing steps 4–40. Frozen
Technical Architecture v1.1 §2.1 gives Admin and Website *"tokens and formatting
only"* — neither may define a token of its own under §2's ownership rule.

**Kit evidence** — `kit:typography.css`, `kit:spacing.css`:
`--text-display-web: 44px` / `--lh-display-web: 1.22` · `--text-body-lg: 16px` /
`--lh-body-lg: 1.72` · `--space-12: 48px` · `--space-16: 64px` ·
`--page-pad-wide: 20px` · `--web-max: 1200px` · `--web-gutter: 24px`.

**Why this is not a candidate.** Under Ruling B governance clause 3, the two
extra type steps and the two extra spacing steps are **rejected** as breaches of
§2.2's *"closed: eight steps"* and §2.3's *"Allowed steps only"*. They are
retained here as evidence that a web tier was contemplated and roughly sized —
not as values available for ratification. `--web-max`, `--web-gutter` and
`--page-pad-wide` breach no closure rule, but they are container and layout
concepts the canonical token set does not currently have a category for, so they
cannot be ratified into a category that does not exist.

**Recorded as still open at issue, and structural:** whether the Token Table is
mobile-only (leaving two tokens-only consumers structurally unable to comply
with §2's ownership rule), extended now with a web tier, or extended later by a
versioned addition. This question gated the desktop half of the migration plan.

#### Evidence record — completed and corrected, 2026-09-18

The entry above is accurate. A focused evidence audit added the component-,
consumer- and breakpoint-level evidence it did not carry, and the rulings below
are decided on the completed record. One statement in it is narrower than the
evidence supports and is corrected here.

**Correction — "a category that does not exist".** The entry says `--web-max`,
`--web-gutter` and `--page-pad-wide` *"are container and layout concepts the
canonical token set does not currently have a category for, so they cannot be
ratified into a category that does not exist."* The conclusion stands; the
reason is too narrow. §2.3's **control geometry** clause is canonical prose
that already carries non-scale geometry — *"Tap minimum 44px · small control
40 · input 48 · primary button 52 · app bar 56 · bottom nav 64 + 20 safe area.
Design width 390px."* — including a **width**. A container width is the same
kind of quantity and would therefore **not** breach §2.3's *"Allowed steps
only"*, which governs the **spacing scale**. What is missing is not a category
but an **approved value with a confirmed consumer**, and that is exactly what
Decision 16b defers.

**The kit's web tier is declared, described and not built.** The kit
`readme.md` states the intent — *"Website: 1200px max content width, 24px
gutters, sticky header, 6-up category rows, 4-up product grids, 3-up article
rows"* — but `--web-max` and `--web-gutter` are referenced **nowhere** in
`_ds_bundle.js`, in any `_ref/components/**` file or in any kit CSS;
`--app-width` likewise has **zero** consumers. The kit's website screen wraps
thirteen sections in a `wrap` class that **is defined in no file in the
supplied material**. The kit contains **no `@media` rule at all**, and **no
kit component has any responsive behaviour**.

**Nine distinct layout breakpoints are in force across the evidence, none
tokenised and none documented** — 430, 620, 720, 860, 900, 940 and 980px as
hand-written `max-width` queries, plus Tailwind v4's 640, 768 and 1024px
defaults, inherited by three applications that override none of them. One role
disagrees with itself: the Phase 1 kit's `Header.jsx` collapses its navigation
at **860px**, and the shipped `SiteHeader.tsx` — the same role in the same
repository — at **980px**.

**Container widths conflict inside one repository.** `zakhmban-website`
declares `--container-max: 1200px` and uses it in four places, while **22 page
containers use Tailwind's `max-w-7xl` = 1280px** and two more use 1080px.
`zakhmban-admin` has **no page container at all** — a fixed 260px sidebar and
a full-bleed main region. The sidebar value drifts too: **260px** in the
Phase 1 kit and in Admin, **264px** in the shipped Website shop.

**No evidenced value above the approved spacing scale is component spacing.**
Every occurrence of 48, 56, 64, 80 and 96px across all four applications is
page or section composition — `py-*`, `mt-*`, `mb-*`, `space-y-*`, or a grid
gap between page sections. **None is desktop-specific**: the largest cluster,
80px, appears most heavily in the **mobile** PWA on empty and loading states,
and exactly one large-spacing use anywhere sits behind a breakpoint.

**No evidenced typography above the approved scale is product UI typography.**
The only responsive type change in the entire workspace is one marketing hero
heading moving 36px to 48px at weight 800 — a weight §2.2's four-weight
closure does not contain. `zakhmban-admin` declares **no type scale at all**.

**Every gutter value in evidence is already on the approved spacing scale** —
16, 20, 24, 32 and 40. No desktop gutter requires a new value.

**No V2 consumer of any desktop value exists.** No repository declares a
dependency on `@zakhmban/ui`, no tag exists, and the only V2-aligned
repository, `zakhmban-therapists`, contains **zero** responsive constructs.
The three repositories that carry real desktop implementations —
`zakhmban-website`, `zakhmban-admin` and `zakhmban-pwa` — are **Phase 1**
applications on a different brand, a different radius scale and a different
type scale, and are reference evidence only.

**The frozen ownership wording is incomplete on the question Decision 16
asks.** Frozen Technical Architecture v1.1 §2.1 gives Admin and Website
*"tokens and formatting only"*, and §2 forbids a consuming application to
*"define, override, re-declare or shadow a semantic token"*. Neither says
whether a tokens-only consumer may hold a **private layout constant** that the
package has never named. Decision 16a rules on that gap directly, below.

#### DECISION 16a — DESKTOP / WEB SCALE, CLOSURE AND OWNERSHIP CLAUSES — APPROVED

**Decided by:** human design/product owner · **Date:** 2026-09-18
**Outcome:** Decision 16 is **split**. **16a — the closure and ownership
clauses — is APPROVED.** **16b — the positive desktop/web token contract — is
DEFERRED**, and is recorded separately below. **Decision 16a approves no token
value of any kind.**

##### 1 · Meaning of the 390px design width

**390px is a reference design viewport, used for design validation.**

It is **not**:

- a responsive breakpoint;
- a package max-width;
- a minimum supported viewport;
- a universal application width;
- a letterboxing instruction;
- a desktop/mobile transition point.

**It creates no token by itself.**

Canonical basis: §1's *"built at a 390px design width"*; §2.3's *"Design width
390px"* as the closing clause of the **control geometry** sentence; and §6's
*"eleven targets must fit a 390px row"*, which uses it as an arithmetic
premise. No canonical text sets a width on any element, states a viewport
floor, or requires letterboxing. Evidentially, the kit's own `--app-width`
`390px` has **zero consumers**, and the frames that do ship measure 380, 430
and 480px — none of them a canonical constraint.

##### 2 · Spacing scale

**The approved shared spacing scale remains closed: 4 · 8 · 12 · 16 · 20 · 24
· 32 · 40.**

**Decision 16 adds no spacing value.**

Values above the approved scale that occur in page composition or in legacy
applications are **not automatically shared spacing tokens**. Composing an
existing step needs no token, and page-composition rhythm is application work
under §7.1. Ruling B's rejection of the kit's `--space-12` (48px) and
`--space-16` (64px) is **unchanged**.

##### 3 · Typography scale

**The approved shared typography scale remains closed.**

**Decision 16 adds no desktop display size, no font size, no line height and
no font weight.**

Legacy marketing typography is **migration evidence only**. Ruling B's
rejection of the kit's `--text-display-web` (44px / 1.22) and `--text-body-lg`
(16px / 1.72) is **unchanged**, and Decisions 7 and 8 are untouched. Font
family and font delivery are **separate decisions** and are not addressed
here; they were recorded on 2026-09-18 by the Owner Font Contract and Delivery
Ruling, which adds **no size, no line height and no weight** and therefore
leaves Decision 16a's closure of the typography scale intact.

##### 4 · Application-owned composition

The following remain **application-owned** unless a later canonical decision
promotes a proven shared role into `zakhmban-ui`:

- page templates;
- page grids;
- column counts;
- navigation information architecture;
- sidebar widths;
- device-frame widths;
- marketing hero composition;
- application tables;
- application-specific layout transitions.

**Applications may hold private layout constants for these
application-specific concerns.** Such constants:

- **must not use or shadow package semantic-token names**;
- **must not override or redeclare package-owned semantic tokens**;
- **must not be presented as shared design-system values**;
- **must not be copied across applications as an unofficial shared contract.**

**If a value gains cross-application semantic meaning, it must be proposed and
ratified in `zakhmban-ui` before being treated as shared.**

This clause resolves the gap the audit identified in the frozen wording:
*"tokens and formatting only"* describes what the two applications
**receive**, not what they may **own**. It grants no authority to define,
override or extend a shared token, and it is **not** a general exception to
§2's ownership rule.

##### 5 · Navigation and component transformation

**Decision 16 adds:**

- **no shared desktop navigation component**;
- **no shared desktop sidebar component**;
- **no BottomSheet-to-Modal responsive transformation**;
- **no responsive behaviour to any Tier 1 primitive.**

**Mobile chrome remains outside Token Foundation.** TopAppBar, BottomNav, the
docked action block, the status strip and the single-scrolling-region rule
stay where §3.3, §4.1, §7.1 and §9 put them. The BottomSheet-to-Modal case is
refused on evidence as well as on principle: §9 links the two components by
their **dialog, focus-trap and escape-handling duties**, never by a
transformation, and no artifact in the workspace implements one.

##### 6 · Existing decisions are unchanged

Decision 16a **does not alter**:

- **Decision 10 — Chip minimum geometry.** The 44px minimum is
  width-independent. **No target or control size is reduced because a desktop
  pointer may exist**, and no artifact in the workspace contains a
  `pointer: fine` or `hover: hover` query by which pointer type is even
  detected.
- **Decision 11 — ScaleSelect and the deferred 200% prototype.** Untouched.
  The deferred question is **text zoom and operability**, which occur at every
  viewport width; **desktop width does not bypass the prototype requirement**.
- **Decision 14 — Page Background and Surface/Card semantics.** Untouched. No
  media query in any artifact changes a background.
- **Decision 15 — the global layering roles.** Untouched. No media query in
  any artifact changes a z-index.

#### DECISION 16b — POSITIVE DESKTOP / WEB TOKEN CONTRACT — DEFERRED · ADDITIONAL ARCHITECTURE / CONSUMER EVIDENCE REQUIRED

**Decided by:** human design/product owner · **Date:** 2026-09-18
**Outcome:** **Deferred.** **No breakpoint, container role, container maximum
width or responsive-gutter token is approved.**

##### What Decision 16b owns

- which V2 applications require a shared responsive contract;
- the intended form factor of Website and Admin;
- the exact shared breakpoints;
- the named layout transition associated with each breakpoint;
- the shared container roles;
- the exact container maximum widths;
- the responsive page-gutter mapping;
- the resulting Token Foundation values;
- the resulting CSS custom properties;
- the resulting Tailwind `screens` / `maxWidth` mappings.

##### Why it is deferred

- **No V2 Website or V2 Admin consumer currently exists.** Frozen §2 names
  repositories #6 and #7; the workspace holds Phase 1 applications of those
  names.
- **No current application consumes `@zakhmban/ui`.** No repository declares
  the dependency, and no tag exists to pin.
- **Canonical documentation does not define the form factor of Website or
  Admin.** Frozen §2 records their **contents**; neither it nor UI System
  Specification v0.2 states whether either is mobile, desktop or responsive.
- **Phase 1 and legacy evidence conflicts** — 860 against 980 for one header
  collapse, 1200 against 1280 against 1080 for one page container, 260 against
  264 for one sidebar.
- **Legacy values must not be promoted into V2 merely because they exist.**
  The Phase 1 applications run a different brand green, a different radius
  scale, a different type scale and a fifth font weight; several of their
  values contradict approved decisions on this sheet.
- **Selecting values now would manufacture design readiness.** A shared
  breakpoint must name the layout transition it governs, and a container role
  must have a confirmed consumer. Neither exists for a V2 surface.

##### Explicit non-approvals

- **No breakpoint is approved.** **Tailwind's defaults are not adopted as
  product decisions**: three applications inherit 640 / 768 / 1024px because
  they override nothing, and inheritance is not a design decision.
- **No container width and no container role is approved.** The candidate
  roles — standard content container, reading measure, wide application
  workspace, full-bleed content, mobile device frame — have **zero confirmed
  V2 consumers between them**.
- **No responsive-gutter token is approved.** The values in evidence are
  already approved spacing steps; what is unsettled is the **mapping**, and
  the mapping depends on breakpoints that do not exist.
- **No Phase 1 value is imported** — not its 13-step spacing scale, not its
  44px display size, not its fifth weight, and not `--container-max`,
  `--container-pad` or `--pwa-max`.

##### Why deferral is the cheap direction

As under Decisions 4b and 6b: under §2, **adding** a semantic token later is
additive, while publishing one and later renaming or retiring it is a
**breaking change across four applications**.

#### TOKEN FOUNDATION / STYLES / APPLICATIONS / ADR 0003 BOUNDARY FOR DECISION 16

- **Token Foundation currently owns no Decision 16 desktop breakpoint and no
  Decision 16 container value.** Decision 16a fixes closures and ownership; it
  supplies no value for Token Foundation to hold.
- **Styles may later own responsive rules and container classes derived from
  approved tokens — and no such values are approved by Decision 16a.** Any
  future container rule is additionally bound by §5: logical properties only,
  no `left` or `right`.
- **Applications own their private page composition**, under the restrictions
  in clause 4 above.
- **ADR 0003 will later define representation only, and only after Decision
  16b or another canonical ruling supplies approved values.** **ADR 0003 does
  not exist.** Decision 16a adds nothing to its input list, because it creates
  no value and raises no representation question.

#### RELATIONSHIP TO PRIOR DECISIONS — DECISION 16a

- **Decisions 5, 6a and 9 radii: unchanged** — no media query in any artifact
  changes a radius.
- **Decision 6b Modal radius: still deferred**, and **no Modal width is
  approved** either.
- **Decisions 7 and 8 typography weights: unchanged** — the scale stays closed
  and no weight is added.
- **Decision 10 Chip minimum geometry: unchanged.**
- **Decision 11 ScaleSelect behaviour: still deferred**, and **not** answered
  by viewport width.
- **Decisions 12 and 13 colour: unchanged** — no media query in any artifact
  changes a colour.
- **Decision 14 Page Background / Surface roles: unchanged.**
- **Decision 15 global stacking roles: unchanged.**
- **Dark mode: unchanged and deferred.**
- **RTL rules: unchanged**, and they constrain any future container role.
- **Font family and font delivery: unchanged by Decision 16a**, and since
  decided separately on 2026-09-18 without adding any size, line height or
  weight.
- **ADR 0003: gains nothing from Decision 16a.**

**No prior approved decision is superseded or reopened.**

---

## Part 3 — Original work (5 · 4 approved, 1 partially approved)

The kit holds nothing that resolves these. They were original work before
Ruling B and remain so after it. **Decisions 8, 9, 10 and 15 have since
been decided by the owner**, and **Decision 11 is partially decided with its
final behaviour deferred**; their rulings are recorded after the table.

| #      | Decision                          | Why the kit does not help                                                                                                                                  |
| ------ | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **8**  | Caption weight — 400 or 500 · **APPROVED WITH EXPLICIT ROLE SCOPE**, see the ruling below | The kit **declares no caption weight**, and unlike body it has no base-stylesheet behaviour of its own to imply one; its `kit:typography.css` comment on the caption step reads *"12–13 / regular–medium"*, which restates the canonical range and settles nothing. Carries an accessibility edge: `--text-muted` at the 12px floor is the weakest combination the system permits, and §4.4 places the non-refundability sentence in caption ink. **Corrected 2026-09-17:** every *genuine caption-role* site in the kit inherits 400 — see the completed evidence record below. |
| **9**  | Checkbox radius 6px · **APPROVED**, see the ruling below | The kit has **no Checkbox** — v0.1 decision 4 added it *after* the kit, and the component is absent from every kit file and from its manifest. Nothing to compare. **Corrected 2026-09-17:** "off-scale" overstated it — §2.3's radius list assigns roles to values but, unlike §2.2's *"closed: eight steps"* and §2.3's own *"Allowed steps only"* for spacing, **declares no closure**, so an unlisted component radius breaches nothing. |
| **10** | Chip height vs the §6 44px minimum · **APPROVED**, see the ruling below | A spec-internal conflict: §6 names chips explicitly in the 44px rule and does **not** list Chip in its exception register. The kit's `--control-h-sm: 40px` restates the disputed number and settles nothing. **Corrected 2026-09-17:** the shorthand "§3.2 gives Chip 40px" dropped a decisive word — §3.2 says **"Minimum 40px height"**, a floor rather than a fixed height, so §3.2 and §6 are **not strictly contradictory** and a 44px Chip satisfies both. The remaining tension is §2.3's control-geometry listing *"small control 40"*, which never names Chip. |
| **11** | ScaleSelect at 200% text zoom · **PARTIALLY APPROVED**, final behaviour deferred — see the ruling below | The kit has **no ScaleSelect** — §3.2 calls it *"the only genuinely new primitive in this specification."* The specification itself flags this **UNKNOWN / NEED DESIGN DECISION**; "deferred" is a legitimate answer. **Corrected 2026-09-17:** that statement was accurate but **incomplete** — it covers the kit's component inventory and manifest, and does not record that the **V2 design canvas** contains a static ScaleSelect-like pain-scale row. The canvas is visual evidence only, not operable component evidence. See the completed evidence record below. |
| **15** | Stacking (z-index) scale · **APPROVED**, see the ruling below | The kit defines **no z-index token**, matching the canonical spec's silence. The Phase 1 applications do have a scale, but it includes `--z-toast` for a component §4.5 states does not exist, so it cannot be adopted as-is. **Completed 2026-09-18:** of Phase 1's four `--z-*` tokens, **`--z-dropdown` and `--z-toast` have zero consumers**, and its dropdown layer sits *below* its sticky layer — an ordering the one real menu implementation overrode with a hardcoded value. The V2 kit's only global values are **BottomSheet 40 and Modal 50**, each wrapping its own scrim in **one** z-indexed container ordered by DOM. |

---

### Decision 8 · Caption weight — evidence record completed, 2026-09-17

**Canonical:** §2.2 *"`--text-caption` | 12px / 1.5 | **400–500** | Hint,
timestamp, privacy note. Floor."* §2.1 adds the eligibility rule that
`--text-muted` is *"for 12px captions and hints only, never body copy"*, and
§4.4 places the non-refundability sentence *"in caption ink"*.

**Component-level kit evidence.** From `_ref/components/**`, agreeing with the
compiled bundle. Evidence of the **kit's rendered behaviour**, never authority:

| Caption-ink site | Weight | Genuine Caption role? |
| ---------------- | ------ | --------------------- |
| `ErrorBanner` explanatory prose | **inherited 400** | explanatory prose — canonically unassigned |
| `InfoBanner` explanatory prose | **inherited 400** | explanatory prose — canonically unassigned |
| `CardHeader` subtitle | **inherited 400** | yes, caption-like |
| `ListRow` subtitle | **inherited 400** | yes, caption-like |
| `ListRow` meta | **inherited 400** | metadata — canonically unassigned |
| `Money` تومان unit suffix | 500 | **no** — a currency unit |
| `BottomNav` label | 500 inactive / 600 active | **no** — navigation text |
| Stepper node numeral | 600 | **no** — a numeral badge |

**Role conflation is the central finding.** The kit uses the caption **size**
token more than any other step, but a majority of those sites are not the
Caption **role**. **Every** occurrence at weight 500 or 600 is a navigation
label, a currency unit, a numeral or another non-Caption role. **Size-token
reuse does not create Caption membership.**

**A treatment the canon does not have.** The kit renders banner explanatory
prose at caption *size* with **line height 1.7** — matching neither canonical
Caption (12px / 1.5) nor canonical Body (15px / 1.68). This is part of why the
role assignment for banner prose is recorded as open below.

**Phase 1, reference evidence only.** The Phase 1 typography system resolved the
equivalent Caption role to **400 declaratively**, bound in a role class in both
the Phase 1 kit and the shipped Website, at a different size (13px).

---

#### DECISION 8 — CAPTION WEIGHT — APPROVED WITH EXPLICIT ROLE SCOPE

**Decided by:** human design/product owner · **Date:** 2026-09-17
**Outcome:** the canonical **400–500** Caption weight band resolves to **400**,
**for the four canonically named uses only**.

| Band | Canonical statement | Approved resolution |
| ---- | ------------------- | ------------------- |
| Caption weight | §2.2 *"`--text-caption` \| 12px / 1.5 \| **400–500**"* | **400**, scoped as below |

##### Acceptance basis

1. **400 is a canonical endpoint** of the documented Caption range (§2.2).
2. **Genuine V2 kit caption-role sites render at inherited weight 400.**
3. Kit occurrences using the Caption size at weights 500 or 600 are
   **navigation labels, currency units, numerals or other non-Caption roles.
   Size-token reuse does not create Caption membership.**
4. The **Phase-1 typography system resolved the equivalent Caption role to 400
   declaratively.**
5. **Canonical Body/Caption hierarchy is already expressed through size, line
   height and colour eligibility**; no canonical source requires weight to
   create that hierarchy.
6. **Real Vazirmatn 400 files exist for the Arabic/Persian, Latin and Latin-ext
   subsets**, so **no synthetic weight is required**.

##### Caption role coverage — the explicit scope

Caption at 400 covers **only** the four uses explicitly supported by canonical
documentation:

1. **Hint**
2. **Timestamp**
3. **Privacy note**
4. **The §4.4 non-refundability sentence rendered in caption ink**

**This ruling does NOT automatically assign Caption typography to:**

- **TextField or Select error text**;
- **InfoBanner or ErrorBanner explanatory prose**;
- **ListRow metadata**;
- any other text that merely uses the Caption **size** in the evidence kit.

**Role membership must not be inferred from a shared font size.**

##### Open — typography role assignment

Recorded here as an **unresolved item under the existing open font and
typography design questions**. **No new numbered Token Table decision is
created by it.**

> **Typography role assignment remains open for error text, banner explanatory
> prose and ListRow metadata.**

Why it matters:

- **Error text exists on frozen Tier-1 primitives** — `TextField` and `Select`
  both carry an `error` prop that §2.2 assigns to no type step.
- **Banner prose does not match the canonical Caption or Body treatment in the
  evidence kit** — caption size at line height 1.7 is neither.
- **ListRow metadata uses Caption-like evidence without canonical role
  assignment.**
- **These roles must be assigned before the affected components can be
  implemented without guessing.**

**This open question does not block approving Caption weight 400 for the four
canonically named uses, but it does block complete typography coverage for the
affected components.**

##### What this approval does not settle

- It **does not approve 500** for Caption, in any form or under any name.
- It **does not extend Caption** to error text, banner prose or metadata.
- It **does not define or close the typography family**, and does not approve
  the complete typography system.
- It **settles no name and no representation**, and no font family, font
  format, delivery mechanic or fallback stack.
- **Nothing is implemented.**

---

#### BODY–CAPTION RELATIONSHIP — NO RULE EXISTS, AND NONE IS CREATED

**Decisions 7 and 8 are two separate decisions**, recorded separately, even
though both resolve to **400**.

- **No canonical Body–Caption weight relationship exists.** §2.2 gives each
  token an independent weight cell; neither cites the other, and both carry the
  identical 400–500 range, so the canon permits the two to be equal, or either
  to be heavier.
- **These rulings do not create one.**
- **Caption is not required to be lighter or heavier than Body.**
- **Both values independently resolve their respective canonical bands** on
  their own evidence and their own component sets.
- **Their matching numeric value must not be treated as a shared token or an
  alias decision.** Naming and aliasing remain for **ADR 0003**.

The hierarchy the canon does establish between the two roles is built from
**size** (15px versus 12px), **line height** (1.68 versus 1.5) and **colour
eligibility** (§2.1 — muted ink for captions and hints only, never body copy).
Weight is not part of it.

---

#### CONTRAST DEFECTS — NOT MITIGATED BY DECISION 8

**Decision 8 does not mitigate or resolve** the two open canonical contrast
defects:

- the **≈3.19:1 `--text-muted`** defect;
- the **≈3.01:1 neutral-status** defect.

**Font weight does not change the documented colour-contrast ratios.** WCAG
contrast is computed from foreground and background colour alone. This matters
specifically here because `--text-muted` is the caption ink, so Decision 8
styles text that carries an open defect while doing nothing whatever about it.

No claim is made or implied that weight 400 or 500 affects WCAG contrast
compliance.

**Closed 2026-09-18 by the Owner Contrast Ruling**, and **not** by Decision 8.
The retirement of `--text-muted` changes **which ink** Decision 8's four
canonically named caption uses are rendered in — readable de-emphasis is now
`--text-secondary #667085` — and changes **nothing** about Decision 8 itself.
**The approved Caption weight remains 400**, its four-use role scope is
unchanged, and **Decision 8 is not reopened or reinterpreted.** The
observation above stands as originally recorded: weight never affected the
ratios, and the defect was resolved by a colour ruling, not a weight one.

---

#### FONT DELIVERY — EVIDENCE RECORD, DECIDED 2026-09-18

**This was recorded under Decisions 7 and 8 as evidence only, and was the
record the Owner Font Contract and Delivery Ruling was decided on.** Preserved
in full; one bookkeeping change is disclosed after it.

> **Font family and font delivery remain separate open work and are not
> resolved here.** The following is recorded as **evidence**, never as
> implementation work and never as a statement that the existing setup is
> implementation-ready:
>
> - **Real Vazirmatn 400 and 500 files exist for the Persian and Latin
>   subsets**, so **both audited values can render without synthesis**.
> - The **current Therapist App imports 400, 500, 700 and 900 — but not 600**.
> - **Canonical typography requires 600** (page title, section title, card
>   title and every button label).
> - **900 is outside the canonical four-weight set** of 400 / 500 / 600 / 700.
> - **Repositories currently use divergent fallback stacks.**
> - **Static-versus-variable delivery remains unresolved.**
> - **Residual IRANYekan references remain Phase-1 migration evidence.**
>
> **No consumer repository is modified by this ruling, and font delivery is
> not resolved by it.**

*Bookkeeping: the heading changed from* "EVIDENCE ONLY, STILL OPEN" *to record
that the questions have since been decided. No finding or figure is altered —
every statement above still describes the state at the time of Decisions 7
and 8, and the Therapist App and PWA still import 900 and still omit 600.*

**Decided 2026-09-18 by the Owner Font Contract and Delivery Ruling**, which
is recorded in its own section below. **Decisions 7 and 8 are not reopened by
it**: their approved weights are unchanged, and the ruling adds no size, no
line height and no weight.

#### PERSIAN AND PRODUCT-LANGUAGE BOUNDARY

The current canonical product direction is **Persian-first, RTL-only**, with
**mixed Latin technical values where documented** (§5 — request and wound codes,
tracking numbers, filenames, version strings, phone entry, OTP cells, IBAN, each
in an isolated inline span). **Bilingual and LTR product modes are not current
canonical scope** and are not described as such here.

**The same numeric weight applies to Persian and to isolated Latin runs**,
because the documented system uses **one Vazirmatn family** and **real files
exist for both subsets**. No script-specific weight override is created.

**Optical comparison on real Persian copy is recorded as a future visual
validation concern**, not as a separate weight rule.

---

#### ADR 0003 BOUNDARY FOR DECISIONS 7 AND 8

Decisions 7 and 8 record **values and role coverage only**. They establish
**none** of the following:

- CSS custom-property names;
- TypeScript names or prop types;
- Tailwind `fontWeight` keys;
- primitive or semantic aliases;
- runtime exports;
- public paths;
- file structure;
- generated artifacts;
- static or variable font-delivery mechanics;
- fallback-stack implementation.

All naming and representation questions **remain reserved for ADR 0003**, which
is **not written**. **Font family and font-delivery mechanics were separate
decisions and were recorded on 2026-09-18** by the Owner Font Contract and
Delivery Ruling; **Decisions 7 and 8 are neither reopened nor extended by it**,
and the weight values they approved are unchanged. Kit and consumer token
identifiers appear in the evidence records above as **provenance citations
only**; none is an approved name, and
none may be used as one.

---

### Decision 9 · Checkbox radius — evidence record completed, 2026-09-17

**Canonical:** §3.2 *"**Radius 6**, green fill when checked"*, in the same bare
exact form the specification uses for TextField's *"48px, radius 14"* and
Card's *"radius 16"*. §3.2 also fixes the interactive contract: *"Native
`input[type=checkbox]` with a real `<label>`; **the 44px target includes the
label**; groups use a labelled fieldset."*

**No canonical source contradicts the value.** §2.3's Shape list neither names
Checkbox nor declares itself closed.

**Component-level evidence.**

| Source | Finding | Standing |
| ------ | ------- | -------- |
| V2 design kit | **No Checkbox exists** — absent from every file and from `_ds_manifest.json`. v0.1 decision 4 added Checkbox *after* the kit | Evidentiary — **nothing to compare** |
| Phase 1 kit · `components/forms/Checkbox.jsx` | Visible box **20 × 20px** at the Phase 1 **4px** step; the native input is `opacity: 0` and 20 × 20; the wrapping `<label>` has **no `min-height`**, so the labelled control is not guaranteed ≥44px; **no focus styling** | Reference only — and three defects a V2 implementation must not copy |
| Phase 1 kit · `tokens/layout.css` | Phase 1 defines a 6px step, but **its own Checkbox uses the 4px step** | Reference — a numeric coincidence, **not corroboration** |
| `zakhmban-ui`, `zakhmban-therapists` | **No Checkbox anywhere.** V2 migration surface is zero | Evidentiary |

---

#### DECISION 9 — CHECKBOX RADIUS — APPROVED

**Decided by:** human design/product owner · **Date:** 2026-09-17
**Outcome:** the approved Checkbox **visible-box** radius is **6px**, recorded
as **component-specific Checkbox geometry**.

**It is NOT approved as:**

- a **general radius-family step**;
- a **reusable public radius token**;
- a **numeric radius-ladder entry**;
- a **replacement for Decisions 5 or 6a**;
- a **closure of the radius family**.

##### Acceptance basis

1. **§3.2 provides an exact canonical Checkbox radius of 6px.**
2. **No canonical source contradicts that value.**
3. **The canonical radius-role list is not declared closed** — unlike §2.2's
   closed type scale and §2.3's *"Allowed steps only"* for spacing.
4. **The V2 evidence kit contains no Checkbox**, so no competing V2 component
   value exists.
5. **Phase 1 uses a different Checkbox radius and a different radius scale**,
   so it is migration/reference evidence only.
6. **Publishing a general radius step for one known consumer would pre-empt
   ADR 0003 and create an unnecessary breaking-change risk** — the same
   reasoning that deferred the general elevation tiers under Decision 4b.

##### Recorded explicitly with this approval

- **Decisions 5 and 6a remain unchanged.**
- **The approved 12px small-control band does not absorb Checkbox.**
- **The approved 24px BottomSheet geometry is unrelated.**
- **Checkbox 6px does not define the complete radius family.**
- **No token name or implementation representation is approved.**

##### Checkbox target-size boundary

**Checkbox radius and Checkbox target size are independent.** The canonical
distinction is preserved exactly:

| Concept | Rule |
| ------- | ---- |
| Visible Checkbox box | **6px radius applies here** |
| Complete interactive target | **includes the real associated label** (§3.2) |
| Minimum for that complete labelled target | **the canonical 44px minimum** |
| Visible Checkbox square | **not required to be 44 × 44px** |
| Accessibility effect of the radius | **none** — 6px creates **no** target-size or accessibility compliance claim |
| Focus indicator | **Decision 3b's approved indicator remains unchanged.** The outset ring follows the box's corner curvature; its layers, colours, thickness and acceptance basis are untouched |

No DOM or CSS implementation is specified.

##### Open — the visible Checkbox square dimension

Recorded as an explicit **unresolved geometry question** under the existing
open component-geometry questions. **No new numbered Token Table decision is
created by it.**

> **The canonical specification does not define the visible Checkbox square
> dimension.**

- **Radius 6px is approved despite this separate omission.**
- **The component cannot be implemented without choosing a visible box
  dimension.**
- **Phase 1's 20 × 20px box is evidence only.**
- **No box dimension is approved in this task.**
- **The question must be resolved before Checkbox implementation.**
- **It is not a new radius decision.**

---

### Decision 10 · Chip height — evidence record completed, 2026-09-17

**Canonical, quoted precisely.** §3.2 gives Chip *"**Minimum 40px height**"* —
a floor, not a fixed height. §6 requires *"44×44px minimum for anything
tappable, **including icon-only actions, chips**, clear buttons and thumbnail
removals. **Spacing may not be used to justify a smaller target.**"* §6's
exception register lists **only ScaleSelect**; **Chip is absent from it**. §6
also requires that *"Layouts survive 200% text zoom without clipping — **no
fixed heights on text containers**"*. §2.3's control-geometry line carries
*"Tap minimum **44px** · small control 40"* in a single sentence and **never
names Chip**.

**Component-level evidence.**

| Source | Finding | Standing |
| ------ | ------- | -------- |
| V2 kit · `_ref/core/Chip.jsx` | Renders `<button type="button">` with a **fixed** `height: var(--control-h-sm)` = 40px, pill radius | Evidentiary — **below the §6 minimum**, and its *fixed* height is the very thing §6's zoom clause forbids |
| V2 kit · same | **No `aria-pressed`, no `aria-expanded`, no `role="group"`** — zero occurrences anywhere in the kit's component sources | Evidentiary — implements **none** of §3.2's ARIA contract |
| V2 kit · whole bundle | **Zero `tabIndex`, zero `ArrowLeft`/`ArrowRight`** handlers | Evidentiary — implements **none** of §6's arrow-key contract |
| V2 kit · screen containers | Chip rows use `gap: var(--space-2)` = **8px**; several rows **wrap** | Evidentiary — the adjacency arithmetic |
| V2 kit · `tokens/spacing.css` | `--control-h-sm: 40px` has exactly **two** consumers: `Chip` and `Button size sm` | Evidentiary |
| Phase 1 kit · `product/Chip.jsx` | `<button>` at **28px / 34px** — *below* 40, with a nested keyboard-unreachable remove control | Reference — **worse**, and supports no argument for 40 |
| Phase 1 kit · `feedback/Tag.jsx` | *"Removable metadata tag… **Distinct from Chip (which is interactive/selectable)**"* — a `<span>` | Reference — Phase 1 made the presentational split with a **separate component**, not a Chip variant |
| `zakhmban-ui`, `zakhmban-therapists` | **No Chip anywhere.** V2 migration surface is zero | Evidentiary |

**Because the kit implements neither the ARIA nor the keyboard half of the
canonical Chip contract, it cannot be cited as evidence that a 40px Chip is
operable or compliant.**

---

#### DECISION 10 — CHIP HEIGHT — APPROVED

**Decided by:** human design/product owner · **Date:** 2026-09-17
**Outcome:** the visible **interactive** Chip must have a **minimum height of
44px**.

**This is minimum-height behaviour, not a fixed height.** The Chip **may grow
beyond 44px** when required by:

- text content;
- Persian line height;
- text zoom;
- user font settings;
- content wrapping where permitted.

**The visible Chip and its interactive target coincide.** **No invisible
expanded-target model is created.** The canonical interactive target remains at
least **44 × 44px**; Decision 10 resolves the **height** conflict and **does
not weaken the minimum inline target requirement**.

##### Acceptance basis

1. **§3.2 says Chip has a minimum height of 40px — not a fixed height of
   exactly 40px.**
2. **A 44px Chip satisfies the component's documented minimum.**
3. **§6 requires at least 44 × 44px for tappable controls and names Chips
   explicitly.**
4. **Chip is not listed in the canonical accessibility-exception register.**
5. **No forcing layout constraint comparable to ScaleSelect requires a Chip
   exception** — ScaleSelect's 36px was accepted only because eleven targets
   must fit a 390px row, and only with compensating arrow-key operation and
   full per-cell labels. Chips are few and they wrap.
6. **§6 prohibits fixed heights on text containers at 200% text zoom**, so the
   ruling must be expressed as a **minimum**.
7. **No V2 component or consumer currently implements Chip, so migration cost
   is zero.**

##### Chip role ruling

- **Canonical Chip is always interactive.**
- **Selection Chips** are interactive button-like controls with the documented
  `aria-pressed` / `role="group"` behaviour.
- **Filter Chips** are buttons with the documented `aria-expanded` behaviour.
- **Presentational state markers belong to StatusBadge** — a separate
  component in a separate §3 group, with no click handler, which no canonical
  source equates with Chip.
- **No presentational Chip variant is approved.**
- **No removable Chip variant is approved.**
- **Chip's canonical pill geometry remains unchanged.**
- **Decision 10 changes only the minimum interactive height.**

**No new ARIA role and no new component variant is invented.** Every already
documented keyboard, focus and state obligation is preserved unchanged —
§6's arrow-key traversal with a single tab stop for chip groups, Decision 3b's
approved focus indicator, and §6's requirement that a chip's pressed state
carry a word or glyph and never colour alone.

##### Open — the Button size sm height conflict

Recorded as a **separate unresolved component-geometry question** under the
existing open questions. **No new numbered Token Table decision is created by
it.**

> **Button size sm is canonically documented at 40px while the universal
> 44 × 44 minimum applies to anything tappable.**

- **Decision 10 is scoped to Chip.**
- **It does not silently change Button sm height.**
- **Decision 5 resolved Button radius, not Button height** — and expressly
  recorded that a control height is not radius ownership.
- **Button sm's 40px-versus-44px conflict remains open.**
- **It must be resolved before Button implementation.**
- **No Button height ruling is made here.**

##### Open — Chip state coverage

Recorded as a **non-blocking open implementation-contract question**:

- **Chip hover is not explicitly listed in the canonical Chip states**
  (§3.2 lists unselected, selected, disabled, with count).
- **"Pressed" may refer to `aria-pressed` selection rather than a transient
  pointer press** — §6 mentions *"a chip's pressed state"* in its
  non-colour-signalling rule.
- **Generic interaction colours exist** (Decision 3a, approved) **but they do
  not automatically assign states to Chip.**
- **This question does not affect the approved 44px minimum.**
- **State coverage must be clarified before Chip implementation without
  guessing.**

**It is not resolved here.**

---

#### RELATIONSHIP TO PRIOR DECISIONS — DECISIONS 9 AND 10

- **Decision 9 does not modify Decisions 5 or 6a.** 6px lies outside both
  resolved bands; the approved 12px small-control band does not absorb
  Checkbox, and the approved 24px BottomSheet geometry is unrelated.
- **Decision 10 does not modify Decisions 7 or 8.** Those resolve typography
  weight cells; Chip text remains `--text-label` at its exact canonical 500,
  which neither decision touched.
- **Checkbox radius and Chip height are separate decisions**, recorded
  separately, on different evidence and different components.
- **Chip pill geometry remains canonical and untouched** — §2.3 assigns pill to
  chip, badge and search, and no decision on this sheet has ever reached it.
- **Button radius 14px remains unchanged**, as ruled under Decision 5.
- **Neither Decision 9 nor Decision 10 completes the geometry system.**

---

#### ADR 0003 BOUNDARY FOR DECISIONS 9 AND 10

Decisions 9 and 10 record **geometry and component coverage only**. They
establish **none** of the following:

- token names;
- CSS custom-property names;
- Tailwind keys;
- TypeScript exports;
- implementation technique;
- DOM structure;
- pseudo-element technique;
- public paths;
- generated artifacts.

**ADR 0003 remains responsible for naming and representation**, and is **not
written**. Kit and Phase 1 token identifiers appear in the evidence records
above as **provenance citations only**; none is an approved name.

---

### Decision 11 · ScaleSelect at 200% text zoom — evidence record completed, 2026-09-17

**Canonical.** §3.2 specifies ScaleSelect as *"the 0–10 discrete rating row
used for patient pain … Eleven equal cells, selected cell takes the green
tint"*, with `role="radiogroup"`, *"arrow-key traversal"*, and *"each cell an
accessible radio with a **full-sentence label**"*. §6's exception register
records that *"ScaleSelect's 0–10 cells are 36px tall, below the 44px minimum,
because eleven targets must fit a 390px row. Accepted only with arrow-key
operation and full per-cell labels"* — and then flags the open question
itself: ***"UNKNOWN / NEED DESIGN DECISION — whether to replace it with a
Select at large text sizes."*** §6 separately requires that *"Layouts survive
200% text zoom without clipping — no fixed heights on text containers."*

**Evidence availability — the governing fact for this decision.**

| Question | Finding |
| -------- | ------- |
| Is ScaleSelect in the V2 component kit? | **No.** **Absent from every kit file and from the kit manifest.** §3.2 explains why: it is *"the only genuinely new primitive in this specification"*, added after the kit |
| Is it in any Phase 1 component system? | **No** — no ScaleSelect, no pain-scale, no 0–10 rating component in the Phase 1 kit or applications |
| Has any consumer implemented it? | **No** — nothing in `zakhmban-therapists`, nothing in `zakhmban-ui` |
| Does any artifact exist? | **One.** A **static ScaleSelect-like pain-scale row in the V2 design canvas**, built from **eleven non-interactive `span` elements** |
| Can it be tested at 200% as an accessible control? | **No.** The canvas row has no role, no tab stop and no handlers — **it cannot be operated, so it cannot be tested** |

**What the canvas evidence does and does not establish.** It provides
**concrete visual evidence** — an eleven-cell grid, a 4px gap, a 36px cell
height corroborating §6's figure, and a tinted selected cell. It provides **no
operable component evidence**. Its visible labels are **bare digits**, and
**bare visible digits are not the full-sentence accessible labels** that §3.2
requires and that the exception is expressly conditioned on.

**Layout arithmetic, from canonical values only.** §2.3 fixes a 390px design
width and §4.1 a 16px page padding, giving **358px of content width**. Eleven
cells each 44px wide would need **484px** — 126px more than exists — so the
44px **width** is arithmetically unreachable in one row. The canon states **no
cell width**, **no overflow rule** and **no glyph metrics**, so the 200%
outcome **cannot be computed** from documented values.

**The worksheet's previous statement was accurate but incomplete**, as the
corrected row above records.

---

#### DECISION 11 — SCALESELECT AT 200% TEXT ZOOM — PARTIALLY APPROVED · FINAL BEHAVIOUR DEFERRED · PROTOTYPE REQUIRED

**Decided by:** human design/product owner · **Date:** 2026-09-17
**Outcome:** **definitions and boundaries only.** **The final ScaleSelect
large-text layout is not approved.** Decision 11 is **not fully approved and
not closed.**

##### Part 1 — the 200% text-zoom definition · APPROVED

> **For the ScaleSelect contract, "200% text zoom" means text content enlarged
> to twice its default rendered size while the component must continue
> operating within the same documented layout-width constraint.**

**The acceptance concern is text enlargement** — not merely proportional
full-page magnification where the control and its container scale together.

This definition is supported by the canonical statement *"Layouts survive 200%
text zoom without clipping — **no fixed heights on text containers**"*: the
fixed-height clause is only meaningful under text enlargement, since under
proportional magnification a fixed height scales with everything around it.

**This definition establishes the behaviour to test, not the browser, tool or
automation mechanism used to perform that test.** **The exact test harness
remains an implementation/testing decision.**

##### Part 2 — scope of the 36px exception · APPROVED

- **The existing 36px ScaleSelect-cell exception is limited to the
  default-text presentation.**
- **It does not automatically extend to 200% text enlargement.**
- **Extending it to enlarged text would require a separate owner ruling.**
- **The exception remains unique to ScaleSelect.**
- **It does not extend to Chip, Button or any other interactive control.**
- **Decision 10's acceptance basis remains unchanged** — it rests on
  ScaleSelect's exception being unique and forced, and this ruling keeps it so.

**Canonical conditions that continue to govern the default exception:**

1. **eleven values must fit the documented 390px design**;
2. **arrow-key operation is required**;
3. **every cell requires a full-sentence accessible label**;
4. **the universal target rule remains unchanged outside this explicit
   exception.**

**Visible bare digits must not be inferred to satisfy the accessible-label
requirement.**

##### Part 3 — the fixed-height tension · RULED

The canonical tension, recorded:

- the **exception register states that ScaleSelect cells are 36px tall**;
- the **same accessibility section prohibits fixed heights on text containers
  at 200% text zoom**.

**Owner ruling: at 200% text enlargement, the no-clipping and no-fixed-height
requirement governs.** The default 36px cell height **must not be interpreted
as permission to clip, overlap or hide enlarged text**.

**This ruling does not determine whether the large-text component grows,
wraps, scrolls, transforms, or falls back to another control.** That
behavioural choice **remains deferred**.

##### Part 4 — final behaviour · DEFERRED

**None of the following is approved:**

- a horizontally scrolling row;
- a wrapped multi-row ScaleSelect;
- a vertical ScaleSelect;
- automatic Select replacement;
- an unchanged fixed 36px row at 200%;
- any zoom-specific breakpoint or detection technique.

**Why the behaviour is deferred:**

1. **ScaleSelect exists in no V2 kit component inventory.**
2. **It exists in no Phase-1 component system.**
3. **It exists in no consumer implementation.**
4. **The only artifact is a static design-canvas mockup using non-interactive
   `span` elements.**
5. **That mockup cannot be tested as an operable control.**
6. **The canonical specification does not define cell width, overflow
   behaviour or large-text transformation.**
7. **The actual clipping and focus behaviour cannot be established without a
   working prototype.**

##### Part 5 — Select fallback · CANDIDATE ONLY

- **Select fallback is the only large-text remedy explicitly contemplated by
  the canonical specification.**
- **It is therefore the first candidate that a future prototype should
  evaluate.**
- **It is not approved by this ruling.**
- **Its trigger is not defined.**
- **The future prototype must determine whether the trigger can be stated
  behaviourally and implemented reliably.**
- **No second component identity or ARIA model is approved now.**

**It must not be claimed that ScaleSelect becomes Select at 200%.**

##### Part 6 — prototype requirement

**An operable prototype is required before the final behavioural ruling.** It
must test, at minimum:

1. **Eleven values from 0 through 10 within the documented content width.**
2. **Text enlarged to 200%.**
3. **The two-character value 10 in Persian digits.**
4. **No text clipping or overlap.**
5. **Decision 3b's focus indicator remaining visible and unclipped.**
6. **Selected and focused states remaining distinguishable.**
7. **Selected value remaining visible.**
8. **Full keyboard operation.**
9. **Full-sentence accessible labels.**
10. **RTL value order and arrow-key behaviour.**
11. **The existing 36px default-size exception.**
12. **The canonically contemplated Select-fallback candidate.**

The prototype must **also resolve before implementation**:

- whether **0 appears visually at the right or left**;
- **ArrowLeft / ArrowRight logical behaviour in RTL**;
- **single-tab-stop and roving-tabindex behaviour**;
- **focus versus selection movement**;
- the **disabled state**;
- the **error state**;
- whether **ScaleSelect cells use the approved small-control radius**.

**No prototype is created by this ruling.**

##### Part 7 — Token Foundation boundary

- **Decision 11 creates no token value.**
- **It creates no spacing, radius, breakpoint or zoom token.**
- **ScaleSelect is a Tier-2 application-owned component.**
- **Its large-text behaviour is not part of the `zakhmban-ui` Token Foundation
  implementation.**
- **Deferring final ScaleSelect behaviour does not block Token Foundation
  values or ADR 0003.**
- **The decision remains relevant as a component/accessibility contract for
  later application work.**

**No package implementation obligation is created.**

---

#### RELATIONSHIP TO PRIOR DECISIONS — DECISION 11

- **Decision 3b's focus indicator remains unchanged** — it applies to
  ScaleSelect cells as to every focusable element, and the prototype must
  confirm it stays visible and unclipped rather than alter it.
- **Decision 5's small-control radius remains unchanged.** Whether a
  ScaleSelect cell falls inside that band is Decision 5's still-open consumer
  enumeration, not a Decision 11 question.
- **Decision 9's Checkbox geometry remains unchanged.**
- **Decision 10's Chip minimum remains unchanged**, and its acceptance basis is
  expressly preserved by Part 2 above.
- **The ScaleSelect exception remains unique and confined.**
- **No prior decision is reopened.**
- **Decision 11 does not complete the component behaviour system.**

---

### Decision 15 · Stacking / z-index — evidence record completed, 2026-09-18

**Canonical.** The word `z-index` appears **nowhere** in UI System
Specification v0.2, and neither does *"stacking"*. What canon does fix is
**which surfaces must stack**: §3.3 calls TopAppBar *"Fixed 56px"* and
BottomNav *"the app's **fixed** four-item root navigation"*; §3.1's `Screen`
is *"the app shell: **fixed** app bar, one scroll region, optional **docked
action block**, optional bottom nav"*; §1 principle 3 places the primary
action *"**Docked** above the bottom edge in any flow step"*; §4.1 repeats
*"fixed 56px app bar … **fixed** bottom nav on root screens only"* and forbids
*"a second sticky element competing with the docked action"*; §2.1 names
`--overlay` as the *"Sheet/modal **scrim**"*; and §3.4 requires of BottomSheet
*"scrim, … **background inert**, focus returns to the opener, `role="dialog"`
+ `aria-modal`"*, with Modal owing *"the same dialog semantics"*.

**Excluded by canon, not by preference.** §3.2 lists **Tooltip and Toast**
among *"Deliberately absent"* components, and §4.5 states *"Feedback is in
place, not floating: **this system has no Toast**."* **Dropdown, Menu and
Popover appear nowhere** in §3's thirty-six or §9's inventory. §3.2 makes
Select a *"**Native control** unless a design need forces a listbox."*

**Evidence — the V2 kit.** Its entire global layering is **two integers**:
`BottomSheet.jsx:6` at **40** and `Modal.jsx:8` at **50**. In both, the
**scrim and the dialog surface sit inside one z-indexed container and stack by
DOM order** — neither scrim carries a z-index of its own. Its only other value
is a **local** `zIndex: 1` on a Stepper node. **TopAppBar and BottomNav carry
no z-index and no `position: fixed` in the kit**, so it offers no evidence on
chrome layering. **No `createPortal` and no `isolation` anywhere.**

**Evidence — Phase 1, and why it is not imported.** Its scale is
`--z-dropdown: 1000`, `--z-sticky: 1100`, `--z-modal: 1300`, `--z-toast: 1400`.
**`--z-dropdown` and `--z-toast` have zero consumers.** `--z-modal` is used by
**both** its BottomSheet and its Modal — one value for both dialogs. And its
dropdown layer sits **below** its sticky layer, an ordering the one real
mega-menu implementation overrode by hardcoding a value above the header.
Consumer drift compounds it: hardcoded sticky and menu values alongside the
tokens, Tailwind `z-10/20/40/50/60` utilities in parallel with a 1000-series
scale, and a **Toast at `z-[60]`** in a Phase 1 admin application — a component
canon forbids.

**Migration surface is zero.** `zakhmban-ui` contains **no z-index, no
positioning, no portal and no `isolation`**, and `zakhmban-therapists` has **no
z-index anywhere**.

---

#### DECISION 15 — APPROVED — MINIMAL GLOBAL STACKING SCALE

**Decided by:** human design/product owner · **Date:** 2026-09-18

**Exactly three tokenised global semantic roles are approved:**

| Role | Exact integer |
| ---- | ------------- |
| **Application Chrome** | **10** |
| **Scrim** | **20** |
| **Dialog Surface** | **30** |

**Required order:**

```text
ordinary content  <  Application Chrome  <  Scrim  <  Dialog Surface
   (no token)              (10)              (20)         (30)
```

**Ordinary content receives no stacking token.** It remains normal document
flow using **`z-index: auto`**. **No base/zero role is published or approved.**

This ruling determines **the global role set · exact integer values · exact
relative order · global versus local boundaries · the required
stacking-context constraint**. **Final public names and delivery
representation remain reserved for ADR 0003.**

##### Application Chrome — 10

**Confirmed consumers: TopAppBar · BottomNav · docked action block.**

- **All three must paint above normal page content.**
- **Canon does not establish a required relative z-order among them.**
- **They therefore share one global layer.**
- **TopAppBar and BottomNav occupy opposite edges.**
- **Docked action versus BottomNav coexistence remains a Screen/layout
  concern**, not a stacking one.
- **Sharing one layer does not authorise visual overlap.**
- **Sharing one layer does not establish DOM order between them.**
- **§4.1's prohibition against a second sticky element competing with a docked
  action remains unchanged.**

**No separate TopAppBar, BottomNav or docked-action stacking token is
created.**

##### Scrim — 20

**Confirmed consumer:** the **`--overlay`-coloured backdrop** used by
BottomSheet and Modal.

**The concerns stay separate:** **`--overlay` remains a colour role**, **Scrim
is a stacking role**, and **sharing a component name does not make them the
same token**.

**An active modal Scrim covers: ordinary page content · TopAppBar · BottomNav
· docked action blocks · all other Application Chrome.**

Reason: **§3.4 requires the background to become inert**; **scrim click closes
the dialog**; and **interactive chrome remaining above the Scrim would violate
the modal interaction contract.**

**The Scrim must remain below its own visible Dialog Surface.**

**Pointer-event CSS, inert implementation and body scroll locking are not
defined in Token Foundation.**

##### Dialog Surface — 30

**Confirmed consumers: the BottomSheet surface and the Modal surface.**

- **BottomSheet and Modal share one global Dialog Surface layer.**
- **Canon establishes no required z-order between them.**
- **Their different Decision 4 shadows do not establish different stacking
  values.**
- **Decision 15 does not approve simultaneous Modal and BottomSheet.**
- **Decision 15 does not approve nested dialogs.**
- **Decision 15 does not approve multiple simultaneous Scrims.**
- **The shared value does not define how two dialogs would order if an
  application later attempted to render them together.**

**Any future support for dialog nesting or simultaneous blocking overlays
requires a separate architecture ruling.**

**The Dialog Surface remains above its own Scrim.**

##### Base content — untokenised

**Ordinary content remains untokenised**: page content · Cards · banners ·
Skeletons · normal in-flow component surfaces. **Normal document flow /
`z-index: auto` is the intended contract.**

**Not approved: a base z-index token · a public zero value · `z-index: 0` as a
universal reset.**

**Reason: setting `z-index: 0` on positioned components can create unnecessary
stacking contexts and trap descendants.**

##### Excluded global roles

**Explicitly excluded from the approved global scale: Dropdown · Menu ·
Popover · Tooltip · Toast.**

- **Dropdown, Menu and Popover are not in the canonical component inventory.**
- **Select remains native unless a future design need forces a custom
  listbox.**
- **A native Select popup is outside the document's CSS z-index model.**
- **Tooltip is deliberately absent** (§3.2).
- **Toast is explicitly forbidden twice** (§3.2 and §4.5).
- **Phase 1's dropdown and toast roles are not imported** — both have zero
  consumers even there.
- **No stacking capacity is reserved for forbidden or unconfirmed
  components.**

**No future placeholder layers are approved.** A future custom listbox or
newly authorised overlay component **requires an additive design/architecture
ruling.**

##### Local z-index values — untokenised

**Local component ordering remains untokenised.** Examples: the Stepper node
over its rail · the Avatar presence badge · the BottomNav count badge · the
ImageUploader veil and remove control · the Select chevron · focus-ring
rendering · spinners · decorative pseudo-elements · internal markers and
selected-state indicators.

**These values belong to component implementation and do not participate in
the global scale unless a future cross-component collision proves otherwise.**
**Not every numeric z-index becomes a token.**

##### Stacking-context architectural constraint — approved

> **Global stacking layers must not be trapped inside a component-local
> stacking context.**

- **Exact z-index integers are necessary but not sufficient.**
- **`transform`, `opacity` below 1, `filter` and positioned ancestors may
  create new stacking contexts.**
- **A child with z-index 30 cannot escape an ancestor stacking context.**
- **Decision 15 does not claim its numbers override CSS stacking-context
  rules.**

**The constraint is approved; no specific implementation technique is.**
Possible later techniques **may** include a shared overlay root · portals ·
avoiding transforms on overlay ancestors · local isolation. **These remain for
Styles and Primitives.** **It is not claimed that a Portal or shared overlay
root is already mandated, implemented or canonically selected.**

##### Elevation versus stacking

**Decision 4 is preserved exactly.**

| Surface | Approved visual elevation | Global stacking priority |
| ------- | ------------------------- | ------------------------ |
| **BottomNav** | **yes** | **yes** |
| **BottomSheet** | **yes** | **yes** |
| **Modal** | **yes** | **yes** |
| **TopAppBar** | **no approved shadow** | **yes** |
| **Scrim** | **no shadow** | **yes** |
| **Card** | **no** | **no** |

- **A larger shadow does not imply a larger z-index.**
- **A larger z-index does not authorise a shadow.**
- **Decision 15 does not add an elevation surface.**
- **Ordinary Cards remain in normal flow.**
- **Ordinary Cards do not gain shadow or global stacking semantics.**

##### Numeric value ownership

**The integers 10, 20 and 30 are Token Foundation values approved by
Decision 15. They are not deferred to ADR 0003.**

Reason: **ordering without implementable integer values would leave downstream
implementers guessing**, and **each consumer selecting its own integers would
not constitute one stacking scale** — precisely the Phase 1 outcome recorded
above.

**ADR 0003 still owns** final public names · CSS-variable representation ·
TypeScript representation · Tailwind representation · whether individual roles
are public or package-internal · generation and export mechanics. **No final
variable or export name is created by this ruling.**

##### Ownership boundary

| Owner | Responsibilities |
| ----- | ---------------- |
| **Token Foundation** | the three global semantic roles · integers 10, 20 and 30 · relative order · the global/local distinction · the stacking-context architectural constraint |
| **Styles** | `position: fixed/sticky/absolute` · where z-index is applied · overlay-root styling · portal-container styling · body scroll locking · inert-background mechanics · pointer-event behaviour |
| **Primitives** | Modal and BottomSheet DOM structure · Scrim/Surface DOM order · any portal behaviour · focus trap · Escape handling · focus return · local component isolation |
| **ADR 0003** | final token names · CSS/TypeScript/Tailwind representation · public versus internal exposure · artifact generation |

**No behaviour is moved into Token Foundation.**

##### Future objective test requirements

Recorded for a later implementation; **no test is implemented now**:

- **exactly the three approved global roles exist**;
- **exact integers are 10, 20 and 30**;
- **their ordering is strictly ascending**;
- **no base-content / zero token exists**;
- **no Toast role exists**;
- **no Tooltip role exists**;
- **no Dropdown / Menu / Popover role exists**;
- **Scrim is below Dialog Surface**;
- **Scrim and Dialog Surface are above Application Chrome**;
- **local component z-index values are not exported as global roles**;
- **source / `dist/` parity**;
- **representation parity with generated Tailwind/TypeScript artifacts if
  ADR 0003 includes them**;
- **a consumer import smoke test**;
- **no unexpected runtime dependency.**

##### What this approval does not settle

- **No final public token name**, for any of the three roles.
- **No implementation technique** for escaping stacking contexts.
- **No simultaneous, nested or multiple-overlay behaviour.**
- **No docked-action versus BottomNav layout answer.**
- **Nothing is implemented.** No token file, CSS variable, style or Tailwind
  artifact was created.

---

#### RELATIONSHIP TO PRIOR DECISIONS — DECISION 15

- **Decision 3b focus indicator: unchanged and local** — the approved outset
  ring belongs to its own element and receives no global layer.
- **Decision 4 elevation: unchanged and preserved** — the three approved
  surfaces are untouched, and TopAppBar gains stacking **without** a shadow.
- **Decision 6a BottomSheet geometry: unchanged.**
- **Decision 6b Modal radius: still deferred.**
- **Decision 11 ScaleSelect behaviour: unchanged.**
- **Decision 14 Page Background / Surface roles: unchanged** — colour roles,
  not layers; base content stays in ordinary flow.
- **Modal / BottomSheet accessibility behaviour: preserved** — focus trap,
  Escape, inert background and focus return are Primitives duties and are
  **not** turned into tokens.
- **Dark mode: unchanged and deferred** — stacking is theme-independent.
- **ADR 0003: gains the stacking family to represent.**

**No prior approved decision is superseded or reopened.**

---

## RESOLVED DEFECTS — the Owner Contrast Ruling, 2026-09-18

**Status: BOTH DEFECTS CLOSED.** The neutral-status text defect is **closed by
remapping**; the `--text-muted` defect is **closed by retirement**. The ruling
that closed them is recorded below, after the defect record it acted on.

This ruling is **not** a numbered Token Table decision and is **not**
Decision 17.

### The defect record, as it stood before the ruling

*This is the finding the ruling was decided on, preserved in full. Four
bookkeeping changes were made inside it and are listed so the original is
recoverable: the ratios are restated at four decimal places (3.01 → **3.0094**,
3.19 → **3.1879**) from the same measurements; two verbs move to the past
tense (*"do not meet … as currently valued"* → *"did not meet … as then
valued"*, *"applies"* → *"applied"*); and the trailing clause* "and **both
defects remain open**" *is dropped from the Decisions 12/13 sentence, which
would otherwise contradict the ruling that follows. **No finding, figure or
reasoning is removed.***

> Recorded here because it surfaced while measuring the candidates, and because
> it is **not** a kit problem and **cannot** be fixed by any decision on this
> sheet. Decisions 1 and 2 were approved **without** touching either pair, and
> neither approval may be read as clearing them. **Decisions 12 and 13 likewise
> do not touch either pair** — neither ruling changes `--neutral-status-fg`,
> `--neutral-status-bg`, `--text-muted` or `--surface`.
>
> Both values in each pair are already canonical in v0.2 §2.1, and §6 requires
> 4.5:1 for text:
>
> | Pair | Ratio | 4.5:1 | 3:1 |
> | ---- | ----- | ----- | --- |
> | `--neutral-status-fg #8A9384` on `--neutral-status-bg #F7F9F5` | **3.0094** | **FAIL** | PASS |
> | `--text-muted #8A9384` on `--surface #FFFFFF` | **3.1879** | **FAIL** | PASS |
>
> §6 states that status text uses the `-fg` token on its `-bg`, and permits
> `--text-muted` *"at 12px captions on white only"* — and 12px is not WCAG
> large text, so the 4.5:1 threshold applied in both cases. The fourth status
> tone and the muted caption ink therefore did not meet the specification's
> own stated target as then valued.
>
> This is a defect in the **frozen** token table, not in any candidate.
> Resolving it would change a canonical value and is out of scope for this
> worksheet. It is raised so that the owner sees it before signing the Token
> Table, and so that `--text-muted` and the neutral status tone are not signed
> off as AA-conformant on the strength of §6's wording alone.
>
> **Both defects remain open after the 2026-09-15 ratification round.**
> Neither `--neutral-status-fg`, `--neutral-status-bg`, `--text-muted` nor
> `--surface` was altered, and no decision on this sheet has authority to
> alter them — they are canonical values, and changing one is a change to
> UI System Specification v0.2. They belong to the Token Table human sign-off
> stage. Until they are resolved:
>
> - the **status-colour system is not accessibility-approved as a whole**,
>   even though its three approved tones each pass;
> - the **Token Table is not signed off**.

**On the last point, recorded above and now acted on.** The defect record was
right that **only the owner, at the sign-off stage, could alter these values** —
and that is exactly what the ruling below is. It is the owner exercising that
authority, not a worksheet decision overreaching it. Its two amendments to
UI System Specification v0.2 §2.1 are stated explicitly in §2 and §3 of the
ruling. **The Token Table is still not signed off**, because other items remain
open.

**Evidence completing that record, 2026-09-18.** Of the **30** approved Raw
Palette entries, exactly **one neutral** clears 4.5:1 as a foreground:
`--neutral-600 #667085`, at **4.9748:1** on `#FFFFFF` and **4.6961:1** on
`#F7F9F5`. Every other neutral fails on both surfaces. A background-side remedy
is arithmetically impossible for the status pair: holding `#8A9384` and
lightening the background to pure `#FFFFFF` still yields only **3.1879:1**.
A compliant ink that remained visibly lighter than `--text-secondary` would
have between **1.180 and 2.785 L\*** of room — at or near the perceptual
threshold. The V2 kit's own `InfoBanner` neutral tone had already declined
`--neutral-status-fg` and substituted `--text-secondary`.

---

### OWNER CONTRAST RULING — APPROVED

**Decided by:** human design/product owner · **Date:** 2026-09-18
**Outcome:** both documented contrast defects are **closed**. **No raw palette
entry is added. No public semantic token is added.**

#### 1 · Owner priority — binding

**WCAG-readable text takes precedence over preserving a visually distinct
third de-emphasis ink tier.**

**The project will not add a new colour merely to preserve a 1.18–2.79 L\*
difference that is at or near the perceptual threshold.**

The canonical text hierarchy therefore uses **two readable ink levels**:

- **primary**
- **secondary**

**A third public muted text colour is not part of the approved Token
Foundation.**

#### 2 · Neutral-status foreground — REMAPPED

| | Old | New |
| --- | --- | --- |
| `--neutral-status-fg` | `#8A9384` / `--neutral-500` | **`#667085` / `--neutral-600`** |
| `--neutral-status-bg` | `#F7F9F5` / `--neutral-25` | **unchanged** — `#F7F9F5` / `--neutral-25` |

**Verified contrast: `#667085` on `#F7F9F5` = 4.6961:1 — PASS for normal text
at WCAG AA 4.5:1.**

Recorded with this remapping:

- **No new raw colour is added.** `--neutral-600 #667085` is already approved
  under Decision 1.
- **No new semantic token is added.** `--neutral-status-fg` keeps its name and
  changes only the raw entry it maps to.
- **The background does not change.**
- **Neutral status continues to require a written status label.** §3.5's
  *"Colour is never the only signal — the word carries the meaning"* and §6's
  non-colour signalling rule are unchanged and remain mandatory.
- **Colour is not the sole status signal.**
- **The optional leading dot is reinforcement only**, never the sole carrier of
  the state.

**This amends one value printed in UI System Specification v0.2 §2.1** — the
`--neutral-status-fg` cell of the *"`--neutral-status-fg` / `-bg` | #8A9384 ·
#F7F9F5"* row. The amendment is recorded here, on the precedent of Decision 3b,
which likewise amended canonical rules from this sheet. **UI System
Specification v0.2 itself is not edited by this worksheet.** `-bg` is
unchanged, and no other cell of §2.1 is touched.

##### The Decision 2 rule-9 precedent — clarified, not weakened

Decision 2 rule 9 rejected `--text-primary #002A5E` as `--info-fg` because **an
informational status must remain visibly distinct from primary body ink**.

**That ruling does not prohibit `--neutral-status-fg` from mapping to the same
raw value as `--text-secondary`.** A neutral, archived, closed, expired or
withdrawn status rendered in a **secondary-strength ink is semantically
appropriate** — the status is, by definition, the de-emphasised one. The two
semantic tokens **remain distinct** even while their current raw values are
equal, exactly as Decision 14 keeps Page Background and Surface/Card distinct
at one shared value.

**Decision 2's information-status ruling is neither weakened nor reopened.**
`--info-fg` remains `#0062AC`, and the INFO asymmetry remains ratified as
intentional.

##### §3.5's contrast guarantee — corrected

§3.5's StatusBadge entry states *"`-fg` on `-bg` guarantees contrast."* As
valued before this ruling that sentence was **false for the neutral tone**
(3.0094:1). **It is accurate after this remapping**: all four status
foreground/background text pairs now measure at or above 4.5:1 —
success 5.13, info 5.67, danger 5.27 and **neutral 4.6961**.

**No broader accessibility conformance is claimed.** This statement covers the
four `-fg` on `-bg` **text** pairs and nothing else — not badge fills, not
dots, not borders, not any surface outside that pairing.

#### 3 · `--text-muted` — RETIRED AS A SEMANTIC TEXT TOKEN

**`--text-muted` is retired as a semantic text token, before implementation.**

| | |
| --- | --- |
| Old value | `#8A9384` / `--neutral-500` |
| Contrast on `#FFFFFF` | **3.1879:1** |
| Verdict | **fails the required 4.5:1 for normal text** |

It **must not** be used for **captions, hints, metadata, placeholders,
navigation labels, body text or control glyphs**.

It **must not** be emitted as:

- a public semantic **CSS variable**;
- a **Tailwind** text colour;
- a **TypeScript** semantic token.

##### `--neutral-500` is preserved

**The raw palette entry remains approved, exactly as Decision 1 records it:**

| Raw token | Value | Status |
| --- | --- | --- |
| `--neutral-500` | `#8A9384` | **approved, unchanged, un-renamed** |

**Retiring `--text-muted` does not delete or rename `--neutral-500`, and does
not make it invalid.** It remains a Raw Palette entry with no public semantic
text binding. **Raw Palette tokens remain unavailable for direct component
use** — Decision 1 constraint 2 is unchanged and applies to `--neutral-500`
exactly as before.

##### What this retires in UI System Specification v0.2

**This retires one semantic token printed in §2.1** — the `-muted` member of
the *"`--text-primary` / `-secondary` / `-muted`"* row — together with §2.1's
eligibility clause *"Muted is for 12px captions and hints only, never body
copy"* and §6's *"`--text-muted` is permitted at 12px captions on white only;
it is not a body colour."* Both clauses governed a token that no longer
exists as a public text role, so both lapse with it. **`--text-primary` and
`--text-secondary` are unchanged.** The amendment is recorded here, on the
Decision 3b precedent; **UI System Specification v0.2 itself is not edited by
this worksheet.**

Retirement **before implementation** is the cheap direction. Under §2,
*"renaming or retiring a semantic token is a breaking change"* — but the
package ships **no CSS, no token object and no colour of any kind**, no tag
exists, and **no consuming repository references `--text-muted`**. The
breaking change therefore breaks nothing today, and would not have been free
after the first tag.

#### 4 · Readable de-emphasis contract

**Readable de-emphasised text uses `--text-secondary` `#667085` /
`--neutral-600`.**

This applies to the canonical readable roles:

- captions;
- hints;
- metadata;
- timestamps;
- privacy notes;
- placeholder text when it communicates information;
- supporting labels;
- secondary monetary information.

**Verified contrast:**

| Pair | Ratio | 4.5:1 |
| ---- | ----- | ----- |
| `#667085` on `#FFFFFF` | **4.9748** | **PASS** |
| `#667085` on `#F7F9F5` | **4.6961** | **PASS** |

- **No replacement `--text-muted` alias is created.**
- **Two generic public text-tone names whose only distinction would be a
  duplicate value are not kept.**

#### 5 · Component-contract consequences

Recorded as consequences. **No component is implemented by this ruling.**

1. **Text.** The generic `Text` component **no longer exposes a distinct muted
   text tone**. Readable de-emphasis uses its **secondary** tone. §3.1's tone
   list is reduced accordingly at implementation time; the remaining tones are
   untouched.

2. **Money.** If `Money` retains a domain-level muted presentation, **its
   readable ink maps to `--text-secondary`**. This **does not create or restore
   a `--text-muted` semantic token**.

3. **Card `muted` variant.** §3.5 describes it as *"neutral ink for closed
   items."* **A muted or closed Card must not recolour all card body text with
   `#8A9384`.** Normal readable content continues to use the **primary and
   secondary** text roles. **Closed, archived, expired or withdrawn state is
   communicated through the neutral StatusBadge and its written label.** Any
   additional visual treatment for the variant remains a **component-stage
   decision** and must use approved accessible semantic roles.

4. **V2 kit evidence — classified non-canonical.** The kit's uses of `#8A9384`
   or `--text-muted` for the **Select placeholder** (15px), **Stepper labels
   and numbers**, **inactive BottomNav items**, **dismiss-control glyphs**, and
   any other text outside the former 12px scope are **non-canonical migration
   evidence**. **They do not widen the approved contract.**

#### 6 · What this ruling does not do

- **It adds no raw palette entry.** The palette stays at **30**.
- **It adds no public semantic token.**
- **It changes no background value**, and no value outside the two named roles.
- **It does not resolve Decision 16b**, which **remains deferred**.
- **It does not resolve the incidental accessibility findings** recorded below.
- **It does not settle any name or representation** — those remain reserved for
  **ADR 0003, which does not exist**.
- **Nothing is implemented.** No token file, CSS variable, style, Tailwind
  artifact or source file was created or changed, and **Token Foundation
  implementation has not begun**.
- **The Token Table as a whole is still not signed off.**

#### 7 · Relationship to prior decisions

- **Decision 1 Raw Palette: unchanged.** No entry added, renamed, removed or
  revalued; `--neutral-500` is preserved.
- **Decision 2 status colours: unchanged in value**, and its scope limit is
  lifted for the fourth pair only. **Rule 9 is clarified, not weakened.**
- **Decision 3a / 3b: unchanged.**
- **Decisions 5, 6a, 9, 10: unchanged** — geometry is untouched.
- **Decision 6b: still deferred.**
- **Decisions 7 and 8: unchanged.** Weight never affected a contrast ratio;
  Decision 8's four-use Caption role scope and its approved weight 400 stand,
  now rendered in `--text-secondary`.
- **Decision 11: still deferred**, prototype still required.
- **Decisions 12 and 13: unchanged.** The action ladders, the on-brand
  foreground and the inline-link contract are untouched.
- **Decision 14: unchanged and not reopened.** Page Background and Surface/Card
  remain two distinct roles at `#FFFFFF`. One of its three recorded reasons for
  rejecting `#F7F9F5` as Page Background is superseded; the other two stand
  independently.
- **Decision 15: unchanged.**
- **Decision 16a: unchanged. Decision 16b: still deferred.**
- **Dark mode: unchanged and deferred.**
- **ADR 0003: gains one less public token to represent, and gains the
  requirement that `--neutral-status-fg` and `--text-secondary` stay
  separately representable while their raw values are equal.**

**No prior approved decision is superseded or reopened.**

---

### INCIDENTAL ACCESSIBILITY FINDINGS — RULED, 2026-09-18

**All four are disposed of. One was a Token Table blocker and is CLOSED; the
other three are classified and carried to the stage that owns them.** None
reopens either contrast defect closed above.

#### The findings, as recorded by the Owner Contrast Ruling

*The record the ruling below was decided on, preserved in full. One
bookkeeping change was made inside it: the trailing* "**Unresolved.**"
*marker is dropped from each of the four items, since the ruling that follows
disposes of all four. No finding, figure or reasoning is removed.*

> 1. **Dismiss-control glyph contrast on tinted status backgrounds.** The
>    kit's `InfoBanner` and `ErrorBanner` dismiss `×` renders at `#8A9384`,
>    measuring **2.8790** on `--info-bg #EAF5FC` and **2.7737** on
>    `--danger-bg #FDEBEC` — below 3:1 for an icon-only control's sole visual.
> 2. **`--border-strong #A0A79C` as an interactive control boundary.** It
>    measures **2.4699** on `#FFFFFF`, against §6's own *"3:1 … for control
>    boundaries"*, and §2.3 assigns it to *"an empty upload target"*.
> 3. **Neutral StatusBadge fill visibility against white.**
>    `--neutral-status-bg #F7F9F5` separates from a white Card by only
>    **1.0593:1**, so the badge affordance rests on padding and radius alone.
>    Not a contrast-minimum failure.
> 4. **Direct Raw Palette references in kit evidence.** The kit's `InfoBanner`
>    neutral tone references `var(--neutral-500)` directly, against Decision 1
>    constraint 2. Kit evidence only.

**Evidence completing that record, 2026-09-18.** *Dismiss* appears **nowhere**
in the specification: §3.4 gives InfoBanner `tone` `title` `children` `action`
and ErrorBanner `title†` `children` `retryLabel` `onRetry`, neither declaring
a dismiss prop, and the kit renders the control only behind an optional
`onDismiss`. `--border-strong` appears in exactly **two** canonical sentences
(§2.1's row and §2.3's shape clause), has **one** canonical role and **one**
kit consumer, and in that one use the control is independently identified by a
green **+** glyph at **3.7231** and the visible label «افزودن» at **4.6961**,
both passing. All four tinted status fills sit in the same narrow band against
white — **1.0593**, 1.0889, 1.1073, 1.1494 — so the neutral badge is not an
outlier but a property of the approved four-tone design. Every kit banner
accent already clears 3:1 as a graphic (3.6885 · 3.6221 · 3.9049 · 3.0094).
All four findings concern **Tier 2** components — ImageUploader, ErrorBanner,
InfoBanner and StatusBadge — and **none touches a Tier 1 primitive**.

---

### INCIDENTAL ACCESSIBILITY FINDINGS RULING — APPROVED

**Decided by:** human design/product owner · **Date:** 2026-09-18
**Outcome:** the `--border-strong` Token Table blocker is **CLOSED by
authoritative scope clarification**. **No token value is changed. No token is
added or removed.**

#### IA-1 · Control-boundary interpretation — binding

**The §6 requirement of 3:1 for control boundaries applies to visual boundary
information required to identify a user-interface component or its state, in
alignment with WCAG 1.4.11.**

**It does not mean that every decorative, reinforcing or supplementary outline
drawn around a control must independently reach 3:1 when other visible,
compliant information already identifies the control.**

**A boundary with less than 3:1 must never be the sole visible means of:**

- **locating a control**;
- **identifying that an element is interactive**;
- **distinguishing a control state**;
- **communicating selection, error or focus.**

**If a future control relies on its boundary for any of those purposes, that
boundary must reach at least 3:1 against every adjacent surface.**

This is an interpretation of an existing canonical sentence. It changes no
value, adds no rule the specification did not already carry, and grants no
relief from §6's text, non-colour-signalling, target or focus requirements.

#### IA-2 · `--border-strong` — mapping unchanged, blocker closed

| Token | Value | Raw source | Status |
| ----- | ----- | ---------- | ------ |
| `--border-strong` | `#A0A79C` | `--neutral-400` | **unchanged** |

**Its single canonical role is the dashed 1.5px boundary around an empty
upload target** (§2.1's row; §2.3's *"Dashed 1.5px `--border-strong` marks an
empty upload target"*).

**For that specific target the boundary is supplementary**, because the
control is independently identified by:

| Identifier | Pair | Ratio |
| ---------- | ---- | ----- |
| green plus glyph | `#3C9220` on `#F7F9F5` | **3.7231:1** |
| visible label | `#667085` on `#F7F9F5` | **4.6961:1** |

**The existing dashed boundary is therefore not required to independently meet
3:1, and the Token Table blocker is closed without remapping the token.**

Recorded explicitly with this disposition:

- **`--border-strong` is not an accessibility guarantee by name.**
- **It must not be used as the sole identifier of a control or state.**
- **No new raw colour is added.**
- **No semantic token is added.**
- **No existing value is changed.**
- **`--neutral-500` and `--neutral-600` are not remapped to
  `--border-strong`.** Both were evaluated as candidates and neither is
  adopted; `--neutral-500` remains an approved Raw Palette entry with no
  public semantic binding, and `--neutral-600` continues to serve
  `--text-secondary` and `--neutral-status-fg`.

#### IA-3 · Banner dismiss control — not canonical today

- **A dismiss control is not currently part of the canonical InfoBanner or
  ErrorBanner API.**
- **The kit's optional `onDismiss` control is non-canonical migration
  evidence.**
- **It creates no Token Foundation requirement.**
- **No new icon or control-colour token is required.**

**If a banner dismiss control is approved later:**

- its glyph uses the **§3.1 Icon navy default — `--text-primary` `#002A5E`**,
  which measures **14.0674** on `#FFFFFF`, **13.2793** on `#F7F9F5`,
  **12.7042** on `--info-bg`, **12.2393** on `--danger-bg` and **12.9192** on
  `--success-bg`, clearing both the 3:1 and 4.5:1 thresholds on every surface;
- it must satisfy the **§6 minimum 44×44 target**;
- it must have an **accessible name**;
- its detailed behaviour belongs to the **Tier 2 component contract**.

**The dismiss control is not added to the canonical API by this ruling.**

#### IA-4 · StatusBadge fill — accepted

**The current tinted status-background separation is accepted.**

- `--neutral-status-bg #F7F9F5` on white = **1.0593:1**.
- The other status fills are also approximately **1.06–1.15:1** on white —
  `--success-bg` 1.0889, `--info-bg` 1.1073, `--danger-bg` 1.1494.
- **The fill is not text.**
- **StatusBadge is not interactive.**
- **The written status label is mandatory** (§3.5; §6 non-colour signalling).
- **The label carries the state without relying on colour.**
- **Neutral status text passes at 4.6961:1.**

**This is therefore not a Token Table defect and does not require a border, a
different fill or a new token.** It is kept as a **StatusBadge visual-QA
observation** for rendered component review. **No full accessibility
conformance is claimed.**

#### IA-5 · Raw Palette references — rule reaffirmed

**Decision 1 constraint 2 is reaffirmed: components and consuming
applications must never reference Raw Palette tokens directly.**

- The V2 kit's `var(--neutral-500)` usage is **non-canonical migration
  evidence, not a package defect** — the package ships no component, which
  `tests/architecture/source-entry.test.ts` enforces rather than trusts.
- **The eventual semantic mapping is recorded: the neutral banner accent uses
  `--neutral-status-fg`**, measuring **4.6961** on `--neutral-status-bg`.
  **It must not reference `--neutral-500` directly.**
- **A mechanical Raw Palette usage guard must be introduced with the first
  component implementation commit.** **It is not implemented now.**

#### IA-6 · Banner accent contract — open Tier 2 gap

**The canonical colour contract for banner accent glyphs across the info,
success, danger and neutral tones is not yet defined.** §3.1's Icon contract
names navy, green and red only, and no banner-accent or neutral icon role
exists. **No component contract is invented or approved here.**

This gap:

- **does not block Token Table sign-off**;
- **does not block ADR 0003**;
- **does not block Token Foundation implementation**;
- **must be resolved before InfoBanner or ErrorBanner implementation.**

#### Classification and timing

| # | Finding | Classification | Must be resolved |
| - | ------- | -------------- | ---------------- |
| 1 | Dismiss-control glyph | **COMPONENT-CONTRACT** — deferred | before a dismiss control is added to a Tier 2 banner |
| 2 | `--border-strong` boundary | **TOKEN TABLE BLOCKER — CLOSED** by IA-1 | closed now, by scope clarification |
| 3 | StatusBadge fill | **NON-BLOCKING VISUAL-QA CONCERN** | at rendered component review only |
| 4 | Raw Palette reference | **IMPLEMENTATION MIGRATION RULE** | with the first component implementation commit |
| 6 | Banner accent contract | **OPEN COMPONENT-STAGE GAP** | before InfoBanner or ErrorBanner implementation |

#### What this ruling does not do

- **It changes no token value**, and **adds and removes no token**.
- **It does not reopen either contrast defect closed above.**
- **It does not change `--border`, `--border-strong`, `--neutral-400`,
  `--neutral-500` or `--neutral-600`.**
- **It does not resolve Decision 16b**, which **remains deferred**.
- **It claims no full or broader accessibility conformance** — it disposes of
  four recorded findings and covers no other surface, component or success
  criterion.
- **It settles no name and no representation** — reserved for **ADR 0003,
  which does not exist**.
- **Nothing is implemented.** No token file, CSS variable, style, Tailwind
  artifact or source file was created or changed, and **Token Foundation
  implementation has not begun**.
- **The Token Table as a whole is still not signed off.**

#### Relationship to prior decisions

- **Decision 1: unchanged**, and its constraint 2 is reaffirmed.
- **Decision 2: unchanged.**
- **Decision 3b focus indicator: unchanged**, and IA-1 explicitly preserves
  the focus requirement.
- **Decisions 5, 6a, 9, 10: unchanged.**
- **Decision 14: clarified, not reopened** — the interactive-Card note above
  applies IA-1 consistently and changes no value.
- **Decision 15: unchanged.**
- **Decision 16a: unchanged. Decision 16b: still deferred.**
- **The Owner Contrast Ruling: unchanged**; both its closures stand.
- **ADR 0003: gains nothing from this ruling.**

**No prior approved decision is superseded or reopened.**

---

## FONT CONTRACT AND DELIVERY — the Owner Font Ruling, 2026-09-18

**Status: the font family, fallback stack, delivery model, pinned upstream
artifact, weight contract and licensing basis are APPROVED.** This is **not**
a numbered Token Table decision and is **not** Decision 17.

**No font file has been added. No `@font-face` has been implemented. No token
has been created. No build tooling has been modified. Styles has not begun.**

### Owner-supplied external licensing evidence

Recorded as the licensing basis of this ruling. **Supplied by the owner; the
internet was not accessed and no font was downloaded in recording it.**

| | |
| --- | --- |
| Official project | `https://github.com/rastikerdar/vazirmatn` |
| Official licence | `https://github.com/rastikerdar/vazirmatn/blob/master/OFL.txt` |
| Pinned official release | `https://github.com/rastikerdar/vazirmatn/releases/tag/v33.003` |
| Official variable `@font-face` declaration | `https://github.com/rastikerdar/vazirmatn/blob/master/Vazirmatn-Variable-font-face.css` |

The official licence, as supplied, states:

- **copyright: 2015 The Vazirmatn Project Authors**;
- **licence: SIL Open Font License 1.1**;
- **modified and unmodified copies may be used, embedded and redistributed**;
- **the font software may be bundled with software**;
- **the font software may not be sold by itself**;
- **each distributed copy must include the copyright notice and the OFL
  licence**;
- **the font software remains under OFL 1.1**;
- **no Reserved Font Name is stated after the copyright line** in the official
  licence file.

**This records supplied evidence and the obligations that follow from it. It
is not legal advice, and it claims no right broader than the official licence
text.**

### FAMILY CONTRACT — CONFIRMED

The existing canonical family decision is **confirmed**, not amended:

- **Vazirmatn is the single UI family.**
- **It covers Persian/Arabic and Latin/English text.**
- **Isolated LTR runs do not switch to another family** — §5's `dir="ltr"`
  isolation is a direction rule, never a family rule.
- **Numeric text uses the same family.**
- **No separate English display font is introduced.**
- **No separate numeric font family is introduced.**

#### The approved semantic family token

**One** token is approved:

```text
--font-ui:  "Vazirmatn", "Segoe UI", Tahoma, Arial, sans-serif
```

- **This is the complete approved fallback stack.**
- **Consuming applications must not override or shadow it**, per §2's
  ownership rule.
- **No `IRANSansX` or `IRANYekan` fallback is approved.**
- **Browser and platform glyph fallback may occur after the generic
  `sans-serif`** — that is the platform's behaviour, not an approved tier.
- **No separate emoji or symbol token is created.**

**`--font-numeric` is not created.** The V2 kit declares one with a value
identical to `--font-ui`; it is **not** imported. **Tabular numeric behaviour
remains a typography and style feature expressed through
`font-variant-numeric`, not a second font-family token** — §2.2's rule is
unchanged.

### DELIVERY MODEL — MODEL A APPROVED

**`zakhmban-ui` owns and distributes the approved Vazirmatn font asset.**

The package will eventually ship:

- **an unmodified official Vazirmatn variable WOFF2 asset**;
- **the `@font-face` declaration, through the package Styles artifact**;
- **the official copyright notice**;
- **the complete SIL OFL 1.1 licence text**.

**Consumers obtain the font through the package-owned stylesheet and must not
separately load Vazirmatn through** Google Fonts · jsDelivr or another CDN ·
`next/font` · `@fontsource` · an application-owned `@font-face` · a copied
application-local font file.

**Reasons recorded with this approval:**

- **all consumers must render with the same font build**;
- **Iran and CDN restrictions require self-hosting** — corroborated by
  `zakhmban-website`'s own source comment, *"Google Fonts / CDNs blocked in
  Iran"*, and by the frozen per-host CSP model, which records no third-party
  `font-src` allowance and places CSP in `zakhmban-infra`, never in frontend
  code;
- **PWA and offline behaviour must not depend on a third party**;
- **package-controlled versioning prevents metric drift** — today
  `zakhmban-therapists` pins `@fontsource` `5.3.0` while `zakhmban-pwa` floats
  `^5.2.8`;
- **native weight 600 must be consistently available**;
- **the official licence permits bundling when its conditions are followed.**

**Rejected alternatives, with reasons:**

| Model | Verdict |
| ----- | ------- |
| **B** — package ships family tokens, applications load files | **Rejected.** It would preserve per-application loader, version, subset and weight drift. |
| **C** — applications fully own fonts | **Rejected.** It is the current inconsistent state: four mechanisms, six fallback stacks, two consumers missing weight 600. |
| **D** — split ownership | **Rejected.** Split ownership provides no benefit for one approved family and leaves responsibility ambiguous. |

### PINNED UPSTREAM ARTIFACT — APPROVED PROVENANCE

| Field | Approved value |
| ----- | -------------- |
| Project | **`rastikerdar/vazirmatn`** |
| Release | **`v33.003`** |
| Release commit shown by the official release | **`83629f8`** |
| Format | **variable WOFF2** |
| Style | **normal** |
| Source | **official upstream asset, unmodified** |

**The implementation must record**, with the commit that adds the binary:

- the **exact upstream filename**;
- **complete commit and tag provenance**;
- the **SHA-256 checksum of the adopted binary**;
- the **byte size**;
- **verified glyph coverage**;
- the **copied `OFL.txt` and copyright notice**.

**No checksum is recorded now, because no binary is added by this task.**

- **An unpinned `master`-branch artifact must not be used.**
- **The existing consumer files must not be used merely because they are
  already in the workspace** — neither `zakhmban-website/public/fonts/`
  nor any `@fontsource` binary carries the approved provenance.

### STATIC VERSUS VARIABLE, AND SUBSETS

**One unmodified official variable WOFF2 asset is approved.**

**Not approved:** separate static files per weight · application-specific
subsets · Google Fonts subset artifacts · `@fontsource`-packaged binaries ·
application-owned copies · **custom subsetting during the first
implementation**.

**The first implementation prioritises provenance, consistent glyph coverage
and reproducibility over subset optimisation.** Any future subsetting is a
**separate optimisation decision** and must preserve **OFL compliance, the
required glyph coverage and reproducible checksums**.

### WEIGHTS AND STYLES

**The only approved public weights remain 400 · 500 · 600 · 700.** Decisions 7
and 8 are unchanged, and **no weight is added by this ruling.**

- **All four must be rendered by the real variable weight axis.**
- **Browser-synthesised weight is prohibited.**
- **Weight 600 is mandatory** — §2.2 binds it to page title, section title,
  card title and **every button label**.
- **800 and 900 are not public typography weights.**
- **Italic is prohibited**, as §2.2 and §5 already state.
- **Synthetic italic is prohibited.**
- **Synthetic bold is prohibited.**
- **`font-style` is `normal`.**
- **`font-synthesis` must be disabled by the Styles contract.**

**The underlying variable binary may technically contain a wider axis; the
public token and component contract exposes only 400–700.**

### FONT-DISPLAY AND FAILURE BEHAVIOUR

**`font-display: swap` is approved.**

- **Package CSS owns the eventual `@font-face` declaration.**
- **The approved fallback stack applies while loading and if loading fails.**
- **Applications own optional preload hints**, and **preload is not required
  for correctness**.
- **No runtime JavaScript font loader is permitted.**
- **No network or CDN fallback is permitted.**

**Metric compatibility and layout shift remain rendered-QA concerns**, and no
metric-override or layout-shift requirement is approved here.

### OWNERSHIP BOUNDARY

| Layer | Owns |
| ----- | ---- |
| **Token Foundation** | the **`--font-ui` token name**; the **complete family and fallback value**; the **approved weights**; the **family ownership contract** |
| **Styles** | **`@font-face`** · **`font-display`** · **`font-synthesis`** · **global body font application** · **static typography CSS** · **`font-variant-numeric` application** |
| **Package / build layer** | the **binary font asset** · **licence and copyright files** · **copying required assets to `dist`** · **source/dist byte parity** · **CSS URL correctness** |
| **Applications** | **one root import of `@zakhmban/ui/styles`** · **optional preload hints** · **framework document/head integration** · **removal of previous local loaders during migration** |

**Applications do not own the family, the version, the weights, the files or
the `@font-face`.**

### PUBLIC DELIVERY BOUNDARY

- **Consumers receive the font through `@zakhmban/ui/styles`.**
- **No separate consumer-facing `@zakhmban/ui/fonts` subpath is approved.**
- **Font binaries are internal package assets referenced by package CSS.**
- **Consumers must not deep-import a font file.**
- **Runtime JavaScript is not involved.**
- **The Tailwind font-family mapping must be derived from `--font-ui`**, per
  §2's *"derived, never authored"*.
- **The exact TypeScript and Tailwind representation belongs to ADR 0003.**

**ADR 0003 must determine and verify:** internal source and `dist` paths · the
Styles CSS location · relative CSS URL behaviour · the asset-copy build step ·
committed `dist` artifacts · source/dist checksum parity · bundler **and**
plain-CSS consumption · **whether any export-map adjustment is technically
necessary**.

**No new public subpath is approved as a side effect of this ruling.** **If
implementation later proves that a consumer-reachable asset cannot work
without a new public subpath, work must STOP and the architecture decision be
amended before one is added** — `docs/adr/README.md` makes *"adding a public
subpath that no governing document names"* an ADR trigger, and the exports
contract test asserts exactly the declared subpaths and no wildcard.

### IMPLEMENTATION ACCEPTANCE GATES

**Before the font artifact can be accepted, implementation must objectively
verify each of the following. These are implementation gates, not new design
decisions, and none of them is a Token Table design ambiguity.**

- official **v33.003 provenance**;
- **SHA-256 checksum**;
- **`OFL.txt` presence**;
- **copyright-notice presence**;
- **WOFF2 variable weight coverage for 400–700**;
- **Persian digits U+06F0–U+06F9**;
- **Arabic/Persian shaping**;
- **ZWNJ U+200C** — §5 makes it mandatory in compounds;
- **Latin coverage**;
- **required Latin-extension coverage**;
- **no synthetic 600**;
- **no italic and no synthetic italic**;
- **CSS URL resolution**;
- **offline loading**;
- **source/dist byte parity**;
- **no CDN reference**;
- **no framework-specific dependency**.

### CONSUMER MIGRATION CONSEQUENCES

**Recorded as future migration work. No consumer repository is modified by
this task, and none is modified by this ruling.**

- **`zakhmban-therapists`** removes its `@fontsource` imports, **including the
  extra 900**.
- **`zakhmban-pwa`** removes its `@fontsource` imports, **including the extra
  900**.
- **`zakhmban-admin`** removes its **Google Fonts CDN import**.
- **`zakhmban-website`** removes its **local `@font-face`** and its
  **conflicting font stacks**.
- **All applications remove local `--font-sans` declarations that shadow the
  package token.**
- **The unused IRANYekan assets and the stale `public/fonts/README.md` in
  `zakhmban-website` require a separate cleanup**, after ownership and
  licensing are verified. **IRANYekan is neither approved nor redistributed by
  this ruling.**

### WHAT THIS RULING DOES NOT DO

- **It adds no font file, no `@font-face`, no token, no CSS variable and no
  Tailwind artifact**, and **modifies no build tooling**.
- **It adds no size, no line height and no weight** — Decisions 7, 8 and 16a
  are untouched.
- **It approves no public subpath.**
- **It does not begin Styles**, and **Token Foundation implementation has not
  begun**.
- **It does not resolve Decision 16b**, which **remains deferred**.
- **It settles no name and no representation** — reserved for **ADR 0003,
  which does not exist**.
- **It makes no claim of legal advice** and claims no right beyond the
  supplied official licence text.
- **The Token Table as a whole is still not signed off.**

### RELATIONSHIP TO PRIOR DECISIONS

- **Ruling B clause 4: upheld and generalised.** CDN font delivery stays
  rejected, now for every consumer and every CDN.
- **Decisions 7 and 8: unchanged.** Their approved weights stand; this ruling
  adds none and reopens neither.
- **Decision 16a: unchanged** — the typography scale stays closed.
- **Decisions 1, 2, 3a, 3b, 5, 6a, 9, 10, 12, 13, 14, 15: unchanged.**
- **Decisions 4b, 6b, 11 and 16b: still deferred.**
- **The Owner Contrast Ruling and the Incidental Accessibility Findings
  Ruling: unchanged.**
- **ADR 0003: gains the font family token's representation, the Tailwind
  `fontFamily` mapping derived from `--font-ui`, and the internal path,
  asset-copy and parity questions listed above.**

**No prior approved decision is superseded or reopened.**

---

## INTERACTION LADDER MAPPING — the Owner Ruling, 2026-09-18

**Status: APPROVED.** This is **not** a numbered Token Table decision.

It resolves one ambiguity and nothing else. **No value changes. No raw palette
entry changes. No contrast result changes. It authorises no implementation.**

### The ambiguity it resolves

**Decision 3a** approved six semantic interaction identifiers with values.
**Decision 12a** later approved three-rung action ladders for the same three
tone families, with values and state roles but — by its own statement —
**no identifiers**. Laid side by side, the names and the rungs had come apart:

| Family | 3a `--*-hover` | 3a `--*-press` | 12a **rest** | 12a **hover** | 12a **press** |
| ------ | -------------- | -------------- | ------------ | ------------- | ------------- |
| Green  | `#347F1B`      | `#0C7912`      | **`#347F1B`** | **`#0C7912`** | `#026E1E`     |
| Blue   | `#0273B6`      | `#0062AC`      | **`#0273B6`** | **`#0062AC`** | `#045398`     |
| Red    | `#D51013`      | `#C80303`      | **`#D51013`** | **`#C80303`** | `#B90304`     |

- **3a's *hover* value is the ladder's *rest* rung.**
- **3a's *press* value is the ladder's *hover* rung.**
- **The ladder's *press* rung had no identifier at all.**

A token named `--green-hover` therefore held the value the ladder designates
**rest**. That is a **semantic mapping** question, not a representation one:
the two readings render **different colours on hover**. It is recorded here as
**F-1**, and this ruling closes it.

### The nine approved identifiers and values

**Green action ladder**

| Identifier | Value |
| ---------- | ----- |
| `--action-green-rest`  | `#347F1B` |
| `--action-green-hover` | `#0C7912` |
| `--action-green-press` | `#026E1E` |

**Blue action ladder**

| Identifier | Value |
| ---------- | ----- |
| `--action-blue-rest`  | `#0273B6` |
| `--action-blue-hover` | `#0062AC` |
| `--action-blue-press` | `#045398` |

**Red action ladder**

| Identifier | Value |
| ---------- | ----- |
| `--action-red-rest`  | `#D51013` |
| `--action-red-hover` | `#C80303` |
| `--action-red-press` | `#B90304` |

**These identifiers represent logical semantic token identities.** **ADR 0003
will later determine their exact representation across CSS, TypeScript,
Tailwind, source files, `dist` artifacts and public exports.** **ADR 0003 does
not exist.**

### The six retired identifiers

**Retired:** `--green-hover` · `--green-press` · `--blue-hover` ·
`--blue-press` · `--red-hover` · `--red-press`.

**They must not be implemented, exported, or retained as compatibility aliases
in Token Foundation V1.**

Reasons recorded with the retirement:

- **Token Foundation has not been implemented.**
- **No released consumer contract depends on these identifiers** — no tag
  exists, and no consumer declares the package.
- **Retaining them would preserve misleading state names.**
- **Aliases would create two names for the same semantic roles and weaken the
  canonical contract.**

**Their underlying raw palette values are neither retired nor removed.**
`--green-550 #347F1B`, `--green-600 #0C7912`, `--blue-450 #0273B6`,
`--blue-600 #0062AC`, `--red-550 #D51013` and `--red-600 #C80303` all remain
approved Raw Palette entries, exactly as Decision 1 and its Amendment 1 record
them.

### Decision 3a / Decision 12a reconciliation

This ruling:

- **preserves all nine action-ladder values approved by Decision 12a**;
- **supersedes only the six semantic identifiers approved by Decision 3a**;
- **replaces them with the nine state-aligned action identifiers above**;
- **resolves the F-1 rung-to-name ambiguity**;
- **does not change raw palette values**;
- **does not change contrast results**;
- **does not change the focus contract from Decision 3b**;
- **does not change disabled-state tokens**;
- **does not change inline-link states from Decision 13**;
- **does not change brand identity tokens**;
- **does not authorize implementation.**

**Decision 3a remains part of the historical record.** Its block, and the
scoped amendment recorded under it, stand exactly as written. **Neither is
rewritten as though the original identifiers were never approved** — they were
approved, they were correct when approved, and Decision 12a is what moved the
rungs beneath them.

##### Supersession of UI System Specification v0.2 — exactly one item

**This ruling supersedes exactly one piece of UI System Specification v0.2:
the §2.1 interaction-family shape and count summary**, which describes the
family as *hover / press* with **six tokens**:

> *"`--*-hover` / `--*-press` · 6 tokens · Hover darkens the fill; press
> darkens further + 0.98 scale"*

**Its effective meaning is replaced by:**

- **three filled-action tone families** — green, blue and red;
- **rest, hover and press for each family**;
- **nine logical semantic token identities in total.**

The row's **behavioural rule is preserved, not superseded** — hover darkens
the fill, press darkens further plus `scale(0.98)` — and it is restated in the
state contract below. What is superseded is the **shape and count**: the
`--*-hover` / `--*-press` glob and the *"6 tokens"* figure.

**The supersession takes effect now.** It is **not** deferred to ADR 0003 and
**not** left to a future reissue of v0.2. A canonical specification may not go
on prescribing a six-member family while the higher-authority owner ruling
prescribes a nine-member one, so the scope is fixed here rather than left to
be reconciled later. **ADR 0003 still owns representation** — how these nine
identities are expressed in CSS, TypeScript, Tailwind, source, `dist` and
public exports — and that is a separate question from which family shape is in
force.

**No other part of UI System Specification v0.2 is superseded by this
ruling.** Every other rule, value, component and section remains in force
exactly as printed. **v0.2 itself is not edited** — its text stands as
historical record, and the
[`canonical-document-registry.md`](canonical-document-registry.md)
supersessions index is how a reader learns what replaced this one item.

*Correction, same date: an earlier wording of this section stated that the
ruling superseded nothing in v0.2 while also calling the six-token summary
stale. Those two statements could not both stand. The scope above is the
correct one. No identifier, value or retirement changed in making this
correction.*

### State contract

| State | Meaning |
| ----- | ------- |
| **rest** | the **default enabled filled-action state** |
| **hover** | the **pointer-hover state** |
| **press** | the **active / pressed state** |

For filled actions the progression is:

```text
rest  →  hover  →  press
```

with **increasing visual emphasis / darkness inside the selected tone
family**.

- **Focus remains an independent Decision 3b indicator** and **must not
  replace hover or press.**
- **Disabled remains governed by the canonical disabled semantic tokens.**
- The **`scale(0.98)` press behaviour** and the **120ms transition** are
  unchanged, exactly as the Decision 3a scoped amendment preserved them.

### Scope

**This ruling applies only to the three approved filled-action tone
families — green, blue and red.**

**It does not extend to:** inline links · status badges · neutral actions ·
outline buttons · text buttons · disabled states · visited links ·
component-specific state contracts · future dark mode.

**No additional tone family is created.**

### What this ruling does not do

- **It changes no value**, no raw palette entry, and no contrast result.
- **It resolves no other deferred or open decision** — every one stands
  exactly as it was.
- **It does not sign off the Token Table**, which remains **open, partially
  ratified and not signed off**.
- **It does not make Token Foundation ready for implementation**, and
  **implementation has not started**.
- **It does not resolve every interaction question**, and **component-specific
  states are not resolved**.
- **It settles no representation** — reserved for **ADR 0003, which does not
  exist**.
- **No retired identifier was ever released publicly**, and **no consumer
  migration is claimed to be complete.**

**No prior approved decision other than Decision 3a's six identifiers is
superseded or reopened.**

---

## SCOPED TOKEN FOUNDATION V1 OWNER SIGN-OFF — 2026-09-18

**Status: APPROVED and SIGNED OFF, within the precise scope below.**

**The Token Foundation V1 baseline is APPROVED and SIGNED OFF.** This scoped
sign-off:

- **freezes the approved design values and semantic mappings**;
- **authorizes ADR 0003 to define their representation**;
- **does not itself authorize implementation**;
- **does not sign off the Token Table as a complete future design-system
  table**;
- **does not resolve deferred component, responsive, Styles or migration
  work**.

**The Token Table remains open for explicitly deferred and future-stage
matters.**

### 1 · Signed-off scope

#### 1.1 Raw palette

The **30 approved Raw Palette entries** — **Decision 1**, **Decision 1
Amendment 1** and **Decision 1 Amendment 2**. They remain **internal design
infrastructure**; Decision 1 constraint 2 is unchanged.

#### 1.2 Semantic colours

The approved **status colours**; the **neutral-status foreground and
background**; the **filled-action colour ladders**; **on-brand Text and
Icon**; the **inline-link rest, hover and press** roles; **Page Background**;
**Surface/Card**; **`--text-primary`** and **`--text-secondary`**; **borders
and divider**; **surface and surface-subtle**; **disabled background, text and
border**; the **brand identity semantic colours**; the **overlay value**; and
the **focus-indicator contract**.

#### 1.3 Filled-action interaction family

**The effective nine logical semantic identities are exactly:**

| Identifier | Value | | Identifier | Value | | Identifier | Value |
| ---------- | ----- | --- | ---------- | ----- | --- | ---------- | ----- |
| `--action-green-rest`  | `#347F1B` | | `--action-blue-rest`  | `#0273B6` | | `--action-red-rest`  | `#D51013` |
| `--action-green-hover` | `#0C7912` | | `--action-blue-hover` | `#0062AC` | | `--action-red-hover` | `#C80303` |
| `--action-green-press` | `#026E1E` | | `--action-blue-press` | `#045398` | | `--action-red-press` | `#B90304` |

**These six identifiers remain retired and excluded:** `--green-hover` ·
`--green-press` · `--blue-hover` · `--blue-press` · `--red-hover` ·
`--red-press`. **They must not be implemented, exported or retained as
aliases.**

#### 1.4 Typography and font-value contract

The **eight approved type steps** with their **exact bound line heights**;
**weights 400, 500, 600 and 700**; the **Body weight decision**; the **Caption
weight and role decision**; the approved **`--font-ui` family stack**; and the
**approved font-delivery contract as input to ADR 0003 and Styles**.

#### 1.5 Spacing

The approved eight-step scale: **4 · 8 · 12 · 16 · 20 · 24 · 32 · 40**.

#### 1.6 Radius and geometry required by V1

The **canonical radius values**; **Decision 5**; **Decision 6a**;
**Decision 9**; the approved **control geometry**; and **Decision 10's
minimum**.

#### 1.7 Elevation

**`--shadow-nav`**, **`--shadow-sheet`** and **`--shadow-modal`** —
**Decision 4a** — together with **the approved restrictions on elevation
use**.

#### 1.8 Motion

The approved **durations**, **easing**, **keyframes**, **press scale** and
**reduced-motion requirements**.

#### 1.9 Layering

**Application Chrome = 10** · **Scrim = 20** · **Dialog Surface = 30**, with
**Decision 15's constraints**.

#### 1.10 Other approved V1 values

The **overlay opacity/value**; the approved **sizing and control geometry**;
the approved **light-theme values**; and the **approved semantic distinctions
that ADR 0003 must preserve**.

### 2 · Decisions and rulings incorporated

**Decisions:** 1 · 1 Amendment 1 · 1 Amendment 2 · 2 · **3a — only as
historically approved and subsequently superseded** · 3b · 4a · 5 · 6a · 7 ·
8 · 9 · 10 · 12a · 12b · 12c · 13 · 14 · 15 · 16a.

**Approved rulings:** Token Design Authority Ruling (Ruling B) · Owner
Contrast Ruling · Incidental Accessibility Findings Ruling · Owner Font
Contract and Delivery Ruling · Owner Interaction Ladder Mapping Ruling ·
Canonical Documentation Authority and Supersession Ruling.

**Accepted ADR inputs:** ADR 0001 · ADR 0002.

**ADR 0003 is not included, because it does not yet exist.**

### 3 · Supersessions applied

The signed-off effective baseline applies **all existing scoped
supersessions**:

- **Decision 3b's approved focus-contract amendments**;
- **`--neutral-status-fg` remapped to `#667085`**;
- **`--text-muted` retired**, with **the associated v0.2 text-eligibility
  clauses superseded**;
- **v0.2 §2.1's six-member interaction-family shape and count superseded**;
- **Decision 3a's six identifiers retired**;
- **the nine state-aligned action identifiers made effective**.

**No other part of UI System Specification v0.2 is superseded by this
sign-off.**

### 4 · Excluded and deferred matters

**Explicitly excluded from this sign-off:** Decision 4b · Decision 6b ·
**Decision 11's unresolved prototype result** · Decision 16b ·
`--shadow-none` representation · Modal radius · the banner accent contract ·
Chip state coverage · the Checkbox visible-square dimension · the Button sm
height conflict · the BottomNav badge-size defect · typography role
assignments for later components · non-Card Surface component bindings ·
visited-link colour · dark mode · responsive and desktop values · the
overlay-root and Portal technique · simultaneous or nested overlay policy ·
stacking-role public/internal visibility · **and every other entry explicitly
marked open, partial or deferred**.

**These items remain binding deferrals. They may not be invented during Token
Foundation V1 implementation.**

### 5 · Representation reserved for ADR 0003

**Outside this sign-off and belonging to ADR 0003:** CSS custom-property
representation · TypeScript token-object representation · Tailwind key
representation · authored source structure · generated artifact structure ·
public and internal export paths · source/dist generation mechanics ·
raw-to-semantic alias mechanics · alpha-derivation mechanics ·
composite-shadow representation · `--shadow-none` representation ·
stacking-role public/internal exposure · the font-asset internal path · font
asset-copy and source/dist parity mechanics.

**ADR 0003 may represent the approved values. It may not change, reinterpret
or replace them.**

### 6 · Styles, component and responsive boundaries

**This sign-off does not authorize:**

- **Styles** — `@font-face` implementation · `font-display` or
  `font-synthesis` application · global body and page rules · resets ·
  container classes · the overlay-root technique · global RTL utilities ·
  global focus styles.
- **Components** — Button · Checkbox · Chip · Modal or BottomSheet ·
  ScaleSelect · **any primitive or Tier 2 component**.
- **Responsive / desktop** — breakpoints · desktop container values · desktop
  layout rules · **Decision 16b**.

### 7 · Implementation authorization boundary

**This sign-off freezes the Token Foundation V1 value and semantic baseline
and authorizes ADR 0003 to proceed.**

**It does NOT yet authorize Token Foundation implementation.**

**Implementation remains blocked until all three of the following are
complete:**

1. **ADR 0003 is written and accepted.**
2. **The Phase 1 design-system `SKILL.md` files in `zakhmban-website` and
   `zakhmban-pwa` receive explicit legacy/superseded annotations.**
3. **A final Token Foundation implementation-readiness audit passes.**

##### Condition 2 rescoped by owner ruling, 2026-09-19

**Condition 2 as written above named the wrong repositories for this scope.**
`zakhmban-website` and `zakhmban-pwa` are real applications in the wider
Zakhmban ecosystem, but **neither is the active Therapist consumer**. The
active application for the current Therapist project is
**`20Brayan01/zakhmban-therapists`**.

**The annotation work itself was correct and is not withdrawn.** Both files
are user-invocable skills carrying obsolete Phase 1 design guidance, so
annotating them was right and the annotations stand. **What changes is their
classification: they are wider-ecosystem documentation hygiene, not a
Therapist-scope prerequisite.** Their local publication state **does not
gate** Therapist-scope contract readiness, Token Foundation implementation in
`zakhmban-ui`, or future Therapist integration.

**For Therapist scope, condition 2 is replaced by:**

> **2′. The Therapist consumer — `20Brayan01/zakhmban-therapists` — is
> identified, and its relationship to `@zakhmban/ui` is verified and
> recorded.**

**Status of the three conditions, updated 2026-09-19.** Conditions 1 and 2′
are **COMPLETE** — **ADR 0003 was written and accepted on 2026-09-18**, and
the **Therapist consumer verification** was completed on 2026-09-19 and is
recorded below. **Condition 3 is not complete: no final Token Foundation
implementation-readiness audit has passed against the corrected scope.**
**Implementation therefore remains blocked.**

> **Superseded 2026-09-19 — status only.** The paragraph above is correct
> at its own date and is preserved unchanged. **Condition 3 is now
> discharged and the owner has authorized Token Foundation V1
> implementation**; see the **Token Foundation V1 Implementation
> Authorization** record at the end of this file. Publication, merge, tag
> and release remain unauthorized.

**The original condition 2 stays in the record** as the position at its own
date. It is rescoped, not deleted, and the Website and PWA annotations remain
recorded in the external legacy cleanup section below.

### 8 · What this sign-off does not claim

- **The entire Token Table is not signed off.**
- **Token Foundation implementation may not begin.** — **superseded
  2026-09-19**; authorized on that date, see the implementation
  authorization record at the end of this file.
- **ADR 0003 did not exist when this sign-off was recorded.** It was
  **written and accepted later the same day, 2026-09-18**, and **changed no
  value this sign-off froze.** The sign-off itself claims nothing from it.
- **The external legacy cleanup was not complete when this sign-off was
  recorded.** It was **carried out on 2026-09-19** and is recorded below.
  The sign-off itself claims nothing from it.
- **Component decisions are not all resolved.**
- **Responsive and desktop decisions are not resolved.**
- **Styles has not begun.**
- **No token has been implemented** — no CSS variable, TypeScript artifact,
  Tailwind key or font binary was created.
- **Consumer migration has neither begun nor completed.**
- **No deferred entry is approved by this sign-off.**

---

## Governance reminders

Restated from the ruling so this sheet is safe to read alone:

- Values already in UI System Specification v0.2 are canonical **because of the
  specification**, not because the kit agrees.
- Candidate values present only in the kit are **non-canonical until ratified
  here**.
- Kit scope extensions that contradict canonical closure — the two type steps,
  the two spacing steps, the two extra easings — **remain rejected**.
- Kit font CDN delivery **remains rejected**, and the Owner Font Contract and
  Delivery Ruling of 2026-09-18 **generalises that rejection**: no consumer may
  load Vazirmatn from Google Fonts, jsDelivr or any other CDN, from
  `next/font`, from `@fontsource`, from an application-owned `@font-face`, or
  from a copied application-local file.
- `WalletBalance` **remains rejected**, along with `PageHeader`, `SkeletonCard`
  and `CardHeader`.
- The kit's product-rule assumptions — access fee, first-access-free, proposal
  revision — **remain rejected**.
- A **geometry or typography approval records a value and the roles or surfaces
  it covers**, and nothing else; **naming and representation stay with
  ADR 0003**, and **font family and font delivery were separate decisions**,
  recorded on 2026-09-18 and not settled by any geometry or typography
  approval.

Ratifying a kit candidate — as Decisions 1 and 2 did — changes the standing of
**those values only**. It confers no authority on the kit, and every rejection
above stands unaffected.

**Precedence is stated in one place.** When two documents disagree, read
[`canonical-document-registry.md`](canonical-document-registry.md) rather than
inferring an order from this sheet. It records the authority levels, the
value-versus-representation split, every supersession of UI System
Specification v0.2 currently in force, and the global supersession rule: a
newer source supersedes an older canonical one **only** when the owner
explicitly approved it, it names the exact earlier rule, it states the new
effective rule, and the supersession is entered in the registry or in this
register. **Recency alone never creates authority, and silence never creates
permission.** **A deferred or unresolved decision must not be filled by an
implementer, a reference kit, a consumer implementation or an AI agent.**

**Decisions 1 (with Amendments 1 and 2), 2, 3a (as scoped-amended by
Decision 12), 3b, 4a, 5, 6a, 7, 8, 9, 10, 12, 13, 14, 15 and 16a are approved —
Decision 8 with explicit role scope and Decision 12 in three parts; Decision 11 is
partially approved with its final behaviour deferred and a prototype required;
Decision 4b, Decision 6b, Decision 16b and `--shadow-none` are deferred; the
Owner Contrast Ruling, the Incidental Accessibility Findings Ruling, the
Owner Font Contract and Delivery Ruling and the Owner Interaction Ladder
Mapping Ruling, all of 2026-09-18, are approved and none is a numbered
decision; every other
decision on this sheet is unapproved, and the Token
Table is not signed off.** Approval here is a design-value decision and
nothing more: **no token, CSS file, style, Tailwind artifact, font file,
`@font-face` declaration or source file has been created or changed**
under this ruling or under any approval recorded on this sheet. Token
Foundation implementation has not begun. The representation mechanics were
reserved for ADR 0003, **which was accepted on 2026-09-18** and which likewise
created no token, CSS file, style, Tailwind artifact, font file or source
file.

**Decisions 6b and 16b remain open**, together with the **exact non-Card
component bindings for the Surface/Card
role**, **dark mode**, the **docked action versus BottomNav coexistence
question**, **simultaneous, nested and multiple blocking overlays** (none
approved), **whether Select ever gains a custom listbox**, the **overlay-root /
Portal technique**, **whether each stacking role is public or
package-internal**, the **typography role assignment for error text, banner
explanatory prose and ListRow metadata**, the **visible Checkbox square
dimension**, the **Button size sm 40px-versus-44px conflict**, **Chip state
coverage**, the **BottomNav badge 10px text against the 12px floor**, **white
text over `--overlay` at ≈2.371:1 should such a use ever be introduced**, the
**final ScaleSelect large-text behaviour and the operable prototype it
requires**. No partial approval on this sheet closes any of them. **The
missing-design-system supersession question is no longer among them** — it was
closed for Token Foundation scope on 2026-09-18 by the Canonical Documentation
Authority and Supersession Ruling, recorded in
[`canonical-document-registry.md`](canonical-document-registry.md).

**Decision 12 resolves the supported action-fill / on-brand pairing**, which is
therefore **no longer listed as an unresolved contrast defect**. **Decision 13
resolves the canonical inline-link rest colour and the non-colour
identification contract.** **Decision 14 resolves the page-versus-surface role
question.** **Decision 15 resolves the global stacking role set, its integers
and its order.** None of the four resolves any other defect.

**Decisions 5 and 6 do not define or close the radius family**: each resolves
one canonical band, and **10px, 20px and the Checkbox 6px remain unapproved.**
**Decisions 7 and 8 do not define or close the typography family**: each
resolves one canonical weight cell, **weight 500 is not approved for Body or
Caption**, **Caption is not extended beyond its four canonically named uses**,
and **the complete typography system is not approved.**
**Decisions 9 and 10 do not complete the geometry system**: Checkbox 6px is
**component-specific and is not a radius-family step**, the **visible Checkbox
square dimension is not approved**, Chip's 44px is a **minimum and not a fixed
height**, **no presentational or removable Chip variant is approved**, and the
**Button sm height conflict is not resolved.**
**Decision 11 does not complete the component behaviour system**: it settles a
definition and two boundaries, **the final ScaleSelect large-text behaviour is
not approved**, **no Select fallback is approved and its trigger is
undefined**, **the 36px exception does not reach 200% enlargement**, and **an
operable prototype is required before the final ruling.** Decision 11 creates
**no token and no Token Foundation implementation obligation**.
**Decisions 12 and 13 do not complete the colour system**: the **Raw Brand
Identity values are unchanged and were not replaced**, **Decision 2 status
mappings are unchanged**, **white Text is not approved on the original base
brand fills**, **no visited-link styling is approved**, and the two canonical
BottomNav size defect **remains open**. The two canonical contrast defects
were **closed separately on 2026-09-18 by the Owner Contrast Ruling**, not by
Decisions 12 or 13.
**Decision 14 does not complete the surface system**: it settles **two
semantic roles at one shared value**, **adds no Raw Palette value**, **changes
no colour**, **approves no component binding beyond Card**, **reaffirms that
`--surface-subtle` may never fill a page**, **approves no dark value**, and
**leaves every public name to ADR 0003**.
**Decision 15 does not complete the layering system**: it approves **three
global roles and nothing more**, **publishes no base/zero token**, **approves
no Dropdown, Menu, Popover, Tooltip or Toast role**, **tokenises no local
z-index**, **approves no simultaneous, nested or multiple overlays**,
**approves the stacking-context constraint but no implementation technique**,
**adds no elevation surface**, and **leaves every public name to ADR 0003**.
**Decision 16a does not supply a desktop/web contract**: it approves **no
breakpoint**, **no container role**, **no container maximum width**, **no
responsive-gutter token**, **no spacing value**, **no typography value** and
**no responsive component behaviour**. It fixes **390px as a reference design
viewport only**, holds the **spacing and typography scales closed**, and
confines page composition to the applications under stated restrictions.
**Decision 16b — the positive desktop/web token contract — remains deferred**,
and **Token Foundation holds no Decision 16 value**.
**The Owner Font Contract and Delivery Ruling does not complete the
typography system and does not begin implementation**: it approves **one
family token and its value**, **one delivery model**, **one pinned upstream
artifact**, **the four already-approved weights** and **`font-display: swap`**
— and **no size, no line height, no weight, no component, no subpath and no
subsetting**. **No font file has been added, no `@font-face` has been
implemented, and Styles has not begun.** Its licensing record rests on
**owner-supplied external evidence** and **is not legal advice**.
**The Incidental Accessibility Findings Ruling does not complete the
accessibility system**: it **changes no token value**, **adds and removes no
token**, **approves no component contract**, **invents no border token**, and
**claims no full or broader accessibility conformance**. It records **one
interpretation** and **four dispositions**, and leaves the banner accent
contract, the dismiss control's adoption, the StatusBadge visual review and
the Raw Palette guard to the stages that own them.

**Both canonical contrast defects are CLOSED**, by the Owner Contrast Ruling
of 2026-09-18. The **neutral-status text defect is closed by remapping**
`--neutral-status-fg` from `#8A9384` to `#667085` (`--neutral-600`), measuring
**4.6961:1** on the unchanged `--neutral-status-bg #F7F9F5`. The
**`--text-muted` defect is closed by retirement**: `--text-muted` is not a
semantic text token of the Token Foundation, and readable de-emphasis uses
`--text-secondary #667085` at **4.9748:1** on white. **No raw palette entry
and no public semantic token was added**, and **`--neutral-500 #8A9384`
remains an approved Raw Palette entry** — not deleted, not renamed, not
invalid. Decision 3b had earlier corrected a third canonical defect, the focus
ring. **These closures do not by themselves sign off the Token Table**, which
remains unsigned on the other open items, and **no broader accessibility
conformance is claimed beyond the audited text pairs**. Four **incidental**
accessibility findings — the dismiss-glyph contrast, `--border-strong` as a
control boundary, neutral badge fill visibility, and direct Raw Palette
references in kit evidence — were left open by that ruling and were
**disposed of on 2026-09-18 by the Incidental Accessibility Findings
Ruling**.

**The `--border-strong` Token Table blocker is CLOSED by authoritative scope
clarification**, with the token **unchanged at `#A0A79C` (`--neutral-400`)**.
§6's *"3:1 … for control boundaries"* is authoritatively read as applying to
**boundary information required to identify a component or its state**, in
alignment with WCAG 1.4.11; a sub-3:1 boundary may never be the sole visible
means of locating a control, identifying it as interactive, distinguishing a
state, or communicating selection, error or focus. The same reading is applied
to the **interactive Card**, whose outline must not be its sole interactive
indicator — **`--border` is unchanged and no Card border token is invented**.
The **banner dismiss control is not canonical today** and is deferred to the
Tier 2 component contract; the **StatusBadge fill is a non-blocking visual-QA
concern**; **direct Raw Palette references remain prohibited**, with the
neutral banner accent mapping to `--neutral-status-fg` and a mechanical guard
due with the first component commit; and the **banner accent glyph colour
remains an open Tier 2 component-stage gap** that blocks InfoBanner and
ErrorBanner implementation and nothing else. **No token value changed, and no
token was added or removed.** **No full accessibility-conformance claim is
made.**

**ADR 0003 input list — the historical record of what was handed to it.**
**Preserved exactly as accumulated**, so that the brief ADR 0003 answered stays
readable. Its disposition is recorded in the section that follows. Reserved and
unresolved: palette ↔ semantic aliasing mechanics (Decision 1); how alpha over
an opaque palette entry is expressed (Decisions 1 and 4a); how a composite
multi-layer `box-shadow` survives authored CSS → typed `tokens.ts` → Tailwind
`@theme` (Decisions 3b and 4a); the standing of `--shadow-none` (Decision 4);
and how the approved radius values and the BottomSheet's block-start-only
corner treatment are named and represented — whether as a numeric ladder,
semantic role names, or both (Decisions 5 and 6a); and how an approved font
weight, its bound size and line height, and the `Text` weight-prop override
contract are named and represented, separately from the font family and
font-delivery mechanics decided on 2026-09-18 (Decisions 7 and 8); and how a
component-specific geometry value and a minimum-height contract are named and
represented without implying a public scale step (Decisions 9 and 10).
**Decision 11 adds nothing to this list** — it creates no token value and no
representation question, and its deferral does not block ADR 0003. Added by
Decisions 12 and 13: how the **Raw Brand Identity / Semantic Action Fill
distinction** is represented without collapsing the two layers; how a
**three-rung action ladder** and an **on-brand foreground** are named and
exported; how **one raw value supporting several separately defined semantic
roles** — `#0062AC` serves `--info-fg`, the blue action-hover rung and
link-hover — is expressed without merging them; and how the **inline-link
state contract and its persistent underline** are delivered. **`--blue-700`
and `--red-700` are Token Table identifiers only and imply no CSS variable,
Tailwind key or typed export.** Added by Decision 14: **two distinct semantic
roles — Page Background and Surface/Card — that share one Raw Palette value
and must remain separately representable and separately consumable. ADR 0003
must not collapse them merely because both are currently `#FFFFFF`.** Added by
Decision 15: **how the three approved stacking roles and their integers 10, 20
and 30 are named and represented**, and **whether each role is public or
package-internal** — the integers themselves are Token Foundation values
already fixed by Decision 15 and are **not** open to ADR 0003. **Decision 16a
adds nothing to this list**: it approves no value and raises no representation
question, and the Tailwind `screens` and `maxWidth` mappings its subject
matter would eventually need **cannot be specified until Decision 16b supplies
approved values**. Added by the **Owner Contrast Ruling**: **one fewer public
token to represent**, `--text-muted` having been retired before
implementation, and the requirement that **`--neutral-status-fg` and
`--text-secondary` stay separately representable and separately consumable
while both map to `--neutral-600 #667085`** — ADR 0003 must not collapse them
merely because their values are currently equal, exactly as it must not
collapse Decision 14's two surface roles. **`--neutral-500 #8A9384` remains an
approved Raw Palette entry with no public semantic text binding.** **The
Incidental Accessibility Findings Ruling adds nothing to this list**: it
changes no value and raises no representation question. **ADR 0003 was not
written when this list was compiled.**

---

## ADR 0003 — ACCEPTED, 2026-09-18

**[`../adr/0003-token-representation-and-artifact-contract.md`](../adr/0003-token-representation-and-artifact-contract.md)
— Token Representation and Artifact Contract. Status: Accepted.**

**It changed no design value.** Every value it represents is one this sheet or
an approved ruling had already fixed. It **supersedes no part of UI System
Specification v0.2**, **resolves no deferred decision**, and **implements
nothing** — no token file, CSS variable, typed artifact, Tailwind artifact,
font binary, build change, test change, manifest change or `dist` change
accompanies it.

### Disposition of the input list

| Input | Disposition in ADR 0003 |
| ----- | ----------------------- |
| Palette ↔ semantic aliasing mechanics (Decision 1) | **Answered.** Every colour literal lives in the raw palette; every semantic colour references it with `var()` and restates no hex. |
| Alpha over an opaque palette entry (Decisions 1, 4a) | **Answered.** Authored as literal `rgba()` beside the opaque entry, with a test asserting the `rgb` triple matches. `color-mix()` rejected, with reasons. |
| Composite multi-layer `box-shadow` across three representations (Decisions 3b, 4a) | **Answered.** One property, one string, one `@theme` entry. The focus indicator is **not** composite: Decision 3b's two rings are represented as **four independently addressable scalars** — `--focus-indicator-inner-color` `#FFFFFF` · `--focus-indicator-inner-width` `2px` · `--focus-indicator-outer-color` `#002A5E` · `--focus-indicator-outer-width` `2px`. **No composite focus token**, and the two-ring composition stays with Styles or the component. |
| The standing of `--shadow-none` (Decision 4) | **Answered — omitted.** Not implemented, not exported, not mapped. Absence of elevation is `box-shadow: none`. |
| Radius naming, and the BottomSheet block-start-only treatment (Decisions 5, 6a) | **Answered.** Role names, **no numeric ladder**. `--radius-control` 12px · `--radius-input` 14px · `--radius-button` aliasing it · `--radius-card` 16px · `--radius-sheet` 24px, block-start corners only. |
| Typography naming — weight, bound size and line height, and the `Text` weight-prop override (Decisions 7, 8) | **Answered.** Each step is `-size`, `-line-height` and `-weight` plus a composite alias; four weight tokens carry 400/500/600/700; the `weight` prop may offer only those four. Caption's role scope is left to the component contract, unchanged. |
| A component-specific geometry value and a minimum-height contract, without implying a public scale step (Decisions 9, 10) | **Answered.** `--radius-checkbox` 6px is **package-internal**, in no public artifact. Decision 10 creates **no Chip token**: its minimum is the canonical `--control-min-target` 44px, applied as `min-block-size`. |
| Raw Brand Identity versus Semantic Action Fill, without collapsing the layers (Decisions 12, 13) | **Answered.** Two layers joined by `var()`; the nine `--action-*` identities are semantic and separate from `--brand-*`. |
| A three-rung ladder and an on-brand foreground, named and exported (Decision 12) | **Answered.** The nine identities are used verbatim; `--on-brand-text` and `--on-brand-icon` are named, and kept separate as Decision 12b requires. |
| One raw value supporting several semantic roles — `#0062AC` for `--info-fg`, blue action-hover and link-hover (Decisions 2, 12, 13) | **Answered.** Three separate properties. A generator that de-duplicates by value is defined as a defect. |
| The inline-link state contract and its persistent underline (Decision 13) | **Answered as to tokens** — `--link`, `--link-hover`, `--link-press`. The underline is a Styles and component rule and is not tokenised. |
| Two distinct surface roles sharing one value (Decision 14) | **Answered.** `--background` and `--surface` are separately declared, typed and mapped, and a test asserts both are present. |
| The three stacking roles, and whether each is public (Decision 15) | **Answered.** `--z-chrome` 10 · `--z-scrim` 20 · `--z-dialog` 30, **all three public**, because `Screen`, `Portal` and overlay composition are application-owned. No base or zero role. |
| `--neutral-status-fg` and `--text-secondary` must stay separable (Owner Contrast Ruling) | **Answered.** Separately declared and asserted, exactly as for the two surface roles. One fewer public token: `--text-muted` is absent. |
| Font family representation, the Tailwind `fontFamily` mapping, internal path, asset copy and parity (Owner Font Contract and Delivery Ruling) | **Answered.** `--font-ui` is the only font token; the Tailwind key derives from it; the binary, `OFL.txt` and the `@font-face` sit under `src/styles/fonts/` at the Styles stage; byte parity between `src/` and `dist/` is an explicit test. **No new public subpath**, and if one proves necessary, work stops and the ADR is amended. |
| Decisions 11 and 16a, which added nothing | **Unchanged.** Neither contributed a representation question, and neither is affected. |

### Identifiers fixed by owner representation ruling

Two identifier sets were **fixed by the owner rather than chosen by the ADR**,
and ADR 0003 records them as ruled:

- **Spacing is ordinal.** `--space-1` `4px` · `--space-2` `8px` ·
  `--space-3` `12px` · `--space-4` `16px` · `--space-5` `20px` ·
  `--space-6` `24px` · `--space-7` `32px` · `--space-8` `40px`. **No
  value-based identifier and no alias to one exists.** The Tailwind mapping is
  `--spacing-1` … `--spacing-8`, each referencing its `--space-<n>`. The
  package scale **intentionally carries 32px and 40px at steps 7 and 8** and
  does not preserve Tailwind's defaults at those keys. **No base spacing
  literal is created and no ninth step is invented.**
- **The focus indicator is four scalars**, listed in the table above.
  **Decision 3b's approved values are unchanged.** The two widths are equal at
  `2px` and **remain two identifiers**, exactly as `--background` and
  `--surface` remain two at `#FFFFFF`.
- **The TypeScript token public API is fixed**, 2026-09-19, closing the single
  blocking gap the final readiness audit found. `@zakhmban/ui/tokens` exposes
  **exactly one runtime export, `tokens`**, and **exactly three type exports —
  `TokenName`, `TokenValue`, `Tokens`**. The object is **flat**, keyed by the
  **canonical CSS identifier including its leading `--`**, valued with
  **resolved terminal CSS values as strings**, carries **exactly the 118
  approved public tokens**, and is immutable through **`as const` with no
  `Object.freeze`**. **No default export, no per-token export, no nested
  family object, no helper function, no raw-palette or `--_` or
  `--radius-checkbox` entry, no `--radius-pill` until it has a literal, no
  root-export widening and no runtime dependency.** Property order is
  lexicographic **for deterministic generation and review only, never as
  semantic API behaviour**. The full contract is ADR 0003 §11.

**None of these rulings changes a design value.** All three fix
representation, which is ADR 0003's tier.

### What ADR 0003 reported rather than invented

**Three values could not be derived from a canonical source. Each is recorded
as a gap. None was filled.**

1. **The pill radius has no literal.** §2.3 assigns the role — *"pill chip,
   badge, search"* — and states no number. The V2 kit's `999px` is evidence
   under Ruling B, not authority. ADR 0003 records `--radius-pill` as a logical
   role and **excludes it from implementation**; a pill surface stays a
   component concern. **An owner ruling is required before a literal exists.**
2. **The four keyframes have meanings but no names.** §2.4 fixes that there are
   four and no more, and describes them — skeleton shimmer, fade-up 8px,
   slide-up, spin — without naming any. Naming them is a **Styles** decision,
   since §7 places `keyframes` under `styles/`. ADR 0003 **names no keyframe
   and emits no `--animate-*` key**. The one value §2.4 supplies, the 1400ms
   shimmer, is tokenised as `--duration-shimmer`.
3. **§2.3's *"small control 40"* is not exposed.** The **Button size sm
   40px-versus-44px conflict remains open** and is named in the sign-off's
   excluded list; publishing a 40px geometry token would settle it by
   representation. **No token carries 40px.** The same reasoning keeps the
   **visible Checkbox square dimension** out, no canonical source stating one.

**Border widths are also absent.** §1.6 of the sign-off scopes V1 geometry to
radius, control geometry and Decision 10's minimum; §2.3's 1px / 1.5px border
rules are not in it, and they arrive with the component contracts that use
them.

### What is still blocked

> **Superseded 2026-09-19 — status only.** This section states the position
> as at 2026-09-19 before the owner's authorization, and is preserved
> unchanged. **Condition 3 is discharged and implementation is
> authorized**; see the **Token Foundation V1 Implementation
> Authorization** record at the end of this file.

**Token Foundation implementation remains blocked.** Of the sign-off's three
conditions, as rescoped by the owner scope ruling of 2026-09-19, **the first
two are now complete**:

1. **ADR 0003 written and accepted** — **COMPLETE, 2026-09-18**;
2. **2′ — the Therapist consumer `zakhmban-therapists` is identified and its
   `@zakhmban/ui` relationship verified and recorded** — **COMPLETE,
   2026-09-19**, in the Therapist consumer verification record below;
3. **no final Token Foundation implementation-readiness audit has passed
   against the corrected scope.**

**Publishing the Website and PWA annotations is not required before
Therapist-scope Token Foundation implementation.** Those annotations are
wider-ecosystem hygiene; their local, unpublished state gates nothing in this
scope.

**The Token Table as a whole is still not signed off**, and every entry marked
open, partial or deferred above is unchanged by ADR 0003.

---

## EXTERNAL LEGACY DOCUMENTATION CLEANUP — RECORDED, 2026-09-19

### Scope of this record — rescoped 2026-09-19

- **This cleanup applies to `zakhmban-website` and `zakhmban-pwa` only.**
- **It is wider-ecosystem documentation hygiene**, valid on its own terms
  because both files are user-invocable skills carrying obsolete Phase 1
  design guidance.
- **It is not the Therapist consumer verification.** That is a separate
  record, below, for `20Brayan01/zakhmban-therapists`.
- **It does not gate Therapist-scope Token Foundation implementation**, nor
  contract readiness, nor future Therapist integration.
- **Both commits remain local and unpushed.**

**The annotation work is not withdrawn and was not wrong.** Only its scope and
gating classification are corrected.

### The record

Both Phase 1 design-system `SKILL.md` files carry an explicit legacy
annotation.

| Repository | Annotated path | Local commit | Parent |
| ---------- | -------------- | ------------ | ------ |
| `zakhmban-website` | `public/design-system/SKILL.md` | `4438207632a848d436b1520b81f621fc11bd485d` | `c35f6f3f633ba1bca962a2af99b3eef8724d0063` |
| `zakhmban-pwa` | `design-system/SKILL.md` | `68ec7e3d452d86fb87801a39fd71ec62045b9bcc` | `f42f76a8272f73fca2586b3725ef3e6b214d3227` |

Both commits sit on a local branch named
`docs/token-foundation-legacy-annotation`, one commit ahead of each
repository's `main`.

**Neither commit has been pushed, merged, tagged or released**, and neither
branch has an upstream. **The annotation is therefore local only and is not
yet available to anyone else.**

**What the annotation records.** That the document is Phase 1 material kept as
historical and migration evidence; that it is **not canonical authority** for
Token Foundation or Styles work; that it **must not be used to invent or
override** token names, token values, semantic mappings, CSS-variable
representation, TypeScript token representation, Tailwind token delivery,
public package exports, typography, spacing, radius, elevation, motion,
layering or component styling contracts; that canonical authority belongs to
`zakhmban-ui` — its canonical document registry, the approved rulings in this
Token Table, and accepted **ADR 0001** and **ADR 0003**; and that **where the
two disagree the `zakhmban-ui` sources prevail**.

**The original Phase 1 content is preserved in full.** The two files were
byte-identical before the change and remain byte-identical after it. **Nothing
was deleted, reworded, reformatted or reinterpreted** — the diff is 26 inserted
lines and **zero removed lines** in each repository. The Phase 1 brand values
the documents state, `#479B11` and `#032551` among them, are left exactly as
written, as the historical evidence they are.

**Placement note.** Each file is a skill document whose YAML frontmatter must
be the first content in the file. The annotation is therefore inserted
**immediately after the frontmatter block**, as the first body content, rather
than above it. Placing it above would have invalidated the frontmatter.

**The annotation claims no implementation.** It states explicitly that Token
Foundation and Styles have not begun.

**Consumer follow-up C1 is discharged** to the extent of the annotation
itself, **as wider-ecosystem work**. **C2** (font-loader migration) and **C3**
(IRANYekan assets and the stale `public/fonts/README.md`) are untouched and
remain future work.

**The final Token Foundation implementation-readiness audit remains open**,
and **Token Foundation implementation is still not authorized.**

> **Superseded 2026-09-19 — status only.** The paragraph above is correct
> at its own date and is preserved unchanged. **Condition 3 is now
> discharged and the owner has authorized Token Foundation V1
> implementation**; see the **Token Foundation V1 Implementation
> Authorization** record at the end of this file. Publication, merge, tag
> and release remain unauthorized.

---

## THERAPIST CONSUMER VERIFICATION — RECORDED, 2026-09-19

### Owner scope ruling

1. **`20Brayan01/zakhmban-therapists` is the active application and the
   intended consumer** for the current Therapist project.
2. **`zakhmban-website` and `zakhmban-pwa` are real repositories in the wider
   Zakhmban ecosystem, but neither is the active Therapist consumer.**
3. **The annotations in `zakhmban-website/public/design-system/SKILL.md` and
   `zakhmban-pwa/design-system/SKILL.md` remain technically valid**, because
   those user-invocable legacy files contain obsolete Phase 1 design
   guidance.
4. **Those annotations are wider-ecosystem documentation hygiene.**
5. **Their local publication state gates none of:** Therapist-scope Token
   Foundation contract readiness · Token Foundation implementation in
   `zakhmban-ui` · future Therapist integration.
6. **The historical annotation record is not deleted, and the annotation work
   is not claimed to have been wrong.** Only its scope and gating
   classification are corrected.
7. **The two annotation commits remain local and unpushed.**

### Verified state of `zakhmban-therapists`

Audited read-only on 2026-09-19 at `chore/glitchtip-scrubbing`
`12563b97b66b5bd2240571637b815f8655b0a66f`, with `main` = `origin/main` =
`7103b42561f989382181c548318831879cd26892`.

| Finding | Evidence |
| ------- | -------- |
| **Active Therapist application** | Next 16 App Router; twelve `src/features/*` slices — auth, cases, complaints, feed, notifications, profile, proposals, records, registration, reputation, unlock, wallet; governed by the four canonical Therapist documents |
| **Planned future consumer of `@zakhmban/ui`** | Its local ADR 0001 names the package Tier 1 and "the authority for formatting, tokens, icons and validation helpers" |
| **No current `@zakhmban/ui` dependency** | absent from `package.json` |
| **No current `@zakhmban/ui` imports** | none in source |
| **No vendored or local substitute** | rule P3 asserts no `packages/`, no vendored copy, no `pnpm-workspace.yaml`, no `tsconfig` path alias |
| **No local token system** | zero CSS custom properties declared; one CSS file, `src/app/globals.css`, of eight lines |
| **No `SKILL.md`** | zero matches in the tracked tree |
| **No `design-system` directory** | does not exist |
| **No Phase 1 palette guidance** | `#479B11`, `#032551`, `#3C9220`, `#002A5E` — zero matches; lint rule L5 forbids any hardcoded colour |
| **No legacy annotation required** | there is nothing there to annotate |
| **Package boundary already reserves the package** | rule P2 requires an exact git-tag pin for any `@zakhmban/*` dependency and asserts none is declared yet |
| **Integration waits for a published, tagged release** | no tag exists to pin |

**No change is made to `zakhmban-therapists` by this record.** It is
read-only evidence.

### Future Therapist consumer work, recorded separately

**C2 — Font migration.** Remove the `@fontsource/vazirmatn` delivery; remove
the local shadowing `font-family` declaration; deliver the family through
**`@zakhmban/ui/styles`**; ensure the approved weights **400, 500, 600 and
700**; remove the **unapproved weight 900**.

**C4 — Private dependency access.** CI requires approved read access to the
private package repository, and Docker builds require a secure installation
mechanism. **Credentials must not be committed.** This is an **integration
prerequisite, not a Token Foundation contract gap** — UI System Specification
v0.2 §9 unknown 10 already records it as infra-owned and UNKNOWN.

**Tailwind integration.** `zakhmban-therapists` currently has **no Tailwind
dependency and no Tailwind configuration**. Whether and when Tailwind 4 is
installed is **consumer integration work**; v0.2 §9 unknown 9 records it as
unverified. **The generated Tailwind artifact contract is already complete**
in ADR 0001 and ADR 0003. **No Therapist Tailwind decision is invented or
implemented here.**

**Stale Therapist records, not edited here.** `RUN_LOG.md` blocker S-03 still
says `@zakhmban/ui` does not exist, and that repository's local ADR 0001
carries an outdated repository-owner question. **Both belong to a later
Therapist repository documentation task**, and neither is touched by this
record.

### Classification boundary

**None of the following is a Token Foundation contract blocker:**

- the absence of `@zakhmban/ui` from the Therapist `package.json`;
- the absence of a published package tag;
- the Therapist font migration (C2);
- Therapist Tailwind installation;
- Therapist CI and Docker private access (C4);
- stale Therapist `RUN_LOG` wording;
- the unpublished Website and PWA annotations.

**Each is a future publication, release or consumer-integration
responsibility.**

**This record authorizes nothing.** It does not authorize Therapist
integration, it does not authorize Styles, and it changes no approved Token
Foundation design or representation decision.

---

## TYPOGRAPHY ALIAS RULING — the Owner Ruling, 2026-09-19

**Decided by:** human design/product owner · **Date:** 2026-09-19
**Status: APPROVED.** It is **not** a numbered Token Table decision and **not**
Decision 17.

**Outcome:** the exact authored value of the eight public typography aliases
is fixed. **No token identifier changes, no token value changes, no count
changes, and no implementation correction is required.**

### The gap this ruling closes

ADR 0003 **named** the eight aliases (§2, §7, §8), **counted** them (§5 — "8
composite aliases" inside the 118) and **placed** them in `typography.css`,
but **never stated their value**. §7's typography table carries three columns
— `-size`, `-line-height`, `-weight` — and no fourth. The one place the
corpus prints `--text-<step>: var(--text-<step>-size)` is §12's **Tailwind
mapping** table, whose column is the Tailwind theme key, not the authored
`:root` property.

The implementation audit of the local Token Foundation V1 commit identified
this as a **blocking contract gap requiring an owner ruling**, correctly
declining to treat the implementer's choice as approved merely because the
tests encoded it. This ruling supplies the missing value.

### The eight approved public aliases

`--text-display` · `--text-page-title` · `--text-section-title` ·
`--text-card-title` · `--text-body` · `--text-label` · `--text-caption` ·
`--text-button`

### Classification

**Each of the eight is a Semantic Typography Size Alias.**

### Approved authored representation

Each alias is authored exactly as:

```css
--text-<step>: var(--text-<step>-size);
```

In full, and binding:

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

**Their resolved public TypeScript values are the terminal size strings of the
corresponding `--text-<step>-size` tokens**, reached by the ordinary alias
resolution ADR 0003 §11 already requires.

### What these aliases are not

1. **They are not CSS `font` shorthand values.**
2. **They neither contain nor compose** `font-family`, `font-weight`,
   `line-height`, `font-style` or `font-stretch`.
3. **They create no second typography representation.** The `-size`,
   `-line-height` and `-weight` properties **remain independently addressable
   public tokens**, exactly as ADR 0003 §7 records them.

### What is unchanged

- **The Tailwind mapping is unchanged**: `--text-<step>:
  var(--text-<step>-size)`, with line height and weight attached through
  `--text-<step>--line-height` and `--text-<step>--font-weight`.
- **The public token total remains exactly 118.**
- **The internal property total remains exactly 39.**
- **`--radius-pill` remains the one logical role without an approved
  literal**, and remains unimplemented.
- **No public identifier changes and no implemented value changes.**

### Terminology superseded

**For these eight tokens only, the phrase "composite alias" is superseded by
"Semantic Typography Size Alias".** The earlier phrase was ambiguous: ADR 0003
§8 defines a composite as a property holding a complete CSS value in one
place, which a size alias is not. **Historical text is not rewritten**;
ADR 0003 carries a dated clarification pointing here.

### Owner rationale

- it **preserves the approved 118-token public API** exactly as signed off;
- it **avoids an invalid font-shorthand interpretation**, which would have
  reset `font-family` and `font-variant` and silently defeated `--font-ui`
  and the `tabular-nums` rule of v0.2 §2.2;
- it is **compatible with Tailwind v4's `--text-*` namespace**;
- it **avoids a cascade conflict in Tailwind consumers**, where the package's
  unlayered `:root` declaration and Tailwind's `@theme` emission of the same
  property must agree;
- it **keeps size, line height and weight separately addressable**;
- it **invents no second typography representation**.

### Scope

**This ruling fixes a representation value that ADR 0003 left unstated. It
changes no design value, resolves no deferred decision, authorizes no Styles
or component work, and authorizes no publication, tag or release.**

### Relationship to the implementation

**This ruling approves the implementation already present in
`src/tokens/typography.css`.** All eight aliases are authored there at exactly
the values above. **No token-source correction is required**, and none is
made.

---

## TOKEN FOUNDATION V1 IMPLEMENTATION AUTHORIZATION — RECORDED, 2026-09-19

**Decided by:** human design/product owner · **Date:** 2026-09-19
**Status: RECORDED.** This is the canonical record of an authorization the
owner gave directly. It is **not** a numbered Token Table decision.

### The authorization

**The owner explicitly authorized Token Foundation V1 implementation**, after
the documentation and contract package had been **merged and verified on
`main`** — `main` = `origin/main` =
`5ac2aa1abd6302030767392b804dac7e28820076`, with the approved documentation
commit `666f8a658fb30d985f5cd8d55522a0977f38fdc4` an ancestor of it.

**Scope: Token Foundation V1 only.** The authorization did **not** authorize:
Styles · component styles or any UI component · dark mode · Therapist
integration · any consumer repository change · font binary delivery ·
`@font-face` · a package release or tag · Website or PWA changes · deferred
V2 tokens · unrelated refactoring.

### What has happened since

| | |
| --- | --- |
| **Implementation branch** | `feat/token-foundation-v1`, created from the verified `origin/main` |
| **Local implementation commit** | `caa1efe11fafcadb1a9ca307f5fd0eb6658b3c21`, parent `5ac2aa1abd6302030767392b804dac7e28820076` |
| **Implementation audit** | performed read-only against that commit |

**The implementation audit verified the mechanical implementation** — the
118 / 39 / 1 boundary, the identifier set and values against this Token
Table, the typed artifact, the Tailwind artifact, the generator, source and
`dist` parity, the public export contract and a clean Tailwind v4 consumer
smoke test — **and identified exactly two matters requiring the owner**:

1. **the missing Typography Alias owner ruling** — the eight alias values
   were not stated by any canonical source;
2. **a stale authorization status** — current-status statements in this file
   still said implementation was blocked and unauthorized.

**The owner has now supplied the Typography Alias ruling**, recorded in the
section immediately above.

### Condition 3

The Scoped Token Foundation V1 Owner Sign-off §7 set three conditions.
Conditions 1 and 2′ were already complete. **Condition 3 — a final Token
Foundation implementation-readiness audit against the corrected scope — is
discharged** by the completed scoped readiness audit and the completed
implementation audit, **subject to the corrected implementation commit
passing final audit**.

### Superseded status statements

**As of this dated record, every current-status statement in this file or in
the canonical document registry saying that Token Foundation implementation
"remains blocked", "is still not authorized", "may not begin" or "has not
begun" is SUPERSEDED**, specifically:

- the sign-off §7 status paragraph dated 2026-09-19 — *"Condition 3 is not
  complete … Implementation therefore remains blocked."*;
- the *"What is still blocked"* paragraph under the ADR 0003 acceptance
  record — *"Token Foundation implementation remains blocked."*;
- the closing sentence of the external legacy documentation cleanup record —
  *"the final Token Foundation implementation-readiness audit remains open,
  and Token Foundation implementation is still not authorized."*;
- the registry's *"Token Foundation implementation has not begun"* bullet and
  its *"What remains blocked"* paragraph.

**Dated historical pre-authorization statements remain historically correct
and are not withdrawn.** They record the position at their own date, which is
how this file has always handled supersession. **Nothing in the authorization
trail is deleted or silently rewritten.**

### What remains unauthorized

**Publication, merge, tag and release remain unauthorized.** So do Styles,
components, consumer integration and every deferred entry in this file. The
implementation is **local and unpushed**: no remote implementation branch, no
pull request, no merge, no tag, no release, and `@zakhmban/ui` remains
`0.0.0` and `private`.

> **Superseded in part 2026-09-20 — publication only.** The paragraph above is
> correct at its own date and is preserved unchanged. **Publication — branch
> push, pull request and merge — is now authorized**; see the **Token
> Foundation V1 Publication Authorization** record at the end of this file.
> **Tag, release and package publication remain unauthorized**, as do Styles,
> components, consumer integration and every deferred entry.

---

## TOKEN FOUNDATION V1 PUBLICATION AUTHORIZATION — RECORDED, 2026-09-20

**Decided by:** human design/product owner · **Date:** 2026-09-20
**Status: RECORDED.** Canonical record of a publication authorization the
owner gave directly. It is **not** a numbered Token Table decision, and it
**changes no token, value, count or artifact**.

### The final implementation audit

**The final Token Foundation V1 implementation audit passed** against local
commit `cf39e03522c462b1061b3f47d9b01dc2c67aaa05`, parent
`5ac2aa1abd6302030767392b804dac7e28820076`. It was read-only, re-derived the
token baseline independently of the repository's own tests, and confirmed the
**118 / 39 / 1** boundary, the approved identifier set and values, the typed
and Tailwind artifacts, generator determinism, source and `dist` parity, the
public export contract and a clean Tailwind v4 consumer resolution.

**Both previously blocking findings are CLOSED:**

| Finding | Subject | Closure |
| --- | --- | --- |
| **BCG-1** | Typography Alias contract gap — the eight alias values were stated by no canonical source | **CLOSED** by the Typography Alias Ruling of 2026-09-19. All eight aliases in `src/tokens/typography.css` match the ruling exactly, and ADR 0003 §7 now prints their authored and resolved values. |
| **BDC-1** | Implementation authorization contradiction — the canonical record said implementation was blocked while the branch said it was implemented | **CLOSED** by the Token Foundation V1 Implementation Authorization of 2026-09-19 and the dated supersession markers applied to the four stale current-status statements. The repository now reads consistently from its own files. |

### What this authorization approves

**Token Foundation V1 is approved for publication**, namely:

- **branch push** of `feat/token-foundation-v1`;
- **pull-request creation** against `main`;
- **merge after the required checks pass**, using a true merge commit;
- **post-merge verification on `main`**.

### What this authorization does not approve

**It approves no version change, no tag, no release, no package publication**,
and no Styles, component, consumer-integration or deferred work. `@zakhmban/ui`
remains **`0.0.0`** and **`private`**. **No tag and no release exist**, and
neither is authorized by this record.

### Release-only blocker, carried forward

**`pnpm smoke:tailwind` must be wired into `.github/workflows/release.yml`
before the first tag.** ADR 0001 requires extensionless-subpath resolution
through `@tailwindcss/postcss` to be proven *before release, not assumed*. The
implementing commit discharged that proof and committed a repeatable pinned
script, but the release workflow does not yet run it, so a later regression
could reach a tag unproven. **This blocks the first tag. It does not block
this publication**, because ADR 0003 §18 assertion 16 placed the obligation on
the implementing commit, which met it.

> **Superseded 2026-09-20 — mechanism only.** The paragraph above is preserved
> as written. The phrase *"wired into `release.yml` before the first tag"* was
> ambiguous and was read as a temporal gate that a tag-triggered workflow
> cannot provide. The **Owner Release Model Ruling** at the end of this file
> settles the mechanism: **owner-triggered automated tagging**. The canonical
> ADR obligation itself was already discharged by the implementing commit.

### Non-blocking follow-ups, carried forward

Eight remain deferred and none was implemented here: `smoke:tailwind` CI
wiring · generator atomic writes · generator diagnostic ordering · lint
extension coverage beyond `.ts`/`.tsx` · a literal bidirectional
typed-object ↔ authored-CSS assertion · `verify-dist` index-versus-HEAD
behaviour · `format:check` workflow coverage · the value-spelling editorial
clarification.

### Implementation unchanged

**No implementation file and no token value changes as part of this
authorization.** The authored token CSS, the generated TypeScript and Tailwind
artifacts, the generator, build and dist-verification scripts, the tests, the
package manifest, the lint configuration, the workflows and every committed
`dist/` artifact are **byte-identical** to the audited commit. The only
tracked change is this documentation record and the commit-message status that
accompanies it.

---

## TOKEN FOUNDATION V1 RELEASE PREPARATION — RECORDED, 2026-09-20

**Decided by:** human design/product owner · **Date:** 2026-09-20
**Status: RECORDED.** Canonical record of a release-preparation
authorization the owner gave directly. It is **not** a numbered Token Table
decision, and it **changes no token, value, count or artifact**.

### Where Token Foundation V1 stands

**Token Foundation V1 is merged and verified on `main`.** The implementation
commit `5e979cf0d6bfcc47e18a4e21bed3f3012cd3a0a3` reached `main` through
pull request **#7**, merged with a true merge commit,
`6e9c6d788fb8fcf5ed9f6c30e6136d3135674489`. Post-merge validation from a
clean `main` passed all eight gates, and the **118 / 39 / 1** boundary,
source/`dist` parity and the Typography Alias mappings were reverified there.

### What this authorization covers

**Release preparation is authorized, and it is limited to clearing the one
recorded release-only blocker**: wiring `pnpm smoke:tailwind` into the
release workflow before the first tag.

**It authorizes nothing else.** No version change, no tag, no GitHub Release,
no package publication, no Styles or component work, no consumer-repository
change, no `zakhmban-therapists` integration, and no unrelated cleanup.

### The blocker, and how it is addressed

ADR 0001 requires that resolution of the extensionless subpath
`@zakhmban/ui/tokens/tailwind-preset` through `@tailwindcss/postcss` be
**proven against a real Tailwind 4 consumer before release, not assumed**, and
ADR 0003 §18 assertion 16 makes that a gate. The implementing commit
discharged the proof once and committed the repeatable script; the release
workflow did not yet run it, so a later regression could have reached a tag
unproven.

**`.github/workflows/release.yml` runs `pnpm smoke:tailwind` as a required
gate in both of its modes**, with no `continue-on-error` and no `if:`
condition, and an architecture guard asserts it.

**Corrected in this same commit, before publication.** An earlier draft of
this record described the tag-triggered workflow as making the obligation
*hold* for every tagged commit. That was wrong, and the release-workflow
audit caught it: a tag-triggered run starts **after** the tag exists, cannot
prevent it and cannot remove it. The wording is corrected here rather than
marked, because this record has never been published. The mechanism that
does provide prevention is recorded in the **Owner Release Model Ruling**
below.

### Status that this record fixes

- **Version remains `0.0.0`** and the package remains **private**.
- **No tag, no GitHub Release and no package publication is authorized**, and
  none exists.
- **Consumer integration remains unauthorized**, `zakhmban-therapists`
  included.
- **Styles and components remain outside this work** and have not begun.
- **No Token Foundation value, identifier, count or artifact changes** under
  this authorization.

### Effect on the recorded release-only blocker

**The release-only blocker recorded by the publication authorization of
2026-09-20 is disposed of by the Owner Release Model Ruling below**, which
replaces the ambiguous "wire it into `release.yml`" phrasing with a mechanism
that actually prevents a bad tag. It remains recorded there as the position at
its own date. **The first tag is still not authorized**, and authorizing it is
a separate owner decision.

---

## OWNER RELEASE MODEL RULING — 2026-09-20

**Decided by:** human design/product owner · **Date:** 2026-09-20
**Status: APPROVED.** It is **not** a numbered Token Table decision, and it
**changes no token, value, count or artifact**.

### The model

**Owner-triggered automated tagging.** The owner starts the release workflow
manually from GitHub Actions and supplies two things:

1. the intended **semantic version**, without a leading `v`;
2. the **exact full 40-character lowercase commit SHA** on `main`.

**The workflow validates that commit first. Only after every required gate
passes does it create and push the version tag.**

### Why the previous interpretation was wrong

The earlier release-preparation work added `pnpm smoke:tailwind` to a
**tag-triggered** workflow and described that as clearing the release
blocker. The release-workflow audit established that it cannot: on GitHub the
tag exists remotely **before** the `push` event is emitted, a failing run
neither removes nor invalidates it, and the workflow holds `contents: read`
and so could not undo it in any case. A tag-triggered run **reports on a
release that has already happened**.

**This ruling replaces that interpretation.** Prevention requires that the
tag not exist until the gates pass, which only a pre-tag mechanism can
deliver.

### What the workflow does

| Mode | Trigger | Permission | Effect |
| --- | --- | --- | --- |
| **Manual, pre-tag** | `workflow_dispatch` | `contents: read` for validation; `contents: write` for tag creation alone | validates the exact commit, then creates and pushes the tag. **This is prevention.** |
| **Manual, post-create** | same `workflow_dispatch` run | `contents: read` | reads the pushed ref back from the remote and proves it is present, annotated, and pointing at the validated commit. |
| **Automatic, post-tag** | `push` on `v*.*.*` | `contents: read` | re-runs every gate against the tagged tree. **This is verification, not prevention, and must never be described as such.** |

> **Corrected 2026-09-20, before publication — GITHUB_TOKEN recursion.** An
> earlier draft of this ruling stated that the tag the manual mode pushes
> triggers the post-tag mode, and called that duplicate verification
> intentional. **That is factually wrong.** `create-tag` pushes with the
> repository `GITHUB_TOKEN`, and GitHub suppresses new workflow runs for
> events created with that token — `workflow_dispatch` and
> `repository_dispatch` excepted — so **an automatically created tag starts
> no `push.tags` run**. The correction is recorded here rather than marked,
> because this ruling has never been published.
>
> What the two modes actually cover:
>
> - **`verify-created-tag`** gives same-run assurance for an automated tag,
>   inside the dispatch run.
> - **`push.tags`** covers a tag pushed by a human or by any credential that
>   is not the repository `GITHUB_TOKEN` — the case nobody reviewed, and the
>   reason the trigger is kept.
>
> **No personal access token, GitHub App or deploy key is introduced** to
> force a second run. Doing so would trade a wording defect for a long-lived
> high-privilege credential and would be a separate owner decision.

### Binding clauses

1. The selected model is **owner-triggered automated tagging**.
2. The owner selects the **semantic version** and the **exact `main` commit
   SHA**. The workflow never chooses a version.
3. The manual workflow performs **pre-tag validation**: install, generator
   `--check`, format, lint, typecheck, test, build, `verify:dist` and
   `smoke:tailwind`, against the supplied commit. It must be **dispatched
   from `main`**: `workflow_dispatch` runs the workflow file of the branch it
   is started from, and that chain grants `contents: write` to tag creation.
4. **A tag is created only after all validations pass.**
5. **Tag creation is the only automated write** in this repository.
6. **Pull-request creation and merge remain manual owner actions.**
7. **A `package.json` version change requires a separate owner-reviewed pull
   request.** The workflow refuses to release when the manifest version and
   the requested version disagree, and never edits the manifest.
8. **The workflow creates no GitHub Release and publishes no package.**
   Frozen §2.2 is unchanged: the tag IS the release.
9. **The tag-triggered workflow is post-tag verification, not prevention**,
   and every record must say so. It covers **manually or externally pushed
   tags only**; a tag created by the workflow with `GITHUB_TOKEN` starts no
   run, and is verified in-run by `verify-created-tag` instead.
10. **The earlier "release blocker cleared" wording is superseded**, because
    it overstated what the tag-triggered mechanism could do.
11. **The canonical ADR obligation was already discharged by the implementing
    commit.** ADR 0001 binds *"the commit that implements it"* and ADR 0003
    §18 assertion 16 is an assertion *the commit must add*; neither requires a
    workflow gate. This workflow adds repeatable automated release safety on
    top of an obligation already met.
12. **Tag, GitHub Release and package publication remain unauthorized
    until** this workflow branch is manually reviewed and merged; **and** a
    separate version-bump pull request is reviewed and merged; **and** the
    owner manually starts the workflow with the approved version and SHA.

### Same-run verification of an automated tag

`verify-created-tag` runs after `create-tag` in the same dispatch,
`needs: [validate-candidate, create-tag]`, `contents: read`. It re-reads the
ref from the remote and fails on any mismatch: the tag must exist, be an
**annotated** tag object, and dereference to **exactly** the validated commit
SHA, with the remote and fetched object ids agreeing. It reuses the validated
outputs rather than recomputing them, **does not re-run the validation
suite** — that SHA was fully validated before the tag existed — and creates,
moves and deletes nothing.

### Race safety, stated honestly

A `concurrency` group serialises manual release attempts and never cancels a
tag-creation job that has begun. GitHub Actions offers no repository-wide
lock spanning separate workflow runs, so **the mandatory safeguard is the
remote-tag existence re-check immediately before `git tag`**, together with a
non-forced single-ref push. A loser in a race is refused; no tag is moved or
overwritten.

### Scope

**No token, value, identifier, count or artifact changes.** `@zakhmban/ui`
remains **`0.0.0`** and **`private`**, with **no tag and no release**. Styles,
components and consumer integration remain outside this ruling.

---

## TOKEN FOUNDATION V0.1.0 RELEASE-SEQUENCE RULING — 2026-09-20

**Decided by:** human design/product owner · **Date:** 2026-09-20
**Status: APPROVED.** It is **not** a numbered Token Table decision, and it
**changes no token, value, count or artifact**.

### The allocation

| Milestone | Version |
| --- | --- |
| **Token Foundation** | **v0.1.0** |
| **Styles** | **v0.2.0** |
| **Icons and the five primitives** | **v0.3.0** |
| **Phase 6 · Harden** | **v1.0.0 — unchanged** |

UI System Specification v0.2 §8's Phase 6 exit criterion, *"v1.0.0
published"*, is **untouched by this ruling**.

### What it supersedes, and what it does not

**The earlier allocations were roadmap placeholders**, carried in the
`README.md` status table — an orientation document, subordinate to this
register and to the canonical document registry. **They were never
ADR-frozen, never recorded in this file or the registry, and never a consumer
commitment**: `zakhmban-therapists` declares no `@zakhmban/ui` dependency and
no tag has ever existed to pin.

**This ruling supersedes exactly two current roadmap allocations:**

- Styles → v0.1.0, now **v0.2.0**;
- Icons and the five primitives → v0.2.0, now **v0.3.0**.

**It supersedes nothing else.** Dated historical statements elsewhere in this
file and in the registry remain accurate for their own dates and **are not
rewritten**.

### What Token Foundation v0.1.0 contains

- the **validation helpers** already on `main` (ADR 0002);
- the **formatter utilities** already on `main`;
- the **Token Foundation CSS** — the seven authored files and the style entry;
- the **generated TypeScript token API**;
- the **Tailwind v4 `@theme` artifact**;
- the **existing approved package exports**, unchanged.

### What Token Foundation v0.1.0 does not contain

- the future **Styles** layer;
- **font binaries** or `@font-face`;
- **global reset or body rules**;
- **icons**;
- **primitives or components**;
- **consumer integration**.

**Importing `@zakhmban/ui/styles` at v0.1.0 yields the approved token custom
properties and nothing more.** Font delivery, `@font-face`, resets, global
body rules, focus styles and the overlay-root technique all arrive with
Styles at v0.2.0.

### SemVer intent

**Adding Styles in v0.2.0 is intended to be an additive change** under UI
System Specification v0.2 §7's versioning rule, which treats new capability
as additive and reserves breaking status for removing or renaming a semantic
token, a component or a prop.

### Scope

- **No identifier, token value, generated artifact or export changes** under
  this ruling. The boundary remains **118 / 39 / 1**.
- **The package remains private.**
- **This ruling authorizes local version-bump preparation only.**
- **Push, pull request, merge, tag creation, release-workflow execution,
  GitHub Release, package publication and consumer integration each remain
  separate actions**, and none is authorized here.
