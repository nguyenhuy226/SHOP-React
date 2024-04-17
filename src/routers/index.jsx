import PrivateRouter from "@/components/PrivateRouter";
import { PATH } from "@/config";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages";
import Page404 from "@/pages/Page404";
import ProductDetailPage from "@/pages/[slug]";
import ProductPage from "@/pages/san-pham";
import { profile } from "./ca-nhan";
import GuestRouter from "@/components/GuestRouter";
import Account from "@/pages/tai-khoan";
import ViewCart from "@/pages/gio-hang";
import Checkout from "@/pages/checkout";
import OrderComplete from "@/pages/dat-hang-thanh-cong";
import { ResetPassword } from "@/pages/reset-pssword";
import { Contact } from "@/pages/contact";
import { StoreLocator } from "@/pages/store-locator";
import ShippingAndReturns from "@/pages/shipping-and-returns";
import { Faq } from "@/pages/faq";

export const routes = [
  {
    element: <MainLayout />,
    children: [
      {
        element: <HomePage />,
        path: PATH.Home,
      },
      {
        element: <Checkout />,
        path: PATH.Checkout,
      },
      {
        element: <ViewCart />,
        path: PATH.ViewCart,
      },
      {
        element: <OrderComplete />,
        path: PATH.OrderComplete,
      },
      {
        element: <ProductPage />,
        path: PATH.Product,
      },
      {
        element: <ProductPage />,
        path: PATH.Category,
      },
      {
        element: <Contact />,
        path: PATH.Contact,
      },
      {
        element: <StoreLocator />,
        path: PATH.StoreLocator,
      },
      {
        element: <ShippingAndReturns />,
        path: PATH.ShippingAndReturns,
      },
      {
        element: <Faq />,
        path: PATH.Faq,
      },
      {
        element: <PrivateRouter redirect={PATH.Account} />,
        path: PATH.Profile.Index,
        children: profile,
      },
      {
        element: <ProductDetailPage />,
        path: PATH.ProductDetail,
      },
      {
        element: <GuestRouter redirect={PATH.Profile.Index} />,
        children: [
          {
            element: <Account />,
            path: PATH.Account,
          },
          {
            element: <ResetPassword />,
            path: PATH.ResetPassword,
          },
        ],
      },
      {
        element: <Page404 />,
        path: "*",
      },
    ],
  },
];
