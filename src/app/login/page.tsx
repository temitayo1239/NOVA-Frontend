"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/use-auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoogleButton } from "@/components/auth/google-button";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setBusy(true);

    const f = new FormData(e.currentTarget);

    try {
      await login(
        String(f.get("email")),
        String(f.get("password"))
      );

      router.push("/products");
    } catch {
      setError("Unable to sign in. Please check your details.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="container-shell flex min-h-[650px] items-center justify-center py-12">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7"
      >
        <p className="text-sm font-semibold text-amber-600">
          WELCOME BACK
        </p>

        <h1 className="mt-2 text-3xl font-black">
          Sign in
        </h1>

        <div className="mt-7 space-y-4">
          {/* Email / Username */}
          <label className="block text-sm font-semibold">
            Email or username

            <Input
              name="email"
              className="mt-2"
              required
            />
          </label>

          {/* Password */}
          <label className="block text-sm font-semibold">
            Password

            <div className="relative mt-2">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                className="pr-10"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-slate-900"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </label>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Submit */}
          <Button
            className="w-full"
            disabled={busy}
          >
            {busy ? "Signing in..." : "Sign in"}
          </Button>
        </div>

        <div className="my-5 flex items-center gap-3">
  <div className="h-px flex-1 bg-slate-200" />

  <span className="text-xs text-slate-400">
    OR
  </span>

  <div className="h-px flex-1 bg-slate-200" />
</div>

<GoogleButton />

        {/* Register */}
        <p className="mt-6 text-center text-sm text-slate-500">
          New here?{" "}
          <Link
            className="font-semibold text-slate-950"
            href="/register"
          >
            Create an account
          </Link>
        </p>
      </form>
    </main>
  );
}