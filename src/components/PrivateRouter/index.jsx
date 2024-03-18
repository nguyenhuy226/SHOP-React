import { useAuth } from "@/hooks/useAuth";
import { store } from "@/stories";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../AuthContext";

export default function PrivateRouter({ redirect = "/" }) {
  // const user = store.user;
  const { user } = useAuth();
  if (!user) return <Navigate to={redirect} />;
  return <Outlet />;
}
