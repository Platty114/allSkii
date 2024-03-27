import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';


const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const verifySession = async () => {
            try {
                // Adjust this endpoint as necessary to match your server setup
                const response = await axios.get('http://localhost:2345/verifyLogin', { withCredentials: true });
                if (response.status === 200) {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                setIsLoggedIn(false);
                console.error('Session verification failed:', error);
            }
        };

        verifySession();
    }, []);
    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
