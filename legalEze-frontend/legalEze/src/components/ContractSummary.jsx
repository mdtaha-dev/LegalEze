import React from 'react';
import { FaDownload, FaPrint, FaRegCheckCircle } from 'react-icons/fa';
import { HiSparkles } from "react-icons/hi";
import './Dashboard.css';

const ContractSummary = () => {
  return (
    <div className="summary-container">
      <header className="summary-header">
        <div className="header-text">
          <span className="report-label">ANALYSIS REPORT</span>
          <h1 className="summary-title">Contract Summary</h1>
        </div>
        <div className="summary-actions">
          <FaDownload className="action-icon" title="Download PDF" />
          <FaPrint className="action-icon" title="Print Summary" />
        </div>
      </header>

      {/* TL;DR Section */}
      <div className="tldr-card">
        <div className="tldr-header">
          <HiSparkles />
          <span>The TL;DR</span>
        </div>
        <p className="tldr-text">
          This is a standard residential lease agreement for a 12-month term. It outlines your rights as a tenant 
          and the landlord's expectations regarding rent, maintenance, and property use. Overall, it is a low-risk 
          agreement with standard industry terms.
        </p>
      </div>

      {/* Two Column Section */}
      <div className="summary-grid">
        <div className="summary-section-card">
          <h3 className="section-title">Key Parties</h3>
          <div className="party-item">
            <span className="party-role">LANDLORD / OWNER</span>
            <p className="party-name">High-Rise Properties Management LLC</p>
          </div>
          <div className="party-item">
            <span className="party-role">TENANT / RESIDENT</span>
            <p className="party-name">Jane Doe</p>
          </div>
        </div>

        <div className="summary-section-card">
          <h3 className="section-title">Duration & Termination</h3>
          <div className="terms-list">
            <div className="term-item">
              <FaRegCheckCircle />
              <span>Fixed term of 12 months starting Nov 1, 2023.</span>
            </div>
            <div className="term-item">
              <FaRegCheckCircle />
              <span>60-day notice required for non-renewal.</span>
            </div>
            <div className="term-item">
              <FaRegCheckCircle />
              <span>Early termination fee: 2 months' rent.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Obligations */}
      <div className="financial-section">
        <h3 className="section-title">Financial Obligations</h3>
        
        <div className="financial-cards">
          <div className="fin-card">
            <span className="fin-label">Monthly Rent</span>
            <span className="fin-value">$2,450</span>
          </div>
          <div className="fin-card">
            <span className="fin-label">Security Deposit</span>
            <span className="fin-value">$2,450</span>
          </div>
          <div className="fin-card">
            <span className="fin-label">Late Fee</span>
            <span className="fin-value">$50/day</span>
          </div>
        </div>

        <div className="financial-table">
          <div className="table-row">
            <span className="table-label">Water & Sewer</span>
            <span className="table-value">Included</span>
          </div>
          <div className="table-row">
            <span className="table-label">Electricity & Gas</span>
            <span className="table-value">Tenant's Responsibility</span>
          </div>
          <div className="table-row">
            <span className="table-label">Pet Monthly Fee</span>
            <span className="table-value">$35 per pet</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractSummary;
