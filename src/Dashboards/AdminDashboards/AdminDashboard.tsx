import { useEffect } from "react"

function AdminDashboard() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    }
  }, []); 

  return (
    <div>AdminDashboard</div>
  )
}

export default AdminDashboard