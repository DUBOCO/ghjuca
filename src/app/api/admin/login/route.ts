import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, adminSessionToken } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const expected = await adminSessionToken();
  if (!expected) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD n'est pas configuré sur le serveur." },
      { status: 500 }
    );
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!body.password || body.password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, expected, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
