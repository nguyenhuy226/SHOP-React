import React from "react";
import { SelectStyle } from "./style";
import { cn } from "@/utils";

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
