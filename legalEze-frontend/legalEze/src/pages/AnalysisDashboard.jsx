import React, { useState } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import DangerZones from '../components/DangerZones';
import AnalysisChat from '../components/AnalysisChat';
import ContractSummary from '../components/ContractSummary';
import DocumentHistory from '../components/DocumentHistory';
import '../components/Dashboard.css';

const AnalysisDashboard = () => {
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <div className="dashboard-layout">
      <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="dashboard-main">
        {activeTab === 'summary' && <ContractSummary />}
        {activeTab === 'danger-zones' && <DangerZones />}
        {activeTab === 'chat' && <AnalysisChat />}
        {activeTab === 'history' && <DocumentHistory />}
        {/* Other tabs can be added here */}
      </main>
    </div>
  );
};

export default AnalysisDashboard;
