import { Link } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6 animate-fade-in">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-4xl text-gray-400">
          <FiShoppingBag />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
          <p className="text-gray-500">Add some delicious food to get started!</p>
        </div>
        <Link to="/" className="btn-primary px-10">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="lg:w-2/3 space-y-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-black text-dark">Shopping <span className="text-primary">Cart</span></h1>
            <span className="text-gray-500 font-medium">{cart.length} Items</span>
          </div>

          {cart.map((item) => (
            <div key={item._id} className="card p-4 md:p-6 flex flex-col md:flex-row items-center gap-6 group">
              <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="flex-grow flex flex-col space-y-1">
                <span className="text-xs font-bold text-primary uppercase tracking-widest">{item.category}</span>
                <h3 className="text-xl font-bold text-dark">{item.name}</h3>
                <p className="text-gray-500 text-sm line-clamp-1">{item.description}</p>
              </div>

              <div className="flex items-center space-x-4 bg-gray-100 p-1 rounded-2xl">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white hover:text-primary transition-all shadow-sm"
                >
                  <FiMinus />
                </button>
                <span className="font-black w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white hover:text-primary transition-all shadow-sm"
                >
                  <FiPlus />
                </button>
              </div>

              <div className="flex flex-col items-end min-w-[100px]">
                <span className="text-xl font-black text-dark">₹{item.price * item.quantity}</span>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="mt-2 text-gray-400 hover:text-red-500 transition-colors flex items-center space-x-1 text-sm font-bold"
                >
                  <FiTrash2 />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="card p-8 sticky top-28 space-y-8 bg-gray-900 text-white">
            <h2 className="text-2xl font-bold border-b border-gray-800 pb-4">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between text-gray-400 font-medium">
                <span>Subtotal</span>
                <span className="text-white font-bold">₹{getCartTotal()}</span>
              </div>
              <div className="flex justify-between text-gray-400 font-medium">
                <span>Delivery Fee</span>
                <span className="text-success font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-gray-400 font-medium border-b border-gray-800 pb-4">
                <span>Tax (GST 5%)</span>
                <span className="text-white font-bold">₹{Math.round(getCartTotal() * 0.05)}</span>
              </div>
              <div className="flex justify-between text-2xl font-black pt-2">
                <span>Total</span>
                <span className="text-primary">₹{Math.round(getCartTotal() * 1.05)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-800 rounded-2xl p-4 flex items-center space-x-3 border border-gray-700">
                <div className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center">
                  <FiPlus />
                </div>
                <input
                  type="text"
                  placeholder="Promo Code"
                  className="bg-transparent border-none focus:ring-0 text-sm w-full font-bold"
                />
              </div>

              <Link to="/checkout" className="btn-primary w-full flex items-center justify-center space-x-3 text-lg py-4">
                <span>Proceed to Checkout</span>
                <FiArrowRight />
              </Link>
            </div>

            <p className="text-xs text-gray-500 text-center">
              By proceeding, you agree to our Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
