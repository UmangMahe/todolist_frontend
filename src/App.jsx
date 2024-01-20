import { Suspense, useEffect, useState } from "react";
import "./App.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import AuthLayout from "./layouts/auth-layout";
import AppLayout from "./layouts/app-layout";
import Error from "./components/layout-components/Error";
import { RouteInterceptor } from "./components/shared-components/RouteInterceptor";
import { APP_PREFIX_PATH } from "./configs/AppConfig";
import { useDispatch, useSelector } from "react-redux";
import { hideAuthMessage, signOutReset } from "./redux/actions/Auth";
import { notification } from "antd";
import Loading from "./components/shared-components/Loading";

function App() {
  const { token, logout, message, showMessage } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (logout && token === null) {
      notification.success({
        message: message,
      });
      dispatch(signOutReset());
    } 
    if (token !== null) {
      navigate(APP_PREFIX_PATH);
    }
    if (showMessage) {
      setTimeout(() => {
        dispatch(hideAuthMessage());
      }, 3000);
    }
  }, [dispatch, logout, message, navigate, showMessage, token]);

  return (
    <>
      <Suspense fallback={<Loading cover="page" />}>
        <Routes>
          <Route path="/" element={<RouteInterceptor />}>
            <Route path="/" element={<AppLayout />} />
          </Route>

          <Route path="/auth/*" element={<AuthLayout />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
