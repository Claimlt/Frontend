import { useState } from "react";
import {
    FaSearch,
    FaBell,
    FaCog,
    FaSignOutAlt,

} from "react-icons/fa";

function NavbarAdmin() {
    const [searchTerm, setSearchTerm] = useState('');
    const [notifications, setNotifications] = useState(5);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <div>
            <nav className="bg-[#1a2d57] text-white p-4 fixed w-full top-0 z-10 shadow-md">
                <div className="container mx-auto flex items-center justify-between">

                    <div className="flex items-center">
                       <img src="/LogoWhite.png" alt="Logo" className="h-auto w-30 mr-2"/>
                    </div>

                    <div className="flex-1 max-w-xl mx-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search users, posts..."
                                className="w-full py-2 px-4 rounded-lg bg-[#2c4a8a] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3a63b8]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className="absolute right-3 top-3 text-gray-300" />
                        </div>
                    </div>

                    <div className="flex items-center space-x-5">
                        <button className="relative p-1 hover:text-[#3a63b8] transition-colors">
                            <div className="relative">
                                <FaBell className="text-xl" />
                                {notifications > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        {notifications}
                                    </span>
                                )}
                            </div>
                        </button>
                        <button className="relative p-1 hover:text-[#3a63b8] transition-colors">
                            <FaCog className="text-xl" />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="relative p-1 hover:text-[#3a63b8] transition-colors"
                        >
                            <FaSignOutAlt className="text-xl" />
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavbarAdmin