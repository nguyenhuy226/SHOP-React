import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function GuestRouter({ redirect = "/" }) {
  // const user = store.user;
  const { user } = useAuth();
  const { state } = useLocation();
  if (user) return <Navigate to={state?.rediect || redirect} />;
  return <Outlet />;
}
