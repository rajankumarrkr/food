import { useState, useEffect } from 'react';
import { FiShoppingBag, FiClock, FiDollarSign, FiTrendingUp, FiArrowUpRight, FiCheckCircle } from 'react-icons/fi';
import { orderAPI } from '../../services/api';
import Loading from '../../components/common/Loading';

const DashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, ordersRes] = await Promise.all([
        orderAPI.getStats(),
        orderAPI.getAll({ limit: 5 })
      ]);
      setStats(statsRes.data.data);
      setRecentOrders(ordersRes.data.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // Poll every minute
    const interval = setInterval(fetchDashboardData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !stats) {
    return <Loading message="Loading dashboard data..." />;
  }

  const statCards = [
    { label: "Today's Orders", value: stats?.todayOrders || 0, icon: FiShoppingBag, color: "bg-blue-500", trend: "Today" },
    { label: "Pending Orders", value: stats?.pendingOrders || 0, icon: FiClock, color: "bg-orange-500", trend: "Active" },
    { label: "Today's Revenue", value: `₹${stats?.todayRevenue || 0}`, icon: FiDollarSign, color: "bg-green-500", trend: "Live" },
    { label: "Completed Today", value: stats?.deliveredToday || 0, icon: FiCheckCircle, color: "bg-purple-500", trend: "Success" },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-dark tracking-tight">Dashboard <span className="text-primary italic">Overview</span></h1>
          <p className="text-gray-500 mt-1">Welcome back, Admin! Here's what's happening today.</p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="btn-primary flex items-center space-x-2"
        >
          <span>Refresh Data</span>
          <FiArrowUpRight />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="card p-6 border-l-4 border-primary group hover:bg-gray-900 transition-all duration-500">
              <div className="flex justify-between items-start">
                <div className={`w-12 h-12 rounded-2xl ${stat.color} text-white flex items-center justify-center text-2xl shadow-lg`}>
                  <Icon />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg bg-gray-100 text-gray-500 group-hover:bg-primary group-hover:text-white transition-colors`}>
                  {stat.trend}
                </span>
              </div>
              <div className="mt-6 space-y-1">
                <h3 className="text-gray-400 font-bold text-xs uppercase tracking-wider group-hover:text-gray-500 transition-colors">{stat.label}</h3>
                <p className="text-3xl font-black text-dark group-hover:text-white transition-colors tracking-tight">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Table */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-black text-dark">Recent <span className="text-primary">Orders</span></h2>
          <a href="/admin/orders" className="text-primary font-bold text-sm hover:underline">View All</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Order ID</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Total</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-400 italic">No recent orders.</td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-black text-sm text-dark">#{order._id.slice(-6).toUpperCase()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                          {order.userId?.name?.charAt(0) || 'C'}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-dark">{order.userId?.name || 'Guest'}</p>
                          <p className="text-xs text-gray-400">{order.userId?.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${order.status === 'Pending' ? 'bg-orange-100 text-orange-600' :
                          order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                            'bg-blue-100 text-blue-600'
                        }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-black text-dark">₹{order.totalAmount}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-xs text-gray-400 font-bold">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
