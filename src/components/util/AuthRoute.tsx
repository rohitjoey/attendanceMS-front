import React from "react";
import { Navigate } from "react-router-dom";
import auth from "./auth";

export const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = auth.isAuthenticated(); // determine if authorized, from context or however you're doing it
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return isAuth ? children : <Navigate to="/login" />;
};
