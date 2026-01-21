import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiClock, FiShield, FiStar, FiChevronRight, FiCheckCircle } from 'react-icons/fi';
import landingHeroImg from '../../assets/images/landing-hero.png';

const LandingPage = () => {
    const testimonials = [
        { name: 'Rahul Sharma', text: 'FoodKing has changed the way I order food. The delivery is lightning fast!', rating: 5 },
        { name: 'Priya Verma', text: 'The interface is so premium and easy to use. Highly recommended!', rating: 5 },
        { name: 'Ankit Gupta', text: 'Best deals on the best restaurants. Absolutely love it.', rating: 4 },
    ];

    return (
        <div className="flex flex-col overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center pt-10 pb-20 md:py-0">
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 animate-fade-in-left">
                        <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm tracking-wide uppercase">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span>Now Serving 500+ Restaurants</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold text-dark leading-tight">
                            Experience the Art of <span className="text-primary italic">Fine Dining</span> at Home
                        </h1>

                        <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
                            Order your favorite flavors from top-rated restaurants with a touch of elegance and lightning-fast delivery.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/menu" className="btn-primary px-10 py-4 text-lg shadow-xl shadow-primary/30 flex items-center justify-center space-x-3 group">
                                <span>Browse Menu</span>
                                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/track-order" className="bg-white text-dark border-2 border-gray-100 hover:border-primary/20 px-10 py-4 text-lg font-bold rounded-2xl flex items-center justify-center space-x-3 transition-all hover:shadow-lg">
                                <span>View Live Tracking</span>
                            </Link>
                        </div>

                        <div className="flex items-center space-x-8 pt-4 border-t border-gray-100">
                            <div className="flex flex-col">
                                <span className="text-3xl font-black text-dark">50k+</span>
                                <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Happy Users</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-black text-dark">4.9/5</span>
                                <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">Top Rated</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative animate-fade-in-right hidden lg:block">
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
                        <div className="card p-0 overflow-hidden rounded-[2.5rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                            <img
                                src={landingHeroImg}
                                alt="Premium Gourmet Burger"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Floating Element */}
                        <div className="absolute top-10 -left-12 card p-4 flex items-center space-x-4 animate-bounce-slow">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-2xl shadow-inner">
                                <FiCheckCircle />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Status</p>
                                <p className="text-sm font-black text-dark leading-none">Food is Ready!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-light py-24">
                <div className="container mx-auto px-4 text-center space-y-16">
                    <div className="max-w-2xl mx-auto space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black text-dark">Why Choose <span className="text-primary italic">FoodKing</span>?</h2>
                        <p className="text-gray-500 font-medium">We don't just deliver food; we deliver an experience crafted with care and precision.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card p-10 space-y-6 hover:-translate-y-2 transition-transform border-b-4 border-transparent hover:border-primary">
                            <div className="w-20 h-20 bg-red-100 text-primary rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-lg shadow-red-50">
                                <FiTruck />
                            </div>
                            <h3 className="text-2xl font-bold">Express Delivery</h3>
                            <p className="text-gray-500">From the kitchen to your table in under 20 minutes. Hot and fresh, every single time.</p>
                        </div>
                        <div className="card p-10 space-y-6 hover:-translate-y-2 transition-transform border-b-4 border-transparent hover:border-secondary">
                            <div className="w-20 h-20 bg-orange-100 text-secondary rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-lg shadow-orange-50">
                                <FiClock />
                            </div>
                            <h3 className="text-2xl font-bold">Always Open</h3>
                            <p className="text-gray-500">Midnight cravings or early brunch? We operate 24/7 to satisfy every hunger pang.</p>
                        </div>
                        <div className="card p-10 space-y-6 hover:-translate-y-2 transition-transform border-b-4 border-transparent hover:border-success">
                            <div className="w-20 h-20 bg-green-100 text-success rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-lg shadow-green-50">
                                <FiShield />
                            </div>
                            <h3 className="text-2xl font-bold">Elite Hygiene</h3>
                            <p className="text-gray-500">Stringent quality checks and safe handling protocols ensuring pure, healthy food.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* App Promo / Experience Section */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="bg-dark rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                            <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                                <circle cx="50" cy="50" r="40" />
                            </svg>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-8 text-white">
                                <h2 className="text-4xl md:text-6xl font-black leading-tight">
                                    Better Experience with Our <span className="text-primary italic">Mobile App</span>
                                </h2>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    Get exclusive rewards, track your order in real-time, and enjoy a seamless ordering experience with our brand-new bottom navigation mobile design.
                                </p>
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl flex items-center space-x-4 border border-white/10">
                                        <div className="text-3xl text-primary">📱</div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase text-gray-400">Available on</p>
                                            <p className="text-lg font-black italic">App Store</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl flex items-center space-x-4 border border-white/10">
                                        <div className="text-3xl text-primary">🤖</div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase text-gray-400">Available on</p>
                                            <p className="text-lg font-black italic">Google Play</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <div className="relative w-72 h-[500px] bg-gray-900 border-[10px] border-gray-800 rounded-[3rem] shadow-2xl overflow-hidden hidden md:block">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-3xl z-20"></div>
                                    <div className="p-4 space-y-4">
                                        <div className="w-full h-32 bg-gray-800 rounded-2xl animate-pulse"></div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="h-20 bg-gray-800 rounded-2xl animate-pulse"></div>
                                            <div className="h-20 bg-gray-800 rounded-2xl animate-pulse"></div>
                                        </div>
                                        <div className="w-full h-40 bg-gray-800 rounded-2xl animate-pulse"></div>
                                    </div>
                                    {/* Mock Bottom Navbar */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-white p-4 flex justify-between items-center">
                                        <div className="w-8 h-8 bg-primary/20 rounded-lg"></div>
                                        <div className="w-8 h-8 bg-gray-100 rounded-lg"></div>
                                        <div className="w-8 h-8 bg-gray-100 rounded-lg"></div>
                                        <div className="w-8 h-8 bg-gray-100 rounded-lg"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-light/50">
                <div className="container mx-auto px-4 text-center space-y-16">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-black text-dark">What Our <span className="text-primary italic">Customers</span> Say</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <div key={i} className="card p-8 text-left space-y-6">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, idx) => (
                                        <FiStar key={idx} className={idx < t.rating ? 'fill-current' : ''} />
                                    ))}
                                </div>
                                <p className="text-gray-600 font-medium italic">"{t.text}"</p>
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
                                        {t.name.charAt(0)}
                                    </div>
                                    <span className="font-bold text-dark">{t.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto space-y-10">
                        <h2 className="text-5xl md:text-7xl font-black text-dark leading-tight">
                            Ready to Start Your <span className="text-primary italic">Food Journey</span>?
                        </h2>
                        <div className="flex justify-center">
                            <Link to="/menu" className="btn-primary px-16 py-6 text-2xl shadow-2xl shadow-primary/40 group">
                                Let's Order Now
                                <FiChevronRight className="inline-block ml-2 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
