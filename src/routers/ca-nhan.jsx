import { PATH } from "@/config";
import ProfilePage from "@/pages/ca-nhan";
import Order from "@/pages/ca-nhan/don-hang";

export const profile = [
  {
    element: <ProfilePage />,
    index: true,
  },
  {
    element: <Order />,
    path: PATH.Profile.Oder,
  },
];
