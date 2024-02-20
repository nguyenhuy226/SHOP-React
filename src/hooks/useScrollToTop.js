import { useEffect } from "react";

export const useScrollToTop = (dependencyList = undefined) => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [dependencyList]); // [] đảm bảo chỉ thực hiện một lần sau khi component mount

  return null; // Custom hook không yêu cầu render UI, nên return null
};
