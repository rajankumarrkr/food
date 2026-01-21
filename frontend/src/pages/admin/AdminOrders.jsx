import { useState, useEffect } from 'react';
import { FiEye, FiCheck, FiX, FiPrinter, FiSearch, FiRefreshCw } from 'react-icons/fi';
import { orderAPI } from '../../services/api';
import Loading from '../../components/common/Loading';

const AdminOrders = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const params = filterStatus !== 'all' ? { status: filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1) } : {};
      const response = await orderAPI.getAll(params);
      setOrders(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // Poll for new orders every 30 seconds
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, [filterStatus]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await orderAPI.updateStatus(orderId, { status: newStatus });
      // Update local state
      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update order status.');
    }
  };

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'Pending': return 'Accepted';
      case 'Accepted': return 'Preparing';
      case 'Preparing': return 'Out for Delivery';
      case 'Out for Delivery': return 'Delivered';
      default: return null;
    }
  };

  const getStatusButtonText = (currentStatus) => {
    switch (currentStatus) {
      case 'Pending': return 'Accept Order';
      case 'Accepted': return 'Start Preparing';
      case 'Preparing': return 'Dispatch';
      case 'Out for Delivery': return 'Mark Delivered';
      default: return null;
    }
  };

  if (loading && orders.length === 0) {
    return <Loading message="Loading orders..." />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-dark tracking-tight">Order <span className="text-primary italic">Requests</span></h1>
          <p className="text-gray-500 mt-1">Manage incoming orders and update their delivery status.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm flex-wrap">
          {['all', 'Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Rejected'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterStatus === s ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-gray-400 hover:text-dark'
                }`}
            >
              {s}
            </button>
          ))}
          <button
            onClick={fetchOrders}
            className="ml-2 p-2 text-gray-400 hover:text-primary transition-colors"
            title="Refresh Orders"
          >
            <FiRefreshCw className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-xl font-bold border border-red-100 italic">
          {error}
        </div>
      )}

      {/* Orders List */}
      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <p className="text-gray-400 font-bold italic">No orders found for this category.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="card group hover:scale-[1.01] transition-all duration-300">
              <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-primary border border-gray-100 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                    <span className="font-black text-xl">#{order._id.slice(-3).toUpperCase()}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-dark">{order.userId?.name || 'Guest Customer'}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 font-medium">
                      <span>{order.userId?.phone || 'N/A'}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full hidden md:block"></span>
                      <span>{order.items.length} Items</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full hidden md:block"></span>
                      <span>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full hidden md:block"></span>
                      <span className="text-xs truncate max-w-[200px]">{order.deliveryAddress}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center md:items-end">
                  <span className="text-2xl font-black text-dark tracking-tight">₹{order.totalAmount}</span>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mt-2 ${order.status === 'Pending' ? 'bg-orange-100 text-orange-600' :
                      order.status === 'Accepted' ? 'bg-blue-100 text-blue-600' :
                        order.status === 'Preparing' ? 'bg-purple-100 text-purple-600' :
                          order.status === 'Out for Delivery' ? 'bg-yellow-100 text-yellow-600' :
                            order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                              'bg-red-100 text-red-600'
                    }`}>
                    {order.status}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-50 transition-all text-gray-400 hover:text-dark shadow-sm">
                    <FiEye />
                  </button>
                  <button className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-50 transition-all text-gray-400 hover:text-dark shadow-sm">
                    <FiPrinter />
                  </button>
                  <div className="h-10 w-[1px] bg-gray-100 mx-2"></div>

                  {order.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(order._id, 'Accepted')}
                        className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center hover:bg-green-600 hover:text-white transition-all shadow-sm"
                        title="Accept Order"
                      >
                        <FiCheck />
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(order._id, 'Rejected')}
                        className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        title="Reject Order"
                      >
                        <FiX />
                      </button>
                    </>
                  )}

                  {getNextStatus(order.status) && (
                    <button
                      onClick={() => handleUpdateStatus(order._id, getNextStatus(order.status))}
                      className="btn-primary py-3 px-6 h-12 flex items-center space-x-2 text-xs"
                    >
                      <span>{getStatusButtonText(order.status)}</span>
                      <FiCheck size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
