import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePlants } from '../context/PlantsContext';

const AdminRoute = ({ children }) => {
  const { isAdmin } = usePlants();

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default AdminRoute;
