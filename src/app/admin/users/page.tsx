"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
// import { api } from "@/lib/api/client";

type User = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  suspended?: boolean;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        // const response = await api.get<User[]>("/users");

        // setUsers(response.data);
      } catch (error: any) {
        console.error("Failed to load users:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load users"
        );
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <main className="container-shell py-12">
      <h1 className="text-4xl font-black">Users</h1>

      <div className="mt-8 overflow-hidden rounded-2xl border bg-white">
        {loading ? (
          <div className="p-6 text-sm text-slate-500">
            Loading users...
          </div>
        ) : error ? (
          <div className="p-6 text-sm text-red-500">
            {error}
          </div>
        ) : users.length === 0 ? (
          <div className="p-6 text-sm text-slate-500">
            No users found.
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4">User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr className="border-t" key={user.id}>
                  <td className="p-4 font-semibold">
                    {user.fullName}
                  </td>

                  <td>{user.email}</td>

                  <td>{user.role}</td>

                  <td>
                    <Badge
                      tone={
                        user.suspended
                          ? "danger"
                          : "success"
                      }
                    >
                      {user.suspended
                        ? "Suspended"
                        : "Active"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}