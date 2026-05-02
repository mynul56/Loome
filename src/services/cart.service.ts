import { Product } from './db';

export interface CartItem {
  productId: string;
  name: string;
  team: string;
  price: number;
  image: string;
  selectedSize: string;
  quantity: number;
}

const CART_KEY = 'loome_cart_v4';

export const cartService = {
  getCart(): CartItem[] {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  },

  addToCart(product: Product, selectedSize: string, quantity: number) {
    const cart = this.getCart();
    const existingItemIndex = cart.findIndex(
      (item) => item.productId === product.id && item.selectedSize === selectedSize
    );

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        team: product.team,
        price: product.discountPrice || product.price,
        image: product.images[0],
        selectedSize,
        quantity,
      });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
  },

  removeFromCart(productId: string, selectedSize: string) {
    let cart = this.getCart();
    cart = cart.filter(
      (item) => !(item.productId === productId && item.selectedSize === selectedSize)
    );
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
  },

  updateQuantity(productId: string, selectedSize: string, quantity: number) {
    const cart = this.getCart();
    const itemIndex = cart.findIndex(
      (item) => item.productId === productId && item.selectedSize === selectedSize
    );

    if (itemIndex > -1) {
      cart[itemIndex].quantity = Math.max(1, quantity);
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      window.dispatchEvent(new Event('cart-updated'));
    }
  },

  clearCart() {
    localStorage.removeItem(CART_KEY);
    window.dispatchEvent(new Event('cart-updated'));
  },

  getCartTotal(): number {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getCartCount(): number {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }
};
