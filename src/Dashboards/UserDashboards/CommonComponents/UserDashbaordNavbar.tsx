import axios from "axios";
import { useState, useRef, useEffect } from "react";
import {
  FaHome,
  FaEnvelope,
  FaPlus,
  FaRegNewspaper,
  FaSearch,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/Authcontext";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.log("Error signing out:", error);
    }
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-[#1a2d57] text-white p-4 fixed w-full top-0 z-10 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/LogoWhite.png"
            alt="Logo"
            className="w-30 h-10 rounded-full mr-2"
          />
        </div>
        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 px-4 rounded-lg bg-[#2c4a8a] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3a63b8]"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-300" />
          </div>
        </div>

        {/* Navigation Icons and Profile */}
        <div className="flex items-center space-x-5">
          <button className="relative p-2 hover:bg-[#2c4a8a] rounded-lg transition-colors" title="Home">
            <FaHome className="text-xl" />
          </button>
          <button className="relative p-2 hover:bg-[#2c4a8a] rounded-lg transition-colors" title="Messages">
            <FaEnvelope className="text-xl" />
          </button>
          <button className="relative p-2 hover:bg-[#2c4a8a] rounded-lg transition-colors" title="Create">
            <FaPlus className="text-xl" />
          </button>
          <button className="relative p-2 hover:bg-[#2c4a8a] rounded-lg transition-colors" title="My Posts">
            <div className="relative">
              <Link to="user-posts" className="flex items-center">
                <FaRegNewspaper className="text-xl" />
              </Link>
            </div>
          </button>
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-[#2c4a8a] transition-colors"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#3a63b8]">
                  <img
                    src="/MyProfile.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {user && (
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium whitespace-nowrap">
                      {user.first_name} {user.last_name}
                    </span>
                    <span className="text-xs text-gray-300">@{user.first_name?.toLowerCase()}</span>
                  </div>
                )}
                <FaChevronDown 
                  className={`text-xs transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                />
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#1a2d57] rounded-md shadow-lg py-2 z-20 border border-[#3a63b8]">
                <div className="px-4 py-3 border-b border-gray-700">
                  {user && (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#3a63b8]">
                        <img
                          src="/MyProfile.jpg"
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {user.first_name} {user.last_name}
                        </span>
                        <span className="text-xs text-gray-300">{user.email}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="py-2">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#3a63b8] transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <FaUser className="mr-3 text-gray-300" />
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#3a63b8] transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <FaCog className="mr-3 text-gray-300" />
                    Settings
                  </Link>
                </div>
                
                <hr className="my-1 border-gray-700" />
                
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-[#3a63b8] transition-colors"
                >
                  <FaSignOutAlt className="mr-3 text-gray-300" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;