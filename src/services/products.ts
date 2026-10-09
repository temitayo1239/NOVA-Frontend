import { API } from "./client";
import type { Product } from "@/types";

export const productApi = {
  async getProducts(): Promise<Product[]> {
    const response = await API.get<Product[]>("/products/all");

    return response.data;
  },

  async getProduct(id: string): Promise<Product> {
    const response = await API.get<Product>(
      `/products/${id}`,
    );

    return response.data;
  },

  async createProduct(
    payload: Partial<Product>,
  ): Promise<Product> {
    const response = await API.post<Product>(
      "/products",
      payload,
    );

    return response.data;
  },

  async updateProduct(
    id: string,
    payload: Partial<Product>,
  ): Promise<Product> {
    const response = await API.patch<Product>(
      `/products/${id}`,
      payload,
    );

    return response.data;
  },

  async deleteProduct(id: string) {
    const response = await API.delete(
      `/products/${id}`,
    );

    return response.data;
  },
};