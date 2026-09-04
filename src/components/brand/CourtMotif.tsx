export default function CourtMotif({
  color = "var(--brand-gold)",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 140"
      className={className}
      fill="none"
      stroke={color}
      aria-hidden="true"
    >
      {/* lignes de construction / fuite */}
      <path d="M46,32 L36,4 M36,14 L48,4" strokeWidth="1" opacity="0.7" />
      <path d="M154,32 L164,4 M164,14 L152,4" strokeWidth="1" opacity="0.7" />
      <path d="M20,124 L10,138 M180,124 L190,138" strokeWidth="1" opacity="0.7" />

      {/* trapèze du terrain */}
      <path d="M60,20 L140,20 L180,120 L20,120 Z" strokeWidth="1.5" />
      {/* ligne centrale */}
      <path d="M100,20 L100,120" strokeWidth="1.5" />
      {/* filet */}
      <path d="M32,68 L168,68" strokeWidth="6" />
    </svg>
  );
}
