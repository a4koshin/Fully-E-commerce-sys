import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; // correct import

const PrivateRoute = () => {
  const { isAuthenticated, loadingAuth } = useAuth();

  if (loadingAuth) {
    // Show loading spinner while checking auth
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated → render child routes
  return <Outlet />;
};

export default PrivateRoute;
