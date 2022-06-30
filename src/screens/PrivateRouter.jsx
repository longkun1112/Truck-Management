// import React from "react";
// import { Navigate, Route, Outlet } from "react-router-dom";

// function PrivateRouter({ element: Component, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       element={(props) => {
//         const user = window.localStorage.getItem("user");
//         if (user) {
//           return <Navigate  to={"/login"} />;
//         } else {
//           return <Component {...props} />;
//         }
//       }}
//     />
//   );
// }

// export default PrivateRouter;


import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));

    return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
export default PrivateRouter;
