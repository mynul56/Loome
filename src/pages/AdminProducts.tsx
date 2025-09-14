import React, { useEffect, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
const AdminProducts: React.FC = () => {
  const [token] = useState(localStorage.getItem('adminToken'));
  if (!token) window.location.href = '/admin/login';

  return (
    <div>
      <AdminNavbar />
      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
        <ProductForm />
        <ProductList />
      </div>
    </div>
  );
};

export default AdminProducts;
