import { useState } from "react";
import {
    FaUsers,
    FaBell,
    FaChartLine,
    FaEye
} from "react-icons/fa";

function Sidebar() {
    const [activeTab, setActiveTab] = useState('users');
    const stats = {
        totalUsers: 1243,
        activeUsers: 892,
        suspendedUsers: 27,
        totalPosts: 5689,
        reportedPosts: 43,
        resolvedReports: 38
    };

    return (
        <div>
            <div className="w-64 bg-white rounded-xl shadow-sm p-6 mr-6 h-fit sticky top-24">
                <h2 className="font-bold text-lg mb-6 text-[#1a2d57]">Admin Dashboard</h2>

                <div className="space-y-2">
                    <button
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${activeTab === 'overview' ? 'bg-[#3a63b8] text-white' : 'hover:bg-gray-100'}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        <FaChartLine />
                        <span>Overview</span>
                    </button>

                    <button
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${activeTab === 'users' ? 'bg-[#3a63b8] text-white' : 'hover:bg-gray-100'}`}
                        onClick={() => setActiveTab('users')}
                    >
                        <FaUsers />
                        <span>User Management</span>
                    </button>

                    <button
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${activeTab === 'posts' ? 'bg-[#3a63b8] text-white' : 'hover:bg-gray-100'}`}
                        onClick={() => setActiveTab('posts')}
                    >
                        <FaEye />
                        <span>Content Moderation</span>
                    </button>

                    <button
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition ${activeTab === 'reports' ? 'bg-[#3a63b8] text-white' : 'hover:bg-gray-100'}`}
                        onClick={() => setActiveTab('reports')}
                    >
                        <FaBell />
                        <span>Reports</span>
                    </button>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="font-semibold mb-3 text-[#1a2d57]">Quick Stats</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Total Users</span>
                            <span className="font-semibold">{stats.totalUsers}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Active Users</span>
                            <span className="font-semibold text-green-600">{stats.activeUsers}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Reported Posts</span>
                            <span className="font-semibold text-red-600">{stats.reportedPosts}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar