import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { 
  FiHome,
  FiMapPin,
  FiAirplay,
  FiPackage,
  FiNavigation,
  FiSettings,
  FiUsers,
  FiLogOut,
  FiChevronDown,
  FiChevronRight
} from "react-icons/fi";
import "./SideBar.css";

const SideBar = ({ isCollapsed, toggleCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({});

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin-panel",
      icon: <FiHome />,
      exact: true
    },
    {
      name: "Hava Limanları",
      path: "/admin-panel/airports",
      icon: <FiMapPin />
    },
    {
      name: "Hava Yolları",
      path: "/admin-panel/airlines",
      icon: <FiAirplay />
    },
    {
      name: "Uçaklar",
      path: "/admin-panel/aircrafts",
      icon: <FiPackage />,
    },
    {
      name: "Uçuşlar",
      path: "/admin-panel/flights",
      icon: <FiNavigation />,
    },
    {
      name: "Pistler",
      path: "/admin-panel/runways",
      icon: <FiMapPin />
    },
    {
      name: "Personeller",
      path: "/admin-panel/staff",
      icon: <FiUsers />
    }
  ];

  const toggleExpand = (itemName) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const isActive = (path, exact = false) => {
    return exact 
      ? location.pathname === path
      : location.pathname.startsWith(path);
  };

  const handleNavItemClick = (item) => {
    if (item.subItems) {
      toggleExpand(item.name);
    } else {
      navigate(item.path);
    }
  };

  const handleLogout = () => {
    // Çıkış işlemleri burada yapılabilir (örn: token silme, state temizleme)
    navigate("/"); // Ana sayfaya yönlendir
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo">SkyWings</div>
          <div className="logo-icon">✈</div>
        </div>
        <button 
          className="collapse-toggle"
          onClick={toggleCollapse}
        >
          {isCollapsed ? "»" : "«"}
        </button>
      </div>

      <div className="sidebar-menu">
        {navItems.map((item) => (
          <React.Fragment key={item.name}>
            <div 
              className={`menu-item ${isActive(item.path, item.exact) ? "active" : ""}`}
              onClick={() => handleNavItemClick(item)}
            >
              <div className="menu-icon">{item.icon}</div>
              {!isCollapsed && (
                <>
                  <span className="menu-text">{item.name}</span>
                  {item.subItems && (
                    <div className="expand-icon">
                      {expandedItems[item.name] ? <FiChevronDown /> : <FiChevronRight />}
                    </div>
                  )}
                </>
              )}
            </div>

            {!isCollapsed && item.subItems && expandedItems[item.name] && (
              <div className="submenu">
                {item.subItems.map(subItem => (
                  <div
                    key={subItem.name}
                    className={`submenu-item ${isActive(subItem.path) ? "active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(subItem.path);
                    }}
                  >
                    <span className="submenu-text">{subItem.name}</span>
                  </div>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {!isCollapsed && (
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">AD</div>
          <div className="user-info">
            <div className="user-name">Admin User</div>
            <div className="user-role">System Administrator</div>
          </div>
        </div>
        
        <div className="logout-container">
          <div 
            className="logout-button"
            onClick={handleLogout}
          >
            <FiLogOut className="logout-icon" />
            <span>Çıkış Yap</span>
            <div className="logout-hover-effect"></div>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default SideBar;