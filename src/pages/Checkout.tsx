import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { productService } from '@/services/product.service';
import { orderService } from '@/services/order.service';
import { authService } from '@/services/auth.service';
import { Product } from '@/services/db';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import FootballLoader from '@/components/FootballLoader';

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const state = location.state as { productId: string, selectedSize: string, quantity: number } | null;
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    deliveryAddress: '',
    additionalNote: '',
    preferredContact: 'Phone' as 'Phone' | 'Email'
  });

  useEffect(() => {
    if (!state?.productId) {
      navigate('/shop');
      return;
    }

    const loadData = async () => {
      try {
        const prod = await productService.getProductById(state.productId);
        if (!prod) {
          navigate('/shop');
          return;
        }
        setProduct(prod);

        const user = authService.getCurrentUser();
        if (user) {
          setFormData(prev => ({
            ...prev,
            customerName: user.name,
            email: user.email
          }));
        }
      } catch (err) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to load checkout details' });
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [state, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !state) return;
    setIsSubmitting(true);

    try {
      const user = authService.getCurrentUser();
      const unitPrice = product.discountPrice || product.price;
      const totalPrice = unitPrice * state.quantity;

      await orderService.createOrder({
        userId: user?.id,
        customerName: formData.customerName,
        phone: formData.phone,
        email: formData.email,
        deliveryAddress: formData.deliveryAddress,
        productId: product.id,
        productName: product.name,
        selectedSize: state.selectedSize,
        quantity: state.quantity,
        totalPrice,
        additionalNote: formData.additionalNote,
        preferredContact: formData.preferredContact
      });

      toast({
        title: 'ORDER SECURED!',
        description: 'Your kit is reserved. We will contact you shortly.',
      });
      navigate('/');
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Error', description: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !product || !state) {
    return <Layout><FootballLoader text="Loading Checkout..." /></Layout>;
  }

  const unitPrice = product.discountPrice || product.price;
  const totalPrice = unitPrice * state.quantity;

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen pb-20">
        <div className="bg-black text-white px-6 lg:px-12 py-4 flex items-center border-b-4 border-primary">
          <Link to={`/product/${product.id}`} className="inline-flex items-center text-sm font-bold uppercase hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Kit
          </Link>
        </div>

        <div className="px-6 lg:px-12 max-w-[1400px] mx-auto mt-12">
          <h1 className="text-5xl lg:text-7xl font-heading uppercase mb-10 text-black tracking-tighter">
            Secure Your <span className="text-primary bg-black px-4 ml-2">Kit</span>
          </h1>
          
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Form */}
            <div className="lg:col-span-8 bg-white p-8 lg:p-12 sport-shadow border-4 border-black">
              <h2 className="text-3xl font-heading uppercase mb-8 border-b-4 border-primary pb-4">Delivery Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Full Name *</label>
                    <input required value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} type="text" className="w-full p-4 bg-gray-50 border-2 border-gray-200 focus:border-primary focus:bg-white focus:outline-none font-bold transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Phone Number *</label>
                    <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} type="tel" className="w-full p-4 bg-gray-50 border-2 border-gray-200 focus:border-primary focus:bg-white focus:outline-none font-bold transition-colors" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Email Address (Optional)</label>
                  <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" className="w-full p-4 bg-gray-50 border-2 border-gray-200 focus:border-primary focus:bg-white focus:outline-none font-bold transition-colors" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Complete Delivery Address *</label>
                  <textarea required value={formData.deliveryAddress} onChange={e => setFormData({...formData, deliveryAddress: e.target.value})} className="w-full p-4 bg-gray-50 border-2 border-gray-200 focus:border-primary focus:bg-white focus:outline-none font-bold transition-colors min-h-[120px]" placeholder="House, Street, Area, City" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Preferred Contact</label>
                    <div className="flex gap-4">
                      <label className={`flex-1 flex items-center justify-center gap-2 p-4 border-2 cursor-pointer font-bold uppercase transition-colors ${formData.preferredContact === 'Phone' ? 'border-primary bg-primary text-black' : 'border-gray-200 bg-gray-50 hover:border-black'}`}>
                        <input type="radio" className="hidden" checked={formData.preferredContact === 'Phone'} onChange={() => setFormData({...formData, preferredContact: 'Phone'})} name="contact" /> Phone Call
                      </label>
                      <label className={`flex-1 flex items-center justify-center gap-2 p-4 border-2 cursor-pointer font-bold uppercase transition-colors ${formData.preferredContact === 'Email' ? 'border-primary bg-primary text-black' : 'border-gray-200 bg-gray-50 hover:border-black'}`}>
                        <input type="radio" className="hidden" checked={formData.preferredContact === 'Email'} onChange={() => setFormData({...formData, preferredContact: 'Email'})} name="contact" /> Email
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Additional Notes</label>
                  <textarea value={formData.additionalNote} onChange={e => setFormData({...formData, additionalNote: e.target.value})} className="w-full p-4 bg-gray-50 border-2 border-gray-200 focus:border-primary focus:bg-white focus:outline-none font-bold transition-colors min-h-[80px]" placeholder="Special delivery instructions..." />
                </div>

                <div className="pt-8 border-t-4 border-gray-100">
                  <button type="submit" disabled={isSubmitting} className="w-full bg-black text-white py-6 border-4 border-black font-heading text-3xl uppercase tracking-wider hover:bg-primary hover:text-black transition-all transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000] disabled:opacity-50 flex justify-center items-center gap-3">
                    {isSubmitting ? 'Processing...' : 'Confirm Offline Order'} <CheckCircle2 className="w-8 h-8" />
                  </button>
                  <p className="text-center text-xs font-bold text-gray-400 mt-4 uppercase tracking-widest">Payment is collected upon delivery confirmation.</p>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 bg-black text-white p-8 border-4 border-primary sticky top-32 sport-shadow transform md:rotate-1 z-10">
              <h2 className="text-3xl font-heading uppercase mb-8 border-b-2 border-gray-800 pb-4">Match Summary</h2>
              
              <div className="flex gap-4 mb-6">
                <div className="w-24 aspect-[3/4] bg-white overflow-hidden border-2 border-white flex-shrink-0">
                  <img src={product.images[0] || 'https://via.placeholder.com/100'} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-heading text-2xl uppercase leading-tight mb-2 text-primary">{product.name}</h3>
                  <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-widest mb-2">
                    <span className="bg-white text-black px-2 py-1">SIZE {state.selectedSize}</span>
                    <span className="bg-gray-800 text-white px-2 py-1">QTY {state.quantity}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8 font-jersey text-xl border-t-2 border-gray-800 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">SUBTOTAL</span>
                  <span>৳{totalPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">DELIVERY</span>
                  <span className="text-primary text-sm font-sans font-bold uppercase">TBD</span>
                </div>
              </div>

              <div className="flex justify-between items-end border-t-4 border-primary pt-6">
                <span className="font-heading text-3xl uppercase">Total</span>
                <div className="text-right">
                  <span className="font-jersey text-5xl font-bold block text-primary leading-none">৳{totalPrice}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
