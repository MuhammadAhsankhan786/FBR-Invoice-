import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/login';
import { DashboardLayout } from './components/dashboard-layout';
import { Dashboard } from './components/dashboard';
import { CreateInvoice } from './components/create-invoice';
import { InvoiceList } from './components/invoice-list';
import { InvoicePreview } from './components/invoice-preview';
import { FBRDetails } from './components/fbr-details';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <DashboardLayout onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-invoice" element={<CreateInvoice />} />
          <Route path="/invoices" element={<InvoiceList />} />
          <Route path="/invoice-preview/:id" element={<InvoicePreview />} />
          <Route path="/fbr-details/:id" element={<FBRDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
