"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/providers/cart-provider";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { cartApi } from "@/services/cart.service";

export default function CartPage() {
  const { cart, subtotal, update, remove } = useCart();
  if (!cart.length)
    return (
      <main className="container-shell py-24 text-center">
        <h1 className="text-4xl font-black">Your cart is empty.</h1>
        <p className="mt-3 text-slate-500">
          Looks like you haven't added anything yet.
        </p>
        <Link
          href="/products"
          className="mt-7 inline-flex rounded-xl bg-slate-950 px-5 py-3 font-bold text-white"
        >
          Continue shopping
        </Link>
      </main>
    );
  return (
    <main className="container-shell py-12">
      <h1 className="text-4xl font-black">Shopping cart</h1>
      <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4"
            >
              <img
                src={item.product.imageUrl}
                className="h-24 w-20 rounded-xl object-cover"
                alt=""
              />
              <div className="min-w-0 flex-1">
                <h2 className="font-bold">{item.product.productName}</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {formatCurrency(item.product.price)}
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex rounded-lg border border-slate-200">
                    <button
                      className="p-2 disabled:cursor-not-allowed disabled:opacity-40"
                      onClick={() => {
                        if (item.quantity < item.product.stock) {
                          update(item.id, item.quantity + 1);
                        }
                      }}
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus size={14} />
                    </button>

                    <span className="px-3 py-2 text-sm font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      className="p-2 disabled:cursor-not-allowed disabled:opacity-40"
                      onClick={() => {
                        if (item.quantity < item.product.stock) {
                          update(item.id, item.quantity + 1);
                        }
                      }}
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    className="text-sm text-red-600"
                    onClick={() => remove(item.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {item.quantity >= item.product.stock && (
                  <p className="mt-2 text-xs text-amber-600">
                    Maximum available quantity reached.
                  </p>
                )}
              </div>
              <div className="font-bold">
                {formatCurrency(item.product.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold">Summary</h2>
          <div className="mt-6 flex justify-between text-sm">
            <span className="text-slate-500">Subtotal</span>
            <b>{formatCurrency(subtotal)}</b>
          </div>
          <div className="mt-3 flex justify-between text-sm">
            <span className="text-slate-500">Delivery</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="my-5 border-t border-slate-200 pt-5 flex justify-between text-lg">
            <b>Total</b>
            <b>{formatCurrency(subtotal)}</b>
          </div>
          <Link
            href="/checkout"
            className="flex h-11 items-center justify-center rounded-xl bg-slate-950 font-bold text-white"
          >
            Checkout
          </Link>
        </aside>
      </div>
    </main>
  );
}
