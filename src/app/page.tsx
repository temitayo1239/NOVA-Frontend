import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Headphones,
} from "lucide-react";

import { ProductCard } from "@/components/products/product-card";
import { productApi } from "@/services/products";

export default async function Home() {
  const products = await productApi.getProducts();

  console.log("products", products);

  const featured = products.filter(
    (product) => product.featured,
  );

  console.log("featured", featured);

  return (
    <main>
      <section className="container-shell grid min-h-[620px] items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold">
            <Sparkles size={14} />
            Curated for everyday life
          </div>

          <h1 className="max-w-3xl text-5xl font-black tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Better things.
            <br />
            <span className="text-slate-400">
              Better everyday.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            A considered collection of products built around
            comfort, function and understated style.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-slate-950 px-5 font-semibold text-white"
            >
              Shop now
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/products"
              className="inline-flex h-12 items-center rounded-xl border border-slate-300 bg-white px-5 font-semibold"
            >
              Explore collection
            </Link>
          </div>
        </div>

        {featured.length > 0 && (
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-200">
            <Image
              src={featured[0].imageUrl}
              alt={featured[0].productName}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 p-4 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Featured
              </p>

              <p className="mt-1 font-bold">
                {featured[0].productName}
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="container-shell py-14">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-amber-600">
              THE EDIT
            </p>

            <h2 className="mt-2 text-3xl font-black">
              Featured products
            </h2>
          </div>

          <Link
            href="/products"
            className="text-sm font-semibold"
          >
            View all →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="container-shell grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [ShieldCheck, "Secure payments"],
            [Truck, "Fast delivery"],
            [Sparkles, "Quality products"],
            [Headphones, "Customer support"],
          ].map(([Icon, label]) => {
            const I = Icon as React.ElementType;

            return (
              <div
                className="flex gap-3"
                key={String(label)}
              >
                <I size={22} />

                <div>
                  <p className="font-bold">
                    {String(label)}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Built into every order.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-shell py-16">
        <div className="overflow-hidden rounded-[2rem] bg-slate-950 px-7 py-14 text-white sm:px-12">
          <p className="text-sm font-semibold text-amber-400">
            THE NEXT EVERYDAY
          </p>

          <h2 className="mt-3 max-w-xl text-4xl font-black tracking-tight">
            Upgrade your everyday.
          </h2>

          <p className="mt-4 max-w-lg text-slate-300">
            Discover pieces that earn their place in your routine.
          </p>

          <Link
            href="/products"
            className="mt-7 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-slate-950"
          >
            Shop collection →
          </Link>
        </div>
      </section>
    </main>
  );
}