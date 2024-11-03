import React from 'react';
import '../styles/components/profiledropdown.css';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const ProfileDropdown = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className={`profile-dropdown ${isOpen ? 'show' : 'hide'}`}>
      <button className="dropdown-item">
        <SettingsIcon fontSize="small" />
        Settings
      </button>
      <button className="dropdown-item">
        <AccountCircleIcon fontSize="small" />
        Profile
      </button>
      <hr />
      <button className="dropdown-item logout">
        <LogoutIcon fontSize="small" />
        Logout
      </button>
    </div>
  );
};

export default ProfileDropdown;
