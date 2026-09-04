# Ghjucà — site marchand

Boutique en ligne pour Ghjucà, marque de vêtements techniques de padel. Construit avec
Next.js (App Router), TypeScript, Tailwind CSS et Stripe Checkout.

## Fonctionnalités

- Catalogue produits avec filtre par catégorie (Homme / Femme / Accessoires)
- Fiche produit avec choix de taille
- Panier persistant (localStorage) avec gestion des quantités
- Paiement via Stripe Checkout (redirection hébergée)
- Pages de confirmation et d'annulation de commande

## Démarrer en local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## Configuration Stripe

Le paiement nécessite une clé secrète Stripe. Créez un compte sur
[dashboard.stripe.com](https://dashboard.stripe.com/apikeys), récupérez votre clé de test
(`sk_test_...`) et ajoutez-la dans `.env.local` :

```
STRIPE_SECRET_KEY=sk_test_...
```

Sans cette clé, le bouton "Passer au paiement" affichera une erreur.

## Structure du projet

```
src/
  app/
    page.tsx                 Page d'accueil
    produits/                Catalogue + fiche produit
    panier/                  Panier
    commande-confirmee/      Page de succès après paiement
    api/checkout/route.ts    Création de la session Stripe Checkout
  components/                Header, Footer, cartes produit, formulaires
  lib/
    products.ts               Catalogue produits (source de vérité, y compris les prix)
    cart-context.tsx          Contexte panier (React Context + localStorage)
    stripe.ts                 Client Stripe côté serveur
```

## Prochaines étapes possibles

- Remplacer les catalogues en dur (`src/lib/products.ts`) par une vraie base de données ou un
  CMS (ex. Sanity, Shopify headless) si le catalogue doit être géré sans redéploiement
- Ajouter de vraies photos produit (actuellement des visuels placeholder générés)
- Webhook Stripe pour confirmer les commandes côté serveur et gérer les stocks
- Gestion des comptes clients et historique de commandes
- Emails transactionnels (confirmation de commande, expédition)

## Déploiement

Le projet est prêt pour un déploiement sur [Vercel](https://vercel.com/new) (créateurs de
Next.js) : connectez le repo et ajoutez la variable d'environnement `STRIPE_SECRET_KEY` dans les
réglages du projet.
