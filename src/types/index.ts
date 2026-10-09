import { ReactNode } from "react";

export type Product = {
  name: ReactNode;
  id: string;
  productName: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: string[];
  stock: number;
  imageUrl: string;
  images?: string[];
  featured?: boolean;
  createdAt: string;
};

export type User = {
  id: string;
  email: string;
  username: string;
  fullName: string;
  suspended: boolean;
  role?: "customer" | "admin";
};

export type CartStatus =
  | "pending"
  | "completed"
  | "cancelled";

export type CartItem = {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  totalPrice: number;
  status: CartStatus;
  createdAt: string;
  updatedAt: string;
};

export type Cart = CartItem[];

export type Payment = {
  id: string;
  userId: string;
  amount: number;
  paymentMethod: string;
  transactionReference: string;
  paymentStatus:
    | "Pending"
    | "Successful"
    | "Failed"
    | "Cancelled";
  createdAt: string;
};

export type AuthResponse = {
  access_token: string;
  user: User;
  message?: string;
};

export type ApiError = {
  status: number;
  message: string;
};