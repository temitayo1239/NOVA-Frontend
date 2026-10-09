"use client";

import Link from "next/link";
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
  User,
  Package,
  Heart,
  Settings,
  LogOut,
} from "lucide-react";
import { useState } from "react";

import { useCart } from "@/providers/cart-provider";
import { useAuth } from "@/features/auth/use-auth";

export function Navbar() {
  const { count } = useCart();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between gap-5">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-black tracking-tight"
        >
          NOVA<span className="text-amber-500">.</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
          <Link
            href="/"
            className="transition hover:text-amber-500"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="transition hover:text-amber-500"
          >
            Shop
          </Link>

          <Link
            href="/search"
            className="transition hover:text-amber-500"
          >
            Search
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <Link
            aria-label="Search"
            href="/search"
            className="rounded-xl p-2 transition hover:bg-slate-100"
          >
            <Search size={19} />
          </Link>

          {/* Profile */}
          {user ? (
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() =>
                  setProfileOpen(!profileOpen)
                }
                className="flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-semibold transition hover:bg-slate-100"
                aria-expanded={profileOpen}
              >
                <UserRound size={19} />

                <span className="hidden lg:block max-w-[120px] truncate">
                  {user.fullName ||
                    user.username ||
                    "Account"}
                </span>

                <ChevronDown
                  size={15}
                  className={`transition-transform ${
                    profileOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {/* Profile dropdown */}
              {profileOpen && (
                <>
                  {/* Click-away overlay */}
                  <button
                    type="button"
                    aria-label="Close profile menu"
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() =>
                      setProfileOpen(false)
                    }
                  />

                  <div className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                    {/* User information */}
                    <div className="border-b border-slate-100 px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100">
                          <User
                            size={21}
                            className="text-slate-600"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-slate-900">
                            {user.fullName ||
                              user.username ||
                              "Account"}
                          </p>

                          <p className="truncate text-xs text-slate-500">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Account links */}
                    <div className="p-2">
                      <Link
                        href="/profile"
                        onClick={() =>
                          setProfileOpen(false)
                        }
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition hover:bg-slate-50"
                      >
                        <User
                          size={18}
                          className="text-slate-500"
                        />
                        Profile
                      </Link>

                      <Link
                        href="/orders"
                        onClick={() =>
                          setProfileOpen(false)
                        }
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition hover:bg-slate-50"
                      >
                        <Package
                          size={18}
                          className="text-slate-500"
                        />
                        My Orders
                      </Link>

                      <Link
                        href="/cart"
                        onClick={() =>
                          setProfileOpen(false)
                        }
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition hover:bg-slate-50"
                      >
                        <ShoppingBag
                          size={18}
                          className="text-slate-500"
                        />
                        My Cart

                        {count > 0 && (
                          <span className="ml-auto rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-slate-950">
                            {count}
                          </span>
                        )}
                      </Link>

                      <Link
                        href="/wishlist"
                        onClick={() =>
                          setProfileOpen(false)
                        }
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition hover:bg-slate-50"
                      >
                        <Heart
                          size={18}
                          className="text-slate-500"
                        />
                        Wishlist
                      </Link>

                      <Link
                        href="/account/settings"
                        onClick={() =>
                          setProfileOpen(false)
                        }
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition hover:bg-slate-50"
                      >
                        <Settings
                          size={18}
                          className="text-slate-500"
                        />
                        Settings
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-slate-100 p-2">
                      <button
                        type="button"
                        onClick={() => {
                          setProfileOpen(false);
                          logout();
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              aria-label="Account"
              href="/account"
              className="hidden rounded-xl p-2 transition hover:bg-slate-100 sm:block"
            >
              <UserRound size={19} />
            </Link>
          )}

          {/* Cart */}
          <Link
            aria-label="Cart"
            href="/cart"
            className="relative rounded-xl p-2 transition hover:bg-slate-100"
          >
            <ShoppingBag size={20} />

            {count > 0 && (
              <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-amber-500 px-1 text-center text-[10px] font-bold">
                {count}
              </span>
            )}
          </Link>

          {/* Mobile menu */}
          <button
            type="button"
            className="rounded-xl p-2 transition hover:bg-slate-100 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="container-shell flex flex-col gap-1 py-4">
            <Link
              className="rounded-xl p-3 hover:bg-slate-50"
              href="/"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>

            <Link
              className="rounded-xl p-3 hover:bg-slate-50"
              href="/products"
              onClick={() => setOpen(false)}
            >
              Shop
            </Link>

            <Link
              className="rounded-xl p-3 hover:bg-slate-50"
              href="/search"
              onClick={() => setOpen(false)}
            >
              Search
            </Link>

            {user && (
              <>
                <Link
                  className="rounded-xl p-3 hover:bg-slate-50"
                  href="/account"
                  onClick={() => setOpen(false)}
                >
                  Profile
                </Link>

                <Link
                  className="rounded-xl p-3 hover:bg-slate-50"
                  href="/orders"
                  onClick={() => setOpen(false)}
                >
                  My Orders
                </Link>

                <Link
                  className="rounded-xl p-3 hover:bg-slate-50"
                  href="/cart"
                  onClick={() => setOpen(false)}
                >
                  My Cart
                </Link>

                <button
                  type="button"
                  className="flex items-center gap-2 rounded-xl p-3 text-left text-red-600 hover:bg-red-50"
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}