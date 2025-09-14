import React, { useEffect, useState } from 'react';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this product?')) return;
    const res = await fetch(`/api/admin/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) window.location.reload();
  };

  return (
    <table className="w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th className="p-2">Name</th>
          <th className="p-2">Price</th>
          <th className="p-2">Description</th>
          <th className="p-2">Image</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product._id}>
            <td className="p-2">{product.name}</td>
            <td className="p-2">${product.price}</td>
            <td className="p-2">{product.description}</td>
            <td className="p-2"><img src={product.image} alt="" className="h-10" /></td>
            <td className="p-2">
              <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(product._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
