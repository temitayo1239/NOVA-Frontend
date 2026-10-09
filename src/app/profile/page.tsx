"use client";

import { useEffect, useState } from "react";
import { UserRound, Mail, AtSign } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/features/auth/use-auth";
import type { User } from "@/types";

export default function Profile() {
  const { user } = useAuth();

  const [profile, setProfile] = useState<User | null>(
    user ?? null,
  );

  useEffect(() => {
    if (user) {
      setProfile(user);
    }
  }, [user]);

  if (!profile) {
    return (
      <main className="container-shell py-12">
        <div className="max-w-2xl animate-pulse rounded-2xl border border-slate-200 bg-white p-7">
          <div className="h-8 w-32 rounded bg-slate-200" />

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <div className="h-3 w-20 rounded bg-slate-200" />
              <div className="mt-2 h-5 w-40 rounded bg-slate-200" />
            </div>

            <div>
              <div className="h-3 w-20 rounded bg-slate-200" />
              <div className="mt-2 h-5 w-32 rounded bg-slate-200" />
            </div>

            <div>
              <div className="h-3 w-20 rounded bg-slate-200" />
              <div className="mt-2 h-5 w-48 rounded bg-slate-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container-shell py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your account information
          </p>
        </div>

        <div className="max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {/* Profile header */}
          <div className="border-b border-slate-100 bg-slate-50 px-6 py-6 md:px-7">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
                <UserRound size={28} />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-xl font-black text-slate-900">
                  {profile.fullName ||
                    profile.username ||
                    "My Account"}
                </h2>

                <p className="mt-1 truncate text-sm text-slate-500">
                  {profile.email}
                </p>
              </div>
            </div>
          </div>

          {/* Profile information */}
          <div className="p-6 md:p-7">
            <h3 className="text-lg font-bold text-slate-900">
              Personal information
            </h3>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <ProfileField
                icon={<UserRound size={17} />}
                label="Full name"
                value={profile.fullName}
              />

              <ProfileField
                icon={<AtSign size={17} />}
                label="Username"
                value={profile.username}
              />

              <ProfileField
                icon={<Mail size={17} />}
                label="Email"
                value={profile.email}
              />

              <div>
                <p className="text-xs font-medium text-slate-500">
                  Account status
                </p>

                <div className="mt-2">
                  <Badge
                    tone={
                      profile.suspended
                        ? "danger"
                        : "success"
                    }
                  >
                    {profile.suspended
                      ? "Suspended"
                      : "Active"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">
                Profile editing
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Your profile information is currently
                read-only. You will be able to update
                your account details once profile editing
                is enabled.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProfileField({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-500">
        {label}
      </p>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-slate-400">
          {icon}
        </span>

        <p className="truncate font-semibold text-slate-900">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}