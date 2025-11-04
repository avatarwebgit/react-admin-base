import PropTypes from "prop-types";
import React, { Suspense } from "react";

import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";

// Import Routes all
import { authProtectedRoutes, devRoutes, publicRoutes } from "./routes/index";

// Import all middleware
import Authmiddleware from "./routes/route";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import scss
import "./assets/scss/theme.scss";
import "react-bootstrap-typeahead/css/Typeahead.css";

// import fakeBackend from "/src/helpers/AuthType/fakeBackend";
import { ToastContainer } from "react-toastify";
import { isDev } from "./utils/env";
import GlobalDeleteModal from "./components/Common/GlobalDeleteModal";
import TitleManager from "./utils/TitleManager";
import "react-circular-progressbar/dist/styles.css";


// fakeBackend();

const App = (props) => {
  const LayoutProperties = createSelector(
    (state) => state.Layout,
    (layout) => ({
      layoutType: layout.layoutType,
    })
  );

  const { layoutType } = useSelector(LayoutProperties);

  function getLayout(layoutType) {
    let layoutCls = VerticalLayout;
    switch (layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  }

  const Layout = getLayout(layoutType);

  return (
    <Suspense fallback="loading...">
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<NonAuthLayout>{route.component}</NonAuthLayout>}
            key={idx}
            exact={true}
          />
        ))}

        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <Authmiddleware>
                <Layout>{route.component}</Layout>
              </Authmiddleware>
            }
            key={idx}
            exact={true}
          />
        ))}

        {isDev &&
          devRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <Authmiddleware>
                  <Layout>{route.component}</Layout>
                </Authmiddleware>
              }
              key={idx}
              exact={true}
            />
          ))}
      </Routes>
      <ToastContainer />
      <GlobalDeleteModal />
      <TitleManager />
    </Suspense>
  );
};

App.propTypes = {
  layout: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
