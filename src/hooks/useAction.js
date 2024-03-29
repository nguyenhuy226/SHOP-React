import { handleError } from "@/utils";
import { message } from "antd";
import { useId, useRef } from "react";

export const useAction = ({
  service,
  loadingMessage,
  successMessage,
  onSuccess,
  reTry = true,
}) => {
  const flagRef = useRef(false);
  const key = useId();

  const onAction = async (...args) => {
    if (flagRef.current) return;
    flagRef.current = true;
    try {
      if (loadingMessage) {
        message.loading({
          key,
          content: loadingMessage,
          duration: 0,
        });
      }
      await service(...args);
      if (successMessage) {
        message.success({
          key,
          content: successMessage,
        });
      } else {
        // trường hợp không truyền successMessage thì có destroy để xử lý loading
        message.destroy(key);
      }
      onSuccess?.();
    } catch (error) {
      handleError(error, key);
    }
    if (reTry) {
      flagRef.current = false;
    }
  };
  return onAction;
};
