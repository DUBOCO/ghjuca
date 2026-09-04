import GhjucaMark from "@/components/brand/GhjucaMark";
import Wordmark from "@/components/brand/Wordmark";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-brand-line-dark bg-brand-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 sm:grid-cols-3 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <GhjucaMark shieldColor="var(--brand-gold)" className="h-7 w-7" />
            <Wordmark className="text-lg" />
          </div>
          <p className="text-white/60">
            Équipement technique pour joueurs de padel, pensé et dessiné en Corse.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-2 text-brand-gold">Boutique</p>
          <ul className="space-y-1 text-white/60">
            <li>Homme</li>
            <li>Femme</li>
            <li>Accessoires</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2 text-brand-gold">Contact</p>
          <p className="text-white/60">contact@ghjuca.com</p>
        </div>
      </div>
      <div className="border-t border-brand-line-dark px-6 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Ghjucà. Tous droits réservés.
      </div>
    </footer>
  );
}
