"use client";

import { useEffect } from "react";
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // console.error(error);
  }, []);
  return (
    <main className="container-shell flex min-h-[620px] items-center justify-center text-center">
      <div>
        <h1 className="text-3xl font-black">Something went wrong.</h1>
        <p className="mt-2 text-slate-500">Please try again or return home.</p>
        <button
          onClick={reset}
          className="mt-6 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
