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
import { type CSSProperties, type HTMLAttributes, type Ref } from "react";
/**
 * How the cells are drawn. `default` is every cell alike, sharing the row
 * (what every release before v0.5.0 drew). `filled` is the therapist
 * design's cell: fixed 48 x 52 cells packed at the start of the row, and a
 * cell that holds a digit takes the brand-green border and the subtle fill.
 * Owner decision of 2026-10-25; ADR 0003, Amendment of 2026-10-25. Behaviour is identical.
 */
export type OtpInputAppearance = "default" | "filled";
type PassThrough = Omit<HTMLAttributes<HTMLDivElement>, "children" | "className" | "onChange" | "style">;
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
export declare function OtpInput({ length, value, onChange, onComplete, error, appearance, className, style, ref, id, ...rest }: OtpInputProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=otp-input.d.ts.map