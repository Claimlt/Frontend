import {motion} from "framer-motion";

export function Navbar() {
    return (
        <nav className="bg-[#386196]/40 fixed top-0 left-0 w-full z-50 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <img src='/LogoWhite.png' className='h-10 w-30 bg-cover'/>
                </div>

                <div className="hidden md:flex space-x-6">
                    <a href="/" className="hover:text-blue-200 transition duration-200">Home</a>
                    <a href="/items" className="hover:text-blue-200 transition duration-200">Browse Items</a>
                    <a href="/how-it-works" className="hover:text-blue-200 transition duration-200">How It Works</a>
                    <a href="/contact" className="hover:text-blue-200 transition duration-200">Contact</a>
                </div>

                <div className="flex items-center space-x-3">
                    <motion.button
                        className="px-5 py-2 rounded-xl font-medium border-2 border-white/30 hover:border-white/50 bg-transparent transition-all duration-200"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Login
                    </motion.button>
                    <motion.button
                        className="px-5 py-2 rounded-xl font-medium bg-white text-[#386196] hover:bg-blue-50 transition-all duration-200 shadow-sm"
                        whileHover={{
                            scale: 1.03,
                            boxShadow: "0 4px 12px rgba(255,255,255,0.15)"
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Sign Up
                    </motion.button>
                </div>
            </div>
        </nav>
    );
}