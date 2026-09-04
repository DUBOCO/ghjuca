import { notFound } from "next/navigation";
import ProductVisual from "@/components/ProductVisual";
import AddToCartForm from "@/components/AddToCartForm";
import { formatPrice, getProductBySlug, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 grid gap-10 lg:grid-cols-2">
      <ProductVisual
        name={product.name}
        color={product.swatch}
        className="aspect-[4/5] w-full rounded-2xl"
      />

      <div>
        <p className="text-xs uppercase tracking-wide text-brand-ink/50">{product.category}</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight">{product.name}</h1>
        <p className="mt-2 text-brand-ink/60">{product.color}</p>
        <p className="mt-4 text-2xl font-semibold">{formatPrice(product.price)}</p>
        <p className="mt-6 text-brand-ink/80 leading-relaxed">{product.description}</p>

        <ul className="mt-6 space-y-1 text-sm text-brand-ink/70 list-disc list-inside">
          {product.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>

        <div className="mt-8">
          <AddToCartForm slug={product.slug} sizes={product.sizes} />
        </div>
      </div>
    </div>
  );
}
