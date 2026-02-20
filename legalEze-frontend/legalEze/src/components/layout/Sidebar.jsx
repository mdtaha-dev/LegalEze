import { NavLink } from "react-router-dom";
import { FiFileText, FiAlertTriangle, FiMessageSquare, FiClock, FiUpload } from "react-icons/fi";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div>
        <div className="logo">LegalEze</div>

        <div className="sidebar-links">
          <NavLink to="/summary" className="sidebar-button">
            <FiFileText className="sidebar-icon" />
            Summary
          </NavLink>

          <NavLink to="/danger" className="sidebar-button danger">
            <FiAlertTriangle className="sidebar-icon" />
            Danger Zone
          </NavLink>

          <NavLink to="/chat" className="sidebar-button">
            <FiMessageSquare className="sidebar-icon" />
            Chat
          </NavLink>

          <NavLink to="/history" className="sidebar-button">
            <FiClock className="sidebar-icon" />
            History
          </NavLink>
        </div>
      </div>

      <button className="upload-button">
        <FiUpload style={{ marginRight: "8px" }} />
        Upload New Document
      </button>
    </div>
  );
}