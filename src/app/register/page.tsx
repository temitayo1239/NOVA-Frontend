"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authApi } from "@/services/auth";
import { GoogleButton } from "@/components/auth/google-button";

export default function RegisterPage() {
  const router = useRouter();

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
async function submit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  setError("");

  const f = new FormData(e.currentTarget);

  const password = f.get("password") as string;
  const confirm = f.get("confirm") as string;

  // Frontend validation
  if (password !== confirm) {
    setError("Passwords do not match.");
    return;
  }

  const payload = {
    fullName: f.get("fullName") as string,
    username: f.get("username") as string,
    email: f.get("email") as string,
    password,
  };

  setBusy(true);

  try {
    console.log("Register payload:", payload);

    const r = await authApi.register(payload);

    console.log("Register response:", r);

    if (r.access_token) {
      localStorage.setItem("access_token", r.access_token);
    }

    router.push("/products");
  } catch (error: any) {
    console.error("Registration error:", error);

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Registration failed. Please try again.";

    setError(
      Array.isArray(message)
        ? message.join(", ")
        : message
    );
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
          GET STARTED
        </p>

        <h1 className="mt-2 text-3xl font-black">
          Create account
        </h1>

        <div className="mt-7 space-y-4">
          {/* Full Name */}
          <label className="block text-sm font-semibold">
            Full name

            <Input
              name="fullName"
              className="mt-2"
              required
            />
          </label>

          {/* Username */}
          <label className="block text-sm font-semibold">
            Username

            <Input
              name="username"
              className="mt-2"
              required
            />
          </label>


          {/* Email */}
          <label className="block text-sm font-semibold">
            Email

            <Input
              name="email"
              type="email"
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
                minLength={8}
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

          {/* Confirm Password */}
          <label className="block text-sm font-semibold">
            Confirm password

            <div className="relative mt-2">
              <Input
                name="confirm"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                className="pr-10"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((prev) => !prev)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-slate-900"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? (
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
            {busy ? "Creating..." : "Create account"}
          </Button>

          <div className="my-5 flex items-center gap-3">
  <div className="h-px flex-1 bg-slate-200" />

  <span className="text-xs text-slate-400">
    OR
  </span>

  <div className="h-px flex-1 bg-slate-200" />
</div>

<GoogleButton />
        </div>

        {/* Login */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            className="font-semibold text-slate-950"
            href="/login"
          >
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}