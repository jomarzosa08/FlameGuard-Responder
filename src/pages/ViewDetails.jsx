// src/pages/ViewDetails.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ViewDetails.css';

const ViewDetails = () => {
    const { reportId } = useParams(); // Extract reportId from URL
    const navigate = useNavigate();

    // Sample reports data (replace with API call if needed)
    const reports = [
        {
            id: '1',
            title: 'Report #1',
            caller: 'John Doe',
            location: '123 Main St',
            time: '14:35',
            description: 'Fire reported at the main entrance of the building, heavy smoke visible.',
            image: 'https://i.cdn.turner.com/cnn/2010/WORLD/asiapcf/04/25/philippines.fire/t1larg.afp.gi.jpg',
        },
        {
            id: '2',
            title: 'Report #2',
            caller: 'Jane Smith',
            location: '456 Oak St',
            time: '16:20',
            description: 'Fire spotted in the kitchen area, flames visible from outside.',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Firefighters_at_work.jpg/640px-Firefighters_at_work.jpg',
        },
    ];

    // Find the report by ID
    const report = reports.find((r) => r.id === reportId);

    if (!report) {
        return <div>Report not found.</div>;
    }

    return (
        <div className="view-details-container">
            <h1>{report.title}</h1>
            <div className="details">
                <p><strong>Caller:</strong> {report.caller}</p>
                <p><strong>Location:</strong> {report.location}</p>
                <p><strong>Time:</strong> {report.time}</p>
                <p><strong>Description:</strong> {report.description}</p>
                <div className="details-image">
                    <img src={report.image} alt={report.title} />
                </div>
            </div>
            <button onClick={() => navigate('/dashboard')} className="back-button">Go Back</button>
        </div>
    );
};

export default ViewDetails;

