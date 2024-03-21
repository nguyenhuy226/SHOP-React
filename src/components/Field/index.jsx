import { cn } from "@/utils";
import { ErrorStyle, FieldStyle } from "./style";
import { useId } from "react";

export default function Field({
  label,
  error,
  onChange,
  renderField,
  ...props
}) {
  const id = useId();
  const _onChange = (ev) => {
    onChange?.(ev.target.value);
  };
  return (
    <FieldStyle className={cn("form-group relative", { error })}>
      {label && <label htmlFor={id}>{label}</label>}
      {renderField ? (
        renderField({ ...props, error, label, onChange, id })
      ) : (
        <input
          {...props}
          onChange={_onChange}
          className="form-control form-control-sm"
          id={id}
        />
      )}

      {error && <ErrorStyle>{error}</ErrorStyle>}
    </FieldStyle>
  );
}
