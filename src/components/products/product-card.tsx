"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";

import type { Product } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/providers/cart-provider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ProductCard({
  product,
}: {
  product: Product;
}) {
  const { cart, add } = useCart();

  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const cartItem = cart.find(
    (item) => item.productId === product.id
  );

  const cartQuantity = cartItem?.quantity ?? 0;

  const remainingStock = Math.max(
    product.stock - cartQuantity,
    0
  );

  const isOutOfStock = product.stock <= 0;

  const isStockLimitReached =
    cartQuantity >= product.stock;

  const discounted =
    product.compareAtPrice !== undefined &&
    product.compareAtPrice > product.price;

  const handleAdd = async () => {
    if (
      isOutOfStock ||
      isStockLimitReached ||
      loading
    ) {
      return;
    }

    try {
      setLoading(true);

      await add(product, 1);

      setAdded(true);

      setTimeout(() => {
        setAdded(false);
      }, 1200);
    } catch (error: any) {
      console.error(
        "Add to cart failed:",
        error?.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="group">
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100"
      >
        <Image
          src={product.imageUrl}
          alt={product.productName}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {discounted && (
          <span className="absolute left-3 top-3">
            <Badge tone="warning">Sale</Badge>
          </span>
        )}
      </Link>

      <div className="flex items-start justify-between gap-3 pt-4">
        <div>
          <Link
            href={`/products/${product.id}`}
            className="font-semibold hover:underline"
          >
            {product.productName}
          </Link>

          <p className="mt-1 text-sm text-slate-500">
            {product.category?.join(", ")}
          </p>
        </div>

        <div className="text-right">
          <div className="font-bold">
            {formatCurrency(product.price)}
          </div>

          {discounted && (
            <div className="text-xs text-slate-400 line-through">
              {formatCurrency(product.compareAtPrice!)}
            </div>
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-xs text-slate-500">
          {isOutOfStock
            ? "Out of stock"
            : isStockLimitReached
              ? "Out of stock"
              : `${remainingStock} available`}
        </span>

        <Button
          className="min-h-9 px-3 text-xs"
          disabled={
            isOutOfStock ||
            isStockLimitReached ||
            added ||
            loading
          }
          onClick={handleAdd}
        >
          {added ? (
            <>
              <Check size={15} />
              Added
            </>
          ) : isStockLimitReached ? (
            "Out of stock"
          ) : loading ? (
            "Adding..."
          ) : (
            <>
              <ShoppingBag size={15} />
              Add
            </>
          )}
        </Button>
      </div>
    </article>
  );
}