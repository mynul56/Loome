import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { productService } from '@/services/product.service';
import { Product } from '@/services/db';
import { Filter, Search } from 'lucide-react';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filters
  const [selectedTeam, setSelectedTeam] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await productService.getAllProducts(true); // only active
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    let result = products;
    if (selectedTeam !== 'All') {
      result = result.filter(p => p.team === selectedTeam);
    }
    if (searchQuery.trim() !== '') {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.team.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredProducts(result);
  }, [selectedTeam, searchQuery, products]);

  const teams = ['All', ...Array.from(new Set(products.map(p => p.team)))].sort();

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen pb-24">
        {/* Shop Header */}
        <div className="bg-black text-white pt-16 pb-12 px-6 lg:px-12 border-b-8 border-primary">
          <div className="max-w-[1800px] mx-auto">
            <h1 className="text-5xl md:text-7xl font-heading uppercase tracking-tighter mb-8">
              Kits <span className="text-primary">2026</span>
            </h1>
            
            <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
              {/* Search */}
              <div className="relative w-full md:w-96">
                <input 
                  type="text" 
                  placeholder="SEARCH KITS OR NATIONS..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-secondary text-white font-bold uppercase text-sm px-12 py-4 focus:outline-none focus:ring-2 focus:ring-primary placeholder-gray-500"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>

              {/* Stats */}
              <div className="font-heading text-2xl uppercase tracking-wider text-gray-400">
                <span className="text-white">{filteredProducts.length}</span> KITS FOUND
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 mt-12 grid lg:grid-cols-4 gap-12 items-start">
          
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-8 sticky top-32">
            <div className="bg-white p-6 sport-shadow-sm border-2 border-black">
              <h2 className="flex items-center gap-2 text-2xl font-heading uppercase border-b-2 border-gray-100 pb-4 mb-4">
                <Filter className="w-5 h-5" /> Filter by Nation
              </h2>
              <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {teams.map(team => (
                  <button
                    key={team}
                    onClick={() => setSelectedTeam(team)}
                    className={`text-left px-4 py-3 font-bold uppercase text-sm transition-all border-l-4
                      ${selectedTeam === team 
                        ? 'border-primary bg-black text-white' 
                        : 'border-transparent bg-gray-50 text-gray-600 hover:bg-gray-100 hover:border-black'}`}
                  >
                    {team}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="font-heading text-4xl uppercase animate-pulse">Loading Kits...</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="group flex flex-col bg-white border-4 border-transparent hover:border-black transition-all duration-300 sport-shadow"
                  >
                    <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                      {product.discountPrice && (
                        <div className="absolute top-4 left-4 z-10 bg-primary text-black font-heading text-xl uppercase px-4 py-1 transform -skew-x-12 shadow-md">
                          SALE
                        </div>
                      )}
                      <img
                        src={product.images[0] || 'https://via.placeholder.com/600x800/111/FFF?text=KIT'}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Size Preview on Hover */}
                      <div className="absolute bottom-0 left-0 w-full bg-black text-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-xs font-bold text-gray-400 uppercase mb-2">Available Sizes</p>
                        <div className="flex gap-2">
                          {product.sizes.map(size => (
                            <span key={size} className="w-8 h-8 flex items-center justify-center border border-gray-600 font-bold text-xs">{size}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5 flex-grow flex flex-col">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{product.team}</p>
                      <h3 className="text-xl font-heading uppercase leading-tight mb-4 group-hover:text-primary transition-colors flex-grow">
                        {product.name}
                      </h3>
                      <div className="border-t-2 border-gray-100 pt-3 flex justify-between items-end">
                        <div className="font-jersey text-2xl font-bold">
                          {product.discountPrice ? (
                            <div className="flex items-center gap-2">
                              <span className="text-red-600">৳{product.discountPrice}</span>
                              <span className="text-sm text-gray-400 line-through">৳{product.price}</span>
                            </div>
                          ) : (
                            <span>৳{product.price}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                
                {filteredProducts.length === 0 && (
                  <div className="col-span-full py-32 text-center bg-white border-4 border-dashed border-gray-200">
                    <h3 className="font-heading text-4xl text-gray-400 uppercase mb-4">No Kits Found</h3>
                    <p className="font-bold text-gray-500">Try adjusting your filters or search query.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;