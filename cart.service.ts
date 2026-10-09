import api from "./api";


export const cartApi = {
  async getCart() {
    const response = await api.get("/cart");
    console.log("Cart response:", response.data);
    return response.data;
  },
  async getCartItemById(id: string) {
    return (await api.get(`/cart/items/${id}`)).data;
  },
};