import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaGavel, FaFileAlt, FaBalanceScale, FaComments, FaHistory, FaPlus } from 'react-icons/fa';
import './Dashboard.css';

const DashboardSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <NavLink to="/" className="logo-container">
          <div className="logo-icon bg-primary">
            <FaGavel color="white" />
          </div>
          <span className="logo-text">LegalEze</span>
        </NavLink>
      </div>

      <div className="file-info-card">
        <div className="file-type-icon">
          <FaFileAlt />
        </div>
        <div className="file-details">
          <span className="file-name-sidebar">Rental Agreement.pdf</span>
          <span className="file-upload-date">Uploaded: Feb 15, 2026</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <button 
          className={`nav-item ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          <FaFileAlt className="nav-icon" />
          <span>Summary</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'danger-zones' ? 'active' : ''}`}
          onClick={() => setActiveTab('danger-zones')}
        >
          <FaBalanceScale className="nav-icon" />
          <span>Danger Zones</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          <FaComments className="nav-icon" />
          <span>Chat</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <FaHistory className="nav-icon" />
          <span>History</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <button 
          className="btn btn-primary w-full"
          style={{ width: '100%', gap: '0.5rem', padding: '1rem' }}
          onClick={() => navigate('/upload-document')}
        >
          <FaPlus /> <span className="btn-text">Upload New Document</span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
