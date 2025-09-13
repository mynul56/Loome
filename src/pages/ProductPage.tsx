import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import heroShirt1 from '@/assets/hero-shirt-1.png';
import heroShirt2 from '@/assets/hero-shirt-2.png';

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Mock product data - in real app, this would come from an API
  const products: Record<string, any> = {
    'navy-elegance': {
      id: 'navy-elegance',
      name: 'Navy Elegance Shirt',
      price: 1500,
      description: 'A masterpiece of understated luxury, crafted from the finest Italian cotton with meticulous attention to detail. This classic shirt embodies our philosophy of timeless elegance.',
      images: [heroShirt1, heroShirt1, heroShirt1],
      colors: ['Navy', 'Charcoal', 'Cream'],
      sizes: ['S', 'M', 'L', 'XL'],
      details: [
        'Premium Italian cotton fabric',
        'Mother-of-pearl buttons',
        'Classic collar with reinforced placket',
        'French seams for durability',
        'Tailored fit with elegant drape'
      ],
      fabric: '100% Premium Italian Cotton',
      care: 'Dry clean or gentle machine wash',
      fit: 'Classic tailored fit'
    },
    'midnight-classic': {
      id: 'midnight-classic',
      name: 'Midnight Classic Shirt',
      price: 1500,
      description: 'An iconic piece that transcends trends, featuring impeccable tailoring and luxurious fabric. Perfect for both professional settings and elegant evenings.',
      images: [heroShirt2, heroShirt2, heroShirt2],
      colors: ['Midnight Blue', 'Olive', 'Charcoal'],
      sizes: ['S', 'M', 'L', 'XL'],
      details: [
        'Luxurious cotton-silk blend',
        'Hand-finished buttonholes',
        'Spread collar design',
        'Reinforced stress points',
        'Contemporary slim fit'
      ],
      fabric: '90% Cotton, 10% Silk',
      care: 'Dry clean recommended',
      fit: 'Contemporary slim fit'
    }
  };

  const product = products[id || ''];

  if (!product) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-heading font-medium mb-4">Product Not Found</h1>
          <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please select options",
        description: "Please select both size and color before adding to cart.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Added to Cart",
      description: `${product.name} in ${selectedColor}, size ${selectedSize} has been added to your cart.`,
    });
  };

  const handlePreOrder = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please select options",
        description: "Please select both size and color before pre-ordering.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Pre-Order Placed",
      description: "Thank you for your pre-order! You'll be notified when your item ships on September 20, 2025.",
    });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-12" aria-label="Product details">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-card rounded-lg overflow-hidden elegant-shadow">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover animate-fade-in"
                loading="lazy"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1, 4).map((image: string, index: number) => (
                <div key={index} className="aspect-square bg-card rounded-lg overflow-hidden soft-shadow cursor-pointer hover:shadow-md transition-elegant animate-fade-in-up delay-[${index * 100}ms]">
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 2}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-heading font-medium mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-heading font-light">${product.price}</span>
                <Badge variant="secondary" className="bg-accent/10 text-accent">Pre-Order</Badge>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Options */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">Color</label>
                <div className="grid grid-cols-3 gap-2">
                  {product.colors.map((color: string) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      onClick={() => setSelectedColor(color)}
                      className="justify-start"
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Size</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size: string) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Quantity</label>
                <Select value={quantity.toString()} onValueChange={(value) => setQuantity(parseInt(value))}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                onClick={handlePreOrder} 
                size="lg" 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Pre-Order Now - Ships Sept 20, 2025
              </Button>
              
              <Button 
                onClick={handleAddToCart} 
                variant="outline" 
                size="lg" 
                className="w-full border-primary text-primary hover:bg-primary/5"
              >
                Add to Cart
              </Button>
            </div>

            {/* Product Details */}
            <div className="space-y-6 pt-8 border-t border-border/50">
              <div>
                <h3 className="font-heading font-medium mb-3">Details</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {product.details.map((detail: string, index: number) => (
                    <li key={index}>• {detail}</li>
                  ))}
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Fabric</h4>
                  <p className="text-sm text-muted-foreground">{product.fabric}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Care</h4>
                  <p className="text-sm text-muted-foreground">{product.care}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Fit</h4>
                  <p className="text-sm text-muted-foreground">{product.fit}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Returns</h4>
                  <p className="text-sm text-muted-foreground">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;