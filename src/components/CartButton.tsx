"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartButton() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/panier"
      className="relative inline-flex items-center gap-2 rounded-full border border-brand-gold px-4 py-2 text-sm font-medium text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-colors"
    >
      Panier
      {totalItems > 0 && (
        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-pink px-1 text-xs font-bold text-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
