import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaSearch, FaBell, FaCog, FaFileUpload, 
  FaSearchPlus, FaFileSignature, FaEdit, 
  FaShareAlt, FaEllipsisH, FaChartBar, FaHistory 
} from 'react-icons/fa';
import { RiDashboardLine } from "react-icons/ri";
import NotificationPopover from './NotificationPopover';
import './Dashboard.css';

const HistoryRow = ({ icon: Icon, iconClass, action, date, status, statusClass, owner }) => (
  <div className="table-row-history">
    <div className="action-cell">
      <div className={`action-icon-circle ${iconClass}`}>
        <Icon />
      </div>
      <span className="action-text">{action}</span>
    </div>
    <div className="date-cell">{date}</div>
    <div className="status-cell">
      <div className={`status-pill ${statusClass}`}>{status}</div>
    </div>
    <div className="owner-cell">
      <span>{owner}</span>
    </div>
    <div className="more-cell"><FaEllipsisH /></div>
  </div>
);

const DocumentHistory = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="history-container">
      {/* Top Search Bar */}
      <div className="history-top-bar">
        <div className="search-input-group">
          <FaSearch />
          <input type="text" placeholder="Search logs, actions or dates..." />
        </div>
        <div className="top-bar-actions">
          <div className="popover-anchor">
            <div 
              className="input-icon-btn" 
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <FaBell />
              <span className="notification-dot" style={{ left: '22px', top: '2px' }}></span>
            </div>
            {showNotifications && <NotificationPopover onClose={() => setShowNotifications(false)} />}
          </div>
          
          <div className="input-icon-btn" onClick={() => navigate('/settings')}>
            <FaCog />
          </div>
          <div 
            className="profile-placeholder" 
            style={{ width: 32, height: 32, cursor: 'pointer' }} 
            onClick={() => navigate('/settings')}
          >
             <img src="https://ui-avatars.com/api/?name=Alex+Smith&background=FDBA74&color=fff" alt="Profile" />
          </div>
        </div>
      </div>

      <header className="history-header">
        <div className="history-title-group">
          <h1>Document History</h1>
          <p>Track actions and versions for Rental Agreement.pdf</p>
        </div>
        <div className="toggle-switch-group">
          <button className="toggle-btn active">Activity Log</button>
          <button className="toggle-btn">Version History</button>
        </div>
      </header>

      {/* Activity Log Table */}
      <div className="activity-table-card">
        <div className="table-header">
          <span>Action/Document</span>
          <span>Date & Time</span>
          <span>Status</span>
          <span>Owner</span>
          <span></span>
        </div>
        <div className="table-body">
          <HistoryRow 
            icon={FaFileUpload} 
            iconClass="icon-upload"
            action="Initial Upload"
            date="Oct 24, 2023 10:00 AM"
            status="Analyzed"
            statusClass="status-analyzed"
            owner="Alex Smith"
          />
          <HistoryRow 
            icon={FaSearchPlus} 
            iconClass="icon-search"
            action="Danger Zone Identification"
            date="Oct 24, 2023 10:05 AM"
            status="Needs Review"
            statusClass="status-needs-review"
            owner="System AI"
          />
          <HistoryRow 
            icon={FaFileSignature} 
            iconClass="icon-file"
            action="Summary Generated"
            date="Oct 24, 2023 10:06 AM"
            status="Completed"
            statusClass="status-completed"
            owner="System AI"
          />
          <HistoryRow 
            icon={FaEdit} 
            iconClass="icon-edit"
            action="Clause 12.4 Edited"
            date="Oct 25, 2023 02:30 PM"
            status="Pending"
            statusClass="status-pending"
            owner="Sarah Jones"
          />
          <HistoryRow 
            icon={FaShareAlt} 
            iconClass="icon-share"
            action="Shared with Legal Team"
            date="Oct 26, 2023 09:15 AM"
            status="Delivered"
            statusClass="status-delivered"
            owner="Alex Smith"
          />
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="history-metrics">
        <div className="metric-card">
          <span className="metric-card-header">Most Active User</span>
          <div className="metric-body">
             <img 
               src="https://ui-avatars.com/api/?name=Alex+Smith&background=85D4CC&color=fff" 
               alt="User" 
               className="metric-avatar"
             />
             <div className="user-info-metric">
                <h4>Alex Smith</h4>
                <p>Lead Counsel</p>
             </div>
          </div>
        </div>

        <div className="metric-card">
          <span className="metric-card-header">Total Edits</span>
          <div className="metric-body">
             <div className="metric-icon-box"><FaEdit /></div>
             <div className="metric-stat-group">
                <span className="metric-stat-value">14</span>
                <span className="metric-stat-label">Changes in 3 days</span>
             </div>
          </div>
        </div>

        <div className="metric-card">
          <span className="metric-card-header">Review Cycle</span>
          <div className="metric-body">
             <div className="metric-icon-box" style={{ backgroundColor: '#E6F5F4' }}><RiDashboardLine /></div>
             <div className="metric-stat-group">
                <span className="metric-stat-value">2.4h</span>
                <span className="metric-stat-label">Avg. response time</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentHistory;
