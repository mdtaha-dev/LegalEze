import React from 'react';
import { FaUserCircle, FaPaperclip, FaLink, FaPaperPlane } from 'react-icons/fa';
import { HiLightningBolt } from "react-icons/hi";
import './Dashboard.css';

const AIMessage = ({ text, source }) => (
  <div className="message message-ai">
    <div className="message-author-tag">
      <div className="logo-icon bg-primary" style={{ width: 18, height: 18, fontSize: '0.6rem' }}>
        <HiLightningBolt color="white" />
      </div>
      <span>LegalEze AI</span>
    </div>
    <div className="bubble bubble-ai">
      {text}
      {source && (
        <div className="ai-meta">
          <div className="source-badge">
            <FaLink /> SOURCE: {source}
          </div>
        </div>
      )}
    </div>
  </div>
);

const UserMessage = ({ text }) => (
  <div className="message message-user">
    <div className="message-author-tag">
      <span>You</span>
      <FaUserCircle />
    </div>
    <div className="bubble bubble-user">{text}</div>
  </div>
);

const AnalysisChat = () => {
  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>Chat with your Contract</h1>
        <p>Ask questions like 'Can I terminate early?' or 'What are the hidden fees?'</p>
      </header>

      <div className="chat-messages">
        <UserMessage text="What happens if I need to move out early?" />
        
        <AIMessage 
          text="According to Section 8.2 (Early Termination), you must provide at least 60 days' written notice. A termination fee equal to one month's rent will apply if the lease is ended before the 12-month term."
          source="SECTION 8.2"
        />

        <div className="suggested-questions">
          <div className="suggestion-pill">"What is the security deposit amount?"</div>
          <div className="suggestion-pill">"Are pets allowed in the property?"</div>
        </div>
      </div>

      <div className="chat-input-wrapper">
        <div className="chat-input-container">
          <div className="input-icon-btn"><FaPaperclip /></div>
          <input type="text" placeholder="Ask a question about this contract..." />
          <button className="input-icon-btn send-btn">
            <FaPaperPlane />
          </button>
        </div>
        <p className="chat-disclaimer">
          LEGALEZE AI CAN MAKE MISTAKES. VERIFY IMPORTANT DETAILS WITH A LEGAL PROFESSIONAL.
        </p>
      </div>
    </div>
  );
};

export default AnalysisChat;
