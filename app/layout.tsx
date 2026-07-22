import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UPPR Consulting — Visual identity, website & social media audit',
  description:
    'Get 4 complete audits and 2 personalized videos about your visual identity and website, delivered within 48 hours. 47.97 EUR, one payment.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
