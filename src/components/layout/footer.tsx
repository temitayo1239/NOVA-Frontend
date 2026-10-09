export function Footer() {
  return <footer className="mt-24 border-t border-slate-200 bg-white">
    <div className="container-shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
      <div><div className="text-xl font-black">NOVA<span className="text-amber-500">.</span></div><p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">Thoughtfully selected products for modern everyday life.</p></div>
      <div><h3 className="font-bold">Explore</h3><div className="mt-4 grid gap-2 text-sm text-slate-500"><a href="/products">Shop</a><a href="/search">Search</a><a href="/account">Account</a></div></div>
      <div><h3 className="font-bold">Support</h3><div className="mt-4 grid gap-2 text-sm text-slate-500"><span>Contact support</span><span>Shipping & returns</span><span>Terms & privacy</span></div></div>
      <div><h3 className="font-bold">Stay in the loop</h3><p className="mt-3 text-sm text-slate-500">New drops, useful updates and occasional good stuff.</p></div>
    </div>
    <div className="border-t border-slate-100 py-5 text-center text-xs text-slate-400">© 2026 NOVA. All rights reserved.</div>
  </footer>;
}
