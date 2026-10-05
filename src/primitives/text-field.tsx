/**
 * TextField — one of the five primitives frozen by Technical Architecture
 * v1.1 §2.1, implemented under the TextField and Select Implementation
 * Authorization of 2026-10-05.
 *
 * The contract it implements, none of which is decided here:
 *
 *   v0.2 §3.2   the eleven props `label† value onChange hint error required
 *               suffix multiline rows dir inputMode`; the single-line,
 *               multiline and suffix-unit forms; 48px and radius 14; the
 *               states empty, filled, focus, error, disabled and read-only;
 *               "Label is a real `<label>`; hint and error wired via
 *               `aria-describedby`; `aria-invalid` on error. Never
 *               placeholder-as-label."
 *   v0.2 §3     `className` / `style` / `id` / `data-*` / `aria-*`
 *               pass-through, and the ref forwarded to the outermost DOM
 *               node.
 *   v0.2 §6     errors announced with `role="alert"`; real elements first;
 *               full keyboard operation.
 *   Ruling      error text takes the Caption step and `--danger-fg`
 *               (TextField and Select Error Typography Ruling, 2026-10-05).
 *
 * WHAT THIS FILE CHOOSES, because the contract left it open:
 *
 *   - `onChange` is the native React change handler rather than a
 *     `(value: string)` callback. §3.2 names the prop and not its signature,
 *     and the native event is the least invented shape: it carries
 *     `target.value` plus everything else a form needs, and it keeps `value`
 *     / `onChange` an ordinary controlled native pair.
 *   - `disabled` and `readOnly` arrive through native attribute
 *     pass-through, not as declared props. §3.2 names both as states but
 *     puts neither in the prop list; inventing two prop names would be a
 *     larger step than letting the real attributes through to the real
 *     control.
 *   - the bordered box is a wrapper around the control, because the
 *     suffix-unit form needs the unit inside the field's border. The global
 *     `:focus-visible` indicator is left to paint on the control itself,
 *     which is the focusable element D-3 is written about; this file neither
 *     replaces, removes nor re-declares it.
 *   - the suffix is DESCRIBED, not hidden. "تومان" and "سانتی‌متر" are the
 *     unit the number is in, so a field announced without them is announced
 *     wrongly. It joins `aria-describedby` rather than taking
 *     `aria-hidden`, which is what an `Icon`-style decoration would take.
 *
 * None of those is a public contract, and each can change without a ruling.
 */
import {
  useId,
  type ChangeEventHandler,
  type CSSProperties,
  type HTMLInputTypeAttribute,
  type InputHTMLAttributes,
  type Ref,
} from "react";

import {
  describedBy,
  FIELD,
  FIELD_CONTROL,
  FIELD_INPUT,
  FIELD_LABEL,
  FIELD_MESSAGE,
  FIELD_SUFFIX,
} from "./field.js";

/**
 * Native attributes this component owns and therefore does not accept twice.
 *
 * `className` and `style` are removed from the control's set because §3 puts
 * them on the outermost node, which here is the wrapper rather than the
 * input. Everything else native — `disabled`, `readOnly`, `placeholder`,
 * `name`, `autoComplete`, `maxLength`, `onBlur`, `data-*`, `aria-*` — passes
 * straight through.
 *
 * The element parameter is the union, because the same set is spread onto an
 * `<input>` or a `<textarea>` depending on `multiline`, and an event handler
 * written for both is accepted by either. `type` is handled separately for
 * the same reason: it is meaningless on a textarea, so it is declared below
 * and applied only to the single-line form.
 */
type PassThrough = Omit<
  InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
  | "children"
  | "className"
  | "dir"
  | "inputMode"
  | "onChange"
  | "required"
  | "rows"
  | "style"
  | "type"
  | "value"
>;

export interface TextFieldProps extends PassThrough {
  /** The field's accessible name, rendered as a real `<label>`. Required. */
  label: string;
  /** The controlled value. */
  value?: string;
  /** Native change handler for the underlying input or textarea. */
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /** Supporting text, described to assistive technology. */
  hint?: string;
  /** The error message. Its presence is what puts the field in the error state. */
  error?: string;
  /** Marks the control required. */
  required?: boolean;
  /** A trailing unit shown inside the field — تومان, سانتی‌متر. */
  suffix?: string;
  /** Renders a `<textarea>` instead of an `<input>`. */
  multiline?: boolean;
  /** Visible rows of a multiline field. Ignored otherwise. */
  rows?: number;
  /**
   * Direction of the control's own content. v0.2 §5's isolation mechanism
   * for a Latin technical value — a request code, an IBAN, a filename —
   * inside an RTL page. The package sets no direction of its own.
   */
  dir?: "rtl" | "ltr";
  /** The on-screen keyboard hint. */
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  /**
   * The native input type, for the single-line form only. Not in §3.2's prop
   * list and not invented either: it is the real attribute of the real
   * element, and `email` or `tel` carry semantics and autofill that
   * `inputMode` does not. Ignored when `multiline` is set.
   */
  type?: HTMLInputTypeAttribute;
  /** Applied to the outermost node, with `style` and the forwarded ref. */
  className?: string;
  /** Applied to the outermost node. */
  style?: CSSProperties;
  /** Forwarded to the outermost DOM node, as v0.2 §3 requires. */
  ref?: Ref<HTMLDivElement>;
}

export function TextField({
  label,
  value,
  onChange,
  hint,
  error,
  required,
  suffix,
  multiline,
  rows,
  dir,
  inputMode,
  type,
  className,
  style,
  ref,
  id,
  "aria-describedby": callerDescribedBy,
  ...rest
}: TextFieldProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;
  const hintId = `${controlId}-hint`;
  const errorId = `${controlId}-error`;
  const suffixId = `${controlId}-suffix`;

  const invalid = typeof error === "string" && error.length > 0;
  const hasHint = typeof hint === "string" && hint.length > 0;
  const hasSuffix = typeof suffix === "string" && suffix.length > 0;

  /**
   * §3.2's two wiring duties in one value. The caller's own
   * `aria-describedby` comes first so the component's hint and error are the
   * last thing announced, and the error is announced even though it also
   * carries `role="alert"` — the live region covers the moment it appears,
   * `aria-describedby` covers every later visit to the field.
   */
  const description = describedBy(
    callerDescribedBy,
    hasSuffix && suffixId,
    hasHint && hintId,
    invalid && errorId,
  );

  /** Identical for both forms, so a textarea cannot drift from an input. */
  const shared = {
    ...rest,
    id: controlId,
    className: FIELD_INPUT,
    value,
    required,
    "aria-invalid": invalid || undefined,
    "aria-describedby": description,
    ...(dir === undefined ? {} : { dir }),
  };

  return (
    <div
      ref={ref}
      className={className === undefined ? FIELD : `${FIELD} ${className}`}
      {...(style === undefined ? {} : { style })}
    >
      <label className={FIELD_LABEL} htmlFor={controlId}>
        {label}
      </label>

      <div
        className={FIELD_CONTROL}
        data-zakhmban-field-invalid={invalid || undefined}
      >
        {multiline === true ? (
          <textarea
            {...shared}
            onChange={onChange}
            {...(rows === undefined ? {} : { rows })}
          />
        ) : (
          <input
            {...shared}
            onChange={onChange}
            {...(type === undefined ? {} : { type })}
            {...(inputMode === undefined ? {} : { inputMode })}
          />
        )}
        {hasSuffix ? (
          <span className={FIELD_SUFFIX} id={suffixId}>
            {suffix}
          </span>
        ) : null}
      </div>

      {hasHint ? (
        <p
          className={FIELD_MESSAGE}
          id={hintId}
          data-zakhmban-field-message="hint"
        >
          {hint}
        </p>
      ) : null}

      {invalid ? (
        <p
          className={FIELD_MESSAGE}
          id={errorId}
          data-zakhmban-field-message="error"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
