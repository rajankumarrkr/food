import { FiPhone, FiMapPin, FiClock, FiArrowRight } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-auto pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* About */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl">
                FK
              </div>
              <span className="text-2xl font-black tracking-tighter">
                FOOD<span className="text-primary font-black">KING</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Bringing the finest flavors of the world to your doorstep. Quality ingredients, expert chefs, and lightning-fast delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-widest text-sm">Quick Explore</h3>
            <ul className="space-y-4">
              <li>
                <a href="/" className="text-gray-400 hover:text-primary transition-all flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all"></span>
                  Trending Menu
                </a>
              </li>
              <li>
                <a href="/track-order" className="text-gray-400 hover:text-primary transition-all flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all"></span>
                  Track My Order
                </a>
              </li>
              <li>
                <a href="/cart" className="text-gray-400 hover:text-primary transition-all flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all"></span>
                  View My Cart
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-widest text-sm">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <FiMapPin className="text-gray-400 group-hover:text-white" />
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors">123 Foodie Street, Gourmet City, GC 12345</span>
              </div>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <FiPhone className="text-gray-400 group-hover:text-white" />
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <FiClock className="text-gray-400 group-hover:text-white" />
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors">10:00 AM - 11:00 PM</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-widest text-sm">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to get latest updates and offers.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-gray-800 border-none rounded-l-xl px-4 py-3 w-full focus:ring-1 focus:ring-primary text-sm"
              />
              <button className="bg-primary px-4 rounded-r-xl hover:bg-red-600 transition-colors">
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
          <p>&copy; 2026 FoodKing. All rights reserved by Team FK.</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/admin" className="text-primary font-bold hover:underline italic">Admin Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
