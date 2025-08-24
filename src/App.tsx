import "./App.css";
import { AuthProvider } from "./Context/Authcontext.tsx";
import AdminDashboard from "./Dashboards/AdminDashboards/AdminDashboard.tsx";
import UserPosts from "./Dashboards/UserDashboards/Components/UserPosts.tsx";
import UserDashboard from "./Dashboards/UserDashboards/UserDashboard.tsx";
import MainSection from "./Web/Components/MainSection.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
    <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainSection />} />
          <Route path="/user-dashboard" element={<UserDashboard/>} >
           <Route index element ={<UserPosts/>} />
            <Route path="user-posts" element={<UserPosts />} />
          </Route>
          <Route path="/admin-dashboard" element={<AdminDashboard />} >
           
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    
    </>
  );
}

export default App;
