// src/components/ReportCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';


const ReportCard = ({ report }) => {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate('/view-details', { state: { report } });
    };

    return (
        <div className="report-card">
            <img src={report.image} alt={report.title} className="report-image" />
            <div className="report-details">
                <h3>{report.title}</h3>
                <p><strong>Caller:</strong> {report.caller}</p>
                <p><strong>Location:</strong> {report.location}</p>
                <p><strong>Time:</strong> {report.time}</p>
                <p className="report-description">{report.description}</p>
                <button onClick={handleViewDetails} className="view-details-button">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default ReportCard;
