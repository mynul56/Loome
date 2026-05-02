import { Product, delay } from './db';

const PRODUCTS_KEY = 'loome_products';

export const productService = {
  async getAllProducts(includeInactive = false): Promise<Product[]> {
    await delay(300);
    const products: Product[] = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    return includeInactive ? products : products.filter(p => p.isActive);
  },

  async getProductById(id: string): Promise<Product | null> {
    await delay(200);
    const products: Product[] = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    return products.find(p => p.id === id) || null;
  },

  async createProduct(productData: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    await delay(400);
    const products: Product[] = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    products.push(newProduct);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    return newProduct;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    await delay(400);
    const products: Product[] = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      throw new Error('Product not found');
    }
    
    const updatedProduct = { ...products[index], ...updates };
    products[index] = updatedProduct;
    
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    return updatedProduct;
  },

  async deleteProduct(id: string): Promise<void> {
    await delay(400);
    let products: Product[] = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    products = products.filter(p => p.id !== id);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }
};
