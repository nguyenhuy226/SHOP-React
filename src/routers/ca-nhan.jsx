import { PATH } from "@/config";
import ProfileLayout from "@/layouts/ProfileLayout";
import ProfilePage from "@/pages/ca-nhan";
import Order from "@/pages/ca-nhan/don-hang";
import WishlistPage from "@/pages/ca-nhan/san-pham-yeu-thich";
import Address from "@/pages/ca-nhan/so-dia-chi";
import AddressAction from "@/pages/ca-nhan/so-dia-chi/action";
import Payment from "@/pages/ca-nhan/so-thanh-toan";
import ActionPayment from "@/pages/ca-nhan/so-thanh-toan/action";

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
        element: <AddressAction />,
        path: PATH.Profile.EditAddress,
      },
      {
        element: <Payment />,
        path: PATH.Profile.Payment,
      },
      {
        element: <ActionPayment />,
        path: PATH.Profile.EditPayment,
      },
      {
        element: <ActionPayment />,
        path: PATH.Profile.NewPayment,
      },
      {
        element: <WishlistPage />,
        path: PATH.Profile.Wishlist,
      },
    ],
  },
];
