export default function HeroGraphic() {
  return (
    <svg viewBox="0 0 480 320" width="100%" height="auto" aria-hidden="true">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* linii de conexiune, simbolizează cele 6 livrabile convergând spre un singur cont */}
      <g stroke="url(#lineGrad)" strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M40 40 C 160 40, 200 160, 320 160" />
        <path d="M40 100 C 160 100, 200 160, 320 160" />
        <path d="M40 160 C 160 160, 200 160, 320 160" />
        <path d="M40 220 C 160 220, 200 160, 320 160" />
        <path d="M40 280 C 160 280, 200 160, 320 160" />
      </g>

      {/* noduri de start, cele 5 audituri + video */}
      {[40, 100, 160, 220, 280].map((y) => (
        <circle key={y} cx="40" cy={y} r="5" fill="#a855f7" />
      ))}

      {/* nod central, contul clientului */}
      <circle cx="320" cy="160" r="26" fill="url(#nodeGlow)" />
      <circle cx="320" cy="160" r="7" fill="#f5f3f7" />

      {/* radiație finală spre dreapta, livrarea */}
      <path d="M330 160 L 440 160" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="4 5" opacity="0.7" />
      <circle cx="446" cy="160" r="4" fill="#c084fc" />
    </svg>
  );
}
