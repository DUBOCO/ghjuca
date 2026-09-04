import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products";
import { getStripe } from "@/lib/stripe";

type CheckoutItem = {
  slug: string;
  size: string;
  quantity: number;
};

export async function POST(req: NextRequest) {
  let body: { items?: CheckoutItem[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const items = body.items ?? [];
  if (items.length === 0) {
    return NextResponse.json({ error: "Le panier est vide." }, { status: 400 });
  }

  const line_items = [];
  for (const item of items) {
    const product = getProductBySlug(item.slug);
    const quantity = Math.max(1, Math.min(20, Math.trunc(item.quantity)));
    if (!product || !product.sizes.includes(item.size) || !Number.isFinite(quantity)) {
      return NextResponse.json({ error: "Article invalide dans le panier." }, { status: 400 });
    }
    line_items.push({
      quantity,
      price_data: {
        currency: "eur",
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: `${product.name} — Taille ${item.size}`,
        },
      },
    });
  }

  const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      shipping_address_collection: { allowed_countries: ["FR", "BE", "CH", "IT", "ES", "DE", "LU"] },
      success_url: `${origin}/commande-confirmee?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/panier`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Erreur Stripe checkout:", error);
    const message = error instanceof Error ? error.message : "Erreur inconnue.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
