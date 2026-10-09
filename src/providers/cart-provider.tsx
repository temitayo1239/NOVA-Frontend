"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { Cart, Product } from "@/types";
import { cartApi } from "@/services/cart";

type CartContextType = {
  cart: Cart;
  count: number;
  subtotal: number;
  add: (product: Product, quantity?: number) => Promise<void>;
  update: (id: string, quantity: number) => Promise<void>;
  remove: (id: string) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // IMPORTANT:
  // useState must be inside CartProvider
  const [cart, setCart] = useState<Cart>([]);

  const loadCart = useCallback(async () => {
    try {
      const data = await cartApi.getCart();

      console.log("CART DATA:", data);

      // Backend /cart returns an array
      setCart(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCart([]);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const value = useMemo<CartContextType>(
    () => ({
      cart,

      count: cart.reduce(
        (sum, item) => sum + Number(item.quantity),
        0
      ),

      subtotal: cart.reduce(
        (sum, item) =>
          sum +
          Number(item.product?.price ?? 0) *
            Number(item.quantity ?? 0),
        0
      ),

      add: async (product: Product, quantity = 1) => {
  try {
    await cartApi.addToCart(product.id, quantity);

    await loadCart();
  } catch (error: any) {
    console.error(
      "ADD TO CART ERROR:",
      error?.response?.data || error
    );

    throw error;
  }
},

      update: async (id: string, quantity: number) => {
        try {
          if (quantity <= 0) {
            await cartApi.removeFromCart(id);
          } else {
            await cartApi.updateCartItem(id, quantity);
          }

          await loadCart();
        } catch (error) {
          console.error("Update cart failed:", error);
          throw error;
        }
      },

      remove: async (id: string) => {
        try {
          await cartApi.removeFromCart(id);

          await loadCart();
        } catch (error) {
          console.error("Remove cart item failed:", error);
          throw error;
        }
      },
    }),
    [cart, loadCart]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}