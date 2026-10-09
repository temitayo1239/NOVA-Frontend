import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { CartProvider } from "@/providers/cart-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "NOVA — Modern Everyday",
  description: "A production-ready e-commerce storefront."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><QueryProvider><CartProvider><Navbar/>{children}<Footer/></CartProvider></QueryProvider></body></html>;
}
