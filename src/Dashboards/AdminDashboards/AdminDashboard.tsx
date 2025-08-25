import { useEffect} from "react";
import NavbarAdmin from "./Common Components/NavbarAdmin";
import Sidebar from "./Common Components/Sidebar";
import Fillters from "./Common Components/Fillters";

function AdminDashboard() {




  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    }
  }, []);




 


  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarAdmin />
      <div className="pt-20 pb-8 mt-3 container mx-auto flex">
        <Sidebar />
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <Fillters />
          </div>




         
            
        
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;