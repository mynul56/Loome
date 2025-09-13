import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import heroShirt1 from '@/assets/hero-shirt-1.png';
import heroShirt2 from '@/assets/hero-shirt-2.png';

const Shop: React.FC = () => {
  const [sortBy, setSortBy] = useState('featured');
  const [filterBy, setFilterBy] = useState('all');

  const products = [
      {
        id: 'navy-elegance',
        name: 'Navy Elegance Shirt',
        price: '৳1500',
        image: heroShirt1,
        category: 'shirts',
        colors: ['Navy', 'Charcoal'],
        sizes: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 'midnight-classic',
        name: 'Midnight Classic Shirt',
        price: '৳1500',
        image: heroShirt2,
        category: 'shirts',
        colors: ['Midnight Blue', 'Olive'],
        sizes: ['S', 'M', 'L', 'XL'],
      },
    // Add more products as needed
  ];

  const filteredProducts = products.filter(product => {
    if (filterBy === 'all') return true;
    return product.category === filterBy;
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12" aria-label="Shop Collection">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-heading font-medium mb-4">Shop Collection</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Discover our curated selection of timeless pieces, each crafted with uncompromising attention to detail.
          </p>
        </div>

        {/* Filters & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex gap-4">
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="shirts">Shirts</SelectItem>
                <SelectItem value="new">New Arrivals</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, idx) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className={`group block space-y-4 transition-elegant animate-fade-in-up delay-[${idx * 100}ms]`}
              aria-label={`View details for ${product.name}`}
            >
              <div className="aspect-[3/4] bg-card rounded-lg overflow-hidden elegant-shadow group-hover:shadow-lg transition-elegant">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-elegant duration-500"
                  loading="lazy"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-heading font-medium group-hover:text-accent transition-elegant">
                  {product.name}
                </h3>
                <p className="text-lg text-muted-foreground">{product.price}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {product.colors.slice(0, 3).map((color, index) => (
                      <span
                        key={index}
                        className="text-xs text-muted-foreground"
                      >
                        {color}{index < product.colors.length - 1 && index < 2 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {product.sizes.length} sizes
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-16 text-center bg-secondary/20 rounded-lg p-12">
          <h3 className="text-2xl font-heading font-medium mb-4">More Pieces Coming Soon</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Our full collection launches September 20, 2025. Be the first to discover new arrivals.
          </p>
          <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
            Notify Me
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;