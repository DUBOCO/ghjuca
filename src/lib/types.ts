export type Category = "Homme" | "Femme" | "Accessoires";
export type Base = "black" | "white";
export type Accent = "gold" | "pink";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  details: string[];
  sizes: string[];
  color: string;
  base: Base;
  accent: Accent;
};

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}
