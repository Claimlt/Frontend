import { useEffect, useState } from "react";
import { 
  FaUsers, 
  FaSearch, 
  FaBell, 
  FaCog, 
  FaSignOutAlt, 
  FaChartLine,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaFilter,
  FaTimes
} from "react-icons/fa";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState(5);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    }
  }, []);

  // Sample data
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', posts: 12, joined: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', posts: 7, joined: '2023-02-20' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', status: 'suspended', posts: 3, joined: '2023-03-10' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', status: 'active', posts: 15, joined: '2023-01-28' },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com', status: 'inactive', posts: 0, joined: '2023-04-05' },
  ];

  const reportedPosts = [
    { id: 1, title: 'Lost Wallet', user: 'John Doe', reports: 3, status: 'under review' },
    { id: 2, title: 'Found Phone', user: 'Jane Smith', reports: 5, status: 'resolved' },
    { id: 3, title: 'Missing Book', user: 'Robert Johnson', reports: 2, status: 'pending' },
  ];

  const stats = {
    totalUsers: 1243,
    activeUsers: 892,
    suspendedUsers: 27,
    totalPosts: 5689,
    reportedPosts: 43,
    resolvedReports: 38
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-[#1a2d57] text-white p-4 fixed w-full top-0 z-10 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-xl font-bold mr-2">🔍</div>
            <span className="font-bold text-xl">FindIt Admin</span>
          </div>
          
          {/* Search Bar */}
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
          
          {/* Navigation Icons */}
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

      {/* Main Content */}
      <div className="pt-20 pb-8 mt-3 container mx-auto flex">
        {/* Sidebar */}
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

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-[#1a2d57]">
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'users' && 'User Management'}
                {activeTab === 'posts' && 'Content Moderation'}
                {activeTab === 'reports' && 'Reported Content'}
              </h1>
              
              <div className="flex space-x-3">
                <button 
                  className="flex items-center space-x-2 bg-[#3a63b8] text-white py-2 px-4 rounded-lg hover:bg-[#2c4a8a] transition"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FaFilter />
                  <span>Filters</span>
                </button>
                
                <button className="flex items-center space-x-2 bg-[#3a63b8] text-white py-2 px-4 rounded-lg hover:bg-[#2c4a8a] transition">
                  <FaPlus />
                  <span>Add New</span>
                </button>
              </div>
            </div>
            
            {/* Filters */}
            {showFilters && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <FaTimes />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>All</option>
                      <option>Active</option>
                      <option>Inactive</option>
                      <option>Suspended</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Joined</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>All Time</option>
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                      <option>Last 90 Days</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>Newest First</option>
                      <option>Oldest First</option>
                      <option>Most Posts</option>
                      <option>Least Posts</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Content based on active tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold mb-4 text-[#1a2d57]">Platform Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold">{stats.totalUsers}</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <FaUsers className="text-blue-600 text-xl" />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Active Users</p>
                      <p className="text-2xl font-bold">{stats.activeUsers}</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                      <FaUsers className="text-green-600 text-xl" />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Suspended Users</p>
                      <p className="text-2xl font-bold">{stats.suspendedUsers}</p>
                    </div>
                    <div className="p-3 bg-red-100 rounded-full">
                      <FaUsers className="text-red-600 text-xl" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold mb-4 text-[#1a2d57]">Content Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Total Posts</p>
                      <p className="text-2xl font-bold">{stats.totalPosts}</p>
                    </div>
                    <div className="p-3 bg-indigo-100 rounded-full">
                      <FaEye className="text-indigo-600 text-xl" />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Reported Posts</p>
                      <p className="text-2xl font-bold">{stats.reportedPosts}</p>
                    </div>
                    <div className="p-3 bg-yellow-100 rounded-full">
                      <FaBell className="text-yellow-600 text-xl" />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Resolved Reports</p>
                      <p className="text-2xl font-bold">{stats.resolvedReports}</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <FaBell className="text-purple-600 text-xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'users' && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left">User</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Posts</th>
                      <th className="py-3 px-4 text-left">Joined</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' : 
                            user.status === 'suspended' ? 'bg-red-100 text-red-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{user.posts}</td>
                        <td className="py-3 px-4">{user.joined}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="p-1 text-blue-600 hover:text-blue-800">
                              <FaEye />
                            </button>
                            <button className="p-1 text-green-600 hover:text-green-800">
                              <FaEdit />
                            </button>
                            <button className="p-1 text-red-600 hover:text-red-800">
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <p className="text-gray-600">Showing 5 of 1243 users</p>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
                    Previous
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md bg-gray-100 font-medium">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
                    2
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'reports' && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 px-4 text-left">Post</th>
                      <th className="py-3 px-4 text-left">User</th>
                      <th className="py-3 px-4 text-left">Reports</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportedPosts.map(post => (
                      <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{post.title}</td>
                        <td className="py-3 px-4">{post.user}</td>
                        <td className="py-3 px-4">{post.reports}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            post.status === 'resolved' ? 'bg-green-100 text-green-800' : 
                            post.status === 'under review' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="p-1 text-blue-600 hover:text-blue-800">
                              <FaEye />
                            </button>
                            <button className="p-1 text-green-600 hover:text-green-800">
                              <FaEdit />
                            </button>
                            <button className="p-1 text-red-600 hover:text-red-800">
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;