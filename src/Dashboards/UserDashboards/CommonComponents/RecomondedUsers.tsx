import { useState, useEffect } from "react";
import axios from "axios";

interface RecommendedUser {
  id: string;
  first_name: string;
  last_name: string;
  avatar?: {
    url: string;
  };
}

function RecommendedUsers() {
  const [users, setUsers] = useState<RecommendedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [following, setFollowing] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchRecommendedUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication required");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const usersOnly = (response.data.data || []).filter(
          (user: RecommendedUser & { role?: string }) => user.role !== 'admin'
        );

        setUsers(usersOnly);
      } catch (err: any) {
        console.error("Error fetching recommended users:", err);
        setError(err.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedUsers();
  }, []);

  const handleFollow = (userId: string) => {
    setFollowing(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
        <h3 className="font-semibold mb-4 text-gray-900">Suggestions For You</h3>
        {[1, 2, 3].map(item => (
          <div key={item} className="flex items-center justify-between mb-4 last:mb-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-2 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
            </div>
            <div className="w-16 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
        <h3 className="font-semibold mb-4 text-gray-900">Suggestions For You</h3>
        <div className="text-center text-red-500 py-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
        <h3 className="font-semibold mb-4 text-gray-900">Suggestions For You</h3>
        <div className="text-center text-gray-500 py-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-sm">No suggestions available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
      <h3 className="font-semibold mb-4 text-gray-900">Suggestions For You</h3>
      {users.map(user => (
        <div key={user.id} className="flex items-center justify-between mb-4 last:mb-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full border border-[#1a2d57] p-0.5">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
                <img
                  src={user.avatar?.url || "/default-avatar.png"}
                  alt={`${user.first_name}'s profile`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-full hidden">
                  <span className="text-sm font-semibold text-[#1a2d57]">
                    {user.first_name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-xs text-gray-500">Suggested for you</p>
            </div>
          </div>
          <button
            onClick={() => handleFollow(user.id)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${following.has(user.id)
                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                : 'bg-[#1a2d57] text-white hover:bg-[#152547]'
              }`}
          >
            {following.has(user.id) ? 'Following' : 'Follow'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default RecommendedUsers;