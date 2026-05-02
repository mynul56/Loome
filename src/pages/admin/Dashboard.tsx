import React, { useState, useEffect } from 'react';
import { orderService } from '@/services/order.service';
import { productService } from '@/services/product.service';
import { authService } from '@/services/auth.service';
import { Order, Product, User } from '@/services/db';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    activeProducts: 0,
    totalUsers: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [orders, products, users] = await Promise.all([
          orderService.getAllOrders(),
          productService.getAllProducts(true),
          authService.getAllUsers()
        ]);

        const pendingOrders = orders.filter(o => o.status === 'Pending').length;
        const totalRevenue = orders
          .filter(o => o.status === 'Delivered' || o.status === 'Confirmed')
          .reduce((sum, order) => sum + order.totalPrice, 0);
        
        setStats({
          totalOrders: orders.length,
          pendingOrders,
          totalRevenue,
          totalProducts: products.length,
          activeProducts: products.filter(p => p.isActive).length,
          totalUsers: users.length
        });
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  if (isLoading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-heading font-medium mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Orders</h3>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Pending Orders</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pendingOrders}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Confirmed Revenue</h3>
          <p className="text-3xl font-bold text-green-600">৳{stats.totalRevenue.toLocaleString()}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Products</h3>
          <p className="text-3xl font-bold">{stats.totalProducts}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Active Products</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.activeProducts}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Registered Buyers</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.totalUsers - 1 /* subtract admin */}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
