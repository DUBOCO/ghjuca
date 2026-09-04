import Link from "next/link";
import CartButton from "@/components/CartButton";

const nav = [
  { href: "/produits", label: "Tous les produits" },
  { href: "/produits?categorie=Homme", label: "Homme" },
  { href: "/produits?categorie=Femme", label: "Femme" },
  { href: "/produits?categorie=Accessoires", label: "Accessoires" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-line bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="brand-wordmark text-xl">
          GHJUCÀ
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-brand-ink/80">
          {nav.map((item) => (
            <Link key={item.label} href={item.href} className="hover:text-brand-clay transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
        <CartButton />
      </div>
    </header>
  );
}
