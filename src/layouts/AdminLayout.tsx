import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth.service';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100 text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col">
        <h2 className="text-2xl font-heading font-medium mb-8">Admin Panel</h2>
        <nav className="flex-1 space-y-2">
          <Link to="/admin/dashboard" className="block p-3 rounded hover:bg-gray-50 font-medium">Dashboard</Link>
          <Link to="/admin/products" className="block p-3 rounded hover:bg-gray-50 font-medium">Products</Link>
          <Link to="/admin/orders" className="block p-3 rounded hover:bg-gray-50 font-medium">Orders</Link>
          <Link to="/admin/users" className="block p-3 rounded hover:bg-gray-50 font-medium">Users</Link>
          <Link to="/admin/cms" className="block p-3 rounded hover:bg-gray-50 font-medium">CMS / Content</Link>
        </nav>
        <button onClick={handleLogout} className="mt-auto p-3 text-red-600 font-medium text-left hover:bg-red-50 rounded">
          Logout
        </button>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
