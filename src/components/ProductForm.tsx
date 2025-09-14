import React, { useState } from 'react';

const ProductForm: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('adminToken');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, price: Number(price), description, image })
      });
      if (res.ok) {
        setName(''); setPrice(''); setDescription(''); setImage('');
        window.location.reload();
      } else {
        const data = await res.json();
        setError(data.error || 'Error creating product');
      }
    } catch {
      setError('Server error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-100 rounded">
      <div className="mb-2"><input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" required /></div>
      <div className="mb-2"><input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 border rounded" required /></div>
      <div className="mb-2"><input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border rounded" /></div>
      <div className="mb-2"><input type="text" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} className="w-full p-2 border rounded" /></div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <button type="submit" className="bg-black text-white py-2 px-4 rounded">Add Product</button>
    </form>
  );
};

export default ProductForm;
