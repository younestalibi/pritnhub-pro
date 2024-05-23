import React from "react";
import useAuth from "../../hooks/useAuth";
import Authentication from "../../view/auth/Authentication";

const AuthRoute = ({ children }) => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? children : <Authentication />;
};

export default AuthRoute;
