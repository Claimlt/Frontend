import { useState, useRef } from "react";
import {
  FaHome,
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
import { useProfile } from "../../../Context/ProfileContext";
import MakePost from "./MakePost";
import axios from "axios";
import MessageModal from "../Components/Claim/MessageModal.tsx";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();
  const { profileData, loading } = useProfile();
  const storedName = localStorage.getItem("user");

  const handleSignOut = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.log("Error signing out:", error);
    }
    setIsDropdownOpen(false);
  };

  const handleModelOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleImageError = () => {
    setAvatarError(true);
  };

  const displayUser = profileData || user;
  const displayAvatar = profileData?.avatar;

  return (
    <nav className="bg-[#1a2d57] text-white p-4 fixed w-full top-0 z-10 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
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
          <button
            className="relative p-2 hover:bg-[#2c4a8a] rounded-lg"
            title="Home"
          >
            <FaHome className="text-xl" />
          </button>
          <MessageModal />

          <button
            onClick={handleModelOpen}
            className="relative p-2 hover:bg-[#2c4a8a] rounded-lg"
            title="Create"
          >
            <FaPlus className="text-xl" />
          </button>
          <button
            className="relative p-2 hover:bg-[#2c4a8a] rounded-lg"
            title="My Posts"
          >
            <Link to="user-posts">
              <FaRegNewspaper className="text-xl" />
            </Link>
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-[#2c4a8a]"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#3a63b8]">
                  {loading ? (
                    <div className="w-full h-full bg-gray-600 animate-pulse"></div>
                  ) : displayAvatar && !avatarError ? (
                    <img
                      src={displayAvatar.url}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                      <FaUser className="text-white" />
                    </div>
                  )}
                </div>
                {(displayUser || storedName) && (
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium whitespace-nowrap">
                      {displayUser
                        ? `${displayUser.first_name} ${displayUser.last_name}`
                        : storedName}
                    </span>
                    <span className="text-xs text-gray-300">
                      @
                      {displayUser
                        ? displayUser.first_name?.toLowerCase()
                        : storedName?.split(" ")[0]?.toLowerCase()}
                    </span>
                  </div>
                )}
                <FaChevronDown
                  className={`text-xs transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#1a2d57] rounded-md shadow-lg py-2 z-20 border border-[#3a63b8]">
                <div className="px-4 py-3 border-b border-gray-700">
                  {displayUser && (
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#3a63b8]">
                        {displayAvatar && !avatarError ? (
                          <img
                            src={displayAvatar.url}
                            alt="Profile"
                            className="w-full h-full object-cover"
                            onError={handleImageError}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                            <FaUser className="text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {displayUser.first_name} {displayUser.last_name}
                        </span>
                        <span className="text-xs text-gray-300">
                          {displayUser.email}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="py-2">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#3a63b8]"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <FaUser className="mr-3 text-gray-300" />
                    Profile
                  </Link>
                  <Link
                    to="settings"
                    className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#3a63b8]"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <FaCog className="mr-3 text-gray-300" />
                    Settings
                  </Link>
                </div>

                <hr className="my-1 border-gray-700" />

                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-[#3a63b8]"
                >
                  <FaSignOutAlt className="mr-3 text-gray-300" />
                  Sign Out
                </button>
              </div>
            )}
          </div>

          <MakePost
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
