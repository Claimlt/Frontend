import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User, AuthContextType, UserDetails, Profile } from "../../Utils/PropsInterface";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [isLoading, setIsLoading] = useState(true);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [userProfile, setUserProfile] = useState<Profile | null>(null);

    useEffect(() => {
        let mounted = true;

        const verifyUserDetails = async () => {
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get<Profile>("http://127.0.0.1:8000/api/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!mounted) return;

                setUserProfile(response.data);
                setShowDetailsModal(response.data.data.avatar === null);
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                if (mounted) setIsLoading(false);
            }
        };

        verifyUserDetails();

        return () => {
            mounted = false;
        };
    }, [token]);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login", { email, password });

            const { token: newToken, user: userData, user_details } = response.data;

            localStorage.setItem("token", newToken);
            localStorage.setItem(
                "user",
                userData.first_name && userData.last_name
                    ? userData.first_name + " " + userData.last_name
                    : userData.email
            );

            setToken(newToken);
            setUser(userData);
            setUserDetails(user_details);

            return userData;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const updateUserProfile = (profile: Profile) => {
        setUserProfile(profile);
        setShowDetailsModal(profile.data.avatar === null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                userDetails,
                token,
                login,
                isLoading,
                showDetailsModal,
                setShowDetailsModal,
                userProfile,
                updateUserProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
