import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminMenu from './AdminMenu';
import AdminOrders from './AdminOrders';
import DashboardHome from './DashboardHome';
import Loading from '../../components/common/Loading';

const AdminDashboard = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        <div className="p-6">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/menu" element={<AdminMenu />} />
            <Route path="/orders" element={<AdminOrders />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
