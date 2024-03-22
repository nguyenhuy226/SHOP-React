import { PATH } from "@/config";
import ProfileLayout from "@/layouts/ProfileLayout";
import ProfilePage from "@/pages/ca-nhan";
import Order from "@/pages/ca-nhan/don-hang";
import { Children } from "react";
import WishlistPage from "@/pages/ca-nhan/san-pham-yeu-thich";

export const profile = [
  {
    element: <ProfileLayout />,
    children: [
      {
        element: <ProfilePage />,
        index: true,
      },
      {
        element: <Order />,
        path: PATH.Profile.Oder,
      },
      {
        element: <WishlistPage />,
        path: PATH.Profile.Wishlist,
      },
    ],
  },
];
