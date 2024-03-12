import React from "react";
import { SkeletonStyle } from "./style";
import { cn } from "@/utils";

export default function Skeleton({ children, width, height, shape, ...props }) {
  return (
    <SkeletonStyle
      {...props}
      className={cn(shape, props.className)}
      style={{ width, height }}
    >
      {children}
    </SkeletonStyle>
  );
}
