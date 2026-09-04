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
        viewBox="0 0 120 10"
        className="mt-0.5 h-[6px] w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M2,8 Q60,-3 118,4"
          fill="none"
          stroke={swooshColor ?? color}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
