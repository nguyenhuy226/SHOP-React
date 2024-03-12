import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { cn } from "@/utils";
export const Button = ({ children, loading, ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        "btn btn-sm btn-dark flex items-center justify-center gap-2",
        { "disabled pointer-events-none": loading }
      )}
    >
      {loading && <LoadingOutlined />}
      {children}
    </button>
  );
};
