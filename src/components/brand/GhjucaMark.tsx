export default function GhjucaMark({
  shieldColor = "currentColor",
  letterColor = "var(--brand-white)",
  className = "",
}: {
  shieldColor?: string;
  letterColor?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <polygon points="8,8 52,8 52,32 30,58 8,32" fill={shieldColor} />
      <polygon points="42,6 58,6 46,20 34,20" fill={shieldColor} />
      <text
        x="29"
        y="41"
        textAnchor="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight={900}
        fontStyle="italic"
        fontSize="28"
        fill={letterColor}
      >
        G
      </text>
    </svg>
  );
}
