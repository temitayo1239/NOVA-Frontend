"use client";

import { useState } from "react";
import { useCart } from "@/providers/cart-provider";
import { formatCurrency } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, subtotal } = useCart();
  const router = useRouter();
  const [method, setMethod] = useState("Card");
  const [busy, setBusy] = useState(false);
  if (!cart.length)
    return (
      <main className="container-shell py-24 text-center">
        <h1 className="text-3xl font-black">Nothing to check out yet.</h1>
        <Button className="mt-6" onClick={() => router.push("/products")}>
          Shop products
        </Button>
      </main>
    );
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      router.push("/account/payments");
    }, 800);
  };
  return (
    <main className="container-shell py-12">
      <h1 className="text-4xl font-black">Checkout</h1>
      <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_380px]">
        <form
          onSubmit={submit}
          className="space-y-7 rounded-2xl border border-slate-200 bg-white p-6"
        >
          <section>
            <h2 className="text-xl font-bold">Customer information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold">
                Full name
                <Input className="mt-2" required placeholder="Your name" />
              </label>
              <label className="text-sm font-semibold">
                Email
                <Input
                  className="mt-2"
                  required
                  type="email"
                  placeholder="you@example.com"
                />
              </label>
              <label className="text-sm font-semibold sm:col-span-2">
                Delivery address
                <Input className="mt-2" required placeholder="Street, city" />
              </label>
            </div>
          </section>
          <section>
            <h2 className="text-xl font-bold">Payment</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {["Card", "Paystack", "Flutterwave"].map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`rounded-xl border p-4 text-left ${method === m ? "border-slate-950 bg-slate-50" : "border-slate-200"}`}
                >
                  <span className="font-semibold">{m}</span>
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Payment confirmation must ultimately come from your
              backend/provider. This demo does not claim payment success.
            </p>
          </section>
          <Button disabled={busy} type="submit" className="w-full">
            {busy ? "Processing..." : "Continue to payment"}
          </Button>
        </form>
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold">Order summary</h2>
          <div className="mt-5 space-y-3">
            {cart.map((i) => (
              <div key={i.id} className="flex justify-between gap-4 text-sm">
                <span>
                  {i.product.name} × {i.quantity}
                </span>
                <b>{formatCurrency(i.product.price * i.quantity)}</b>
              </div>
            ))}
          </div>
          <div className="my-5 border-t pt-5 flex justify-between text-lg">
            <b>Total</b>
            <b>{formatCurrency(subtotal)}</b>
          </div>
          <Badge tone="warning">Payment: {method}</Badge>
        </aside>
      </div>
    </main>
  );
}
