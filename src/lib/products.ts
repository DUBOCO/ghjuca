import "server-only";
import { prisma } from "@/lib/db";
import type { Product } from "@/lib/types";
import { seedProducts } from "@/lib/seed-data";

export { formatPrice } from "@/lib/types";
export type { Product, Category, Base, Accent } from "@/lib/types";

let schemaReady: Promise<void> | null = null;

function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = prisma
      .$executeRawUnsafe(
        `CREATE TABLE IF NOT EXISTS "Product" (
          "id" TEXT PRIMARY KEY,
          "slug" TEXT UNIQUE NOT NULL,
          "name" TEXT NOT NULL,
          "category" TEXT NOT NULL,
          "price" DOUBLE PRECISION NOT NULL,
          "description" TEXT NOT NULL,
          "details" TEXT[] NOT NULL,
          "sizes" TEXT[] NOT NULL,
          "color" TEXT NOT NULL,
          "base" TEXT NOT NULL,
          "accent" TEXT NOT NULL,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        );`
      )
      .then(async () => {
        const count = await prisma.product.count();
        if (count === 0) {
          await prisma.product.createMany({ data: seedProducts });
        }
      });
  }
  return schemaReady;
}

async function withFallback<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    await ensureSchema();
    return await fn();
  } catch (error) {
    console.error(
      "Ghjucà: base de données indisponible, utilisation du catalogue par défaut.",
      error
    );
    schemaReady = null;
    return fallback;
  }
}

export async function getProducts(): Promise<Product[]> {
  return withFallback(
    async () => {
      const rows = await prisma.product.findMany({ orderBy: { createdAt: "asc" } });
      return rows as unknown as Product[];
    },
    seedProducts.map((p, i) => ({ id: `seed-${i}`, ...p }))
  );
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}

export async function createProduct(data: Omit<Product, "id">): Promise<Product> {
  await ensureSchema();
  const row = await prisma.product.create({ data });
  return row as unknown as Product;
}

export async function deleteProduct(id: string): Promise<void> {
  await ensureSchema();
  await prisma.product.delete({ where: { id } });
}
