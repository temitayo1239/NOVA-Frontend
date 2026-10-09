"use client";
import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/providers/cart-provider";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ProductActions({ product }: { product: Product }) {
  const { add } = useCart(); const router = useRouter(); const [qty,setQty]=useState(1); const [added,setAdded]=useState(false);
  const submit = async () => { for(let i=0;i<qty;i++) await add(product); setAdded(true); };
  return <div className="mt-7 flex flex-col gap-3"><div className="flex w-fit items-center rounded-xl border border-slate-300"><button className="px-4 py-3" onClick={()=>setQty(Math.max(1,qty-1))}>−</button><span className="min-w-10 text-center font-semibold">{qty}</span><button className="px-4 py-3" onClick={()=>setQty(Math.min(product.stock,qty+1))}>+</button></div><Button disabled={!product.stock} onClick={submit}>{added ? <><Check size={18}/> Added to cart</> : <><ShoppingBag size={18}/> Add to cart</>}</Button>{added && <Button variant="secondary" onClick={()=>router.push("/cart")}>View cart</Button>}</div>;
}
