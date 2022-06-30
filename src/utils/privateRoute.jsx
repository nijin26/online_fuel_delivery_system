import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ user }) => {
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};
