import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CountdownTimer from '@/components/CountdownTimer';
import heroShirt1 from '@/assets/hero-shirt-1.png';
import heroShirt2 from '@/assets/hero-shirt-2.png';

const Index: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const featuredProducts = [
    {
      id: 'argentina-2026',
      name: 'Argentina 2026 Home Jersey',
      price: '৳2500',
      image: heroShirt1, // Placeholder
    },
    {
      id: 'brazil-2026',
      name: 'Brazil 2026 Away Jersey',
      price: '৳2500',
      image: heroShirt2, // Placeholder
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative h-screen w-full flex flex-col justify-center overflow-hidden bg-black text-white cursor-none"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        
        {/* Custom Cursor */}
        <div 
          className={`fixed top-0 left-0 pointer-events-none z-[999] transition-opacity duration-300 flex items-center justify-center w-24 h-24 rounded-full border border-[#10b981] bg-black/20 backdrop-blur-md text-[#10b981] shadow-lg ${isHovering ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            transform: `translate3d(${mousePosition.x - 48}px, ${mousePosition.y - 48}px, 0)`,
            willChange: 'transform'
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>

        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src="/bgvdo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Main Massive Typography */}
        <div className="relative z-10 px-6 lg:px-12 w-full max-w-[1800px] mx-auto mt-12">
          <h1 className="text-[12vw] sm:text-[10vw] lg:text-[8.5vw] leading-[0.9] font-heading font-light tracking-tight mix-blend-overlay">
            We craft jerseys and <br className="hidden md:block"/>
            football legacies <span className="inline-block align-middle h-[3px] w-12 md:w-24 bg-white/50 mx-2 lg:mx-6"></span> made today, worn <br className="hidden md:block"/>
            for 2026
          </h1>
        </div>

        {/* Bottom Left Text */}
        <div className="absolute bottom-12 lg:bottom-16 left-6 lg:left-12 z-20 pointer-events-none">
          <p className="text-[11px] lg:text-[13px] tracking-[0.1em] text-white/50 font-medium uppercase">
            Full-service digital powerhouse
          </p>
        </div>

        {/* Bottom Right Card */}
        <div className="absolute bottom-12 lg:bottom-16 right-6 lg:right-12 z-20 hidden md:block cursor-auto">
          <div className="bg-[#EAE4D9] text-black rounded-xl p-8 lg:p-10 max-w-[480px] flex gap-8 items-start shadow-2xl hover:scale-[1.02] transition-transform duration-300">
            <h3 className="font-heading text-3xl leading-tight w-1/2">
              Official 2026 Gear
            </h3>
            <div className="w-1/2 flex flex-col justify-between min-h-[120px]">
              <p className="text-sm font-medium leading-relaxed">
                <span className="mr-3 opacity-50 text-xs">01</span>
                Premium quality authentic jerseys crafted for the ultimate World Cup experience.
              </p>
              <button className="w-8 h-8 mt-6 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/20 z-20 flex">
          {/* Active Progress */}
          <div className="h-full bg-white w-1/4"></div>
          
          {/* Segment Dividers */}
          <div className="absolute top-0 bottom-0 left-[25%] w-[1px] bg-black/40"></div>
          <div className="absolute top-0 bottom-0 left-[50%] w-[1px] bg-black/40"></div>
          <div className="absolute top-0 bottom-0 left-[75%] w-[1px] bg-black/40"></div>
        </div>

      </section>

      {/* Featured Products */}
      <section className="py-20 bg-secondary/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-medium mb-4">World Cup Collection</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Official premium jerseys crafted for the 2026 tournament.
              Show your colors and wear your pride with unparalleled quality.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {featuredProducts.map((product, idx) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className={`group block space-y-4 transition-elegant animate-fade-in-up delay-[${idx * 100}ms]`}
              >
                <div className="aspect-[3/4] bg-card rounded-lg overflow-hidden elegant-shadow group-hover:shadow-lg transition-elegant group-hover:scale-105 duration-500">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-heading font-medium group-hover:text-accent transition-elegant">
                    {product.name}
                  </h3>
                  <p className="text-lg text-muted-foreground">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-20 bg-background">
        <div className="max-w-2xl mx-auto px-4">
          <CountdownTimer />
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-accent/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-medium mb-6">The Loomé FIFA Experience</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto text-balance leading-relaxed">
            More than just jerseys, we represent the global passion for football.
            As we approach 2026, we're dedicated to bringing you the highest quality,
            authentic gear to support your nation in style.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-accent font-medium">
            <span>• AUTHENTIC</span>
            <span>• PREMIUM</span>
            <span>• ETERNAL</span>
          </div>
          <div className="mt-8">
            <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Index;