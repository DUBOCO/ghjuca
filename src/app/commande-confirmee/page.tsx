import Link from "next/link";
import ClearCartOnMount from "@/components/ClearCartOnMount";

export default function OrderConfirmedPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <ClearCartOnMount />
      <p className="text-brand-pink text-sm font-semibold uppercase tracking-wide">Merci !</p>
      <h1 className="mt-2 text-3xl font-extrabold italic tracking-tight">Votre commande est confirmée</h1>
      <p className="mt-4 text-brand-gray">
        Vous recevrez un e-mail de confirmation avec le détail de votre commande et le suivi de
        livraison.
      </p>
      <Link
        href="/produits"
        className="mt-8 inline-block rounded-full bg-brand-gold px-6 py-3 font-semibold text-brand-black hover:bg-brand-gold-dark transition-colors"
      >
        Continuer mes achats
      </Link>
    </div>
  );
}
