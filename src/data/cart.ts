import type { Product } from "./products";

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

export interface CartState {
  items: CartItem[];
}

export const getCartTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => {
    const price = item.product.discountPrice ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

export const getCartCount = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.quantity, 0);
