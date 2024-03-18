import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { store } from "@/stories";
import { useAuth } from "@/hooks/useAuth";

export default function GuestRouter({ redirect = "/" }) {
  // const user = store.user;
  const { user } = useAuth();
  const { state } = useLocation();
  if (user) return <Navigate to={state?.rediect || redirect} />;
  return <Outlet />;
}
