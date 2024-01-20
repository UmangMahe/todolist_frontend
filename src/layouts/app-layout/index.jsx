import React, { Suspense } from "react";
import Header from "../../components/layout-components/Header";
import { Route, Routes } from "react-router-dom";
import Loading from "../../components/shared-components/Loading";
import Home from "../../views/app-views/Home";

function AppLayout(props) {
  return (
    <div className="app-layout container">
      <Header />
      <Suspense fallback={<Loading cover="page" />}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default AppLayout;
