import React from 'react';
import './UploadSection.css';
import { FaCloudUploadAlt, FaFilePdf, FaRocket, FaSyncAlt } from 'react-icons/fa';
import { IoIosInformationCircleOutline } from "react-icons/io";

const UploadSection = () => {
  return (
    <section className="upload-container">
      <div className="upload-header">
        <h1 className="upload-title">Contract Analysis</h1>
        <p className="upload-subtitle">
          Securely upload your legal documents for AI-powered insights
        </p>
      </div>

      <div className="upload-card">
        <div className="dropzone">
          <div className="dropzone-icon-wrapper">
             <FaCloudUploadAlt className="dropzone-icon" />
          </div>
          <h3 className="dropzone-title">Drop your PDF or DOCX here</h3>
          <p className="dropzone-subtitle">
            <span className="text-primary-light">Or click to browse your local files</span>
          </p>
          <div className="file-limit-badge">
             <IoIosInformationCircleOutline /> Max file size: 20MB
          </div>
        </div>

        <div className="upload-progress-container">
           <div className="progress-header">
              <div className="file-info">
                 <FaFilePdf className="file-icon" />
                 <span className="file-name">Commercial_Lease_Agreement_2024.pdf</span>
              </div>
              <span className="progress-percentage">65%</span>
           </div>
           
           <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: '65%' }}></div>
           </div>
           
           <div className="progress-footer">
              <span className="progress-status">Uploading to secure vault...</span>
              <span className="progress-size">12.4 MB of 19.1 MB</span>
           </div>
        </div>

        <button className="btn btn-primary start-analysis-btn">
          <FaRocket className="rocket-icon" /> Start Analysis
        </button>
      </div>

      <div className="loading-state">
        <div className="loading-header">
           <FaSyncAlt className="loading-spinner text-primary" />
           <span className="text-primary font-medium">Analyzing your contract...</span>
        </div>
        <p className="loading-text">
           Our AI is identifying key clauses, risks, and obligations<br/>within your document.
        </p>
      </div>
    </section>
  );
};

export default UploadSection;
