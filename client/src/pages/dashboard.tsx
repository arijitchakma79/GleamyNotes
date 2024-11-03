import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import ProfileDropdown from '../components/profileDropDown';
import Header from '../components/header';
import '../App.css';

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(prev => !prev);
  };

  return (
    <div className="dashboard-container">
      <Header 
        toggleSidebar={toggleSidebar} 
        toggleProfileDropdown={toggleProfileDropdown} 
      />
      <Sidebar isOpen={isSidebarOpen} />
      <ProfileDropdown isOpen={isProfileOpen} />
      <main className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
        <div className="content-box">
          <h2>Welcome to your Dashboard</h2>
          <p>Select a project from the sidebar or create a new one to get started.</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
