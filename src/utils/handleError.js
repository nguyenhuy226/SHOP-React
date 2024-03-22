import { message } from "antd";

export const handleError = (err, key) => {
  console.log(err);
  if (err.response?.data?.message || err?.message) {
    message.error({
      key,
      content: err.response?.data?.message || err?.message,
    });
  }
};
