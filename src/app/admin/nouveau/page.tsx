"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      category: String(form.get("category") ?? ""),
      price: Number(form.get("price")),
      color: String(form.get("color") ?? ""),
      base: String(form.get("base") ?? ""),
      accent: String(form.get("accent") ?? ""),
      description: String(form.get("description") ?? ""),
      details: String(form.get("details") ?? ""),
      sizes: String(form.get("sizes") ?? ""),
    };

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Création impossible.");
      }
      router.push("/admin");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue.");
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ajouter un produit</h1>
        <Link href="/admin" className="text-sm text-brand-gray hover:text-brand-black">
          ← Retour
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5 max-w-xl">
        <Field label="Nom du produit">
          <input name="name" required className={inputClass} placeholder="Polo Technique Ghjucà" />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Catégorie">
            <select name="category" required className={inputClass} defaultValue="Homme">
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
              <option value="Accessoires">Accessoires</option>
            </select>
          </Field>
          <Field label="Prix (€)">
            <input name="price" type="number" min="0" step="0.01" required className={inputClass} />
          </Field>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Couleur (affichée)">
            <input name="color" required className={inputClass} placeholder="Noir / Or" />
          </Field>
          <Field label="Base">
            <select name="base" required className={inputClass} defaultValue="black">
              <option value="black">Noir</option>
              <option value="white">Blanc</option>
            </select>
          </Field>
          <Field label="Accent">
            <select name="accent" required className={inputClass} defaultValue="gold">
              <option value="gold">Or</option>
              <option value="pink">Rose</option>
            </select>
          </Field>
        </div>

        <Field label="Tailles (séparées par des virgules)">
          <input name="sizes" required className={inputClass} placeholder="S, M, L, XL, XXL" />
        </Field>

        <Field label="Description">
          <textarea name="description" required rows={3} className={inputClass} />
        </Field>

        <Field label="Détails (une ligne par point)">
          <textarea
            name="details"
            rows={4}
            className={inputClass}
            placeholder={"Tissu technique 4-way stretch\nTraitement anti-odeur"}
          />
        </Field>

        {error && <p className="text-sm text-brand-pink">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-brand-gold px-6 py-3 font-semibold text-brand-black hover:bg-brand-gold-dark transition-colors disabled:opacity-50"
        >
          {loading ? "Création..." : "Créer le produit"}
        </button>
      </form>
    </div>
  );
}

const inputClass =
  "mt-1 w-full rounded-lg border border-brand-line px-3 py-2 outline-none focus:border-brand-black";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      {children}
    </label>
  );
}
