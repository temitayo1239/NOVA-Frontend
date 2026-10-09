import { API } from "./client";
import type { Payment } from "@/types";

export const paymentApi = {
  async getPayments(): Promise<Payment[]> {
    const response = await API.get<Payment[]>("/payment");

    return response.data;
  },

  async createPayment(
    payload: Partial<Payment>,
  ): Promise<Payment> {
    const response = await API.post<Payment>(
      "/payment",
      payload,
    );

    return response.data;
  },
};