import React from 'react';
import { FaExclamationTriangle, FaEye, FaFlag, FaMoneyBillWave, FaSyncAlt, FaMapMarkerAlt } from 'react-icons/fa';
import './Dashboard.css';

const RiskCard = ({ level, title, description, icon: Icon }) => {
  const riskClass = `risk-${level.toLowerCase()}`;
  
  return (
    <div className={`risk-card ${riskClass}`}>
      <div className="risk-card-visual">
        <span className="risk-badge">{level} Risk</span>
        <div className="risk-visual-placeholder">
          <Icon />
        </div>
      </div>
      <div className="risk-card-content">
        <div className="risk-card-header">
          <h3>{title}</h3>
          <FaExclamationTriangle className="risk-icon-alert" />
        </div>
        <p className="risk-description">{description}</p>
        <div className="risk-card-actions">
          <div className="action-link"><FaEye /> View Clause</div>
          <div className="action-link secondary"><FaFlag /> Report False Positive</div>
        </div>
      </div>
    </div>
  );
};

const DangerZones = () => {
  return (
    <div className="dashboard-content">
      <header className="danger-header">
        <div className="danger-title-group">
          <h1>Danger Zones</h1>
          <p>AI-powered analysis of potential risks and liabilities found in your document.</p>
        </div>
        <div className="risk-stats">
          <div className="stat-item">
            <span className="stat-label">Total Risks</span>
            <span className="stat-value">12</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Critical</span>
            <span className="stat-value critical">02</span>
          </div>
        </div>
      </header>

      <div className="risk-cards-grid">
        <RiskCard 
          level="High"
          title="Hidden Fees"
          description='The agreement contains undisclosed maintenance or late charges not clearly defined in the payment schedule. Clause 4.2 references "additional administrative surcharges" without specifying amounts or frequency.'
          icon={FaMoneyBillWave}
        />
        <RiskCard 
          level="Medium"
          title="Auto-renewal"
          description="This contract will automatically extend for another 12-month period unless a 30-day written notice is provided before the expiration date. This evergreen clause may lead to unintended long-term commitments."
          icon={FaSyncAlt}
        />
        <RiskCard 
          level="Low"
          title="Governing Law"
          description="The agreement is governed by the laws of Delaware. If you are operating outside of this jurisdiction, legal proceedings may require travel or specialized local counsel."
          icon={FaMapMarkerAlt}
        />
      </div>

      <div className="summary-widgets">
        <div className="widget-card">
          <h4 className="widget-title">Agreement Health Score</h4>
          <div className="score-display">
            <span className="score-value">68/100</span>
            <span className="score-label">FAIR</span>
          </div>
          <div className="health-bar-container">
            <div className="health-bar-fill" style={{ width: '68%' }}></div>
          </div>
        </div>

        <div className="widget-card">
          <h4 className="widget-title">Estimated Review Time</h4>
          <div className="score-display">
            <span className="score-value">12 mins</span>
          </div>
          <p className="widget-subtitle">Based on document complexity & identified risks</p>
        </div>
      </div>
    </div>
  );
};

export default DangerZones;
