const PROFILE = "/ca-nhan";

export const PATH = {
  Home: "/",
  Product: "/san-pham",
  ProductDetail: "/:slug",
  Category: "/:slug/:id",
  Profile: {
    Index: PROFILE,
    Oder: PROFILE + "/don-hang",
    Wishlist: PROFILE + "/san-pham-yeu-thich",
    Address: PROFILE + "/so-dia-chi",
    EditAddress: PROFILE + "/so-dia-chi/edit/:id",
    NewAddress: PROFILE + "/so-dia-chi/new",
    Payment: PROFILE + "/so-thanh-toan",
  },
  Account: "/tai-khoan",
};
