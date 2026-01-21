import { useState } from 'react';
import { FiSearch, FiTruck, FiPackage, FiCheckCircle, FiClock, FiFileText } from 'react-icons/fi';

const TrackOrderPage = () => {
  const [orderPhone, setOrderPhone] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate search
    setTimeout(() => {
      setOrderData({
        id: 'FK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        status: 'preparing',
        items: [
          { name: 'Classic Cheeseburger', qty: 2 },
          { name: 'Crispy Fries', qty: 1 }
        ],
        total: 540,
        createdAt: new Date().toLocaleString()
      });
      setIsSearching(false);
    }, 1500);
  };

  const statusSteps = [
    { key: 'pending', label: 'Order Placed', icon: FiFileText, color: 'text-yellow-500' },
    { key: 'accepted', label: 'Accepted', icon: FiCheckCircle, color: 'text-blue-500' },
    { key: 'preparing', label: 'Preparing', icon: FiClock, color: 'text-purple-500' },
    { key: 'delivery', label: 'Out for Delivery', icon: FiTruck, color: 'text-orange-500' },
    { key: 'delivered', label: 'Delivered', icon: FiCheckCircle, color: 'text-green-500' }
  ];

  const currentStatusIdx = statusSteps.findIndex(s => s.key === orderData?.status);

  return (
    <div className="container mx-auto px-4 py-16 animate-fade-in min-h-[70vh]">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-dark">Track Your <span className="text-primary italic">Hunger!</span></h1>
          <p className="text-gray-500">Enter your phone number to get live updates on your delicious order.</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="relative flex-grow">
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              required
              type="tel"
              value={orderPhone}
              onChange={(e) => setOrderPhone(e.target.value)}
              placeholder="Enter Phone Number (e.g. 9876543210)"
              className="input-field pl-16 py-5 text-lg shadow-xl shadow-gray-100"
            />
          </div>
          <button
            disabled={isSearching}
            className="btn-primary px-10 text-lg shadow-xl shadow-red-200"
          >
            {isSearching ? 'Searching...' : 'Track'}
          </button>
        </form>

        {/* Result Area */}
        {orderData && (
          <div className="card p-8 md:p-12 space-y-12 border-t-8 border-primary animate-slide-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Order ID</span>
                <h2 className="text-xl font-black text-dark">#{orderData.id}</h2>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Placed At</span>
                <p className="font-bold text-dark">{orderData.createdAt}</p>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="relative flex justify-between items-start">
              {/* Progress Line */}
              <div className="absolute top-6 left-0 w-full h-1 bg-gray-100 -z-10">
                <div
                  className="h-full bg-primary transition-all duration-1000"
                  style={{ width: `${(currentStatusIdx / (statusSteps.length - 1)) * 100}%` }}
                ></div>
              </div>

              {statusSteps.map((step, idx) => {
                const Icon = step.icon;
                const isCompleted = idx <= currentStatusIdx;
                const isCurrent = idx === currentStatusIdx;

                return (
                  <div key={idx} className="flex flex-col items-center space-y-4 w-1/5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all duration-500 ${isCompleted ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-white text-gray-300 border-2 border-gray-100'
                      } ${isCurrent ? 'animate-pulse scale-110' : ''}`}>
                      <Icon />
                    </div>
                    <span className={`text-[10px] md:text-xs font-black uppercase tracking-wider text-center ${isCompleted ? 'text-dark' : 'text-gray-300'
                      }`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Order Details Mini */}
            <div className="bg-gray-50 rounded-3xl p-6 space-y-4">
              <h3 className="font-bold flex items-center space-x-2">
                <FiPackage className="text-primary" />
                <span>Order Summary</span>
              </h3>
              <div className="space-y-2">
                {orderData.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name} x {item.qty}</span>
                    <span className="font-bold text-dark">₹{item.price || idx * 100 + 100}</span>
                  </div>
                ))}
                <div className="pt-4 border-t flex justify-between font-black text-lg">
                  <span>Grand Total</span>
                  <span className="text-primary">₹{orderData.total}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrderPage;
