import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaClock } from 'react-icons/fa';
import '../styles/Settings.css';

const NotificationItem = ({ type, message, time }) => {
  const getIcon = () => {
    switch (type) {
      case 'success': return <FaCheckCircle />;
      case 'warning': return <FaExclamationTriangle />;
      case 'info': return <FaInfoCircle />;
      default: return <FaClock />;
    }
  };

  const getStatusClass = () => {
    switch (type) {
      case 'success': return 'notif-success';
      case 'warning': return 'notif-warning';
      case 'info': return 'notif-info';
      default: return '';
    }
  };

  return (
    <div className="notification-item">
      <div className={`notif-icon-box ${getStatusClass()}`}>
        {getIcon()}
      </div>
      <div className="notif-content">
        <p className="notif-message">{message}</p>
        <span className="notif-time">{time}</span>
      </div>
    </div>
  );
};

const NotificationPopover = ({ onClose }) => {
  return (
    <div className="notification-popover">
      <div className="popover-header">
        <h3>Notifications</h3>
        <span className="clear-all">Mark all as read</span>
      </div>
      <div className="notification-list">
        <NotificationItem 
          type="success"
          message="Rental Agreement.pdf analysis complete! 12 risks identified."
          time="Just now"
        />
        <NotificationItem 
          type="warning"
          message="High risk detected in Clause 12.4 of 'Employment_Contract.pdf'"
          time="2 hours ago"
        />
        <NotificationItem 
          type="info"
          message="Document 'Commercial_Lease.pdf' shared successfully with Alex Smith."
          time="Yesterday at 4:30 PM"
        />
        <NotificationItem 
          type="success"
          message="LegalEze system maintenance completed successfully."
          time="Oct 24, 2023"
        />
      </div>
      <div className="popover-footer">
        <span className="view-all-link">View all notifications</span>
      </div>
    </div>
  );
};

export default NotificationPopover;
