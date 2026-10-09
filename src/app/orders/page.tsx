"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Package, ShoppingBag } from "lucide-react";

import { cartApi, type CartStatus } from "@/services/cart";
import type { CartItem } from "@/types";
import { formatCurrency } from "@/lib/utils";

const tabs: {
  label: string;
  value: CartStatus;
}[] = [
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Completed",
    value: "completed",
  },
  {
    label: "Cancelled",
    value: "cancelled",
  },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] =
    useState<CartStatus>("pending");

  const [orders, setOrders] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadOrders() {
      try {
        setLoading(true);

        const data =
          await cartApi.getCart(activeTab);

        if (!cancelled) {
          setOrders(
            Array.isArray(data) ? data : [],
          );
        }
      } catch (error) {
        console.error(
          "Failed to load orders:",
          error,
        );

        if (!cancelled) {
          setOrders([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadOrders();

    return () => {
      cancelled = true;
    };
  }, [activeTab]);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container-shell py-8 md:py-12">
        {/* Page heading */}
        <div>
          <h1 className="text-2xl font-black tracking-tight md:text-3xl">
            My Orders
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Track and manage your orders
          </p>
        </div>

        {/* Status tabs */}
        <div className="mt-8 overflow-x-auto border-b border-slate-200">
          <div className="flex min-w-max">
            {tabs.map((tab) => {
              const active =
                activeTab === tab.value;

              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() =>
                    setActiveTab(tab.value)
                  }
                  className={[
                    "relative min-w-[120px] px-6 py-4 text-sm font-semibold transition",
                    active
                      ? "text-slate-950"
                      : "text-slate-500 hover:text-slate-900",
                  ].join(" ")}
                >
                  {tab.label}

                  {active && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-slate-950" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="mt-6">
          {loading ? (
            <OrdersLoading />
          ) : orders.length === 0 ? (
            <EmptyOrders status={activeTab} />
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

/* ----------------------------------------
   ORDER CARD
----------------------------------------- */

function OrderCard({
  order,
}: {
  order: CartItem;
}) {
  const status = order.status;

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      {/* Order header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 md:px-6">
        <div>
          <p className="text-xs font-medium text-slate-400">
            ORDER ID
          </p>

          <p className="mt-1 text-sm font-bold text-slate-900">
            #{order.id.slice(0, 8).toUpperCase()}
          </p>
        </div>

        <StatusBadge status={status} />
      </div>

      {/* Product */}
      <div className="flex gap-4 p-4 md:p-6">
        <Link
          href={`/products/${order.product.id}`}
          className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100 md:h-28 md:w-28"
        >
          <Image
            src={order.product.imageUrl}
            alt={order.product.productName}
            fill
            className="object-cover"
            sizes="112px"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <Link
            href={`/products/${order.product.id}`}
            className="line-clamp-2 text-sm font-bold text-slate-900 hover:underline md:text-base"
          >
            {order.product.productName}
          </Link>

          <p className="mt-2 text-sm text-slate-500">
            Quantity:{" "}
            <span className="font-semibold text-slate-700">
              {order.quantity}
            </span>
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Unit price:{" "}
            <span className="font-semibold text-slate-700">
              {formatCurrency(
                Number(order.product.price),
              )}
            </span>
          </p>

          <p className="mt-2 text-base font-black text-slate-950">
            {formatCurrency(
              Number(order.totalPrice),
            )}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 px-4 py-3 md:px-6">
        <p className="text-xs text-slate-500">
          {formatDate(order.createdAt)}
        </p>

        <Link
          href={`/orders/${order.id}`}
          className="text-sm font-bold text-slate-900 hover:underline"
        >
          View details
        </Link>
      </div>
    </article>
  );
}

/* ----------------------------------------
   STATUS BADGE
----------------------------------------- */

function StatusBadge({
  status,
}: {
  status: CartStatus;
}) {
  const styles = {
    pending:
      "bg-amber-50 text-amber-700",
    completed:
      "bg-emerald-50 text-emerald-700",
    cancelled:
      "bg-red-50 text-red-700",
  };

  const labels = {
    pending: "Pending",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

/* ----------------------------------------
   EMPTY STATE
----------------------------------------- */

function EmptyOrders({
  status,
}: {
  status: CartStatus;
}) {
  const messages = {
    pending: {
      title: "No pending orders",
      description:
        "You don't have any pending orders at the moment.",
    },

    completed: {
      title: "No completed orders",
      description:
        "Your completed orders will appear here.",
    },

    cancelled: {
      title: "No cancelled orders",
      description:
        "You don't have any cancelled orders.",
    },
  };

  const message = messages[status];

  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
        <Package
          size={28}
          className="text-slate-400"
        />
      </div>

      <h2 className="mt-5 text-lg font-black text-slate-900">
        {message.title}
      </h2>

      <p className="mt-2 max-w-sm text-sm text-slate-500">
        {message.description}
      </p>

      <Link
        href="/products"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
      >
        <ShoppingBag size={16} />
        Continue shopping
      </Link>
    </div>
  );
}

/* ----------------------------------------
   LOADING
----------------------------------------- */

function OrdersLoading() {
  return (
    <div className="space-y-4">
      {[1, 2].map((item) => (
        <div
          key={item}
          className="animate-pulse rounded-xl border border-slate-200 bg-white p-6"
        >
          <div className="h-4 w-32 rounded bg-slate-200" />

          <div className="mt-6 flex gap-4">
            <div className="h-24 w-24 rounded-lg bg-slate-200" />

            <div className="flex-1">
              <div className="h-4 w-3/4 rounded bg-slate-200" />
              <div className="mt-3 h-3 w-32 rounded bg-slate-200" />
              <div className="mt-3 h-4 w-24 rounded bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ----------------------------------------
   DATE FORMAT
----------------------------------------- */

function formatDate(date: string) {
  return new Intl.DateTimeFormat(
    "en-NG",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  ).format(new Date(date));
}