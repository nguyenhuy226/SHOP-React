const PROFILE = "/ca-nhan";

export const PATH = {
  Home: "/",
  Product: "/san-pham",
  ProductDetail: "/:slug",
  Category: "/:slug/:id",
  ViewCart: "/gio-hang",
  Checkout: "/checkout",
  OrderComplete: "/dat-hang-thanh-cong",
  Profile: {
    Index: PROFILE,
    Order: PROFILE + "/don-hang",
    OrderDetail: PROFILE + "/don-hang/:id",
    Wishlist: PROFILE + "/san-pham-yeu-thich",
    Address: PROFILE + "/so-dia-chi",
    EditAddress: PROFILE + "/so-dia-chi/edit/:id",
    NewAddress: PROFILE + "/so-dia-chi/new",
    NewPayment: PROFILE + "/so-thanh-toan/new",
    EditPayment: PROFILE + "/so-thanh-toan/edit/:id",
    Payment: PROFILE + "/so-thanh-toan",
  },
  Account: "/tai-khoan",
};
