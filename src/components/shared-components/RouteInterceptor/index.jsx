import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AUTH_PREFIX_PATH } from "../../../configs/AppConfig";

export const RouteInterceptor = () => {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to={AUTH_PREFIX_PATH} state={{ from: location }} />
  );
};
