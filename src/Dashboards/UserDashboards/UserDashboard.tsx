import { Outlet } from "react-router-dom";
import Navbar from "./CommonComponents/UserDashbaordNavbar";
import UserDetails from "./CommonComponents/UserDetails";
import RecomondedUsers from "./CommonComponents/RecomondedUsers";
import RecentActivities from "./CommonComponents/RecentActivities";
import TrendingTopics from "./CommonComponents/TrendingTopics";

function UserDashboard() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-8 container mt-5 mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 px-4">
        <div className="md:col-span-3">
          <UserDetails />
          <RecomondedUsers />
        </div>
        <div className="md:col-span-6">
          <Outlet />
        </div>
        <div className="md:col-span-3">
          <RecentActivities />
          <TrendingTopics />
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;