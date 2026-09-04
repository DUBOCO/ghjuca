export default function Footer() {
  return (
    <footer className="mt-24 border-t border-brand-line bg-brand-sand/60">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 sm:grid-cols-3 text-sm">
        <div>
          <p className="brand-wordmark text-lg mb-2">GHJUCÀ</p>
          <p className="text-brand-ink/70">
            Équipement technique pour joueurs de padel, pensé et dessiné en Corse.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-2">Boutique</p>
          <ul className="space-y-1 text-brand-ink/70">
            <li>Homme</li>
            <li>Femme</li>
            <li>Accessoires</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-2">Contact</p>
          <p className="text-brand-ink/70">contact@ghjuca.com</p>
        </div>
      </div>
      <div className="border-t border-brand-line px-6 py-4 text-center text-xs text-brand-ink/50">
        © {new Date().getFullYear()} Ghjucà. Tous droits réservés.
      </div>
    </footer>
  );
}
