import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import logoIcon from '@/assets/logo-icon.png';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-background/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 transition-elegant hover:opacity-70">
              <img src={logoIcon} alt="Loomé" className="h-8 w-auto" />
              <span className="text-xl font-heading font-medium text-foreground">Loomé</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-elegant rounded-sm",
                    isActive(item.href)
                      ? "text-primary bg-accent/10"
                      : "text-muted-foreground hover:text-primary hover:bg-accent/5"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <Button variant="ghost" className="md:hidden" size="sm">
              <span className="sr-only">Open menu</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="bg-secondary/30 border-t border-border/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img src={logoIcon} alt="Loomé" className="h-6 w-auto" />
                <span className="text-lg font-heading font-medium">Loomé</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Timeless elegance. Understated luxury. Quality craftsmanship.
              </p>
            </div>
            
            <div>
              <h3 className="font-heading font-medium mb-4">Shop</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/shop" className="hover:text-primary transition-elegant">All Products</Link></li>
                <li><Link to="/shop?category=shirts" className="hover:text-primary transition-elegant">Shirts</Link></li>
                <li><Link to="/shop?category=new" className="hover:text-primary transition-elegant">New Arrivals</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-heading font-medium mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/contact" className="hover:text-primary transition-elegant">Contact Us</Link></li>
                <li><Link to="/faq" className="hover:text-primary transition-elegant">FAQ</Link></li>
                <li><Link to="/faq#shipping" className="hover:text-primary transition-elegant">Shipping</Link></li>
                <li><Link to="/faq#returns" className="hover:text-primary transition-elegant">Returns</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-heading font-medium mb-4">Connect</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://www.instagram.com/loome.fashion?igsh=MTI5N3cyc2VkbGZkNg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-elegant">Instagram</a></li>
                <li><a href="#" className="hover:text-primary transition-elegant">Facebook</a></li>
                <li><a href="mailto:hello@loome.com" className="hover:text-primary transition-elegant">hello@loome.com</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Loomé. All rights reserved. | Timeless. Elegant. Minimal. Eternal.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;