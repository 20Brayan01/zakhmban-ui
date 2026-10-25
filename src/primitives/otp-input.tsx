/**
 * OtpInput — the last of the five primitives frozen by Technical Architecture
 * v1.1 §2.1, implemented under the OtpInput Implementation Authorization of
 * 2026-10-06.
 *
 * The contract it implements, none of which is decided here:
 *
 *   v0.2 §3.2   the five props `length value onChange onComplete error`;
 *               "Five-cell code entry"; "LTR digit order inside an RTL page;
 *               paste fills all cells; `autocomplete="one-time-code"`;
 *               result announced politely."
 *   v0.2 §5     OTP cells are Latin technical values isolated with
 *               `dir="ltr"`.
 *   v0.2 §6     every tappable cell is 44×44px minimum, unconditionally;
 *               errors take `role="alert"`; success and progress take
 *               `role="status"`; real elements first; full keyboard
 *               operation.
 *   Ruling 2    the `error` prop is a TEXT MESSAGE taking the Caption step
 *               and `--danger-fg`.
 *   Ruling 3    the digits take `--text-card-title` with `--text-primary`
 *               and tabular figures.
 *   Ruling 4    the resend cooldown and the resend action are
 *               APPLICATION-OWNED. This file has no timer, no resend control
 *               and no cooldown prop, and renders neither.
 *   Announce-   §3.2's "result announced politely" is discharged by calling
 *   ment        `onComplete(value)`, and the CONSUMING APPLICATION owns the
 *   Ruling      localized, polite message. This file renders NO live region
 *               of its own for completion, never places the raw code in
 *               `role="status"` or any other live region — announcing a
 *               one-time code aloud reads out a credential — and never
 *               states or implies that a complete entry is VALID, because
 *               completeness is not correctness and only the application
 *               can check the code. The error region is unaffected and
 *               keeps `role="alert"` (§6).
 *
 * WHAT THIS FILE CHOOSES, because the contract left it open:
 *
 *   - `onChange` and `onComplete` take the value, not a native event. A
 *     native change event belongs to one cell and one cell is not the code;
 *     there is no single element whose event means "the code changed", so a
 *     value callback is the only coherent shape. `TextField` and `Select`
 *     use native handlers for the opposite reason: each wraps one control.
 *   - cells accept every Unicode decimal digit (`\p{Nd}`) — ASCII, Persian
 *     (`۰`–`۹`), Arabic-Indic (`٠`–`٩`) and any other script, alone or mixed
 *     — typed, pasted or autofilled, and hold the ASCII digit of the same
 *     value. §5 classifies OTP cells as Latin technical values, so a cell
 *     SHOWS a Latin digit and `onChange` / `onComplete` carry Latin digits,
 *     which is what the application compares against a code. Iranian
 *     keyboards produce Persian digits, and refusing them left those users
 *     unable to enter a code (zakhmban-therapists CS-17); the owner ruling
 *     of 2026-10-23 replaces this file's earlier choice of ASCII only, which
 *     had called the transliteration "a value transformation nobody
 *     approved". Characters that are not decimal digits (`²`, `①`, `٫`,
 *     letters, separators) are still refused, and a paste or autofill is
 *     filtered, not rejected, as it always was. The same normalisation
 *     reads the `value` prop, so a code held in any digit script renders in
 *     the cells rather than as empty ones.
 *   - `autocomplete="one-time-code"` sits on the FIRST cell. Platforms fill
 *     the first field carrying it, delivering the whole code at once, and
 *     the change handler spreads a multi-character insertion across the
 *     cells exactly as it spreads a paste.
 *   - NO `maxLength` on a cell, which is the opposite of the obvious choice.
 *     `maxLength={1}` makes the browser REJECT a multi-character insertion
 *     outright: the `beforeinput` carrying all five digits produces no
 *     `input` event at all, so the autofill above would silently do nothing.
 *     Verified by instrumenting a real browser — jsdom's `fireEvent` does not
 *     enforce `maxLength`, so a test suite alone reports success. A cell shows
 *     one digit because it is controlled and rendered with one, not because
 *     the platform was told to truncate.
 *   - nothing about the completion announcement. That is NOT this file's
 *     choice any more: the OtpInput Completion Announcement Ruling of
 *     2026-10-06 settles it. See the contract list above.
 *   - each cell's `aria-label` is its position as a bare numeral, for the
 *     same reason: a positional label must exist, and a numeral is the only
 *     one that is not prose. The GROUP's name comes from the application
 *     through the `aria-*` pass-through §3 requires.
 *
 * None of those is a public contract, and each can change without a ruling.
 */
import {
  useEffect,
  useId,
  useRef,
  type ClipboardEvent,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type ChangeEvent,
  type Ref,
} from "react";

/**
 * A decimal digit in any script, one code point. The same class `maskPhoneDisplay`
 * counts as a digit (`\p{Nd}`), so a digit form nobody listed is accepted
 * rather than silently dropped.
 */
const DECIMAL_DIGIT = /^\p{Nd}$/u;

/**
 * The ASCII digit with the same value as `char`, a single decimal digit.
 *
 * Unicode lays every decimal-digit script out as a run of consecutive code
 * points beginning at its zero, and a run is always a multiple of ten long
 * (the Mathematical digits are five runs back to back). So the value is the
 * distance from the start of the run, modulo ten, and no per-script table
 * exists to fall out of date. `tests/primitives/otp-input.test.tsx` asserts
 * both facts across the whole code space for the Unicode this runtime ships.
 */
function asciiDigit(char: string): string {
  const code = char.codePointAt(0) ?? 0;
  if (code >= 0x30 && code <= 0x39) {
    return char;
  }
  let offset = 0;
  while (DECIMAL_DIGIT.test(String.fromCodePoint(code - offset - 1))) {
    offset += 1;
  }
  return String(offset % 10);
}

/**
 * Every decimal digit of `text`, in order, as ASCII; everything else dropped.
 * §5: OTP cells are Latin technical values, so this is where a Persian or
 * Arabic-Indic digit becomes the Latin one the primitive has always emitted.
 */
function digitsOf(text: string): string {
  let digits = "";
  for (const char of text) {
    if (DECIMAL_DIGIT.test(char)) {
      digits += asciiDigit(char);
    }
  }
  return digits;
}

/** §3.2: "Five-cell code entry". */
const DEFAULT_LENGTH = 5;

/**
 * How the cells are drawn. `default` is every cell alike, sharing the row
 * (what every release before v0.5.0 drew). `filled` is the therapist
 * design's cell: fixed 48 x 52 cells packed at the start of the row, and a
 * cell that holds a digit takes the brand-green border and the subtle fill.
 * Owner decision of 2026-10-25; ADR 0003, Amendment of 2026-10-25. Behaviour is identical.
 */
export type OtpInputAppearance = "default" | "filled";

type PassThrough = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "className" | "onChange" | "style"
>;

export interface OtpInputProps extends PassThrough {
  /** Number of cells. Defaults to 5, per §3.2's "Five-cell code entry". */
  length?: number;
  /** The controlled code. Shorter than `length` means partially entered. */
  value?: string;
  /** Called with the whole code whenever any cell changes. */
  onChange?: (value: string) => void;
  /** Called with the code when the last empty cell is filled. */
  onComplete?: (value: string) => void;
  /** The error message. Its presence is what puts the field in the error state. */
  error?: string;
  /**
   * Opt-in since v0.5.0. Defaults to `default`, which renders exactly what
   * v0.4.1 rendered. The count of cells stays `length`; the digits stay Latin.
   */
  appearance?: OtpInputAppearance;
  /** Applied to the outermost node, with `style` and the forwarded ref. */
  className?: string;
  /** Applied to the outermost node. */
  style?: CSSProperties;
  /** Forwarded to the outermost DOM node, as v0.2 §3 requires. */
  ref?: Ref<HTMLDivElement>;
}

export function OtpInput({
  length = DEFAULT_LENGTH,
  value = "",
  onChange,
  onComplete,
  error,
  appearance = "default",
  className,
  style,
  ref,
  id,
  ...rest
}: OtpInputProps) {
  const generatedId = useId();
  const groupId = id ?? generatedId;
  const errorId = `${groupId}-error`;

  const cells = useRef<(HTMLInputElement | null)[]>([]);
  /** The last complete code `onComplete` was called for, so it fires once. */
  const announced = useRef<string | null>(null);

  const invalid = typeof error === "string" && error.length > 0;
  const digits = digitsOf(value).slice(0, length);
  const complete = digits.length === length && length > 0;

  /**
   * The last value this component reported, held across a synchronous burst
   * of keystrokes.
   *
   * A controlled component normally computes the next value from the prop it
   * was rendered with — but someone typing a five-digit code produces five
   * keydowns before React renders once. Every handler in that burst would
   * read the same stale prop, each would compute position 0, and four of the
   * five digits would be lost. Found by typing into a real browser; jsdom
   * cannot reproduce it, because its test helpers flush a render between
   * events.
   *
   * So writes compose against what was last REPORTED, and the parent still
   * wins: the moment a render arrives carrying anything other than this
   * pending value — because the parent accepted it, rewrote it, or refused
   * it — the pending value is dropped and the prop takes over.
   */
  const pending = useRef<string | null>(null);
  if (pending.current !== null && pending.current !== digits) {
    pending.current = null;
  }
  const current = (): string => pending.current ?? digits;

  const report = (next: string): void => {
    pending.current = next;
    onChange?.(next);
  };

  /**
   * §3.2's completion callback. In an effect rather than inside the change
   * handler so it reflects the value the component was actually GIVEN: a
   * controlled parent may reject or rewrite what the handler proposed, and
   * firing from the handler would announce a completion that never happened.
   *
   * `announced` makes it fire once per distinct complete code — not again on
   * a re-render that changes nothing, and not again until the code changes.
   */
  useEffect(() => {
    if (!complete) {
      announced.current = null;
      return;
    }
    if (announced.current === digits) {
      return;
    }
    announced.current = digits;
    onComplete?.(digits);
  }, [complete, digits, onComplete]);

  const focusCell = (index: number): void => {
    const cell = cells.current[index];
    if (cell === null || cell === undefined) {
      return;
    }
    cell.focus();
    cell.select();
    /* Below 320 CSS px the row scrolls inside its own group rather than the
       page. A focused cell outside that scrollport would be unreachable in
       practice, so it is brought back.
       
       Feature-detected because it is a progressive enhancement, not a
       contract: jsdom implements no `scrollIntoView` at all, and a renderer
       without it must still be able to focus a cell. Same discipline as
       `BottomSheet`'s `ResizeObserver` fallback. */
    if (typeof cell.scrollIntoView === "function") {
      cell.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  };

  /**
   * Writes `next` into the code at `at`, then reports it.
   *
   * THE VALUE IS ALWAYS A PREFIX — never "1 3" with a hole in it. A string
   * cannot represent an empty middle cell, and a space smuggled into the
   * value would reach the application as a character in the code it compares.
   * Two rules keep the invariant: a write lands no further than the end of
   * what is already entered, and a deletion splices rather than blanks.
   */
  const commit = (next: string, at: number): void => {
    const code = current();
    const start = Math.min(at, code.length);
    const incoming = digitsOf(next).slice(0, length - start);
    if (incoming === "") {
      return;
    }

    const chars = code.split("");
    for (let i = 0; i < incoming.length; i += 1) {
      chars[start + i] = incoming[i]!;
    }
    report(chars.join("").slice(0, length));

    focusCell(Math.min(start + incoming.length, length - 1));
  };

  /** Removes the digit at `index`, shifting the rest left. */
  const removeAt = (index: number): void => {
    const code = current();
    if (index < 0 || index >= code.length) {
      return;
    }
    report(code.slice(0, index) + code.slice(index + 1));
  };

  const handleChange =
    (index: number) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      const typed = event.target.value;
      if (typed === "") {
        // The browser cleared the cell — mirror it without moving focus.
        removeAt(index);
        return;
      }
      /* A platform autofill of `one-time-code` arrives here as one multi
         character insertion, and is spread exactly as a paste is. */
      commit(typed, index);
    };

  const handleKeyDown =
    (index: number) =>
    (event: KeyboardEvent<HTMLInputElement>): void => {
      switch (event.key) {
        case "Backspace": {
          event.preventDefault();
          if (index < current().length) {
            removeAt(index);
            return;
          }
          if (index > 0) {
            removeAt(index - 1);
            focusCell(index - 1);
          }
          return;
        }
        case "Delete": {
          event.preventDefault();
          removeAt(index);
          return;
        }
        /* The row is `dir="ltr"`, so visual left is always the lower index
           whatever the document direction is. */
        case "ArrowLeft": {
          event.preventDefault();
          focusCell(Math.max(0, index - 1));
          return;
        }
        case "ArrowRight": {
          event.preventDefault();
          focusCell(Math.min(length - 1, index + 1));
          return;
        }
        case "Home": {
          event.preventDefault();
          focusCell(0);
          return;
        }
        case "End": {
          event.preventDefault();
          focusCell(length - 1);
          return;
        }
        default: {
          /* Single digits are handled here rather than in the change
             handler, so typing over a filled cell replaces it instead of
             appending to it. */
          if (DECIMAL_DIGIT.test(event.key)) {
            event.preventDefault();
            commit(event.key, index);
          }
        }
      }
    };

  /** §3.2: "paste fills all cells" — from whichever cell received it. */
  const handlePaste =
    (index: number) =>
    (event: ClipboardEvent<HTMLInputElement>): void => {
      const pasted = event.clipboardData.getData("text");
      if (pasted === "") {
        return;
      }
      event.preventDefault();
      commit(pasted, index);
    };

  /* Only the non-default appearance adds a class or an attribute, so a
     default OtpInput's markup is byte-identical to v0.4.1's. */
  const filledAppearance = appearance === "filled";
  const rootClass = [
    "zakhmban-otp",
    ...(filledAppearance ? ["zakhmban-otp-filled"] : []),
    ...(className === undefined ? [] : [className]),
  ].join(" ");

  return (
    <div
      ref={ref}
      className={rootClass}
      {...(style === undefined ? {} : { style })}
    >
      {/* §5's isolation, as an ATTRIBUTE: no CSS rule sets `direction`, so
          owner D-2 is untouched, and cell 1 is leftmost inside the RTL page.
          The group's accessible name is the application's to supply through
          the `aria-*` pass-through. */}
      <div
        {...rest}
        id={groupId}
        className="zakhmban-otp-cells"
        dir="ltr"
        role="group"
      >
        {Array.from({ length }, (_, index) => {
          const digit = digits[index] ?? "";
          return (
            <input
              key={index}
              ref={(element) => {
                cells.current[index] = element;
              }}
              className="zakhmban-otp-cell"
              value={digit}
              onChange={handleChange(index)}
              onKeyDown={handleKeyDown(index)}
              onPaste={handlePaste(index)}
              inputMode="numeric"
              aria-label={String(index + 1)}
              aria-invalid={invalid || undefined}
              aria-describedby={invalid ? errorId : undefined}
              {...(filledAppearance && digit !== ""
                ? { "data-zakhmban-otp-digit": "" }
                : {})}
              {...(index === 0 ? { autoComplete: "one-time-code" } : {})}
            />
          );
        })}
      </div>

      {/* NO live region here, deliberately. The OtpInput Completion
          Announcement Ruling of 2026-10-06: the primitive's share of §3.2's
          "result announced politely" is `onComplete(value)` above, and the
          application owns the message. A package-owned region could only
          hold the code itself — this package may carry no
          application-specific string (frozen v1.1 §2.1) — and announcing a
          one-time code aloud reads out a credential. */}
      {invalid ? (
        <p className="zakhmban-otp-error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
