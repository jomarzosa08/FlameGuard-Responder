import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, firestore } from '../firebaseConfig';
import { useUser } from '../contexts/UserContext';


const LoginForm = () => {
    const { setUser } = useUser(); // Access setUser from UserContext
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Sign in with Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch responder data from Firestore
            const respondersRef = collection(firestore, 'responders');
            const q = query(respondersRef, where('respondents_Email', '==', email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const responderData = querySnapshot.docs[0].data();
                setUser({ ...responderData, uid: user.uid }); // Update context with user data
                navigate('/dashboard'); // Redirect to Dashboard
            } else {
                setError('User not found in the responders database.');
            }
        } catch (err) {
            console.error('Login error details:', err.code, err.message);
            setError('Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <img src="/flameguard-logo.png" alt="FlameGuard Logo" className="logo" />
                <h1>Welcome to FlameGuard</h1>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
