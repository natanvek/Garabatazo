export function Logo({ className = 'h-16 w-16' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Garabatazo">
      <defs>
        <linearGradient id="garabatazo-logo-gradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#facc15" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="16" className="fill-neutral-800" />
      <path
        d="M14 40 C 10 24, 24 14, 28 26 C 32 38, 44 40, 42 26 C 40 14, 52 14, 50 28"
        fill="none"
        stroke="url(#garabatazo-logo-gradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
