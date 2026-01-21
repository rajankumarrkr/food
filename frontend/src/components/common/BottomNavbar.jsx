import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiGrid, FiUser, FiPackage } from 'react-icons/fi';

const BottomNavbar = () => {
    const location = useLocation();

    const navItems = [
        { label: 'Home', icon: <FiHome />, path: '/' },
        { label: 'Menu', icon: <FiGrid />, path: '/menu' }, // Items links to menu
        { label: 'Profile', icon: <FiUser />, path: '/admin/login' },
        { label: 'Track', icon: <FiPackage />, path: '/track-order' },
    ];

    // Don't show bottom navbar on admin pages
    if (location.pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
            <div className="bg-white/80 backdrop-blur-lg border-t border-white/20 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] px-6 py-2">
                <div className="flex items-center justify-between">
                    {navItems.map((item, index) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={index}
                                to={item.path}
                                className="flex flex-col items-center space-y-1 group"
                            >
                                <div
                                    className={`text-2xl transition-all duration-300 ${isActive
                                        ? 'text-primary scale-110'
                                        : 'text-gray-400 group-hover:text-primary'
                                        }`}
                                >
                                    {item.icon}
                                </div>
                                <span
                                    className={`text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-primary'
                                        }`}
                                >
                                    {item.label}
                                </span>
                                {isActive && (
                                    <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
            {/* Safe Area Spacer for modern mobile browsers */}
            <div className="bg-white/80 backdrop-blur-lg h-safe-area"></div>
        </div>
    );
};

export default BottomNavbar;
