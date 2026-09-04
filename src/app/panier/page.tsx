"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useProducts } from "@/lib/products-context";
import { formatPrice } from "@/lib/types";
import ProductVisual from "@/components/ProductVisual";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();
  const { getProductBySlug } = useProducts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Impossible de démarrer le paiement.");
      }
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue.");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold">Votre panier est vide</h1>
        <Link
          href="/produits"
          className="mt-6 inline-block rounded-full bg-brand-gold px-6 py-3 font-semibold text-brand-black hover:bg-brand-gold-dark transition-colors"
        >
          Voir la collection
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold mb-8">Votre panier</h1>

      <div className="space-y-4">
        {items.map((item) => {
          const product = getProductBySlug(item.slug);
          if (!product) return null;
          return (
            <div
              key={`${item.slug}-${item.size}`}
              className="flex items-center gap-4 rounded-xl border border-brand-line p-4"
            >
              <ProductVisual
                base={product.base}
                accent={product.accent}
                className="h-20 w-16 rounded-lg shrink-0"
              />
              <div className="flex-1">
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-brand-gray">Taille {item.size}</p>
                <p className="text-sm font-medium mt-1">{formatPrice(product.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Diminuer la quantité"
                  onClick={() => updateQuantity(item.slug, item.size, item.quantity - 1)}
                  className="h-8 w-8 rounded-full border border-brand-black/20 hover:border-brand-black"
                >
                  −
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button
                  type="button"
                  aria-label="Augmenter la quantité"
                  onClick={() => updateQuantity(item.slug, item.size, item.quantity + 1)}
                  className="h-8 w-8 rounded-full border border-brand-black/20 hover:border-brand-black"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.slug, item.size)}
                className="ml-2 text-sm text-brand-gray hover:text-brand-pink"
              >
                Retirer
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-brand-line pt-6">
        <p className="text-lg font-semibold">Total</p>
        <p className="text-lg font-bold">{formatPrice(totalPrice)}</p>
      </div>

      {error && <p className="mt-4 text-sm text-brand-pink">{error}</p>}

      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className="mt-6 w-full rounded-full bg-brand-gold px-6 py-3 font-semibold text-brand-black hover:bg-brand-gold-dark transition-colors disabled:opacity-50"
      >
        {loading ? "Redirection..." : "Passer au paiement"}
      </button>
    </div>
  );
}
