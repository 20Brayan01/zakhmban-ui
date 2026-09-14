# ADR 0002 — Validation Helpers Public Contract

- **Status:** Accepted
- **Date:** 2026-09-13
- **Scope:** `@zakhmban/ui` Validation Helpers public contract only — function
  names, signatures, accepted input, normalized output, digit-script and
  invalid-input semantics for the two capabilities already named by frozen
  architecture. No implementation, no test, no export wiring, no dependency,
  no token, style or component decision is touched.
- **Authority tier:** Decision-closing pass that fixes the shape of an
  already-authorized capability area, not its existence. Frozen Technical
  Architecture v1.1 §2 and UI System Specification v0.2 §7/§9 already assign
  "phone normalisation" and "national-ID checksum" to this package; neither
  document defines a callable API for either one. This ADR supplies that API
  so an implementation commit has something stable to build against, the
  same role ADR 0001 played for the Tailwind artifact's delivery form.

## Context

An implementation attempt on 2026-09-13 (branch `feat/validation-helpers`,
based on `main` at `a3d11fb6bf98440dc3445b3e178f56db2181b067`) stopped before
writing any code because no canonical document defines a stable public API
for Validation Helpers — only the capability area. That branch made no file
changes and no commits; it has since been deleted and this ADR starts fresh
from the same `main`.

**What is already decided (inherited facts, not reopened here):**

- **The capability list.** Frozen Technical Architecture v1.1 §2, repository
  #3 contents: *"client‑side validation helpers (phone normalisation,
  national‑ID checksum)"*. UI System Specification v0.2 §7 package-structure
  diagram names the same pair under an internal `validation/` folder; §9
  repeats them verbatim in the Tier 1 foundations list. Neither source names
  a third validator, an input type, a return type, or a digit policy.
- **Root-only export.** UI System Specification v0.2 §7 ("Exports"): *"One
  public entry (`@zakhmban/ui`) with named exports only, plus three deep
  entries that are part of the contract: `/tokens`, `/styles`,
  `/utils/format`."* Validation is not among the three. This repository's
  `README.md` "Reserved deep entries" table and `src/index.ts`'s own
  widening comment agree: formatters, tokens and styles each carry a
  `(deep entry …)` annotation; the `validation` line does not. A superseded
  planning document, `ZAKHMBAN-V2-FINAL-ARCHITECTURE-DECISIONS.md` §7 (a
  2026‑09‑04 decision-closing pass not cited by this repository's own
  `ARCHITECTURE.md` governing-sources table), names a `zakhmban-ui/validate`
  subpath; it is superseded by the three governing sources above and is not
  followed here. This ADR treats root-only export as an inherited fact it is
  formalizing, not a new decision — consistent with how ADR 0001 formalized
  an existing-but-scattered set of statements rather than inventing one.
- **The boundary with Formatters.** `src/format/phone.ts`'s own doc comment
  already states that normalisation and validation are "explicitly the
  Validation Helpers stage's responsibility," distinct from `maskPhoneDisplay`
  ("presentational only — it does not normalise a phone number to a
  canonical form, validate that one was given, or know anything about OTP or
  authentication").

**What is missing, and is what this ADR decides:** function names, TypeScript
signatures, accepted input representations, canonical normalized output,
digit-script acceptance and normalization direction, structural phone forms,
the national-ID checksum algorithm and its repeated-digit exclusion, and
invalid-input semantics (return value vs. thrown error).

## Problem

How should the two named validation capabilities be exposed as a stable,
reviewable public API — the kind a consumer can pin a git tag against —
when no canonical document defines their input type, output type, digit
handling, or failure semantics? Any implementer who fills this gap
unilaterally at code-review time fixes the package's public contract as a
side effect of an ordinary PR; frozen §2.2 treats every such widening as a
reviewed-diff event, which argues for deciding it here instead.

## Decision

Two functions, exported as named exports from the package root
(`@zakhmban/ui`), and nothing else.

### `normalizeIranianMobile(input: string): string | null`

Normalizes a user-entered Iranian mobile number into one canonical
application representation, or returns `null` if `input` does not match a
recognized shape.

- **Accepted digit scripts:** ASCII (`0`–`9`), Persian (`۰`–`۹`,
  U+06F0–U+06F9), Arabic-Indic (`٠`–`٩`, U+0660–U+0669). All three are
  normalized internally to ASCII before structural matching; the function
  does not care which script the caller used.
- **Whitespace:** outer Unicode whitespace is trimmed. Internal whitespace,
  hyphens and parentheses are **not** stripped or otherwise guessed away —
  an input containing any of them past the trim fails structural matching
  and returns `null`. (No canonical source specifies which internal
  separators a user might type, or that they should be tolerated; this ADR
  does not invent that tolerance. A later ADR may add it.)
- **Accepted structural forms**, `X` meaning an ASCII digit after digit
  normalization: `09XXXXXXXXX` · `9XXXXXXXXX` · `+989XXXXXXXXX` ·
  `00989XXXXXXXXX` · `989XXXXXXXXX`.
- **Canonical output:** `09XXXXXXXXX` — ASCII digits, exactly 11 characters,
  starting `09`. This is the only successful return shape.
- **Explicitly not validated:** carrier/operator prefix allocations (e.g.
  which `09xx` ranges are assigned to which operator) — this helper checks
  structural shape only. Landline numbers, other countries' numbers,
  alphabetic content, and extensions are all rejected.
- **Runtime type violation:** if `typeof input !== "string"` (e.g. `null`,
  `undefined`, a `number`, a `boolean`, an object, an array), the function
  throws `TypeError`. This is API/programmer misuse — a caller ignoring the
  declared `string` parameter type — not a user-input outcome, and is
  distinct from the case below.
- **Invalid string value:** for any `input` that *is* a string but does not
  match a recognized shape, returns `null`. Never throws for this case. Does
  not mutate `input`. No browser, network, or storage access.

### `isValidIranianNationalId(input: string): boolean`

Validates the syntax and checksum of an Iranian 10-digit national ID.

- **Accepted digit scripts:** ASCII, Persian, Arabic-Indic — same three as
  above, normalized internally to ASCII.
- **Whitespace/separators:** outer Unicode whitespace is trimmed. Internal
  spaces, hyphens, or any other separator are **not** accepted; their
  presence past the trim makes the normalized value fail the
  exactly-10-digits check and the function returns `false`.
- **Length:** the normalized value must contain exactly 10 digits.
- **Repeated-digit rejection:** `0000000000` through `9999999999` (all ten
  digits identical) are rejected outright, before the checksum below is
  evaluated.
- **Checksum**, for normalized digits `d0…d9`:

  ```
  sum = d0*10 + d1*9 + d2*8 + d3*7 + d4*6 + d5*5 + d6*4 + d7*3 + d8*2
  remainder = sum % 11
  expectedCheckDigit = remainder < 2 ? remainder : 11 - remainder
  ```

  Valid only when `d9 === expectedCheckDigit`.
- **Runtime type violation:** if `typeof input !== "string"` (e.g. `null`,
  `undefined`, a `number`, a `boolean`, an object, an array), the function
  throws `TypeError`. Same API/programmer-misuse rationale as
  `normalizeIranianMobile` above, and the same distinction from an invalid
  string value.
- **Invalid or malformed string value:** returns `false`. Never throws for
  this case.
- **What `true` means, explicitly:** the supplied value has a syntactically
  and arithmetically valid documented format/checksum. It does **not**
  verify that a real person exists, ownership of that identity, KYC status,
  authentication, or government registry status. Any consumer treating a
  `true` result as identity proof is misusing the function; this ADR records
  the boundary so that misuse is a readable spec violation, not a judgment
  call at the call site.

### Digit-script normalization stays private

Both functions need a Persian/Arabic-Indic → ASCII digit converter. It is an
**internal implementation detail of the `validation/` module**, not a public
export. It is not the same function as `src/format/digits.ts`'s
`toPersianDigits`, which converts the opposite direction (ASCII → Persian)
for display and must not be reused backwards for this purpose. No public
digit-normalization API is introduced by this ADR; one would need its own
reviewed decision.

### Export location

Both functions are exported from `src/index.ts` (the package root,
`@zakhmban/ui`) once implemented. No new `package.json` `exports` entry is
added. `@zakhmban/ui/utils/validation` is deliberately not created — see
Context above and Alternatives below.

### Public surface, closed

Exactly two runtime exports and no exported types:

```
normalizeIranianMobile
isValidIranianNationalId
```

No alias, convenience wrapper, or type is added alongside them —
specifically not `normalizeNationalId`, `validatePhone`, `isValidPhone`,
`ValidationResult`, `PhoneNumber`, or `NationalId`. A consumer needing a
structured result composes one from these two primitives at the call site;
widening the package's own surface for that is a separate, reviewed decision
against a demonstrated need, not a default.

### Separation from Formatters

`maskPhoneDisplay` (presentation, `src/format/phone.ts`) and
`normalizeIranianMobile` (validation, this ADR) are deliberately independent:
neither calls the other, and neither commit may change the other's public
behavior. Display masking receives whatever string it is given and only
manipulates which digits are visible; it does not gain, and must not gain, an
implicit dependency on the normalizer's notion of what a valid Iranian
mobile number looks like. This mirrors `phone.ts`'s own doc comment, quoted
in Context above, and is restated here as a binding constraint on the
Validation Helpers implementation commit, not merely as prior art.

### Explicitly out of scope

This ADR defines format/checksum validation only. It does not define or
authorize: OTP validation, authentication, user lookup, uniqueness checks,
backend validation, KYC, identity ownership, phone carrier lookup, landline
normalization, email validation, postal-code validation, address validation,
a generic form-validation framework, React hooks, form schemas, a
schema-validation library (Zod/Yup or similar), Token Foundation, styles,
icons, primitives, or release tags.

### Runtime type contract

The signatures above are typed as `(input: string)`, but a TypeScript
signature is not enforced at runtime — a consumer on plain JS, or one who
bypasses the type checker, can call either function with any value. This ADR
fixes that boundary explicitly, so no ambiguity survives into the
implementation commit:

| `input` at runtime | `normalizeIranianMobile` | `isValidIranianNationalId` |
| --- | --- | --- |
| not a string (`null`, `undefined`, a number, a boolean, an object, an array, …) | throws `TypeError` | throws `TypeError` |
| a string, but structurally/checksum-invalid | returns `null` | returns `false` |
| a string, valid | returns canonical `09XXXXXXXXX` | returns `true` |

The `TypeError` case is **API/programmer misuse** — a caller that ignored the
declared parameter type — and is deliberately distinct from an ordinary
invalid *value*, which a real user can type and which is never exceptional.
This mirrors `maskPhoneDisplay`'s existing `TypeError`-on-wrong-runtime-type
convention in the Formatters module, applied here for the same reason: a
type violation and a validation failure are different failure classes and
must not share a return channel. No custom error class is introduced —
`TypeError` is the built-in and matches the existing `maskPhoneDisplay`
precedent — and no error-message text is made contractual, since no source
this ADR draws on establishes message-text stability as part of the public
API.

## Consequences

### Positive

- **Unblocks implementation** with a stable, reviewable signature instead of
  an implementer inventing one inside a feature PR.
- **Minimal surface.** Two functions, no exported types, no convenience
  aliases — the smallest contract that covers the two named capabilities,
  consistent with `ARCHITECTURE.md`'s "exports are an allow-list" discipline.
- **No coupling to Formatters.** `maskPhoneDisplay` keeps its existing
  behavior and signature untouched; the two modules stay independently
  testable and independently reviewable.
- **Root-only export matches every current governing document**, so no
  `package.json` change, no new `exports-contract.test.ts` case, and no
  deep-entry resolution question rides along with this ADR.
- **The checksum algorithm is recorded once, precisely**, closing the one
  piece of this contract with a real risk of silent implementer drift
  (there is more than one commonly-circulated Iranian national-ID checksum
  description; this ADR fixes the exact arithmetic so the implementation and
  its tests cannot disagree with each other).

### Negative

- **Narrower than "convenience" would suggest.** Rejecting internal
  whitespace/hyphens/parentheses in `normalizeIranianMobile`, and rejecting
  any national-ID separator at all, means some real-world user input
  (`0912-123 4567`) is not normalized and the caller must pre-clean it or
  show a format error. This is a deliberate initial scope, not an oversight;
  widening the accepted separator set is a small, self-contained follow-up
  decision, not a reason to block this one.
- **No structured result type.** A consumer wanting both "is it valid" and
  "why not" for a national ID gets only a boolean. Adding that is new scope
  against a demonstrated consumer need, not a default this ADR pre-builds.
- **A three-way return contract is more surface to test.** Each function now
  has a `TypeError` path in addition to its two string-input outcomes; the
  implementation's test suite must cover all three for both functions rather
  than two.

## Alternatives considered

**1 · `@zakhmban/ui/utils/validation` deep entry, mirroring `/utils/format`.**
Rejected: no current governing document reserves it. UI System Specification
v0.2 §7 names exactly three deep entries as "part of the contract" and
validation is not one of them; adding a fourth here would be exactly the
unreviewed widening `ARCHITECTURE.md`'s exports-allow-list rule exists to
prevent for two functions.

**2 · `zakhmban-ui/validate` deep entry, per `ZAKHMBAN-V2-FINAL-ARCHITECTURE-DECISIONS.md` §7.**
Rejected: that document is a superseded 2026-09-04 planning pass not named in
this repository's own `ARCHITECTURE.md` governing-sources table, and it
conflicts with the three-deep-entries statement in UI System Specification
v0.2 §7, which is a governing source. Following the superseded per-module
subpath scheme (`/tokens`, `/format`, `/icons`, `/primitives`, `/validate`)
here would also require retrofitting it onto the already-shipped Formatters
export, which is out of this ADR's scope and would reopen a closed stage.

**3 · A structured result type**
(`{ valid: boolean; normalized: string | null }` or similar) instead of
primitive `string | null` / `boolean` returns. Rejected for this initial
contract: no canonical document asks for one, it doubles the public surface
(a function plus a type) for a capability described in six words across
every source that names it, and the task closing this decision explicitly
directs a minimal surface with no `ValidationResult`-shaped export. Revisit
if a consumer demonstrates a real need for structured failure reasons.

**4 · Throwing on any invalid input**, matching form-library conventions.
Rejected: ordinary invalid user input (a mistyped mobile number, a national
ID that fails its checksum) is an expected, common outcome for these two
functions specifically — unlike `maskPhoneDisplay`'s `TypeError`, which
guards a programmer error (wrong runtime type), not a user-input outcome.
Forcing every call site into a `try/catch` for the common case would be
worse ergonomics with no offsetting benefit.

**5 · Accepting arbitrary internal separators in the mobile normalizer**
("for convenience"). Rejected: no canonical source specifies which
separators a user might plausibly type, and guessing invites exactly the
kind of silently-widened acceptance the original Validation Helpers task
was warned against ("Do not broaden accepted inputs 'for convenience.'").
The five structural forms listed under Decision are the complete accepted
set for this contract.

## Sources

- Frozen Technical Architecture v1.1 §2 (repository #3 contents, naming both
  capabilities and nothing beyond them).
- UI System Specification v0.2 §7 ("Exports" — the three-deep-entries
  statement; package-structure diagram — the `validation/` folder and its
  two named capabilities), §9 (Tier 1 foundations list, same two
  capabilities verbatim).
- This repository's `ARCHITECTURE.md` (governing-sources table; the
  exports-allow-list decision and its ADR-required trigger list) and
  `docs/adr/README.md` ("What belongs here").
- `README.md` "Reserved deep entries" table and `src/index.ts`'s widening
  comment — both list validation without a deep-entry annotation, unlike
  formatters, tokens and styles.
- `src/format/phone.ts`'s doc comment, which already states the
  normalisation/validation boundary this ADR formalizes, and
  `maskPhoneDisplay`'s existing `TypeError`-on-wrong-runtime-type behavior,
  which the Runtime type contract decision adopts for both new functions.
- `src/format/digits.ts` (`toPersianDigits`), cited to establish that no
  reverse (Persian/Arabic-Indic → ASCII) converter exists yet and that this
  one is not it.
- The 2026-09-13 implementation attempt on the (since-deleted) branch
  `feat/validation-helpers`, which stopped for exactly the gap this ADR
  closes.
- `project-reference/architecture/ZAKHMBAN-V2-FINAL-ARCHITECTURE-DECISIONS.md`
  §7, consulted and explicitly not followed for the export-subpath question
  — see Alternative 2.
