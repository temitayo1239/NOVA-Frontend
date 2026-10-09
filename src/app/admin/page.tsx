"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { productApi } from "@/services/product.service";
import { userApi } from "@/services/user.service";
import { paymentApi } from "@/services/payment.service";
import { formatCurrency } from "@/lib/utils";

export default function Admin() {
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersData, productsData, paymentsData] =
          await Promise.all([
            userApi.getUsers(),
            productApi.getProducts(),
            paymentApi.getPayments(),
          ]);

        setUsers(usersData);
        setProducts(productsData);
        setPayments(paymentsData);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const revenue = payments
    .filter((p) => p.paymentStatus === "Successful")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const stats = [
    ["Users", users.length],
    ["Products", products.length],
    ["Payments", payments.length],
    ["Revenue", formatCurrency(revenue)],
  ];

  if (loading) {
    return (
      <main className="container-shell py-12">
        <p className="text-sm font-semibold text-amber-600">ADMIN</p>

        <h1 className="mt-2 text-4xl font-black">Dashboard</h1>

        <div className="mt-8 text-slate-500">
          Loading dashboard...
        </div>
      </main>
    );
  }

  return (
    <main className="container-shell py-12">
      <p className="text-sm font-semibold text-amber-600">ADMIN</p>

      <h1 className="mt-2 text-4xl font-black">Dashboard</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([label, value]) => (
          <div
            className="rounded-2xl border bg-white p-6"
            key={String(label)}
          >
            <p className="text-sm text-slate-500">{label}</p>

            <p className="mt-3 text-2xl font-black">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-3">
        {[
          ["Products", "/admin/products"],
          ["Users", "/admin/users"],
          ["Payments", "/admin/payments"],
        ].map(([label, href]) => (
          <Link
            href={href}
            className="rounded-2xl border bg-white p-6 font-bold hover:border-slate-400"
            key={label}
          >
            {label} →
          </Link>
        ))}
      </div>

      <p className="mt-8 text-sm text-slate-500">
        Dashboard metrics are now connected to your API.
      </p>
    </main>
  );
}