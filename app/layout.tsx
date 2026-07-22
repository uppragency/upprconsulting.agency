import type { Metadata } from 'next';
import './globals.css';
import { SITE_URL, SITE_NAME, DEFAULT_OG_DESCRIPTION } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'UPPR Consulting — Visual identity, website & social media audit',
    template: `%s — ${SITE_NAME}`,
  },
  description:
    'Get 4 complete audits and 2 personalized videos about your visual identity and website, delivered within 48 hours. 47.97 EUR, one payment.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'UPPR Consulting — Visual identity, website & social media audit',
    description: DEFAULT_OG_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UPPR Consulting — Visual identity, website & social media audit',
    description: DEFAULT_OG_DESCRIPTION,
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  email: 'office@uppr.agency',
  description: DEFAULT_OG_DESCRIPTION,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        {children}
      </body>
    </html>
  );
}
