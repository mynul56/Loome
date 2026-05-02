import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import logoIcon from '@/assets/logo-icon.png';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Top Header - Minimal */}
      <header className="absolute top-0 w-full z-40 px-4 sm:px-6 lg:px-8 py-6 pointer-events-none">
        <Link to="/" className="inline-flex items-center space-x-2 transition-elegant hover:opacity-70 pointer-events-auto mix-blend-difference text-white">
          <img src={logoIcon} alt="Loomé" className="h-8 w-auto brightness-0 invert" />
          <span className="text-xl font-heading font-medium tracking-tight">Loomé®</span>
        </Link>
      </header>

      <main className="flex-1">{children}</main>

      {/* Floating Bottom Navigation Widget */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]" ref={menuRef}>
        
        {/* Glassmorphic Wrapper for the buttons */}
        <div className="flex items-center gap-2 p-2 rounded-[2rem] bg-black/20 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
          
          {/* Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-12 h-12 md:w-14 md:h-14 bg-[#111111]/80 hover:bg-[#222]/90 text-white rounded-[1.25rem] flex items-center justify-center transition-all duration-300 border border-white/5 backdrop-blur-md"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <div className="flex flex-col gap-[5px] w-5">
                <span className="h-[2px] w-full bg-white rounded-full transition-all"></span>
                <span className="h-[2px] w-[70%] bg-white rounded-full transition-all"></span>
                <span className="h-[2px] w-full bg-white rounded-full transition-all"></span>
              </div>
            )}
          </button>

          {/* Action Button */}
          <Link 
            to="/shop" 
            className="h-12 md:h-14 bg-white/95 text-black px-6 md:px-8 rounded-[1.25rem] flex items-center justify-center font-medium shadow-lg hover:bg-white transition-colors min-w-[200px] backdrop-blur-md"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="flex items-center space-x-2 whitespace-nowrap text-sm md:text-base">
              <span>Explore the collection</span>
              <ArrowUpRight className="w-4 h-4 ml-1 opacity-70" />
            </span>
          </Link>
        </div>

        {/* Mega Menu Popup Panel - Pure Glassmorphism */}
        <div
          className={cn(
            "absolute bottom-[calc(100%+24px)] left-1/2 -translate-x-1/2 w-[95vw] max-w-[1200px] bg-black/30 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isMenuOpen 
              ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
              : "opacity-0 scale-95 translate-y-12 pointer-events-none"
          )}
        >
          <div className="p-8 lg:p-12 flex flex-col lg:flex-row gap-12 max-h-[80vh] overflow-y-auto custom-scrollbar">
            
            {/* Left Navigation */}
            <div className="flex-none lg:w-[280px] flex flex-col justify-between">
              <div className="flex items-center space-x-2 mb-12 opacity-80 text-white mix-blend-overlay">
                <img src={logoIcon} alt="Loomé" className="h-6 w-auto brightness-0 invert" />
                <span className="text-lg font-heading font-medium">Loomé®</span>
              </div>

              <div className="flex flex-col space-y-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="group flex items-center relative w-fit"
                  >
                    <div className={cn(
                      "absolute -left-6 w-1.5 h-1.5 rounded-full bg-white transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.8)]",
                      isActive(item.href) ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-50 group-hover:scale-100"
                    )} />
                    <span className={cn(
                      "text-3xl lg:text-4xl font-heading transition-colors duration-300 drop-shadow-sm",
                      isActive(item.href) ? "text-white" : "text-white/60 group-hover:text-white"
                    )}>
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-16 flex flex-col space-y-2">
                {['Linkedin', 'Instagram', 'Facebook'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-white/50 hover:text-white transition-colors text-sm tracking-wide mix-blend-overlay drop-shadow-sm"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Grid */}
            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
              
              <Link to="/shop?category=new" className="group relative rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 aspect-[4/3] sm:aspect-square lg:aspect-auto min-h-[240px] backdrop-blur-md shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/80 z-10 transition-opacity group-hover:opacity-70" />
                <img 
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
                  alt="New Arrivals" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 z-20 p-6 lg:p-8 flex flex-col justify-between">
                  <span className="text-white/80 text-sm font-medium tracking-wide drop-shadow-md">12 products</span>
                  <div>
                    <h3 className="text-white text-2xl font-heading leading-tight max-w-[160px] drop-shadow-md">New arrivals collection</h3>
                    <div className="mt-4 w-10 h-10 rounded-full border border-white/40 flex items-center justify-center bg-white/20 backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all shadow-lg">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>

              <Link to="/shop?category=mens" className="group relative rounded-[2rem] overflow-hidden bg-white/10 hover:bg-white/15 transition-colors p-6 lg:p-8 flex flex-col justify-between aspect-[4/3] sm:aspect-square lg:aspect-auto min-h-[240px] backdrop-blur-md shadow-lg border border-white/20">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-0 pointer-events-none"></div>
                <span className="relative z-10 text-white/80 text-sm font-medium tracking-wide drop-shadow-md">45 products</span>
                <h3 className="relative z-10 text-white text-2xl font-heading pr-4 drop-shadow-md">Men's wear & tailoring</h3>
              </Link>

              <Link to="/shop?category=womens" className="group relative rounded-[2rem] overflow-hidden bg-black/20 hover:bg-black/30 transition-colors p-6 lg:p-8 flex flex-col justify-between aspect-[4/3] sm:aspect-square lg:aspect-auto min-h-[240px] border border-white/10 backdrop-blur-md shadow-lg">
                <span className="text-white/60 text-sm font-medium tracking-wide drop-shadow-md">32 products</span>
                <h3 className="text-white text-2xl font-heading pr-4 drop-shadow-md">Women's elegant pieces</h3>
              </Link>

              <Link to="/shop?category=accessories" className="group relative rounded-[2rem] overflow-hidden bg-black/20 hover:bg-black/30 transition-colors p-6 lg:p-8 flex flex-col justify-between aspect-[4/3] sm:aspect-square lg:aspect-auto min-h-[240px] border border-white/10 backdrop-blur-md shadow-lg">
                <span className="text-white/60 text-sm font-medium tracking-wide drop-shadow-md">18 products</span>
                <h3 className="text-white text-2xl font-heading pr-4 drop-shadow-md">Premium accessories</h3>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;