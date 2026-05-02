import React, { useState, useEffect } from 'react';
import { Order } from '@/services/db';
import { orderService } from '@/services/order.service';
import { useToast } from '@/components/ui/use-toast';

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadOrders = async () => {
    setIsLoading(true);
    try {
      const data = await orderService.getAllOrders();
      // Sort by newest first
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setOrders(data);
    } catch (err) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to load orders' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (id: string, newStatus: Order['status']) => {
    try {
      await orderService.updateOrderStatus(id, newStatus);
      toast({ title: 'Status Updated', description: `Order ${id} is now ${newStatus}` });
      loadOrders();
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Error', description: err.message });
    }
  };

  if (isLoading) return <div className="p-8">Loading orders...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-heading font-medium">Order Management</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Items</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b hover:bg-gray-50 align-top">
                  <td className="p-4 font-medium">{order.id}</td>
                  <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <div>{order.customerName}</div>
                    <div className="text-xs text-gray-500">{order.phone}</div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="border-b border-gray-100 last:border-0 pb-1 last:pb-0">
                          <div className="font-medium text-xs">{item.productName}</div>
                          <div className="text-[10px] text-gray-500 uppercase tracking-tighter">
                            Size: {item.selectedSize} | Qty: {item.quantity} | ৳{item.price * item.quantity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 font-medium font-jersey text-lg">৳{order.totalPrice}</td>
                  <td className="p-4">
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                      className={`p-1 text-xs rounded border font-medium outline-none
                        ${order.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                        ${order.status === 'Confirmed' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                        ${order.status === 'Processing' ? 'bg-purple-50 text-purple-700 border-purple-200' : ''}
                        ${order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                        ${order.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                      `}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
