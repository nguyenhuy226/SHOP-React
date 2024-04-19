import { cn } from "@/utils";
import { SkeletonStyle } from "./style";

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
