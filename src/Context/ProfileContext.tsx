import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Avatar, ProfileContextType, ProfileData } from "../../Utils/PropsInterface";
import axios from "axios";


const ProfileContext = createContext<ProfileContextType | undefined>(undefined);
export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
}

interface ProfileProviderProps {
    children: ReactNode;
}
export const ProfileProvider = ({ children }: ProfileProviderProps) => {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfileData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            if (!token) {
                setError('No authentication token found');
                setLoading(false);
                return;
            }

            const response = await axios.get('http://127.0.0.1:8000/api/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProfileData(response.data.data);
            setError(null);
        } catch (err: any) {
            console.error('Error fetching profile data:', err);
            setError(err.response?.data?.message || 'Failed to fetch profile data');
        } finally {
            setLoading(false);
        }
    };
    const refreshProfile = async () => {
        await fetchProfileData();
    };
    const updateAvatar = (avatar: Avatar) => {
        if (profileData) {
            setProfileData({
                ...profileData,
                avatar,
            });
        }
    };
    useEffect(() => {
        fetchProfileData();
    }, []);

    const value: ProfileContextType = {
        profileData,
        loading,
        error,
        refreshProfile,
        updateAvatar,
    };
    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );

}