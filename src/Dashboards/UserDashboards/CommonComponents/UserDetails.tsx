import { useEffect, useState } from "react";
type User = {
    name: string;
    username: string;
    avatar: string;
    posts: number;
    followers: number;
    following: number;
};
function UserDetails() {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/";
        } else {
            setUser({
                name: "Supun Nethsara",
                username: "@supunmax",
                avatar: "/MyProfile.jpg",
                posts: 2,
                followers: 8,
                following: 6,
            });
        }
    }, []);
    return (
        <div>
            {user && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#3a63b8]">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="font-semibold">{user.name}</h2>
                            <p className="text-gray-500 text-sm">{user.username}</p>
                        </div>
                    </div>

                    <div className="flex justify-between text-center mb-6">
                        <div>
                            <p className="font-bold">{user.posts}</p>
                            <p className="text-gray-500 text-sm">Posts</p>
                        </div>
                        <div>
                            <p className="font-bold">{user.followers}</p>
                            <p className="text-gray-500 text-sm">Followers</p>
                        </div>
                        <div>
                            <p className="font-bold">{user.following}</p>
                            <p className="text-gray-500 text-sm">Following</p>
                        </div>
                    </div>

                    <button className="w-full bg-[#3a63b8] text-white py-2 rounded-lg font-medium hover:bg-[#2c4a8a] transition">
                        Edit Profile
                    </button>
                </div>
            )}
        </div>
    )
}

export default UserDetails