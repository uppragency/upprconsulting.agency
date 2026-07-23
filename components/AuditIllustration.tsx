export default function AuditIllustration({ num, color }: { num: string; color: string }) {
  const common = { width: 40, height: 40, viewBox: '0 0 40 40', fill: 'none' };

  switch (num) {
    // Social media — grid of posts
    case '01':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="14" height="14" rx="3" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" />
          <rect x="22" y="4" width="14" height="14" rx="3" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" />
          <rect x="4" y="22" width="14" height="14" rx="3" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" />
          <rect x="22" y="22" width="14" height="14" rx="3" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    // Visual identity — overlapping color palette circles
    case '02':
      return (
        <svg {...common}>
          <circle cx="14" cy="20" r="10" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.5" />
          <circle cx="24" cy="14" r="10" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1.5" />
          <circle cx="26" cy="26" r="8" fill={color} fillOpacity="0.55" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    // Website — wireframe
    case '03':
      return (
        <svg {...common}>
          <rect x="4" y="6" width="32" height="28" rx="3" stroke={color} strokeWidth="1.5" fill="none" />
          <line x1="4" y1="14" x2="36" y2="14" stroke={color} strokeWidth="1.5" />
          <rect x="9" y="19" width="22" height="3" rx="1.5" fill={color} fillOpacity="0.4" />
          <rect x="9" y="25" width="14" height="3" rx="1.5" fill={color} fillOpacity="0.4" />
        </svg>
      );
    // UI/UX — flow with arrows
    case '04':
      return (
        <svg {...common}>
          <circle cx="7" cy="20" r="4" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" />
          <circle cx="20" cy="10" r="4" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="1.5" />
          <circle cx="33" cy="20" r="4" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" />
          <path d="M10.5 17.5L16.5 12.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M23.5 12.5L29.5 17.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="20" cy="29" r="4" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" />
          <path d="M8.5 23.5L17 27" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M31.5 23.5L23 27" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}
