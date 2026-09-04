import GhjucaMark from "@/components/brand/GhjucaMark";
import CourtMotif from "@/components/brand/CourtMotif";
import type { Accent } from "@/lib/types";

const accentColor: Record<Accent, string> = {
  gold: "var(--brand-gold)",
  pink: "var(--brand-pink)",
};

export default function ProductVisual({
  base,
  accent,
  className = "",
}: {
  base: "black" | "white";
  accent: Accent;
  className?: string;
}) {
  const isBlack = base === "black";
  const bg = isBlack ? "var(--brand-black)" : "var(--brand-white)";
  const accentHex = accentColor[accent];

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden border ${
        isBlack ? "border-white/10" : "border-brand-line"
      } ${className}`}
      style={{ background: bg }}
      aria-hidden="true"
    >
      <CourtMotif
        color={accentHex}
        className="absolute h-[70%] w-[70%] opacity-30"
      />
      <GhjucaMark
        shieldColor={accentHex}
        letterColor={isBlack ? "var(--brand-black)" : "var(--brand-white)"}
        className="relative h-16 w-16 drop-shadow-sm"
      />
    </div>
  );
}
