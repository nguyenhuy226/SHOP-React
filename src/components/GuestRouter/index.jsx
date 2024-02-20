import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function AuthRouter({ redirect = "/" }) {
  const { user } = useAuth();
  if (user) return <Navigate to={redirect} />;
  return <Outlet />;
}
