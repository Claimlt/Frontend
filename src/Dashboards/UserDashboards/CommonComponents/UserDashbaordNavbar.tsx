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
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Add type annotation

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

        <div className="flex items-center space-x-5">
          <button className="relative p-1 hover:text-[#3a63b8] transition-colors">
            <FaHome className="text-xl" />
          </button>
          <button className="relative p-1 hover:text-[#3a63b8] transition-colors">
            <FaEnvelope className="text-xl" />
          </button>
          <button className="relative p-1 hover:text-[#3a63b8] transition-colors">
            <FaPlus className="text-xl" />
          </button>
          <button className="relative p-1 hover:text-[#3a63b8] transition-colors">
            <div className="relative">
              <Link to="user-posts" className="flex items-center">
                <FaRegNewspaper className="text-xl" />
              </Link>
            </div>
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#3a63b8] focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <img
                src="/MyProfile.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1a2d57] rounded-md shadow-lg py-1 z-20 border border-[#3a63b8]">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#3a63b8]"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FaUser className="mr-2" />
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#3a63b8]"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <FaCog className="mr-2" />
                  Settings
                </Link>
                <hr className="my-1 border-gray-600" />
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-[#3a63b8]"
                >
                  <FaSignOutAlt className="mr-2" />
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