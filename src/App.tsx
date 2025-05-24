import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PurchasesPage from './pages/PurchasesPage';
import TransfersPage from './pages/TransfersPage';
import AssignmentsPage from './pages/AssignmentsPage';
import { AuthProvider } from './context/AuthContext';
import { AssetProvider } from './context/AssetContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AssetProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<MainLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="purchases" element={<PurchasesPage />} />
              <Route path="transfers" element={<TransfersPage />} />
              <Route path="assignments" element={<AssignmentsPage />} />
              <Route path="admin" element={<div className="p-4">Admin settings page</div>} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AssetProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;