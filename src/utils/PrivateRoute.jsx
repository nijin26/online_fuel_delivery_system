import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const uid = localStorage.getItem("uid");
  return uid !== "" ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoutes;
