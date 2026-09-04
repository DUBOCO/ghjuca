export type Product = {
  slug: string;
  name: string;
  category: "Homme" | "Femme" | "Accessoires";
  price: number; // en euros
  description: string;
  details: string[];
  sizes: string[];
  color: string;
  swatch: string; // couleur hex pour le visuel placeholder
};

export const products: Product[] = [
  {
    slug: "polo-technique-homme-navy",
    name: "Polo Technique Ghjucà",
    category: "Homme",
    price: 69,
    description:
      "Polo de padel en tissu technique respirant, coupe ajustée pour une liberté de mouvement totale sur le court.",
    details: [
      "Tissu technique 4-way stretch anti-transpiration",
      "Traitement anti-odeur",
      "Coupe ajustée athlétique",
      "Broderie Ghjucà sur la poitrine",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    color: "Bleu Navy",
    swatch: "#14283a",
  },
  {
    slug: "short-performance-homme-argile",
    name: "Short Performance",
    category: "Homme",
    price: 59,
    description:
      "Short léger et résistant pensé pour les déplacements rapides, avec poche zippée pour balle de padel.",
    details: [
      "Tissu stretch ultra-léger",
      "Poche zippée sécurisée",
      "Ceinture élastique ajustable",
      "Découpe articulée pour la mobilité",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    color: "Argile",
    swatch: "#c1502e",
  },
  {
    slug: "debardeur-technique-femme-sable",
    name: "Débardeur Technique",
    category: "Femme",
    price: 49,
    description:
      "Débardeur technique à séchage rapide, coupe féminine ajustée pour un confort optimal en jeu.",
    details: [
      "Séchage rapide",
      "Coupe ajustée féminine",
      "Empiècements respirants dans le dos",
      "Logo Ghjucà discret",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Sable",
    swatch: "#f2e9dc",
  },
  {
    slug: "jupe-short-femme-navy",
    name: "Jupe-Short Performance",
    category: "Femme",
    price: 65,
    description:
      "Jupe-short technique avec short intégré, pensée pour combiner style et performance sur le court.",
    details: [
      "Short intégré pour une liberté totale",
      "Tissu 4-way stretch",
      "Poche balle de padel intégrée",
      "Taille haute confortable",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Bleu Navy",
    swatch: "#14283a",
  },
  {
    slug: "veste-coupe-vent-unisexe-sauge",
    name: "Veste Coupe-Vent",
    category: "Accessoires",
    price: 89,
    description:
      "Veste coupe-vent légère et compressible, indispensable pour l'échauffement et les jours de vent.",
    details: [
      "Déperlant et coupe-vent",
      "Compressible dans sa poche dédiée",
      "Coupe unisexe",
      "Fermeture éclair YKK",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    color: "Sauge",
    swatch: "#3f5d4b",
  },
  {
    slug: "polo-technique-femme-argile",
    name: "Polo Technique Ghjucà",
    category: "Femme",
    price: 69,
    description:
      "Polo de padel technique en coupe féminine, respirant et extensible pour un confort maximal.",
    details: [
      "Tissu technique 4-way stretch",
      "Traitement anti-odeur",
      "Coupe ajustée féminine",
      "Broderie Ghjucà sur la poitrine",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Argile",
    swatch: "#c1502e",
  },
  {
    slug: "casquette-ghjuca-navy",
    name: "Casquette Ghjucà",
    category: "Accessoires",
    price: 29,
    description: "Casquette technique légère avec bandeau anti-transpiration et logo brodé.",
    details: [
      "Tissu léger et respirant",
      "Bandeau anti-transpiration",
      "Taille ajustable",
      "Logo Ghjucà brodé",
    ],
    sizes: ["Taille unique"],
    color: "Bleu Navy",
    swatch: "#14283a",
  },
  {
    slug: "sac-padel-ghjuca-argile",
    name: "Sac de Padel Ghjucà",
    category: "Accessoires",
    price: 119,
    description:
      "Sac de padel spacieux avec compartiment ventilé pour les raquettes et poche chaussures dédiée.",
    details: [
      "Compartiment raquettes rembourré",
      "Poche chaussures ventilée",
      "Bandoulière réglable",
      "Tissu déperlant résistant",
    ],
    sizes: ["Taille unique"],
    color: "Argile",
    swatch: "#c1502e",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}
