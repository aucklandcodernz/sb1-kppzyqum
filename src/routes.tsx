import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { LandingPage } from '@/pages/landing';
import { LoginPage } from '@/pages/auth/login';
import { SignUpPage } from '@/pages/auth/signup';
import { ForgotPasswordPage } from '@/pages/auth/forgot-password';
import { DashboardLayout } from '@/components/layouts/dashboard';
import { DashboardHome } from '@/pages/dashboard/home';
import { TenantSettings } from '@/pages/dashboard/tenant-settings';

export function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/dashboard" />} />
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
      <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/dashboard" />} />
      <Route path="/forgot-password" element={!user ? <ForgotPasswordPage /> : <Navigate to="/dashboard" />} />

      {/* Protected routes */}
      <Route path="/dashboard" element={user ? <DashboardLayout /> : <Navigate to="/login" />}>
        <Route index element={<DashboardHome />} />
        <Route path="settings" element={<TenantSettings />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}