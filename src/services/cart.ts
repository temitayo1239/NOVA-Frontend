import { API } from "./client";
import type { Cart, CartItem } from "@/types";

export type CartStatus =
  | "pending"
  | "completed"
  | "cancelled";

export const cartApi = {
  async getCart(
    status?: CartStatus,
  ): Promise<Cart> {
    const response = await API.get<Cart>("/cart", {
      params: status ? { status } : undefined,
    });

    return response.data;
  },

  async getCartItemById(
    id: string,
  ): Promise<CartItem> {
    const response =
      await API.get<CartItem>(`/cart/${id}`);

    return response.data;
  },

  async addToCart(
    productId: string,
    quantity = 1,
  ): Promise<CartItem> {
    const response =
      await API.post<CartItem>("/cart", {
        productId,
        quantity,
      });

    return response.data;
  },

  async updateCartItem(
    id: string,
    quantity: number,
  ): Promise<CartItem> {
    const response =
      await API.patch<CartItem>(
        `/cart/${id}`,
        { quantity },
      );

    return response.data;
  },

  async removeFromCart(id: string) {
    const response =
      await API.delete(`/cart/${id}`);

    return response.data;
  },
};