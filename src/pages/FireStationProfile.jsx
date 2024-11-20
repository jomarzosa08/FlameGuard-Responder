import React from 'react';
import { useUser } from '../contexts/UserContext';
import Sidebar from '../components/Sidebar';

const FireStationProfile = () => {
    const { user, loading } = useUser();

    // Handle loading and no user scenarios
    if (loading) return <div className="loading">Loading profile...</div>;
    if (!user) return <div className="error-message">No user data available. Please log in.</div>;

    return (
        <div className="fire-station-container">
            <Sidebar />
            <div className="main-content">
                <div className="header">
                    <h1>Fire Station Profile</h1>
                    <a href="/edit-fire-station-profile" className="edit-btn">Edit Profile</a>
                </div>
                <div className="content">
                    <div className="card">
                        {/* Station Image */}
                        <div className="station-image">
                            <img
                                src="https://cebudailynews.inquirer.net/files/2024/06/BFp-mandaue-2.jpg"
                                alt="Fire Station"
                            />
                        </div>

                        {/* Station Info */}
                        <div className="station-info">
                            <h2>{user.respondents_Name || 'Station Name Not Available'}</h2>
                            <p><strong>Address:</strong> {user.respondents_Address || 'No Address Provided'}</p>
                            <p><strong>Contact:</strong> {user.respondents_Contact || 'No Contact Information'}</p>
                            <p><strong>Email:</strong> {user.respondents_Email || 'No Email Available'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FireStationProfile;
