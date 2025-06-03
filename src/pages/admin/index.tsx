import { Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Dashboard from './components/Dashboard';
import UserList from './components/UserList';
import PaymentsDashboard from './components/PaymentsDashboard';
import StripeConnect from './components/StripeConnect';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<UserList />} />
        <Route path="payments" element={<PaymentsDashboard />} />
        <Route path="settings" element={<div>Settings</div>} />
        <Route path="connect-stripe" element={<StripeConnect />} />
      </Route>
    </Routes>
  );
}