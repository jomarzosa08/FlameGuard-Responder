import React, { useState } from 'react';
import { auth, firestore } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
    const [formData, setFormData] = useState({
        respondents_Address: '',
        respondents_Contact: '',
        respondents_Email: '',
        respondents_Name: '',
        respondents_Password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { respondents_Email, respondents_Password, ...otherData } = formData;

        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                respondents_Email,
                respondents_Password
            );

            const user = userCredential.user;

            // Add responder details to Firestore
            const respondersRef = collection(firestore, 'responders');
            await addDoc(respondersRef, {
                ...otherData,
                respondents_Email,
            });

            console.log('Responder registered successfully:', user.uid);
            navigate('/'); // Redirect to login page
        } catch (err) {
            console.error('Error registering responder:', err);
            setError(err.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
            <img
                    src="/flameguard-logo.png"
                    alt="FlameGuard Logo"
                    className="logo"
                />
                <h1>Register Fire Station</h1>
                <div className="form-group">
                    <label htmlFor="respondents_Name">Fire Station Name:</label>
                    <input
                        type="text"
                        id="respondents_Name"
                        name="respondents_Name"
                        value={formData.respondents_Name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="respondents_Address">Address:</label>
                    <input
                        type="text"
                        id="respondents_Address"
                        name="respondents_Address"
                        value={formData.respondents_Address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="respondents_Contact">Contact:</label>
                    <input
                        type="number"
                        id="respondents_Contact"
                        name="respondents_Contact"
                        value={formData.respondents_Contact}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="respondents_Email">Email:</label>
                    <input
                        type="email"
                        id="respondents_Email"
                        name="respondents_Email"
                        value={formData.respondents_Email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="respondents_Password">Password:</label>
                    <input
                        type="password"
                        id="respondents_Password"
                        name="respondents_Password"
                        value={formData.respondents_Password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
                <p className="login-link" onClick={() => navigate('/')}>
                    Already have an account? Login
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
