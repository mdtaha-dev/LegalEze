import React from 'react';
import './FeaturesSection.css';
import { FaAlignLeft, FaShieldAlt, FaCommentDots } from 'react-icons/fa';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: <FaAlignLeft />,
      iconClass: "icon-blue",
      title: "Plain English Summary",
      description: "Get a 5-bullet TL;DR of your contract instantly. No more legalese, just the facts you need."
    },
    {
      id: 2,
      icon: <FaShieldAlt />,
      iconClass: "icon-red",
      title: "Red Flag Detection",
      description: "We automatically highlight risky clauses like hidden fees, liability caps, and auto-renewals."
    },
    {
      id: 3,
      icon: <FaCommentDots />,
      iconClass: "icon-teal",
      title: "Ask Questions",
      description: "Chat with your contract and get clear answers with citations. \"Can I terminate early?\" - found in Section 4."
    }
  ];

  return (
    <section className="features container" id="how-it-works">
      <div className="features-header">
        <span className="section-eyebrow">KEY FEATURES</span>
        <h2 className="section-title">Simplify your legal workflow</h2>
        <p className="section-subtitle">
          Our AI-powered tools help you navigate complex documents with ease, saving hours of manual review.
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature) => (
          <div key={feature.id} className="feature-card">
            <div className={`feature-icon-wrapper ${feature.iconClass}`}>
              {feature.icon}
            </div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
            
            {/* Optional decorative icon in top right similar to the design */}
            {feature.id === 2 && (
               <div className="decorative-shield">
                   <FaShieldAlt />
               </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
