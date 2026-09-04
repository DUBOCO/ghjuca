import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function Home() {
  const featured = products.slice(0, 4);

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-clay">Padel wear</p>
          <h1 className="mt-4 max-w-2xl text-4xl sm:text-6xl font-extrabold tracking-tight">
            Jouez sans limites.
          </h1>
          <p className="mt-6 max-w-xl text-white/70 text-lg">
            Ghjucà conçoit des vêtements techniques pour joueurs de padel exigeants —
            performance, confort et style, du premier échauffement au dernier point.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              href="/produits"
              className="rounded-full bg-brand-clay px-6 py-3 font-semibold hover:bg-brand-clay-dark transition-colors"
            >
              Découvrir la collection
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl font-bold">Sélection du moment</h2>
          <Link href="/produits" className="text-sm font-medium text-brand-clay hover:underline">
            Voir tout →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-brand-sand/60 border-y border-brand-line">
        <div className="mx-auto max-w-6xl px-6 py-16 grid gap-8 sm:grid-cols-3 text-center">
          <div>
            <p className="text-3xl font-extrabold text-brand-clay">4-way</p>
            <p className="mt-2 text-sm text-brand-ink/70">Stretch technique dans toutes les directions</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-brand-clay">100%</p>
            <p className="mt-2 text-sm text-brand-ink/70">Pensé et dessiné pour le padel</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-brand-clay">Livraison</p>
            <p className="mt-2 text-sm text-brand-ink/70">Partout en Europe</p>
          </div>
        </div>
      </section>
    </div>
  );
}
