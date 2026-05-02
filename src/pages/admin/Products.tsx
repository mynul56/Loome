import React, { useState, useEffect } from 'react';
import { Product } from '@/services/db';
import { productService } from '@/services/product.service';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    team: '',
    type: 'Home',
    price: 0,
    discountPrice: 0,
    images: [''],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    shortDescription: '',
    fullDescription: '',
    isFeatured: false,
    isActive: true,
  });

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const data = await productService.getAllProducts(true);
      setProducts(data);
    } catch (err) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to load products' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleOpenForm = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setFormData(product);
    } else {
      setEditingId(null);
      setFormData({
        name: '', team: '', type: 'Home', price: 0, discountPrice: 0,
        images: [''], sizes: ['S', 'M', 'L', 'XL'], inStock: true,
        shortDescription: '', fullDescription: '', isFeatured: false, isActive: true,
      });
    }
    setIsFormOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await productService.updateProduct(editingId, formData);
        toast({ title: 'Success', description: 'Product updated' });
      } else {
        await productService.createProduct(formData as Omit<Product, 'id'|'createdAt'>);
        toast({ title: 'Success', description: 'Product created' });
      }
      setIsFormOpen(false);
      loadProducts();
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Error', description: err.message });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(id);
        toast({ title: 'Success', description: 'Product deleted' });
        loadProducts();
      } catch (err: any) {
        toast({ variant: 'destructive', title: 'Error', description: err.message });
      }
    }
  };

  if (isLoading) return <div className="p-8">Loading products...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-heading font-medium">Product Management</h1>
        <Button onClick={() => handleOpenForm()} className="bg-black text-white hover:bg-black/90">
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl my-8">
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Product Name</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Team/Country</label>
                  <input type="text" required value={formData.team} onChange={e => setFormData({...formData, team: e.target.value})} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Type (Home/Away)</label>
                  <input type="text" required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price (৳)</label>
                  <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full p-2 border rounded" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input type="text" required value={formData.images?.[0] || ''} onChange={e => setFormData({...formData, images: [e.target.value]})} className="w-full p-2 border rounded" placeholder="https://..." />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Short Description</label>
                  <input type="text" required value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} className="w-full p-2 border rounded" />
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} />
                  Active/Visible
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.inStock} onChange={e => setFormData({...formData, inStock: e.target.checked})} />
                  In Stock
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} />
                  Featured
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-black text-white">Save Product</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Team</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                    {product.images[0] ? <img src={product.images[0]} alt="" className="w-full h-full object-cover" /> : <ImageIcon className="w-5 h-5 text-gray-400" />}
                  </div>
                  <span className="font-medium">{product.name}</span>
                </td>
                <td className="p-4">{product.team}</td>
                <td className="p-4">৳{product.price}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${product.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {product.isActive ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenForm(product)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">No products found. Add one to get started.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
