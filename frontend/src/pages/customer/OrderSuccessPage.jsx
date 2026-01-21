import { Link, useParams } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiTruck, FiArrowRight } from 'react-icons/fi';

const OrderSuccessPage = () => {
  const { orderId } = useParams();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="max-w-lg w-full text-center space-y-10">
        {/* Success Animation Placeholder */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl scale-150"></div>
          <div className="relative w-32 h-32 bg-primary rounded-full mx-auto flex items-center justify-center text-white text-6xl shadow-2xl shadow-primary/40 animate-bounce">
            <FiCheckCircle />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-dark">Order <span className="text-primary italic">Confirmed!</span></h1>
          <p className="text-gray-500 text-lg">
            Thank you for your order. We've received it and our chefs are already prepping your feast!
          </p>
        </div>

        <div className="card p-8 bg-gray-50 border-2 border-dashed border-gray-200 space-y-4">
          <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Order Reference</div>
          <div className="text-2xl font-black text-dark tracking-wider">#{orderId}</div>
          <p className="text-xs text-gray-400">A confirmation email has been sent to your inbox.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
          <Link to="/track-order" className="btn-primary py-4 flex items-center justify-center space-x-2">
            <FiTruck />
            <span>Track Order</span>
          </Link>
          <Link to="/" className="btn-outline py-4 flex items-center justify-center space-x-2">
            <FiPackage />
            <span>Order More</span>
          </Link>
        </div>

        <div className="pt-10 flex items-center justify-center space-x-2 text-gray-400 font-bold text-sm uppercase tracking-widest">
          <span>Need help?</span>
          <a href="#" className="text-primary hover:underline flex items-center space-x-1">
            <span>Support</span>
            <FiArrowRight />
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
