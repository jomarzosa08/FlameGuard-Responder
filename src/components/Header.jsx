// src/components/Header.jsx
import React from 'react';

const Header = ({ fireStationName }) => {
    return (
        <div className="header">
            <h1>Welcome to FlameGuard</h1>
            {fireStationName && <h2>{fireStationName}</h2>}
        </div>
    );
};

export default Header;
