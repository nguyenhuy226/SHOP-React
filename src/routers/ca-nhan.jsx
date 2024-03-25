import { PATH } from "@/config";
import ProfileLayout from "@/layouts/ProfileLayout";
import ProfilePage from "@/pages/ca-nhan";
import Order from "@/pages/ca-nhan/don-hang";
import WishlistPage from "@/pages/ca-nhan/san-pham-yeu-thich";
import Address from "@/pages/ca-nhan/so-dia-chi";
import AddressAction from "@/pages/ca-nhan/so-dia-chi/action";

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
        element: <Address />,
        path: PATH.Profile.Address,
      },
      {
        element: <AddressAction />,
        path: PATH.Profile.NewAddress,
      },
      {
        element: <WishlistPage />,
        path: PATH.Profile.Wishlist,
      },
    ],
  },
];
