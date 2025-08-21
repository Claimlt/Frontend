import "./App.css";
import AdminDashboard from "./Dashboards/AdminDashboards/AdminDashboard.tsx";
import UserDashboard from "./Dashboards/UserDashboards/UserDashboard.tsx";
import MainSection from "./Web/Components/MainSection.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainSection />} />
          <Route path="/user-dashboard" element={<UserDashboard/>} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
