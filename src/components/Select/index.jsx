import { cn } from "@/utils";
import { SelectStyle } from "./style";

export default function Select({ error, children, ...props }) {
  return (
    <SelectStyle
      {...props}
      onChange={(ev) => props?.onChange?.(ev.target.value)}
      className={cn("custom-select", {
        "border border-sold text-[red] !border-[red]": error,
      })}
    >
      {children}
    </SelectStyle>
  );
}
