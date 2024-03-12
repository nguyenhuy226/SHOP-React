import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { store } from "@/stories";

export default function GuestRouter({ redirect = "/" }) {
  const user = store.user;
  const { state } = useLocation();
  if (user) return <Navigate to={state?.rediect || redirect} />;
  return <Outlet />;
}
