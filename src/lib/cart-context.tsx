"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getProductBySlug } from "@/lib/products";

export type CartItem = {
  slug: string;
  size: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (slug: string, size: string, quantity?: number) => void;
  removeItem: (slug: string, size: string) => void;
  updateQuantity: (slug: string, size: string, quantity: number) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "ghjuca-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage on mount
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((slug: string, size: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === slug && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.slug === slug && i.size === size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { slug, size, quantity }];
    });
  }, []);

  const removeItem = useCallback((slug: string, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.size === size)));
  }, []);

  const updateQuantity = useCallback((slug: string, size: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => !(i.slug === slug && i.size === size))
        : prev.map((i) =>
            i.slug === slug && i.size === size ? { ...i, quantity } : i
          )
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const { totalItems, totalPrice } = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        const product = getProductBySlug(item.slug);
        acc.totalItems += item.quantity;
        acc.totalPrice += (product?.price ?? 0) * item.quantity;
        return acc;
      },
      { totalItems: 0, totalPrice: 0 }
    );
  }, [items]);

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQuantity, clear, totalItems, totalPrice }),
    [items, addItem, removeItem, updateQuantity, clear, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans un CartProvider");
  return ctx;
}
