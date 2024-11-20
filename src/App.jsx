// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RegisterForm from './components/RegisterForm';
import ViewDetails from './pages/ViewDetails';
import FireStationProfile from './pages/FireStationProfile';
import ProtectedRoute from './components/ProtectedRoute';
import { UserProvider } from './contexts/UserContext';
import "./css/styles.css"; // Import the CSS file

const App = () => {
    const location = useLocation();

    useEffect(() => {
        const routeTitleMap = {
            "/": "Login - FlameGuard",
            "/dashboard": "Dashboard - FlameGuard",
            "/register": "Register - FlameGuard",
            "/fire-station-profile": "Profile - FlameGuard",
        };
        document.title = routeTitleMap[location.pathname] || "FlameGuard";
    }, [location]);

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<RegisterForm />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/fire-station-profile" element={<FireStationProfile />} />
                <Route path="/view-details/:reportId" element={<ViewDetails />} />
            </Route>
        </Routes>
    );
};

const AppWrapper = () => (
    <UserProvider>
        <Router>
            <App />
        </Router>
    </UserProvider>
);

export default AppWrapper;
