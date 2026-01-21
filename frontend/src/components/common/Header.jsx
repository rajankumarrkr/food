import { Link, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiUser } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const { getCartCount } = useCart();
  const location = useLocation();
  const cartCount = getCartCount();

  // Don't show header on admin pages
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="glass sticky top-0 z-50 border-b border-white/20">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
              FK
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-dark tracking-tighter leading-none">
                FOOD<span className="text-primary">KING</span>
              </span>
              <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">Premium Food</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/menu"
              className={`px-6 py-2 rounded-xl font-bold transition-all ${location.pathname === '/menu' ? 'text-primary bg-red-50' : 'text-gray-600 hover:text-primary hover:bg-red-50'
                }`}
            >
              Menu
            </Link>
            <Link
              to="/track-order"
              className={`px-6 py-2 rounded-xl font-bold transition-all ${location.pathname === '/track-order' ? 'text-primary bg-red-50' : 'text-gray-600 hover:text-primary hover:bg-red-50'
                }`}
            >
              Track Order
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-2">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-3 hover:bg-gray-100 rounded-2xl transition-all group"
            >
              <FiShoppingCart className="text-2xl text-gray-700 group-hover:text-primary transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-2 right-2 bg-primary text-white text-[10px] font-black rounded-lg h-5 w-5 flex items-center justify-center shadow-lg shadow-primary/40 animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Admin Link */}
            <Link
              to="/admin"
              className="hidden md:flex items-center space-x-2 px-5 py-2.5 bg-dark text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
            >
              <FiUser className="text-xl text-primary" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
