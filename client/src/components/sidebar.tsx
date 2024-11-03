import React from 'react';
import '../styles/components/sidebar.css';
import AddIcon from '@mui/icons-material/Add';

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const projects = [
    { id: 1, name: 'Website Redesign' },
    { id: 2, name: 'Mobile App' },
    { id: 3, name: 'Database Migration' }
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2>Projects</h2>
        <button className="add-button" title="Add Project">
          <AddIcon />
        </button>
      </div>
      <ul className="project-list">
        {projects.map(project => (
          <li key={project.id} className="project-item">
            {project.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
