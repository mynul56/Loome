import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User as UserIcon, Menu, X, ShieldAlert } from 'lucide-react';
import { authService } from '@/services/auth.service';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const currentUser = authService.getCurrentUser();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-body selection:bg-primary selection:text-black">
      
      {/* Bold Sports Header */}
      <header className="sticky top-0 w-full z-50 bg-black text-white border-b-4 border-primary">
        <div className="w-full px-4 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="text-3xl font-heading tracking-wider uppercase flex items-center gap-2">
              <span className="text-primary">X</span>LOOMÉ
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-wider">
              <Link to="/shop" className="hover:text-primary transition-colors">Kits 26</Link>
              <Link to="/shop?category=national" className="hover:text-primary transition-colors">Nations</Link>
              <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            </nav>
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-6 font-bold text-sm uppercase">
            {currentUser ? (
              <div className="flex items-center gap-6">
                {currentUser.role === 'admin' && (
                  <Link to="/admin/dashboard" className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors">
                    <ShieldAlert className="w-4 h-4" />
                    Admin
                  </Link>
                )}
                <div className="flex items-center gap-2 text-gray-300">
                  <UserIcon className="w-4 h-4" />
                  {currentUser.name.split(' ')[0]}
                </div>
                <button onClick={handleLogout} className="hover:text-primary transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="hover:text-primary transition-colors">Login</Link>
                <Link to="/register" className="bg-primary text-black px-4 py-2 rounded font-bold hover:bg-white transition-colors">Join</Link>
              </div>
            )}
            
            <Link to="/shop" className="flex items-center gap-2 hover:text-primary transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-secondary border-b-4 border-primary shadow-2xl flex flex-col font-heading text-2xl uppercase tracking-wider">
            <Link to="/shop" className="p-6 border-b border-gray-800 hover:text-primary hover:bg-black">Kits 26</Link>
            <Link to="/about" className="p-6 border-b border-gray-800 hover:text-primary hover:bg-black">About</Link>
            
            {currentUser ? (
              <>
                {currentUser.role === 'admin' && (
                  <Link to="/admin/dashboard" className="p-6 border-b border-gray-800 text-red-500 hover:bg-black">Admin Panel</Link>
                )}
                <button onClick={handleLogout} className="p-6 text-left border-b border-gray-800 hover:text-primary hover:bg-black w-full">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="p-6 border-b border-gray-800 hover:text-primary hover:bg-black">Login</Link>
                <Link to="/register" className="p-6 text-primary hover:bg-black">Join Us</Link>
              </>
            )}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full">
        {children}
      </main>

      {/* Sporty Footer */}
      <footer className="bg-black text-white py-12 border-t-8 border-secondary">
        <div className="w-full px-4 lg:px-8 max-w-[1800px] mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-3xl font-heading mb-4"><span className="text-primary">X</span>LOOMÉ</h3>
            <p className="text-gray-400 text-sm font-medium">Premium Authentic World Cup Gear. Built for the pitch, styled for the streets.</p>
          </div>
          <div>
            <h4 className="font-heading text-xl mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400 font-bold text-sm uppercase">
              <li><Link to="/shop" className="hover:text-primary">New Arrivals</Link></li>
              <li><Link to="/shop" className="hover:text-primary">Home Kits</Link></li>
              <li><Link to="/shop" className="hover:text-primary">Away Kits</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-xl mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400 font-bold text-sm uppercase">
              <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-primary">Shipping Info</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-xl mb-4">Join The Club</h4>
            <p className="text-gray-400 text-sm font-medium mb-4">Get exclusive drops and match day offers.</p>
            <div className="flex">
              <input type="email" placeholder="YOUR EMAIL" className="bg-secondary text-white px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary font-bold uppercase text-sm" />
              <button className="bg-primary text-black font-bold px-4 py-2 hover:bg-white transition-colors">JOIN</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;