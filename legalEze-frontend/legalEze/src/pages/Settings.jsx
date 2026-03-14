import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaUser, FaLock, FaBell, FaGlobe, FaSave } from 'react-icons/fa';
import '../styles/Settings.css';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <div className="settings-container">
      <Header />
      
      <div className="settings-layout">
        <aside className="settings-sidebar">
          <div 
            className={`settings-nav-item ${activeSection === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveSection('profile')}
          >
            <FaUser /> <span>Profile</span>
          </div>
          <div 
            className={`settings-nav-item ${activeSection === 'account' ? 'active' : ''}`}
            onClick={() => setActiveSection('account')}
          >
            <FaGlobe /> <span>Account</span>
          </div>
          <div 
            className={`settings-nav-item ${activeSection === 'security' ? 'active' : ''}`}
            onClick={() => setActiveSection('security')}
          >
            <FaLock /> <span>Security</span>
          </div>
          <div 
            className={`settings-nav-item ${activeSection === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveSection('notifications')}
          >
            <FaBell /> <span>Notifications</span>
          </div>
        </aside>

        <main className="settings-content">
          <div className="settings-content-card">
            <header className="settings-header">
              <h1>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Settings</h1>
              <p>Manage your {activeSection} information and preferences.</p>
            </header>

            {activeSection === 'profile' && (
              <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
                <div className="profile-upload-section">
                  <img 
                    src="https://ui-avatars.com/api/?name=Alex+Smith&background=FDBA74&color=fff" 
                    alt="Current Avatar" 
                    className="settings-avatar-large"
                  />
                  <div className="upload-actions">
                    <h4>Profile Picture</h4>
                    <p>PNG or JPG. Max 10MB.</p>
                    <button className="btn btn-outline btn-small">Change Photo</button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" defaultValue="Alex Smith" />
                </div>
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" defaultValue="Lead Counsel" />
                </div>
                <div className="form-group form-group-full">
                  <label>Email Address</label>
                  <input type="email" defaultValue="alex.smith@legaleze.ai" />
                </div>
                <div className="form-group form-group-full">
                  <label>Bio</label>
                  <textarea rows="4" placeholder="Tell us about yourself..."></textarea>
                </div>
              </form>
            )}

            {activeSection === 'account' && (
              <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>Language</label>
                  <select defaultValue="en">
                    <option value="en">English (US)</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Timezone</label>
                  <select defaultValue="pst">
                    <option value="pst">Pacific Time (PT)</option>
                    <option value="est">Eastern Time (ET)</option>
                    <option value="gmt">Greenwich Mean Time (GMT)</option>
                  </select>
                </div>
              </form>
            )}

            <footer className="settings-footer">
              <button className="btn btn-outline">Cancel</button>
              <button className="btn btn-primary" style={{ gap: '0.5rem' }}>
                <FaSave /> Save Changes
              </button>
            </footer>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Settings;
