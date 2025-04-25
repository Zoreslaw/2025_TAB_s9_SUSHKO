import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRoles } from '../types/User';
import { Box, CircularProgress } from '@mui/material';

interface ProtectedRouteProps {
  requiredRoles?: UserRoles[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  requiredRoles = [] 
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // If still loading, show spinner
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are required and user doesn't have any of them, redirect to unauthorized
  if (requiredRoles.length > 0 && user && !requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If authenticated and authorized, render children
  return <Outlet />;
};

export default ProtectedRoute; 