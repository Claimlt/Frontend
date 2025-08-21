import { motion } from "framer-motion";
// @ts-ignore
import { HashLink } from "react-router-hash-link";
import { useEffect, useState } from "react";
import {SignupForm} from "../Forms/SignupForm.tsx";
import LoginForm from "../Forms/LoginForm.tsx";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
  };

  const handleOpenSignup = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
  };

  const handleSwitchToSignup = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
  };

  const handleSwitchToLogin = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
  };

  return (
      <>
        <nav
            className={`fixed top-0 left-0 w-full z-50 text-white shadow-md transition-colors duration-300 ${
                scrolled ? "bg-[#1f2f47]/95 backdrop-blur-md" : "bg-[#386196]/40"
            }`}
        >
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <HashLink to="#home" smooth>
                <img
                    src="/LogoWhite.png"
                    className="h-10 w-30 bg-cover cursor-pointer"
                    alt="Logo"
                />
              </HashLink>
            </div>

            <div className="hidden md:flex space-x-6">
              <HashLink
                  to="#home"
                  smooth
                  className="hover:text-blue-200 transition duration-200"
              >
                Home
              </HashLink>
              <HashLink
                  to="#items"
                  smooth
                  className="hover:text-blue-200 transition duration-200"
              >
                Browse Items
              </HashLink>
              <HashLink
                  to="#how-it-works"
                  smooth
                  className="hover:text-blue-200 transition duration-200"
              >
                How It Works
              </HashLink>
              <HashLink
                  to="#contact"
                  smooth
                  className="hover:text-blue-200 transition duration-200"
              >
                Contact
              </HashLink>
            </div>

            <div className="flex items-center space-x-3">
              <motion.button
                  onClick={handleOpenLogin}
                  className="px-5 py-2 rounded-xl font-medium border-2 border-white/30 hover:border-white/50 bg-transparent transition-all duration-200"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
              >
                Login
              </motion.button>
              <motion.button
                  onClick={handleOpenSignup}
                  className="px-5 py-2 rounded-xl font-medium bg-white text-[#386196] hover:bg-blue-50 transition-all duration-200 shadow-sm"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 4px 12px rgba(255,255,255,0.15)",
                  }}
                  whileTap={{ scale: 0.98 }}
              >
                Sign Up
              </motion.button>
            </div>
          </div>
        </nav>

        <SignupForm
            isOpen={isSignupOpen}
            onClose={() => setIsSignupOpen(false)}
            onSwitchToLogin={handleSwitchToLogin}
        />
        <LoginForm
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            onSwitchToSignup={handleSwitchToSignup}
        />
      </>
  );
}