import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthContextType, UserDetails } from "../../Utils/PropsInterface";


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(true);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    useEffect(() => {
        if (token) {
            verifyDetails();
        } else {
            setIsLoading(false);
        }
    }, [token]);

    const verifyDetails = async () => {
        try {
            const detailsResponse = await axios.get('http://127.0.0.1:8000/api/user/details', {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUserDetails(detailsResponse.data.user_details);
        } catch (error) {
            console.error('Token verification failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password
            });

            const { token: newToken, user: userData, user_details, show_details_modal } = response.data;

            localStorage.setItem('token', newToken);
            setToken(newToken);
            setUser(userData);
            setUserDetails(user_details);
            setShowDetailsModal(show_details_modal);
            return userData;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            userDetails,
            token,
            login,
            isLoading,
            showDetailsModal, setShowDetailsModal,

        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};