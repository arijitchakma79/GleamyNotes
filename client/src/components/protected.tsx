import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface ProtectedRouteProps {
  children: JSX.Element; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { authenticated, verified } = useSelector((state: RootState) => state.user);

  if (!authenticated && !verified) {
    console.log("Not authenticated or verified")
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
