import React from "react";
import { Outlet, useLocation } from "react-router";
import { FiMenu, FiX } from "react-icons/fi";
import "./AdminMain.css";
import SideBar from "../SideBar/SideBar";
import LiveData from "../LiveData/LiveData";

const AdminMain = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  const isDashboard = location.pathname === "/admin-panel";

  return (
    <div className={`admin-panel ${sidebarOpen ? "sidebar-open" : "sidebar-collapsed"}`}>
      {/* Mobile Sidebar Toggle */}
      <button 
        className="mobile-sidebar-toggle"
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      >
        {mobileSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${mobileSidebarOpen ? "mobile-open" : ""}`}>
        <SideBar 
          isCollapsed={!sidebarOpen} 
          toggleCollapse={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>

      {/* Main Content */}
      <div className="main-content">
        {isDashboard ? (
          <div className="dashboard-layout">
            <div className="dashboard-content">
              <Outlet />
            </div>
            <div className="live-data-container">
              <LiveData />
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default AdminMain;