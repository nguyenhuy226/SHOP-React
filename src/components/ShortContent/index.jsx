import React, { useState } from "react";
import { ShortedContentStyle } from "./style";
import { cn } from "@/utils";
import { Button } from "../Button";

export const ShortContent = ({ children, className, ...props }) => {
  const [isShorted, setIsShorted] = useState(true);
  return (
    <ShortedContentStyle className={className}>
      <div
        {...props}
        className="content"
        style={{ height: isShorted ? 300 : "auto" }}
      >
        {children}
      </div>
      <div className="read-more pt-10">
        <Button
          outline
          onClick={() => setIsShorted(!isShorted)}
          className="min-w-[300px] btn-xs"
        >
          {isShorted ? "Mở rộng" : "Thu gọn"}
        </Button>
      </div>
    </ShortedContentStyle>
  );
};
