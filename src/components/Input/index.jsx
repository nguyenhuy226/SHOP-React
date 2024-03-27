import { cn } from "@/utils";
import { Popover } from "antd";

export default function Input({
  type = "text",
  helper,
  error,
  onChange,
  ...props
}) {
  return (
    <div className="form-group">
      <div
        className={cn("input-group input-group-merge border", {
          "border border-sold text-[red] !border-[red]": error,
        })}
      >
        <input
          className="form-control !border-0"
          type={type}
          {...props}
          onChange={(ev) => onChange(ev.target.value)}
        />
        {helper && (
          <Popover
            content={helper}
            placement="topRight"
            overlayStyle={{ maxWidth: 250 }}
          >
            <i className="fe fe-help-circle flex items-center px-4" />
          </Popover>
        )}
      </div>
    </div>
  );
}
