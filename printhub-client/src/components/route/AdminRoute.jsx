import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAdmin from "../../hooks/useAdmin";
import Authentication from "../../view/auth/Authentication";

const AdminRoute = ({ children }) => {
  const isAuthenticated = useAuth();
  const isAdmin = useAdmin();
  return !isAuthenticated ? (
    <Authentication />
  ) : isAdmin ? (
    children
  ) : (
    <Navigate to={"/"} />
  );
};

export default AdminRoute;
