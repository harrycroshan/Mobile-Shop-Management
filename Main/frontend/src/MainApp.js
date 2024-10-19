import React, { useState } from 'react';
import Login from './components/Login/Login';  

import User1App from './App';
import User2App from './1_Supplier/App';
import User3App from './2_Inventory/App';
import User4App from './3_Employee/App'

function MainApp() {
    const [authState, setAuthState] = useState({ isAuthenticated: false, user: null });

    // Function to handle login, update authentication state
    const handleLogin = (authData) => {
        setAuthState(authData);
    };

    // Function to render different App.js components based on the user
    const renderUserApp = () => {
        switch (authState.user) {
            case 'user1':
                return <User1App />;
            case 'user2':
                return <User2App />;
            case 'user3':
                return <User3App />;
            case 'user4':
                return <User4App />;
            default:
                return null;
        }
    };

    return (
        <div>
            {authState.isAuthenticated ? (
                // If authenticated, show the specific user's App.js
                renderUserApp()
            ) : (
                // If not authenticated, show the login screen
                <Login onLogin={handleLogin} />
            )}
        </div>
    );
}

export default MainApp;