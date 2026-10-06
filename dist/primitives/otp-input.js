import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
 *
 * WHAT THIS FILE CHOOSES, because the contract left it open:
 *
 *   - `onChange` and `onComplete` take the value, not a native event. A
 *     native change event belongs to one cell and one cell is not the code;
 *     there is no single element whose event means "the code changed", so a
 *     value callback is the only coherent shape. `TextField` and `Select`
 *     use native handlers for the opposite reason: each wraps one control.
 *   - cells accept ASCII digits only. §5 classifies OTP cells as Latin
 *     technical values, so storing a Persian digit would put a non-Latin
 *     character into a value the application compares against a code, and
 *     silently transliterating one would be a value transformation nobody
 *     approved.
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
 *   - the polite result announcement carries the VALUE and no authored
 *     prose. §3.2 requires the result be "announced politely" but names no
 *     text, no prop supplies one, and frozen v1.1 §2.1 forbids this package
 *     carrying application-specific strings. The status region is therefore
 *     empty until the code is complete and then holds the code itself, which
 *     is the caller's data. Announcing different words would need a prop
 *     §3.2 does not provide, and that is an owner decision this file does
 *     not take.
 *   - each cell's `aria-label` is its position as a bare numeral, for the
 *     same reason: a positional label must exist, and a numeral is the only
 *     one that is not prose. The GROUP's name comes from the application
 *     through the `aria-*` pass-through §3 requires.
 *
 * None of those is a public contract, and each can change without a ruling.
 */
import { useEffect, useId, useRef, } from "react";
/** §5: OTP cells are Latin technical values. */
const DIGIT = /[0-9]/;
const NON_DIGITS = /[^0-9]/g;
/** §3.2: "Five-cell code entry". */
const DEFAULT_LENGTH = 5;
export function OtpInput({ length = DEFAULT_LENGTH, value = "", onChange, onComplete, error, className, style, ref, id, ...rest }) {
    const generatedId = useId();
    const groupId = id ?? generatedId;
    const errorId = `${groupId}-error`;
    const statusId = `${groupId}-status`;
    const cells = useRef([]);
    /** The last complete code `onComplete` was called for, so it fires once. */
    const announced = useRef(null);
    const invalid = typeof error === "string" && error.length > 0;
    const digits = value.replace(NON_DIGITS, "").slice(0, length);
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
    const pending = useRef(null);
    if (pending.current !== null && pending.current !== digits) {
        pending.current = null;
    }
    const current = () => pending.current ?? digits;
    const report = (next) => {
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
    const focusCell = (index) => {
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
    const commit = (next, at) => {
        const code = current();
        const start = Math.min(at, code.length);
        const incoming = next.replace(NON_DIGITS, "").slice(0, length - start);
        if (incoming === "") {
            return;
        }
        const chars = code.split("");
        for (let i = 0; i < incoming.length; i += 1) {
            chars[start + i] = incoming[i];
        }
        report(chars.join("").slice(0, length));
        focusCell(Math.min(start + incoming.length, length - 1));
    };
    /** Removes the digit at `index`, shifting the rest left. */
    const removeAt = (index) => {
        const code = current();
        if (index < 0 || index >= code.length) {
            return;
        }
        report(code.slice(0, index) + code.slice(index + 1));
    };
    const handleChange = (index) => (event) => {
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
    const handleKeyDown = (index) => (event) => {
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
                if (event.key.length === 1 && DIGIT.test(event.key)) {
                    event.preventDefault();
                    commit(event.key, index);
                }
            }
        }
    };
    /** §3.2: "paste fills all cells" — from whichever cell received it. */
    const handlePaste = (index) => (event) => {
        const pasted = event.clipboardData.getData("text");
        if (pasted === "") {
            return;
        }
        event.preventDefault();
        commit(pasted, index);
    };
    return (_jsxs("div", { ref: ref, className: className === undefined ? "zakhmban-otp" : `zakhmban-otp ${className}`, ...(style === undefined ? {} : { style }), children: [_jsx("div", { ...rest, id: groupId, className: "zakhmban-otp-cells", dir: "ltr", role: "group", children: Array.from({ length }, (_, index) => {
                    const digit = digits[index] ?? "";
                    return (_jsx("input", { ref: (element) => {
                            cells.current[index] = element;
                        }, className: "zakhmban-otp-cell", value: digit, onChange: handleChange(index), onKeyDown: handleKeyDown(index), onPaste: handlePaste(index), inputMode: "numeric", "aria-label": String(index + 1), "aria-invalid": invalid || undefined, "aria-describedby": invalid ? errorId : undefined, ...(index === 0 ? { autoComplete: "one-time-code" } : {}) }, index));
                }) }), _jsx("p", { className: "zakhmban-otp-status", id: statusId, role: "status", children: complete ? digits : "" }), invalid ? (_jsx("p", { className: "zakhmban-otp-error", id: errorId, role: "alert", children: error })) : null] }));
}
//# sourceMappingURL=otp-input.js.map