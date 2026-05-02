import { Order, delay } from './db';

const ORDERS_KEY = 'loome_orders';

export const orderService = {
  async getAllOrders(): Promise<Order[]> {
    await delay(300);
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  },

  async getOrdersByUser(userId: string): Promise<Order[]> {
    await delay(300);
    const orders: Order[] = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    return orders.filter(o => o.userId === userId);
  },

  async getOrderById(id: string): Promise<Order | null> {
    await delay(200);
    const orders: Order[] = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    return orders.find(o => o.id === id) || null;
  },

  async createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<Order> {
    await delay(500);
    const orders: Order[] = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`, // E.g., ORD-12345
      status: 'Pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    orders.push(newOrder);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    return newOrder;
  },

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    await delay(400);
    const orders: Order[] = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    const index = orders.findIndex(o => o.id === id);
    
    if (index === -1) {
      throw new Error('Order not found');
    }
    
    const updatedOrder = { 
      ...orders[index], 
      status,
      updatedAt: new Date().toISOString() 
    };
    orders[index] = updatedOrder;
    
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    return updatedOrder;
  },

  async deleteOrder(id: string): Promise<void> {
    await delay(400);
    let orders: Order[] = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    orders = orders.filter(o => o.id !== id);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }
};
