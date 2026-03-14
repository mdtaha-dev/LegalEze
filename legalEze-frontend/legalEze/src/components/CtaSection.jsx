import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CtaSection.css';

const CtaSection = () => {
  const navigate = useNavigate();

  return (
    <section className="cta container">
      <div className="cta-banner">
        <h2 className="cta-title">Ready to simplify your contracts?</h2>
        <p className="cta-subtitle">
          Join hundreds of users understanding their legal documents better in seconds.
        </p>
        
        <button 
          className="btn btn-white btn-large cta-button"
          onClick={() => navigate('/upload-document')}
        >
          Upload Contract Now
        </button>
        
        <p className="cta-disclaimer">
          NO CREDIT CARD REQUIRED • SECURE & PRIVATE
        </p>
      </div>
    </section>
  );
};

export default CtaSection;
