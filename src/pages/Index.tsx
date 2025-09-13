import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import CountdownTimer from '@/components/CountdownTimer';
import { Button } from '@/components/ui/button';
import heroShirt1 from '@/assets/hero-shirt-1.png';
import heroShirt2 from '@/assets/hero-shirt-2.png';
import logoFull from '@/assets/logo-full.png';

const Index: React.FC = () => {
  const featuredProducts = [
    {
      id: 'navy-elegance',
      name: 'Navy Elegance Shirt',
      price: '৳1500',
      image: heroShirt1,
    },
    {
      id: 'midnight-classic',
      name: 'Midnight Classic Shirt',
      price: '৳1500',
      image: heroShirt2,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/bgvdo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <img
              src={logoFull}
              alt="Loomé - Timeless Elegance"
              className="h-24 md:h-32 mx-auto mb-6 opacity-90"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-light mb-6 text-balance">
            Timeless
            <br />
            <span className="font-medium text-primary">Elegance</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Discover the art of understated luxury. Premium clothing rooted in the old money aesthetic,
            where quality craftsmanship meets timeless sophistication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/shop">Discover Collection</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10">
              <Link to="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-secondary/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-medium mb-4">New Collection</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Each piece is crafted with meticulous attention to detail,
              embodying our commitment to timeless elegance and superior quality.
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
          <h2 className="text-4xl font-heading font-medium mb-6">The Loomé Philosophy</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto text-balance leading-relaxed">
            More than a fashion brand, Loomé represents a cultural statement.
            We believe in the power of understated luxury, where true elegance
            lies not in ostentation, but in the quiet confidence of impeccable craftsmanship
            and timeless design.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-accent font-medium">
            <span>• MINIMAL</span>
            <span>• CLASSIC</span>
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