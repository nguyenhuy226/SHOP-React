import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages";
import Page404 from "@/pages/Page404";

export const routes = [
  {
    element: <MainLayout />,
    children: [
      {
        element: <Home />,
        path: "/",
      },
      {
        element: <Page404 />,
        path: "*",
      },
    ],
  },
];
