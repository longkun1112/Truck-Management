import React from "react";
import { Navigate, Route } from "react-router-dom";

function PrivateRouter({ element: Component, ...rest }) {
  return (
    <Route
      {...rest}
      element={(props) => {
        const user = window.localStorage.getItem("user");
        if (user) {
          return <Component {...props} />;
        } else {
          return <Navigate  to={"/login"} />;
        }
      }}
    />
  );
}

export default PrivateRouter;
