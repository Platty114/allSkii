import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(''); // Added state for username
    const [firstName, setFname] = useState('');
    const [lastName, setLname] = useState('');
    useEffect(() => {
        const verifySession = async () => {
            try {
                const response = await axios.get('https://auth-service-7btvt4xvwq-pd.a.run.app/verifyLogin', { withCredentials: true });
                if (response.status === 200) {
                    setIsLoggedIn(true);
                    setUsername(response.data.user.email); // Assuming the email is used as the username, adjust if necessary
                }
            } catch (error) {
                setIsLoggedIn(false);
                setUsername(''); // Clear username if session is invalid
                console.error('Session verification failed:', error);
            }
        };

        verifySession();
    }, []);

    const login = (userEmail, fName, lName) => {
        
        setUsername(userEmail); // Set username upon login
        setFname(fName);
        setLname(lName);
        setIsLoggedIn(true);
    };

    

    const logout = () => {
        setIsLoggedIn(false);
        setUsername(''); // Clear username upon logout
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, username, firstName, lastName }}>
            {children}
        </AuthContext.Provider>
    );
};
