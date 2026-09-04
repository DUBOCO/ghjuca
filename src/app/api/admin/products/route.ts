import { NextRequest, NextResponse } from "next/server";
import { createProduct } from "@/lib/products";
import type { Product } from "@/lib/types";

const CATEGORIES = ["Homme", "Femme", "Accessoires"] as const;
const BASES = ["black", "white"] as const;
const ACCENTS = ["gold", "pink"] as const;

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(req: NextRequest) {
  let body: Partial<Product> & { details?: string[] | string; sizes?: string[] | string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const name = body.name?.trim();
  const price = Number(body.price);
  const category = body.category;
  const base = body.base;
  const accent = body.accent;
  const color = body.color?.trim();
  const description = body.description?.trim();

  if (!name || !color || !description) {
    return NextResponse.json({ error: "Nom, couleur et description sont requis." }, { status: 400 });
  }
  if (!Number.isFinite(price) || price <= 0) {
    return NextResponse.json({ error: "Le prix doit être un nombre positif." }, { status: 400 });
  }
  if (!category || !CATEGORIES.includes(category)) {
    return NextResponse.json({ error: "Catégorie invalide." }, { status: 400 });
  }
  if (!base || !BASES.includes(base)) {
    return NextResponse.json({ error: "Couleur de base invalide." }, { status: 400 });
  }
  if (!accent || !ACCENTS.includes(accent)) {
    return NextResponse.json({ error: "Accent invalide." }, { status: 400 });
  }

  const details = Array.isArray(body.details)
    ? body.details.map((d) => d.trim()).filter(Boolean)
    : String(body.details ?? "")
        .split("\n")
        .map((d) => d.trim())
        .filter(Boolean);

  const sizes = Array.isArray(body.sizes)
    ? body.sizes.map((s) => s.trim()).filter(Boolean)
    : String(body.sizes ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

  if (sizes.length === 0) {
    return NextResponse.json({ error: "Au moins une taille est requise." }, { status: 400 });
  }

  const slug = body.slug?.trim() ? slugify(body.slug) : slugify(`${name}-${color}`);
  if (!slug) {
    return NextResponse.json({ error: "Impossible de générer un slug à partir de ce nom." }, { status: 400 });
  }

  try {
    const product = await createProduct({
      slug,
      name,
      category,
      price,
      description,
      details,
      sizes,
      color,
      base,
      accent,
    });
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("Erreur création produit:", error);
    const message =
      error instanceof Error && error.message.includes("Unique constraint")
        ? "Un produit avec ce slug existe déjà."
        : "Impossible de créer le produit (base de données indisponible ?).";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
