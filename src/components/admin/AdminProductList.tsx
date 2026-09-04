"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatPrice, type Product } from "@/lib/types";

export default function AdminProductList({ products }: { products: Product[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete(product: Product) {
    if (!window.confirm(`Supprimer « ${product.name} » (${product.color}) ?`)) return;
    setDeletingId(product.id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Suppression impossible.");
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue.");
    } finally {
      setDeletingId(null);
    }
  }

  if (products.length === 0) {
    return <p className="mt-6 text-brand-gray">Aucun produit pour l&apos;instant.</p>;
  }

  return (
    <div className="mt-6">
      {error && <p className="mb-4 text-sm text-brand-pink">{error}</p>}
      <div className="overflow-x-auto rounded-xl border border-brand-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-line/30 text-xs uppercase text-brand-gray">
            <tr>
              <th className="px-4 py-3">Produit</th>
              <th className="px-4 py-3">Catégorie</th>
              <th className="px-4 py-3">Couleur</th>
              <th className="px-4 py-3">Prix</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-brand-line">
                <td className="px-4 py-3 font-medium">{product.name}</td>
                <td className="px-4 py-3 text-brand-gray">{product.category}</td>
                <td className="px-4 py-3 text-brand-gray">{product.color}</td>
                <td className="px-4 py-3">{formatPrice(product.price)}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => handleDelete(product)}
                    disabled={deletingId === product.id}
                    className="text-brand-pink hover:underline disabled:opacity-50"
                  >
                    {deletingId === product.id ? "Suppression..." : "Supprimer"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
