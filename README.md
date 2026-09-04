# Ghjucà — site marchand

Boutique en ligne pour Ghjucà, marque de vêtements techniques de padel. Construit avec
Next.js (App Router), TypeScript, Tailwind CSS, Prisma/Postgres et Stripe Checkout.

## Fonctionnalités

- Catalogue produits avec filtre par catégorie (Homme / Femme / Accessoires)
- Fiche produit avec choix de taille
- Panier persistant (localStorage) avec gestion des quantités
- Paiement via Stripe Checkout (redirection hébergée)
- Pages de confirmation et d'annulation de commande
- Back office (`/admin`) protégé par mot de passe pour ajouter/supprimer des produits

## Démarrer en local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000). Sans base de données configurée, le
site public fonctionne quand même (catalogue par défaut intégré), mais le back office ne
pourra pas créer/supprimer de produits tant que `DATABASE_URL` n'est pas renseignée.

## Configuration Stripe

Le paiement nécessite une clé secrète Stripe. Créez un compte sur
[dashboard.stripe.com](https://dashboard.stripe.com/apikeys), récupérez votre clé de test
(`sk_test_...`) et ajoutez-la dans `.env.local` :

```
STRIPE_SECRET_KEY=sk_test_...
```

Sans cette clé, le bouton "Passer au paiement" affichera une erreur.

## Configuration de la base de données (catalogue produits)

Le catalogue est stocké dans Postgres. Sur Vercel :

1. Dans le projet → onglet **Storage** → **Create Database** → choisir **Postgres** (Neon).
2. Vercel ajoute automatiquement la variable `DATABASE_URL` au projet.
3. Redéployez (ou attendez le prochain push) : la table est créée automatiquement au premier
   accès et le catalogue par défaut (8 produits) est inséré tout seul — aucune commande à lancer.

En local, pointez `DATABASE_URL` vers n'importe quel Postgres (local ou distant) dans
`.env.local` :

```
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

## Back office (`/admin`)

Définissez un mot de passe dans `.env.local` (et dans les variables d'environnement Vercel) :

```
ADMIN_PASSWORD=choisis-un-mot-de-passe-solide
```

Rendez-vous ensuite sur `/admin/login` pour vous connecter, puis `/admin` pour voir la liste
des produits et `/admin/nouveau` pour en ajouter. La suppression se fait directement depuis la
liste. Ces pages ne sont pas liées depuis le site public — gardez l'URL et le mot de passe
privés.

## Structure du projet

```
src/
  app/
    page.tsx                    Page d'accueil
    produits/                   Catalogue + fiche produit
    panier/                     Panier
    commande-confirmee/         Page de succès après paiement
    admin/                      Back office (liste, ajout, login)
    api/checkout/route.ts       Création de la session Stripe Checkout
    api/products/route.ts       Catalogue en JSON (utilisé côté client)
    api/admin/                  Routes protégées : login, création, suppression
  components/                   Header, Footer, cartes produit, formulaires
  components/admin/             Composants du back office
  lib/
    types.ts                    Type Product + formatPrice (safe côté client)
    products.ts                 Accès Postgres (server-only) : lecture/écriture catalogue
    products-context.tsx        Rend le catalogue disponible aux composants client
    seed-data.ts                Catalogue par défaut (seed + repli si la base est indisponible)
    cart-context.tsx            Contexte panier (React Context + localStorage)
    admin-auth.ts                Vérification du mot de passe admin
    stripe.ts                   Client Stripe côté serveur
  proxy.ts                      Protège /admin et /api/admin par cookie de session
prisma/schema.prisma            Modèle de données Product
```

## Prochaines étapes possibles

- Édition de produit existant (le back office gère pour l'instant l'ajout et la suppression)
- Ajouter de vraies photos produit (actuellement des visuels placeholder générés)
- Webhook Stripe pour confirmer les commandes côté serveur et gérer les stocks
- Gestion des comptes clients et historique de commandes
- Emails transactionnels (confirmation de commande, expédition)

## Déploiement

Le projet est prêt pour un déploiement sur [Vercel](https://vercel.com/new) (créateurs de
Next.js) : connectez le repo et ajoutez les variables d'environnement `STRIPE_SECRET_KEY`,
`DATABASE_URL` (via l'intégration Postgres, voir plus haut) et `ADMIN_PASSWORD` dans les
réglages du projet.
