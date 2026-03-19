import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';
import { FaCircle, FaShieldAlt } from 'react-icons/fa';
import { IoIosWarning } from "react-icons/io";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero container">
      <div className="hero-content">
        <div className="badge">
          <FaCircle className="badge-icon" />
          <span>AI POWERED LEGAL ASSISTANT</span>
        </div>
        
        <h1 className="hero-title">
          Understand Your Contracts in <span className="text-primary">Plain English.</span>
        </h1>
        
        <p className="hero-subtitle">
          Upload any legal document and get a simple summary, risk alerts, and answers to your questions instantly.
        </p>

        <div className="hero-actions">
          <button 
            className="btn btn-primary btn-large"
            onClick={() => navigate('/upload-document')}
          >
            Upload Contract
          </button>
          <button className="btn btn-outline btn-large">See How It Works</button>
        </div>

        <div className="social-proof">
          <div className="avatars">
             <img src="https://i.pravatar.cc/100?img=11" alt="User 1" />
             <img src="https://i.pravatar.cc/100?img=12" alt="User 2" />
             <img src="https://i.pravatar.cc/100?img=13" alt="User 3" />
          </div>
          <span className="proof-text">Trusted by 2,000+ professionals</span>
        </div>
      </div>

      <div className="hero-visual">
        <div className="document-card">
          <div className="doc-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#009B8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke="#009B8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 13H8" stroke="#009B8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17H8" stroke="#009B8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 9H8" stroke="#009B8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="doc-title">EMPLOYMENT_AGREEMENT.PDF</span>
          </div>

          <div className="skeleton-lines">
            <div className="line line-long"></div>
            <div className="line line-very-long"></div>
            <div className="line line-medium"></div>
          </div>

          <div className="red-flag-alert">
            <div className="alert-header">
              <IoIosWarning className="alert-icon" />
              <span>RED FLAG DETECTED</span>
            </div>
            <p className="alert-text">Section 12.4: Automatic renewal with a 90-day cancellation notice required.</p>
          </div>
           
           <div className="skeleton-lines mt-4">
             <div className="line line-long"></div>
           </div>

          <div className="ai-icon-corner bg-primary">
            <FaShieldAlt color="white" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
