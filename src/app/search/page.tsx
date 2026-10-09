import { redirect } from "next/navigation";

export default function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  return <SearchRedirect searchParams={searchParams}/>;
}
async function SearchRedirect({ searchParams }: { searchParams: Promise<{q?:string}> }) {
  const params = await searchParams;
  redirect(params.q ? `/products?search=${encodeURIComponent(params.q)}` : "/products");
}
