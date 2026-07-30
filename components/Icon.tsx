const ICONS: Record<string, React.ReactNode> = {
  search: (
    <>
      <circle cx="10" cy="10" r="6" />
      <path d="M20 20l-4.5-4.5" />
    </>
  ),
  palette: (
    <>
      <circle cx="8" cy="8" r="3.2" />
      <circle cx="15" cy="7" r="2.4" />
      <circle cx="13" cy="16" r="2.8" />
    </>
  ),
  website: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
    </>
  ),
  layers: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="16" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
    </>
  ),
  link: (
    <>
      <rect x="5" y="3" width="10" height="18" rx="2" />
      <path d="M17 8l4 4-4 4" />
    </>
  ),
  check: <path d="M4 13l5 6 11-15" />,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  flow: (
    <>
      <path d="M3 17l5-6 4 4 8-9" />
      <path d="M15 6h5v5" />
    </>
  ),
  report: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
  video: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5l6 3.5-6 3.5z" fill="currentColor" stroke="none" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1.5-4 4-6 7-6s5.5 2 7 6" />
    </>
  ),
};

export default function Icon({ name, size = 24, color = 'currentColor', strokeWidth = 1.6 }: { name: keyof typeof ICONS; size?: number; color?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}
