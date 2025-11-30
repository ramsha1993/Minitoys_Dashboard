import React from "react";
import { Navigate ,  Outlet } from "react-router";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        // User is not logged in, redirect to login page
        return <Navigate to="/signin" replace />;
    }

    // User is logged in, render the child component (Dashboard)
      return <Outlet />;
;
};

export default ProtectedRoute;
