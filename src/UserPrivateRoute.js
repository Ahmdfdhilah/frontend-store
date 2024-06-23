import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const UserPrivateRoute = ({ Component }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default UserPrivateRoute;
