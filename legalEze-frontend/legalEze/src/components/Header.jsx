import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { FaGavel } from 'react-icons/fa';
import { FiBell, FiSettings } from 'react-icons/fi';

const Header = ({ variant = 'default' }) => {
  const navigate = useNavigate();

  return (
    <header className={`header container ${variant === 'app' ? 'header-app' : ''}`}>
      <Link to="/" className="logo-container">
        <div className="logo-icon bg-primary">
          <FaGavel color="white" />
        </div>
        <span className="logo-text">LegalEze</span>
      </Link>
      
      {variant === 'default' ? (
        <div className="header-right">
          <nav className="nav-links">
            <a href="#how-it-works">How it works</a>
            <a href="#pricing">Pricing</a>
          </nav>

          <div className="header-actions">
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/upload-document')}
            >
              Upload Contract
            </button>
          </div>
        </div>
      ) : (
        <div className="app-actions">
          <button className="icon-btn"><FiBell /></button>
          <button className="icon-btn"><FiSettings /></button>
          <div className="profile-placeholder">
             <img src="https://ui-avatars.com/api/?name=I&background=FDBA74&color=fff" alt="Profile" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
