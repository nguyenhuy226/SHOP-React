export const currency = (price) => {
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return VND.format(price);
};
