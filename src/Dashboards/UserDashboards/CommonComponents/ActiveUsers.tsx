import axios from 'axios';
import { useEffect, useState } from 'react'

function ActiveUsers() {
    const [allprofiles, setAllProfiles] = useState<any[]>([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchAllProfile = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/all-profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const usersOnly = (response.data.data ?? []).filter(
                    (profile: any) => profile.role !== 'admin'
                );
                setAllProfiles(usersOnly);
            } catch (err) {
                console.error("Error fetching profiles:", err);
            }
        };
        fetchAllProfile();
    }, []);


    return (
        <div className="flex space-x-5 overflow-x-auto pb-2 hide-scrollbar">
            {allprofiles.map((profile, index) => (
                <div key={index} className="flex flex-col items-center shrink-0">
                    <div className="w-16 h-16 rounded-full border-2 border-[#3a63b8] p-0.5 mb-1.5">
                        <div className="w-full h-full rounded-full overflow-hidden bg-white">
                            <img
                                src={profile.avatar?.url || "/default-avatar.png"}
                                alt="user profile"
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                    </div>
                    <span className="text-xs text-gray-700 font-medium truncate max-w-[64px]">
                        {profile.first_name}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default ActiveUsers