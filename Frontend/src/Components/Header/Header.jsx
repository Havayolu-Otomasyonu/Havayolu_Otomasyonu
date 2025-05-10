import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <ul className="nav-links">
        <li>Anasayfa</li>
        <li>Yönetim</li>
      </ul>
      <div className="airports-tag">
        <bl-dropdown label="Dropdown Button">
          <bl-dropdown-group>
            <bl-dropdown-item>Action 1</bl-dropdown-item>
            <bl-dropdown-item>Action 2</bl-dropdown-item>
          </bl-dropdown-group>
        </bl-dropdown>
      </div>
    </header>
  );
};
export default Header;
