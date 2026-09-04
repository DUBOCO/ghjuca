import Link from "next/link";
import ProductVisual from "@/components/ProductVisual";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produits/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border border-brand-line bg-white/60 transition-shadow hover:shadow-lg"
    >
      <ProductVisual
        name={product.name}
        color={product.swatch}
        className="aspect-[4/5] w-full"
      />
      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-brand-ink/50">{product.category}</p>
        <h3 className="mt-1 font-semibold group-hover:text-brand-clay transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-brand-ink/60">{product.color}</p>
        <p className="mt-2 font-semibold">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
