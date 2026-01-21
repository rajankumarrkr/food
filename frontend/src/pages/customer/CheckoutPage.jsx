import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiPhone, FiUser, FiCreditCard, FiArrowRight, FiCheckCircle, FiShield } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { orderAPI } from '../../services/api';

const CheckoutPage = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    paymentMethod: 'COD' // Default to COD for now as per model enum
  });
  const [location, setLocation] = useState({ lat: 26.5678, lng: 84.3779 }); // Default coords
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const subtotal = getCartTotal();
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  useEffect(() => {
    // Try to get user location for delivery radius check
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (err) => {
          console.warn('Geolocation failed, using default coordinates');
        }
      );
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);

    try {
      const orderData = {
        customerName: formData.name,
        customerPhone: formData.phone,
        deliveryAddress: formData.address,
        customerLocation: location,
        items: cart.map(item => ({
          itemId: item._id,
          quantity: item.quantity
        })),
        paymentMethod: formData.paymentMethod === 'card' ? 'Online' : 'COD'
      };

      const response = await orderAPI.create(orderData);

      if (response.data.success) {
        const orderId = response.data.data._id;
        clearCart();
        navigate(`/order-success/${orderId}`);
      }
    } catch (err) {
      console.error('Order creation failed:', err);
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="btn-primary">Return to Menu</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in text-dark">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Checkout Form */}
        <div className="lg:w-2/3 space-y-10">
          <h1 className="text-4xl font-black">Complete your <span className="text-primary">Order</span></h1>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100 italic">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-xl font-bold border-l-4 border-primary pl-4">
                <FiUser />
                <span>Personal Details</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-4 text-gray-400" />
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="input-field pl-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                  <div className="relative">
                    <FiPhone className="absolute left-4 top-4 text-gray-400" />
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="input-field pl-12"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-xl font-bold border-l-4 border-primary pl-4">
                <FiMapPin />
                <span>Delivery Address</span>
              </div>
              <div className="relative">
                <FiMapPin className="absolute left-4 top-4 text-gray-400" />
                <textarea
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Street address, apartment, suite, etc."
                  className="input-field pl-12 pt-3"
                ></textarea>
              </div>
            </div>

            {/* Payment Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 text-xl font-bold border-l-4 border-primary pl-4">
                <FiCreditCard />
                <span>Payment Method</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['card', 'COD'].map((method) => (
                  <label key={method} className="relative group cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={formData.paymentMethod === method}
                      onChange={handleInputChange}
                      className="peer sr-only"
                    />
                    <div className="card p-6 border-2 border-transparent peer-checked:border-primary peer-checked:bg-red-50 transition-all flex flex-col items-center space-y-2 group-hover:shadow-md">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${formData.paymentMethod === method ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                        {method === 'card' && <FiCreditCard />}
                        {method === 'COD' && <FiMapPin />}
                      </div>
                      <span className="font-bold uppercase text-xs tracking-widest">{method === 'COD' ? 'Cash On Delivery' : 'Online Payment'}</span>
                      {formData.paymentMethod === method && (
                        <FiCheckCircle className="absolute top-2 right-2 text-primary" />
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              disabled={isProcessing}
              className="btn-primary w-full py-5 text-xl flex items-center justify-center space-x-3 shadow-xl shadow-red-200"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-4 border-white border-t-transparent"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Place Order - ₹{total}</span>
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:w-1/3">
          <div className="card p-8 sticky top-28 bg-white border border-gray-100">
            <h2 className="text-2xl font-black mb-8 border-b pb-4">Order Summary</h2>
            <div className="space-y-6">
              <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4">
                {cart.map((item) => (
                  <div key={item._id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-sm leading-tight">{item.name}</h4>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-sm">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-bold text-dark">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Delivery Fee</span>
                  <span className="font-bold text-success uppercase text-xs">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tax (5%)</span>
                  <span className="font-bold text-dark">₹{tax}</span>
                </div>
                <div className="flex justify-between text-2xl font-black pt-4 border-t">
                  <span>Total</span>
                  <span className="text-primary">₹{total}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-2xl flex items-start space-x-4 border border-blue-100">
              <div className="text-blue-500 mt-1">
                <FiShield />
              </div>
              <p className="text-[10px] text-blue-700 leading-relaxed font-medium">
                Your payment is secure with FoodKing SSL encryption. We never store your card details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
