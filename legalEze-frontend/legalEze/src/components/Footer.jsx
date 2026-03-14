import React from 'react';
import './Footer.css';
import { FaLayerGroup } from 'react-icons/fa';

const Footer = ({ variant = 'default' }) => {
  return (
    <footer className={`footer container ${variant === 'app' ? 'footer-app' : ''}`}>
      <div className="footer-content">
        {variant === 'default' && (
          <div className="footer-logo">
            <div className="logo-icon bg-primary footer-icon-sm">
              <FaLayerGroup color="white" />
            </div>
            <span className="logo-text">LegalEze</span>
          </div>
        )}
        
        <nav className="footer-links">
          {variant === 'default' && <a href="#">Documentation</a>}
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Support</a>
        </nav>

        {variant === 'app' && (
          <p className="footer-copyright">
            © 2024 LegalEze Inc. Enterprise-grade document security enabled.
          </p>
        )}
      </div>
    </footer>
  );
};

export default Footer;
