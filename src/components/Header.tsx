import Link from "next/link";
import CartButton from "@/components/CartButton";
import GhjucaMark from "@/components/brand/GhjucaMark";
import Wordmark from "@/components/brand/Wordmark";

const nav = [
  { href: "/produits", label: "Tous les produits" },
  { href: "/produits?categorie=Homme", label: "Homme" },
  { href: "/produits?categorie=Femme", label: "Femme" },
  { href: "/produits?categorie=Accessoires", label: "Accessoires" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-line-dark bg-brand-black text-brand-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <GhjucaMark shieldColor="var(--brand-gold)" className="h-8 w-8" />
          <Wordmark className="text-xl" />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white/75">
          {nav.map((item) => (
            <Link key={item.label} href={item.href} className="hover:text-brand-gold transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
        <CartButton />
      </div>
    </header>
  );
}
