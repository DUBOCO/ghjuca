"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/types";

type ProductsContextValue = {
  products: Product[];
  getProductBySlug: (slug: string) => Product | undefined;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({
  children,
  initialProducts,
}: {
  children: ReactNode;
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && Array.isArray(data.products)) setProducts(data.products);
      })
      .catch(() => {
        // on garde le catalogue initial en cas d'échec
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<ProductsContextValue>(
    () => ({
      products,
      getProductBySlug: (slug) => products.find((p) => p.slug === slug),
    }),
    [products]
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts(): ProductsContextValue {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts doit être utilisé dans un ProductsProvider");
  return ctx;
}
