import {
  FaUsers,
  FaBell,
  FaEye,
 
} from "react-icons/fa";
function OverView() {
    const stats = {
    totalUsers: 1243,
    activeUsers: 892,
    suspendedUsers: 27,
    totalPosts: 5689,
    reportedPosts: 43,
    resolvedReports: 38
  };
  return (
    <div><div className="grid grid-cols-2 gap-6 mb-6">
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
    </div></div>
  )
}

export default OverView