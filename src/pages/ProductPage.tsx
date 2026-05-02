import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, ShieldCheck, Zap } from 'lucide-react';
import { productService } from '@/services/product.service';
import { Product } from '@/services/db';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
        if (data && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
        if (data && data.images.length > 0) {
          setActiveImage(data.images[0]);
        }
      } catch (err) {
        console.error("Failed to load product", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleOrder = () => {
    if (!product) return;
    navigate('/checkout', { 
      state: { 
        productId: product.id, 
        selectedSize, 
        quantity 
      } 
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="h-[70vh] flex flex-col items-center justify-center text-black">
          <Zap className="w-12 h-12 text-primary animate-pulse mb-4" />
          <h2 className="text-4xl font-heading uppercase animate-pulse">Loading Kit...</h2>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-6xl font-heading uppercase text-black mb-6">Kit Not Found</h1>
          <Link to="/shop" className="bg-black text-white px-8 py-4 font-bold uppercase hover:bg-primary hover:text-black transition-colors">
            Return to Pitch
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen pb-20">
        
        {/* Top Breadcrumb Bar */}
        <div className="bg-black text-white px-6 lg:px-12 py-4 flex items-center justify-between border-b-4 border-primary">
          <Link to="/shop" className="inline-flex items-center text-sm font-bold uppercase hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
          </Link>
          <span className="font-heading uppercase text-gray-500 tracking-widest">{product.team}</span>
        </div>

        <div className="px-6 lg:px-12 max-w-[1600px] mx-auto mt-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 bg-white p-6 lg:p-12 sport-shadow border-4 border-black">
            
            {/* Images Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="aspect-[4/5] bg-gray-50 border-4 border-black relative overflow-hidden flex items-center justify-center">
                {product.discountPrice && (
                  <div className="absolute top-6 left-6 z-10 bg-primary text-black font-heading text-2xl uppercase px-4 py-1 transform -skew-x-12 border-2 border-black">
                    SALE
                  </div>
                )}
                <img 
                  src={activeImage || 'https://via.placeholder.com/600x800/111/FFF?text=KIT'} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                  {product.images.map((img, i) => (
                    <button 
                      key={i}
                      onClick={() => setActiveImage(img)}
                      className={`flex-shrink-0 w-24 h-32 border-4 transition-all ${activeImage === img ? 'border-primary' : 'border-gray-200 hover:border-black'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details Column */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              
              <div className="mb-8 border-b-4 border-black pb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-black text-white px-3 py-1 font-bold text-xs uppercase tracking-widest">{product.team}</span>
                  <span className="bg-gray-200 text-black px-3 py-1 font-bold text-xs uppercase tracking-widest">{product.type} KIT</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-heading uppercase leading-[0.9] mb-6 text-black">
                  {product.name}
                </h1>
                
                <div className="flex gap-4 items-end font-jersey">
                  {product.discountPrice ? (
                    <>
                      <span className="text-6xl font-bold text-red-600 leading-none">৳{product.discountPrice}</span>
                      <span className="text-3xl text-gray-400 line-through leading-none mb-1">৳{product.price}</span>
                    </>
                  ) : (
                    <span className="text-6xl font-bold text-black leading-none">৳{product.price}</span>
                  )}
                </div>
              </div>

              <div className="mb-10">
                <p className="text-lg text-gray-600 font-medium leading-relaxed">
                  {product.fullDescription || product.shortDescription}
                </p>
              </div>

              <div className="space-y-8 mb-10 bg-gray-50 p-8 border-2 border-dashed border-gray-300">
                {/* Size Selector */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-heading text-2xl uppercase">Select Size</span>
                    <button className="text-sm font-bold text-black border-b-2 border-black hover:text-primary hover:border-primary transition-colors">Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-16 h-16 flex items-center justify-center font-heading text-2xl transition-all border-4 transform hover:-translate-y-1
                          ${selectedSize === size 
                            ? 'border-primary bg-black text-white shadow-[4px_4px_0px_0px_#D4FF00]' 
                            : 'border-black bg-white text-black hover:shadow-[4px_4px_0px_0px_#000]'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <span className="font-heading text-2xl uppercase block mb-4">Quantity</span>
                  <div className="flex items-center border-4 border-black w-max bg-white">
                    <button 
                      className="w-14 h-14 flex items-center justify-center hover:bg-black hover:text-white transition-colors font-heading text-3xl"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >-</button>
                    <div className="w-16 h-14 flex items-center justify-center font-jersey text-3xl border-x-4 border-black bg-gray-50">
                      {quantity}
                    </div>
                    <button 
                      className="w-14 h-14 flex items-center justify-center hover:bg-primary hover:text-black transition-colors font-heading text-3xl"
                      onClick={() => setQuantity(quantity + 1)}
                    >+</button>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleOrder}
                disabled={!product.inStock}
                className="w-full bg-primary text-black py-6 border-4 border-black font-heading text-3xl uppercase tracking-wider hover:bg-black hover:text-white transition-all transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000] disabled:opacity-50 disabled:cursor-not-allowed mb-4 flex items-center justify-center gap-3"
              >
                {product.inStock ? 'Checkout Securely' : 'Sold Out'} <ArrowRight className="w-8 h-8" />
              </button>
              
              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t-2 border-gray-200">
                <div className="flex flex-col items-center text-center p-4 bg-gray-50">
                  <ShieldCheck className="w-8 h-8 mb-2 text-black" />
                  <span className="font-bold text-sm uppercase">100% Authentic</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-gray-50">
                  <Zap className="w-8 h-8 mb-2 text-black" />
                  <span className="font-bold text-sm uppercase">Fast Delivery</span>
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