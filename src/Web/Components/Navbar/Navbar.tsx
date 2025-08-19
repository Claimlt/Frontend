export function Navbar() {
    return (
        <nav className="bg-blue-700 fixed top-0 left-0 w-full z-50 text-white">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="text-xl font-bold">Lost & Found</span>
                </div>

                <div className="hidden md:flex space-x-6">
                    <a href="/" className="hover:text-blue-200 transition">Home</a>
                    <a href="/items" className="hover:text-blue-200 transition">Browse Items</a>
                    <a href="/how-it-works" className="hover:text-blue-200 transition">How It Works</a>
                    <a href="/contact" className="hover:text-blue-200 transition">Contact</a>
                </div>

                <div className="flex items-center space-x-4">
                    <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition">
                        Report Item
                    </button>
                    <button className="bg-white text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition">
                        Login
                    </button>
                </div>
            </div>
        </nav>
    );
}