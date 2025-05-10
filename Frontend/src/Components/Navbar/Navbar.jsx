import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiCalendar,
  FiMapPin,
  FiUser,
  FiChevronDown,
  FiSettings // Bu eklenmeli
} from "react-icons/fi";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Uçuşlar");
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);

  // Nav items'ı route bilgileri ile genişlettik
  const navItems = [
    { 
      name: "Uçuşlar", 
      icon: <FiCalendar className="nav-icon" />,
      path: "/flights" 
    },
    { 
      name: "Hava Limanları", 
      icon: <FiMapPin className="nav-icon" />,
      path: "/airports" 
    },
    { 
      name: "Uçuş Sorgula", 
      icon: <FiSearch className="nav-icon" />,
      path: "/flight-search" 
    },
  ];

  const handleNavItemClick = (item) => {
    setActiveItem(item.name);
    navigate(item.path); // Route'a yönlendirme
  };

  const handleAdminDropdownToggle = () => setAdminDropdownOpen(!adminDropdownOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => navigate("/")}>
          <span>SkyWings</span>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          {navItems.map((item) => (
            <div
              key={item.name}
              className={`nav-item ${activeItem === item.name ? "active" : ""}`}
              onClick={() => handleNavItemClick(item)}
            >
              {item.icon}
              <span>{item.name}</span>
              <div className="nav-indicator"></div>
            </div>
          ))}
        </div>

        {/* Admin Dropdown */}
        <div className="admin-dropdown-container">
          <div
            className={`admin-toggle ${adminDropdownOpen ? "active" : ""}`}
            onClick={handleAdminDropdownToggle}
          >
            <FiUser className="nav-icon" />
            <span>Admin</span>
            <FiChevronDown
              className={`dropdown-icon ${adminDropdownOpen ? "rotate" : ""}`}
            />
          </div>

          {adminDropdownOpen && (
            <div className="admin-dropdown-menu">
              <div 
                className="dropdown-item"
                onClick={() => navigate("/admin-panel")}
              >
                <FiSettings className="item-icon" />
                <span>Admin Paneli</span>
              </div>
              <div 
                className="dropdown-item"
                onClick={() => navigate("/user-mode")}
              >
                <FiUser className="item-icon" />
                <span>Kullanıcı Modu</span>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <div
            key={item.name}
            className={`mobile-nav-item ${
              activeItem === item.name ? "active" : ""
            }`}
            onClick={() => {
              handleNavItemClick(item);
              setIsOpen(false);
            }}
          >
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;