import { NextRequest, NextResponse } from "next/server";
import { deleteProduct } from "@/lib/products";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await deleteProduct(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erreur suppression produit:", error);
    return NextResponse.json(
      { error: "Impossible de supprimer ce produit." },
      { status: 500 }
    );
  }
}
