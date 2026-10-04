import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';
import LoginPage from '../pages/auth/LoginPage';
import AppLayout from '../layouts/AppLayout';

// Citizen Pages
import CitizenDashboard from '../pages/citizen/CitizenDashboard';
import CitizenStreetlightsPage from '../pages/citizen/CitizenStreetlightsPage';
import CitizenFileComplaintPage from '../pages/citizen/CitizenFileComplaintPage';
import CitizenComplaintsPage from '../pages/citizen/CitizenComplaintsPage';
import CitizenMapPage from '../pages/citizen/CitizenMapPage';
import CitizenAIPage from '../pages/citizen/CitizenAIPage';
import CitizenProfilePage from '../pages/citizen/CitizenProfilePage';
import CitizenSettingsPage from '../pages/citizen/CitizenSettingsPage';

// Field Employee Pages
import EmployeeDashboard from '../pages/employee/EmployeeDashboard';
import EmployeeComplaintsPage from '../pages/employee/EmployeeComplaintsPage';
import EmployeeStreetlightsPage from '../pages/employee/EmployeeStreetlightsPage';
import EmployeeMaintenancePage from '../pages/employee/EmployeeMaintenancePage';
import EmployeeMapPage from '../pages/employee/EmployeeMapPage';
import EmployeeCamerasPage from '../pages/employee/EmployeeCamerasPage';
import EmployeeAIPage from '../pages/employee/EmployeeAIPage';
import EmployeeProfilePage from '../pages/employee/EmployeeProfilePage';
import EmployeeSettingsPage from '../pages/employee/EmployeeSettingsPage';

// Government Pages
import GovernmentDashboard from '../pages/government/GovernmentDashboard';
import GovernmentStreetlightsPage from '../pages/government/GovernmentStreetlightsPage';
import GovernmentComplaintsPage from '../pages/government/GovernmentComplaintsPage';
import GovernmentEmployeesPage from '../pages/government/GovernmentEmployeesPage';
import GovernmentAreasPage from '../pages/government/GovernmentAreasPage';
import GovernmentMapPage from '../pages/government/GovernmentMapPage';
import GovernmentCamerasPage from '../pages/government/GovernmentCamerasPage';
import GovernmentAnalyticsPage from '../pages/government/GovernmentAnalyticsPage';
import GovernmentAIPage from '../pages/government/GovernmentAIPage';
import GovernmentReportsPage from '../pages/government/GovernmentReportsPage';
import GovernmentProfilePage from '../pages/government/GovernmentProfilePage';
import GovernmentSettingsPage from '../pages/government/GovernmentSettingsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Citizen Portal Routes */}
      <Route path="/citizen" element={<AppLayout />}>
        <Route index element={<Navigate to="/citizen/dashboard" replace />} />
        <Route path="dashboard" element={<CitizenDashboard />} />
        <Route path="streetlights" element={<CitizenStreetlightsPage />} />
        <Route path="complaints" element={<CitizenComplaintsPage />} />
        <Route path="complaints/new" element={<CitizenFileComplaintPage />} />
        <Route path="map" element={<CitizenMapPage />} />
        <Route path="ai" element={<CitizenAIPage />} />
        <Route path="profile" element={<CitizenProfilePage />} />
        <Route path="settings" element={<CitizenSettingsPage />} />
      </Route>

      {/* Field Employee Portal Routes */}
      <Route path="/employee" element={<AppLayout />}>
        <Route index element={<Navigate to="/employee/dashboard" replace />} />
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="complaints" element={<EmployeeComplaintsPage />} />
        <Route path="streetlights" element={<EmployeeStreetlightsPage />} />
        <Route path="maintenance" element={<EmployeeMaintenancePage />} />
        <Route path="map" element={<EmployeeMapPage />} />
        <Route path="cameras" element={<EmployeeCamerasPage />} />
        <Route path="ai" element={<EmployeeAIPage />} />
        <Route path="profile" element={<EmployeeProfilePage />} />
        <Route path="settings" element={<EmployeeSettingsPage />} />
      </Route>

      {/* Government Portal Routes */}
      <Route path="/government" element={<AppLayout />}>
        <Route index element={<Navigate to="/government/dashboard" replace />} />
        <Route path="dashboard" element={<GovernmentDashboard />} />
        <Route path="streetlights" element={<GovernmentStreetlightsPage />} />
        <Route path="complaints" element={<GovernmentComplaintsPage />} />
        <Route path="employees" element={<GovernmentEmployeesPage />} />
        <Route path="areas" element={<GovernmentAreasPage />} />
        <Route path="map" element={<GovernmentMapPage />} />
        <Route path="cameras" element={<GovernmentCamerasPage />} />
        <Route path="analytics" element={<GovernmentAnalyticsPage />} />
        <Route path="ai" element={<GovernmentAIPage />} />
        <Route path="reports" element={<GovernmentReportsPage />} />
        <Route path="profile" element={<GovernmentProfilePage />} />
        <Route path="settings" element={<GovernmentSettingsPage />} />
      </Route>

      {/* Fallback to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
