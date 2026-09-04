function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function ProductVisual({
  name,
  color,
  className = "",
}: {
  name: string;
  color: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        background: `linear-gradient(155deg, ${color} 0%, ${color}cc 55%, #14201f 130%)`,
      }}
      aria-hidden="true"
    >
      <span className="text-white/90 text-4xl font-extrabold tracking-tight">
        {initials(name)}
      </span>
    </div>
  );
}
