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

export const routes = [
  {
    element: <MainLayout />,
    children: [
      {
        element: <HomePage />,
        path: PATH.Home,
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
        element: <PrivateRouter redirect={PATH.Account} />,
        children: profile,
        path: PATH.Profile.Index,
      },
      {
        element: <ProductDetailPage />,
        path: PATH.ProductDetail,
      },
      {
        element: <GuestRouter redirect={PATH.Profile.Index} />,
        path: PATH.Account,
        children: [
          {
            element: <Account />,
            index: true,
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
