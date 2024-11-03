import React from 'react';
import '../styles/components/header.css';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface HeaderProps {
  toggleSidebar: () => void;
  toggleProfileDropdown: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, toggleProfileDropdown }) => {
  return (
    <header className="header">
      <div className="left-section">
        <button onClick={toggleSidebar} className="menu-button" title="Toggle Sidebar">
          <MenuIcon fontSize="large" />
        </button>
        <h1 className="header-title">Dashboard</h1>
      </div>
      <button onClick={toggleProfileDropdown} className="profile-icon" title="Toggle Profile Dropdown">
        <AccountCircleIcon fontSize="large" />
      </button>
    </header>
  );
};

export default Header;
