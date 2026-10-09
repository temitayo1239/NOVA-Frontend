"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/products/product-card";
import { Input } from "@/components/ui/input";
import { productApi } from "@/services/products";

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.getProducts();

        console.log("Products:", data);

        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(new Set(products.map((p) => p.category))),
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.productName.toLowerCase().includes(query.toLowerCase()),
    );

    if (sort === "low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
  result = [...result].sort((a, b) =>
    a.productName.localeCompare(b.productName),
  );
}

    return result;
  }, [products, query, category, sort]);

  if (loading) {
    return (
      <main className="container-shell py-12">
        <div className="py-24 text-center">
          <h2 className="text-xl font-bold">Loading products...</h2>
        </div>
      </main>
    );
  }

  return (
    <main className="container-shell py-12">
      <div>
        <p className="text-sm font-semibold text-amber-600">SHOP</p>

        <h1 className="mt-2 text-4xl font-black">
          All products
        </h1>

        <p className="mt-3 text-slate-500">
          Find your next everyday essential.
        </p>
      </div>

      <div className="mt-9 flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-3 text-slate-400"
            size={19}
          />

          <Input
            className="pl-10"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm"
          >
            <option value="All">All</option>

            {categories.slice(1).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-11 rounded-xl border border-slate-300 bg-white px-3 text-sm"
          >
            <option value="featured">Featured</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
            <option value="name">Name A → Z</option>
          </select>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
        <SlidersHorizontal size={16} />

        {filteredProducts.length} products found
      </div>

      {filteredProducts.length ? (
        <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <h2 className="text-xl font-bold">
            No products found
          </h2>

          <p className="mt-2 text-slate-500">
            Try a different search or filter.
          </p>
        </div>
      )}
    </main>
  );
}