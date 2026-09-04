import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/products";

const categories = ["Homme", "Femme", "Accessoires"] as const;

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ categorie?: string }>;
}) {
  const { categorie } = await searchParams;
  const products = await getProducts();
  const filtered = categorie
    ? products.filter((p) => p.category === categorie)
    : products;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight">Tous les produits</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/produits"
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            !categorie
              ? "border-brand-black bg-brand-black text-white"
              : "border-brand-black/20 hover:border-brand-black"
          }`}
        >
          Tout
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/produits?categorie=${cat}`}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              categorie === cat
                ? "border-brand-black bg-brand-black text-white"
                : "border-brand-black/20 hover:border-brand-black"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
