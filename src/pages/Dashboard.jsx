// src/pages/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ReportCard from '../components/ReportCard';
import { useUser } from '../contexts/UserContext';


const Dashboard = () => {
    const { user } = useUser();

    if (!user) return <div>Please log in.</div>;

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

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <Header fireStationName={user.respondents_Name} />
                <div className="content">
                    <h2>Incoming Reports</h2>
                    <div className="reports-grid">
                        {reports.map((report) => (
                            <Link
                            key={report.id}
                            to={`/view-details/${report.id}`}
                            className="report-link"
                        >
                            <ReportCard report={report} />
                        </Link>
                        
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
