import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Initialize navigate hook

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/auth/login', { username, password });
            if (response.data.success) {
                onLogin(); // Call the onLogin function passed as a prop to notify the parent
                navigate('/');  // Navigate to the main page after successful login
            }
        } catch (err) {
            setError('Login failed. Please provide both username and password.');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Login</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleLogin} style={styles.form}>
                <div style={styles.inputContainer}>
                    <label style={styles.label}>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputContainer}>
                    <label style={styles.label}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <button type="submit" style={styles.button}>Login</button>
            </form>
           
        </div>
    );
};

// Styles object
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',  // Full height to allow footer alignment at the bottom
        backgroundColor: 'black',
        color: 'white',
        padding: '20px',
    },
    title: {
        marginBottom: '20px',
    },
    error: {
        color: 'red',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',  // Set a width for the form
    },
    inputContainer: {
        marginBottom: '15px',
    },
    label: {
        marginBottom: '5px',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        backgroundColor: 'white',  // Input box color
        color: 'black',  // Input text color
    },
    button: {
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#00ACC1',  // Button color
        color: 'white',
        cursor: 'pointer',
        fontSize: '16px',
    },
    footer: {
        
        padding: '10px',
        textAlign: 'center',
        backgroundColor: 'black',
        width: '100%',  // Full width
    },
    footerText: {
        color: 'white',
    },
};

export default Login;
