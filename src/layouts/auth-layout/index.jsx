import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Authentication from "../../views/auth-views";
import Loading from "../../components/shared-components/Loading";

function AuthLayout(props) {
  return (
    <div className="auth-container">
      <Suspense fallback={<Loading cover="page" />}>
        <Routes>
          <Route path="/" element={<Authentication />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default AuthLayout;
