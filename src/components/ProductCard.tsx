import Link from "next/link";
import ProductVisual from "@/components/ProductVisual";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/produits/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border border-brand-line transition-shadow hover:shadow-lg"
    >
      <ProductVisual
        base={product.base}
        accent={product.accent}
        className="aspect-[4/5] w-full"
      />
      <div className="p-4">
        <p className="text-xs uppercase tracking-wide text-brand-gray">{product.category}</p>
        <h3 className="mt-1 font-semibold group-hover:text-brand-pink transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-brand-gray">{product.color}</p>
        <p className="mt-2 font-semibold">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
