import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Header from './components/header';
import AdminPage from './pages/Adminpage';
import ManagerPage from './pages/ManagerPage';
import ObjectPanel from './pages/admin/ObjectPanel';
import UserManagementPanel from './pages/admin/UserManagementPanel';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import ManagerIssuesPage from './pages/manager/ManagerIssuesPage';
import ManagerOrdersPage from './pages/manager/ManagerOrdersPage';
import ManagerPaymentsPage from './pages/manager/ManagerPaymentsPage';
import ManagerNotificationsPage from './pages/manager/ManagerNotificationsPage';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';

// import AdminToggle from './components/AdminToggle';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { UserRoles } from './types/User';

// Placeholder components
//const HomePage = () => <div>Home Page</div>;
const KontaktPage = () => <div>Kontakt Page</div>;
const UnauthorizedPage = () => <div>You don't have permission to access this page</div>;

const AppContent: React.FC = () => {  
  return (
    <Router>
      <Header />
      
      <div className="app-container">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          
          {/* Admin routes */}
          <Route element={<ProtectedRoute requiredRoles={[UserRoles.ADMIN]} />}>
            <Route path="/admin" element={<AdminPage />}>
              <Route index element={<Navigate to="users" replace />} />
              <Route path="object" element={<ObjectPanel />} />
              <Route path="users" element={<UserManagementPanel />} />
            </Route>
          </Route>
          
          {/* Manager routes */}
          <Route element={<ProtectedRoute requiredRoles={[UserRoles.MANAGER, UserRoles.ADMIN]} />}>
            <Route path="/manager" element={<ManagerPage />}>
              <Route index element={<ManagerDashboard />} />
              <Route path="issues" element={<ManagerIssuesPage />} />
              <Route path="orders" element={<ManagerOrdersPage />} />
              <Route path="payments" element={<ManagerPaymentsPage />} />
              <Route path="notifications" element={<ManagerNotificationsPage />} />
            </Route>
          </Route>
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      
      {/* Development admin toggle - would be removed in production */}
      {/* <AdminToggle 
        isAdmin={user?.role === UserRoles.ADMIN} 
        toggleAdmin={() => alert('Role switching is handled by login in this version')} 
      /> */}
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
