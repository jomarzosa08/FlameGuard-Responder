import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { useUser } from '../contexts/UserContext';


const Sidebar = () => {
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await auth.signOut(); // Clear Firebase session
            setUser(null); // Clear user context
            navigate('/'); // Redirect to login
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="sidebar">
            <img 
                src="/flameguard-logo.png" 
                alt="FlameGuard Logo" 
                className="logo" 
            />
            <h2>FlameGuard (Responder)</h2>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/fire-station-profile">Fire Station Profile</Link>
            <button className="logout-link" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Sidebar;
