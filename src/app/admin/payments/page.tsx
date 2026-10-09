"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { paymentApi } from "@/services/payment.service";

export default function Payments() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPayments() {
      try {
        const data = await paymentApi.getPayments();

        console.log("Account payments:", data);

        setPayments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load payments:", error);
        setPayments([]);
      } finally {
        setLoading(false);
      }
    }

    loadPayments();
  }, []);

  if (loading) {
    return (
      <main className="container-shell py-12">
        <h1 className="text-4xl font-black">Payments</h1>

        <div className="mt-8 py-12 text-center text-slate-500">
          Loading payments...
        </div>
      </main>
    );
  }

  return (
    <main className="container-shell py-12">
      <h1 className="text-4xl font-black">Payments</h1>

      <div className="mt-8 overflow-hidden rounded-2xl border bg-white">
        {/* Desktop */}
        <table className="hidden w-full text-left text-sm md:table">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-4">Transaction</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr className="border-t" key={p.id}>
                <td className="p-4 font-semibold">
                  {p.transactionReference}
                </td>

                <td>
                  {formatCurrency(Number(p.amount))}
                </td>

                <td>{p.paymentMethod}</td>

                <td>
                  <Badge
                    tone={
                      p.paymentStatus === "Successful"
                        ? "success"
                        : p.paymentStatus === "Failed"
                          ? "danger"
                          : "warning"
                    }
                  >
                    {p.paymentStatus}
                  </Badge>
                </td>

                <td>
                  {p.createdAt
                    ? new Date(p.createdAt).toLocaleDateString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile */}
        <div className="divide-y md:hidden">
          {payments.map((p) => (
            <div key={p.id} className="p-4">
              <div className="flex justify-between gap-3">
                <b>{p.transactionReference}</b>

                <Badge
                  tone={
                    p.paymentStatus === "Successful"
                      ? "success"
                      : p.paymentStatus === "Failed"
                        ? "danger"
                        : "warning"
                  }
                >
                  {p.paymentStatus}
                </Badge>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                {formatCurrency(Number(p.amount))} ·{" "}
                {p.paymentMethod}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {p.createdAt
                  ? new Date(p.createdAt).toLocaleDateString()
                  : "—"}
              </p>
            </div>
          ))}
        </div>

        {payments.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            No payments found.
          </div>
        )}
      </div>
    </main>
  );
}