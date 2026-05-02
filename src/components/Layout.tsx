import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User as UserIcon, Menu, X, ShieldAlert, Trash2, Plus, Minus } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { cartService, CartItem } from '@/services/cart.service';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  const currentUser = authService.getCurrentUser();

  const updateCartState = () => {
    setCartCount(cartService.getCartCount());
    setCartItems(cartService.getCart());
  };

  useEffect(() => {
    updateCartState();
    window.addEventListener('cart-updated', updateCartState);
    return () => window.removeEventListener('cart-updated', updateCartState);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsCartOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-body selection:bg-primary selection:text-black relative">
      
      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm transition-opacity"
          onClick={() => setIsCartOpen(false)}
        ></div>
      )}

      {/* Cart Drawer Panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-[450px] bg-white z-[101] shadow-2xl transition-transform duration-500 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col border-l-8 border-black`}>
        <div className="bg-black text-white p-6 flex items-center justify-between border-b-4 border-primary">
          <h2 className="text-3xl font-heading uppercase tracking-wider">Your <span className="text-primary">Kits</span></h2>
          <button onClick={() => setIsCartOpen(false)} className="hover:text-primary transition-colors">
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 custom-scrollbar space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
              <ShoppingCart className="w-16 h-16 text-gray-200" />
              <p className="font-heading text-2xl uppercase text-gray-400">Empty Pitch</p>
              <Link to="/shop" className="bg-black text-white px-6 py-2 font-bold uppercase hover:bg-primary hover:text-black transition-colors">Go To Shop</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.productId}-${item.selectedSize}`} className="flex gap-4 border-b-2 border-gray-100 pb-6 relative group">
                <div className="w-24 aspect-[3/4] bg-gray-50 border-2 border-black flex-shrink-0">
                  <img src={item.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-heading text-xl uppercase leading-tight mb-1">{item.name}</h3>
                    <p className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">{item.team} • SIZE {item.selectedSize}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border-2 border-black">
                      <button 
                        className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                        onClick={() => cartService.updateQuantity(item.productId, item.selectedSize, item.quantity - 1)}
                      ><Minus className="w-3 h-3" /></button>
                      <span className="w-10 text-center font-jersey text-xl border-x-2 border-black">{item.quantity}</span>
                      <button 
                        className="w-8 h-8 flex items-center justify-center hover:bg-primary hover:text-black transition-colors"
                        onClick={() => cartService.updateQuantity(item.productId, item.selectedSize, item.quantity + 1)}
                      ><Plus className="w-3 h-3" /></button>
                    </div>
                    <span className="font-jersey text-2xl font-bold">৳{item.price * item.quantity}</span>
                  </div>
                </div>
                <button 
                  className="absolute top-0 right-0 p-1 text-gray-300 hover:text-red-500 transition-colors"
                  onClick={() => cartService.removeFromCart(item.productId, item.selectedSize)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 bg-gray-50 border-t-4 border-black">
            <div className="flex justify-between items-end mb-6">
              <span className="font-heading text-2xl uppercase">Subtotal</span>
              <span className="font-jersey text-4xl font-bold text-black leading-none">৳{cartService.getCartTotal()}</span>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-primary text-black py-5 border-4 border-black font-heading text-2xl uppercase tracking-widest hover:bg-black hover:text-white transition-all transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000] flex items-center justify-center gap-3"
            >
              Checkout <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

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
                <Link to="/my-orders" className="hover:text-primary transition-colors">
                  My Orders
                </Link>
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
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 hover:text-primary transition-colors relative group"
            >
              <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-black">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative text-white"
            >
              <ShoppingCart className="w-7 h-7" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-black">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className="text-white hover:text-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
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
                <Link to="/my-orders" className="p-6 border-b border-gray-800 hover:text-primary hover:bg-black">My Orders</Link>
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

// Help component for ArrowRight missing in some views
const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);