// PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ Component }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    // Display a loading indicator while authentication status is being determined
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
