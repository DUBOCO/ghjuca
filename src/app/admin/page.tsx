import Link from "next/link";
import { getProducts } from "@/lib/products";
import AdminProductList from "@/components/admin/AdminProductList";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Produits ({products.length})</h1>
        <Link
          href="/admin/nouveau"
          className="rounded-full bg-brand-gold px-5 py-2 text-sm font-semibold text-brand-black hover:bg-brand-gold-dark transition-colors"
        >
          + Ajouter un produit
        </Link>
      </div>

      <AdminProductList products={products} />
    </div>
  );
}
