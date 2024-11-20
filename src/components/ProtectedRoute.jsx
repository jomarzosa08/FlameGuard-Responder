// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useUser();

    if (loading) {
        return <div>Loading...</div>; // Display a loading indicator while authentication is being verified
    }

    return user ? children || <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
