import type { Metadata } from 'next';
import Aurora from '@/components/Aurora';
import './globals.css';

export const metadata: Metadata = {
  title: 'UPPR Consulting — Audit identitate vizuală, website și social media',
  description:
    'Primești 4 audituri complete și 2 video-uri personalizate despre identitatea vizuală și website-ul tău, livrate în 48 de ore. 50 EUR, o singură plată.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body>
        <Aurora />
        {children}
      </body>
    </html>
  );
}
