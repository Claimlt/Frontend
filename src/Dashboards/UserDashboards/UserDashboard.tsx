import { useEffect } from "react"

function UserDashboard() {

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    }
  }, []); 

  return (
    <div>UserDashboard</div>
  )
}

export default UserDashboard