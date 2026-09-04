"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export default function AddToCartForm({
  slug,
  sizes,
}: {
  slug: string;
  sizes: string[];
}) {
  const { addItem } = useCart();
  const [size, setSize] = useState(sizes[0]);
  const [added, setAdded] = useState(false);

  return (
    <div>
      <p className="text-sm font-medium mb-2">Taille</p>
      <div className="flex flex-wrap gap-2">
        {sizes.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setSize(s);
              setAdded(false);
            }}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              size === s
                ? "border-brand-black bg-brand-black text-white"
                : "border-brand-black/20 hover:border-brand-black"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          addItem(slug, size, 1);
          setAdded(true);
        }}
        className="mt-6 w-full rounded-full bg-brand-gold px-6 py-3 font-semibold text-brand-black hover:bg-brand-gold-dark transition-colors"
      >
        {added ? "Ajouté ✓" : "Ajouter au panier"}
      </button>
    </div>
  );
}
