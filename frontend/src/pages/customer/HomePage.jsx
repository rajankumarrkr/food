import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiClock, FiShield, FiStar } from 'react-icons/fi';
import { menuAPI } from '../../services/api';
import { useCart } from '../../context/CartContext';
import heroImg from '../../assets/images/hero.png';
import Loading from '../../components/common/Loading';

const HomePage = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        const response = await menuAPI.getAll({ available: true });
        // Take first 4 items as featured
        setFeaturedItems(response.data.data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching featured items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedItems();
  }, []);

  const categories = [
    { name: 'Burgers', icon: '🍔', color: 'bg-red-50' },
    { name: 'Pizza', icon: '🍕', color: 'bg-orange-50' },
    { name: 'Sushi', icon: '🍣', color: 'bg-yellow-50' },
    { name: 'Pasta', icon: '🍝', color: 'bg-green-50' },
    { name: 'Desserts', icon: '🍰', color: 'bg-pink-50' },
    { name: 'Drinks', icon: '🥤', color: 'bg-blue-50' },
  ];

  return (
    <div className="flex flex-col space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Hero Food"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
              Savor the Best <span className="text-primary italic">Flavors</span> at Your Doorstep
            </h1>
            <p className="text-xl text-gray-200 mb-10 leading-relaxed">
              Order from over 500+ premium restaurants with lightning-fast delivery and exclusive deals only on FoodKing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/" className="btn-primary flex items-center space-x-2 text-lg px-8">
                <span>Order Now</span>
                <FiArrowRight />
              </Link>
              <Link to="/track-order" className="btn-outline border-white text-white hover:bg-white hover:text-dark px-8">
                Track My Order
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-8 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 text-primary rounded-2xl flex items-center justify-center text-3xl">
              <FiTruck />
            </div>
            <h3 className="text-xl font-bold">Fastest Delivery</h3>
            <p className="text-gray-500">Hot and fresh food delivered to your door in under 30 minutes.</p>
          </div>
          <div className="card p-8 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-orange-100 text-secondary rounded-2xl flex items-center justify-center text-3xl">
              <FiClock />
            </div>
            <h3 className="text-xl font-bold">24/7 Service</h3>
            <p className="text-gray-500">Cravings don't have a schedule. Neither do we. Order anytime.</p>
          </div>
          <div className="card p-8 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 text-success rounded-2xl flex items-center justify-center text-3xl">
              <FiShield />
            </div>
            <h3 className="text-xl font-bold">Hygienic Handling</h3>
            <p className="text-gray-500">Top-tier safety protocols ensuring your food is handled with care.</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col space-y-10">
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Explore Categories</h2>
              <p className="text-gray-500">Pick your favorite craving from our wide variety</p>
            </div>
            <Link to="/" className="text-primary font-semibold flex items-center space-x-1 hover:underline">
              <span>View All</span>
              <FiArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className={`group cursor-pointer p-6 rounded-3xl ${cat.color} border border-transparent hover:border-primary/20 transition-all duration-300 flex flex-col items-center space-y-4`}
              >
                <span className="text-5xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="font-bold text-gray-800">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="flex flex-col space-y-10">
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Today's <span className="text-primary italic">Featured</span></h2>
              <p className="text-gray-500">The most loved dishes by our community</p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loading />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredItems.map((item) => (
                <div key={item._id} className="card group overflow-hidden border-b-4 border-transparent hover:border-primary transition-all duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-sm">
                        {item.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => addToCart(item)}
                        className="btn-primary py-3 px-6 shadow-xl shadow-primary/20"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-dark leading-tight">{item.name}</h3>
                      <span className="text-xl font-black text-primary italic">₹{item.price}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="flex text-yellow-500">
                        <FiStar className="fill-current" />
                        <FiStar className="fill-current" />
                        <FiStar className="fill-current" />
                        <FiStar className="fill-current" />
                        <FiStar className="fill-current" />
                      </div>
                      <span className="font-bold text-dark">4.9</span>
                      <span className="text-gray-400">(Featured)</span>
                    </div>
                  </div>
                </div>
              ))}

              {featuredItems.length === 0 && (
                <div className="col-span-full py-20 text-center text-gray-500 font-bold italic">
                  No featured items available at the moment.
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
