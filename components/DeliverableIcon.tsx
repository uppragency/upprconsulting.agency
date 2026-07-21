export const DELIVERABLE_LABELS: Record<string, string> = {
  social_audit: 'Social media audit',
  brand_audit: 'Visual identity audit',
  website_audit: 'Website audit',
  uiux_audit: 'UI/UX audit',
  video_website: '30-min video — Website',
  video_brand: '30-min video — Visual identity & social media',
};

export function DeliverableIcon({ type, color = '#232326' }: { type: string; color?: string }) {
  const common = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.7 };

  switch (type) {
    case 'social_audit':
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3" />
          <path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
        </svg>
      );
    case 'brand_audit':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 4v16M4 12h16" />
        </svg>
      );
    case 'website_audit':
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="12" rx="1.5" />
          <path d="M4 9h16" />
        </svg>
      );
    case 'uiux_audit':
      return (
        <svg {...common}>
          <rect x="4" y="4" width="7" height="16" rx="1.5" />
          <rect x="13" y="4" width="7" height="9" rx="1.5" />
        </svg>
      );
    case 'video_website':
    case 'video_brand':
      return (
        <svg {...common}>
          <rect x="3" y="7" width="12" height="10" rx="2" />
          <path d="M15 10l6-3v10l-6-3z" />
        </svg>
      );
    default:
      return null;
  }
}
