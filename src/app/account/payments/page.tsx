"use client";

import { useEffect, useState } from "react";
import { paymentApi } from "@/services/payments";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Payment } from "@/types";

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPayments() {
      try {
        const data = await paymentApi.getPayments();
        // setPayments(data);
      } catch (err) {
        console.error("Failed to load payments:", err);
        setError("Unable to load payments.");
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
        <p className="mt-6 text-slate-500">
          Loading payments...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container-shell py-12">
        <h1 className="text-4xl font-black">Payments</h1>
        <p className="mt-6 text-red-500">{error}</p>
      </main>
    );
  }

  return (
    <main className="container-shell py-12">
      <h1 className="text-4xl font-black">Payments</h1>

      <div className="mt-8 overflow-hidden rounded-2xl border bg-white">
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

                <td>
                  {p.paymentMethod}
                </td>

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
                  {p.createdAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="divide-y md:hidden">
          {payments.map((p) => (
            <div key={p.id} className="p-4">
              <div className="flex justify-between">
                <b>{p.transactionReference}</b>
                <Badge>{p.paymentStatus}</Badge>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                {formatCurrency(Number(p.amount))} ·{" "}
                {p.paymentMethod}
              </p>
            </div>
          ))}
        </div>

        {payments.length === 0 && (
          <p className="p-6 text-center text-slate-500">
            No payments found.
          </p>
        )}
      </div>
    </main>
  );
}