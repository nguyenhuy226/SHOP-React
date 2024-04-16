import { message } from "antd";
import { t } from "@/components/TranslateProvider";
export const handleError = (err, key) => {
  console.log(err);
  if (err.response?.data?.message || err?.message) {
    const content = err?.response?.data?.message || err?.message;
    message.error({
      key,
      content: t?.(content) || content,
    });
  }
};
