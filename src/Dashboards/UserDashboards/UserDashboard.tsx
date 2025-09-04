import { Outlet } from "react-router-dom";
import Navbar from "./CommonComponents/UserDashbaordNavbar";
import UserDetails from "./CommonComponents/UserDetails";
import RecomondedUsers from "./CommonComponents/RecomondedUsers";
import RecentActivities from "./CommonComponents/RecentActivities";
import TrendingTopics from "./CommonComponents/TrendingTopics";
import { useAuth } from "../../Context/Authcontext";
import UserDetailsModal from "./CommonComponents/UserDetailsModal";
import "../../App.css";
function UserDashboard() {
  const { showDetailsModal } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      {showDetailsModal && <UserDetailsModal onClose={function (): void {
        throw new Error("Function not implemented.");
      }} />}

      <div className="pt-20 pb-8 container mt-5 mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 px-4 flex-1 overflow-hidden">
        <div className="md:col-span-3 overflow-y-auto">
          <UserDetails />
          <RecomondedUsers />
        </div>
        <div className="md:col-span-6 overflow-y-auto h-[calc(100vh-6rem)] pr-2 scroll-hidden">
          <Outlet />
        </div>
        <div className="md:col-span-3 overflow-y-auto">
          <RecentActivities />
          <TrendingTopics />
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
