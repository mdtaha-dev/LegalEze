import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UploadSection from '../components/UploadSection';

const UploadPage = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header variant="app" />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <UploadSection />
      </main>
      <Footer variant="app" />
    </div>
  );
};

export default UploadPage;
