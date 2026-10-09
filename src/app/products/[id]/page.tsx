import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { mockProducts } from "@/lib/mock";
import { ProductActions } from "./product-actions";
import { formatCurrency } from "@/lib/utils";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = mockProducts.find((p) => p.id === id);
  if (!product) notFound();
  return (
    <main className="container-shell py-12">
      <div className="mb-7 text-sm text-slate-500">
        <Link href="/products">Shop</Link> / {product.name}
      </div>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-slate-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="py-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
            {product.category}
          </p>
          <h1 className="mt-3 text-4xl font-black">{product.name}</h1>
          <p className="mt-5 text-2xl font-bold">
            {formatCurrency(product.price)}
          </p>
          <p className="mt-6 leading-7 text-slate-600">{product.description}</p>
          <div className="mt-7 border-y border-slate-200 py-5 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Availability</span>
              <span className="font-semibold">
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </span>
            </div>
          </div>
          <ProductActions product={product} />
        </div>
      </div>
    </main>
  );
}
