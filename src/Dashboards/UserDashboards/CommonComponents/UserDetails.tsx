import { useState, useEffect } from "react";
import { useAuth } from "../../../Context/Authcontext";
import axios from "axios";
import type { ProfileData } from "../../../../Utils/PropsInterface";


function UserDetails() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userProfile } = useAuth();
  const storedName = localStorage.getItem("user");

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://127.0.0.1:8000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfileData(response.data.data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching profile data:", err);
      setError(err.response?.data?.message || "Failed to fetch profile data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const displayUser = profileData || userProfile;
  const displayAvatar = profileData?.avatar || userProfile?.avatar;

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#3a63b8] bg-gray-200 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
        </div>
        <div className="text-center py-4">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 ">
        <div className="text-center text-red-500 py-4">
          <p>Error: {error}</p>
          <button 
            onClick={fetchProfileData}
            className="mt-2 px-4 py-2 bg-[#3a63b8] text-white rounded hover:bg-[#2c4a8a]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#3a63b8]">
            {displayAvatar?.url ? (
              <img
                src={displayAvatar.url}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-2xl font-semibold text-gray-600">
                  {displayUser?.first_name ? displayUser.first_name.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
            )}
          </div>
          <div>
            <h2 className="font-semibold text-lg">
              {displayUser ? `${displayUser.first_name} ${displayUser.last_name}` : storedName || 'User'}
            </h2>
            <p className="text-gray-500 text-sm">
              {displayUser?.email || 'No email available'}
            </p>
          </div>
        </div>

        <div className="flex justify-between text-center mb-6">
          <div>
            <p className="font-bold">0</p>
            <p className="text-gray-500 text-sm">Posts</p>
          </div>
          <div>
            <p className="font-bold">0</p>
            <p className="text-gray-500 text-sm">Followers</p>
          </div>
          <div>
            <p className="font-bold">0</p>
            <p className="text-gray-500 text-sm">Following</p>
          </div>
        </div>

        <button className="w-full bg-[#3a63b8] text-white py-2 rounded-lg font-medium hover:bg-[#2c4a8a] transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default UserDetails;