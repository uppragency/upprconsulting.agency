export const SITE_URL = 'https://upprconsulting-agency.vercel.app';
export const SITE_NAME = 'UPPR Consulting';
export const DEFAULT_OG_DESCRIPTION =
  'The audit that shows you exactly what\'s not working in your website, brand, and social media, before it costs you your audience.';

export function buildMetadata({
  title,
  description,
  path = '',
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}) {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website' as const,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
    },
  };
}
