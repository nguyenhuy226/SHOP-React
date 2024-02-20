import { useRef, useState } from "react";
// deplay lại một lệnh hay là gọi api  sau một khoảng thời gian timing
export const useDebounce = (defaultValue, timing = 300) => {
  const timingRef = useRef();
  const [value, _setValue] = useState(defaultValue);
  const setValue = (value) => {
    if (timingRef.current) {
      clearTimeout(timingRef.current);
    }
    timingRef.current = setTimeout(() => {
      _setValue(value);
      timingRef.current = null;
    }, timing);
  };
  return [value, setValue];
};
