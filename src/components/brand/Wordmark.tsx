export default function Wordmark({
  color = "currentColor",
  swooshColor,
  className = "",
}: {
  color?: string;
  swooshColor?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex flex-col leading-none ${className}`}
      style={{ color }}
    >
      <span className="brand-wordmark">Ghjucà</span>
      <svg
        viewBox="0 0 120 12"
        className="mt-0.5 h-[7px] w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,10 C40,-2 80,0 110,3 L120,0 L112,6.5 C80,4 40,4.5 0,10 Z"
          fill={swooshColor ?? color}
        />
      </svg>
    </span>
  );
}
