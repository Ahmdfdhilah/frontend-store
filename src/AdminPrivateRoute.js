import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const AdminPrivateRoute = ({ Component }) => {
  const { isAuthenticated, loading, userRole } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated && userRole === "admin"? (
    <Component />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminPrivateRoute;
