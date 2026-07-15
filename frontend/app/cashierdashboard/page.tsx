"use client";

import Link from "next/link";
import { BadgePercent, Clock3, PlusCircle, Sparkles, Store } from "lucide-react";

const discountedProducts = [
  {
    name: "Coffee Combo",
    price: "$4.50",
    originalPrice: "$6.00",
    badge: "Manager added",
  },
  {
    name: "Lunch Box",
    price: "$8.90",
    originalPrice: "$11.20",
    badge: "Manager added",
  },
  {
    name: "Snack Pack",
    price: "$3.20",
    originalPrice: "$4.00",
    badge: "Manager added",
  },
];

export default function CashierPage() {
  return (
    <div className="min-h-screen bg-[#f4f2ea] p-6">
      <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-emerald-600">Cashier workspace</p>
            <h1 className="mt-2 text-3xl font-bold text-stone-900">Welcome back, let’s make billing easy.</h1>
            <p className="mt-3 max-w-xl text-sm text-stone-500">
              Start a fresh bill for a customer or continue with the next checkout in one smooth flow.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/cashierdashboard/new-bill"
                className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
              >
                <PlusCircle size={18} />
                Make New Bill
              </Link>
              <Link
                href="/cashierdashboard/history"
                className="flex items-center gap-2 rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
              >
                View recent bills
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-linear-to-br from-emerald-500 via-emerald-600 to-stone-900 p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/20 p-3">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold">Fast checkout</p>
                <p className="text-sm text-emerald-100">A professional billing page built for quick cashier work.</p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white/15 p-3">
              <Store size={18} />
              <p className="text-sm text-emerald-50">Keep sales moving with one-click billing actions and a clean bill layout.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border border-stone-200 bg-white p-6 shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-stone-900">Special discounted products for today</h2>
            <p className="mt-1 text-sm text-stone-500">These offers are added by the manager and shown here for cashier support.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
            <Clock3 size={16} />
            Updated today
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {discountedProducts.map((product) => (
            <div key={product.name} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">{product.badge}</span>
                <div className="rounded-full bg-emerald-100 p-2 text-emerald-700">
                  <BadgePercent size={16} />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-stone-900">{product.name}</h3>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xl font-bold text-stone-900">{product.price}</span>
                <span className="text-sm text-stone-400 line-through">{product.originalPrice}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
