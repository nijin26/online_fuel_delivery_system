import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ user }) => {
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
