import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface ProtectedRouteProps {
  children: JSX.Element; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { authenticated } = useSelector((state: RootState) => state.user);

  if (!authenticated) {
    console.log("Not authenticated")
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
