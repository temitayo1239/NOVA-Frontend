import Link from "next/link";
import { paymentApi } from "@/services/payments";
import { formatCurrency } from "@/lib/utils";

export default async function AccountPage() {
  const payments = await paymentApi.getPayments();

  console.log("Payments in AccountPage:", payments);

//   const totalSpent = payments.reduce(
//     (sum, payment) => sum + Number(payment.amount),
//     0
//   );

  return (
    <main className="container-shell py-12">
      <p className="text-sm font-semibold text-amber-600">ACCOUNT</p>

      <h1 className="mt-2 text-4xl font-black">
        Welcome back.
      </h1>

      <div className="mt-9 grid gap-4 md:grid-cols-3">
        {/* Payments */}
        <div className="rounded-2xl bg-slate-950 p-6 text-white">
          <p className="text-sm text-slate-300">
            Payments
          </p>

          <p className="mt-3 text-3xl font-black">
            {/* {payments.length} */}
          </p>
        </div>

        {/* Recent Spend */}
        <div className="rounded-2xl border bg-white p-6">
          <p className="text-sm text-slate-500">
            Recent spend
          </p>

          <p className="mt-3 text-3xl font-black">
            {/* {formatCurrency(totalSpent)} */}
          </p>
        </div>

        {/* Account */}
        <div className="rounded-2xl border bg-white p-6">
          <p className="text-sm text-slate-500">
            Account
          </p>

          <p className="mt-3 text-xl font-bold">
            Active
          </p>
        </div>
      </div>

      <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Profile", "/account/profile"],
          ["Orders", "/account/orders"],
          ["Payments", "/account/payments"],
          ["Settings", "#"],
        ].map(([x, h]) => (
          <Link
            key={x}
            href={h}
            className="rounded-2xl border bg-white p-5 font-bold hover:border-slate-400"
          >
            {x}
            <span className="float-right">→</span>
          </Link>
        ))}
      </div>
    </main>
  );
}