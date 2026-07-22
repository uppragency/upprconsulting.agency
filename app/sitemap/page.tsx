import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = { title: 'Sitemap — UPPR Consulting' };

const GROUPS: { label: string; links: { href: string; title: string }[] }[] = [
  {
    label: 'Consulting',
    links: [
      { href: '/', title: 'Home' },
      { href: '/order', title: 'Order an audit' },
      { href: '/calculator', title: 'Cost calculator' },
      { href: '/demo', title: 'See a sample audit' },
    ],
  },
  {
    label: 'Account',
    links: [
      { href: '/login', title: 'Sign in' },
      { href: '/account', title: 'Your account' },
      { href: '/account/settings', title: 'Account settings' },
    ],
  },
  {
    label: 'Resources',
    links: [
      { href: '/blog', title: 'Blog' },
      { href: '/glossary', title: 'Glossary' },
    ],
  },
  {
    label: 'Company',
    links: [
      { href: '/contact', title: 'Contact' },
      { href: '/roadmap', title: 'Roadmap' },
      { href: '/changelog', title: 'Changelog' },
      { href: '/status', title: 'Status' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { href: '/terms', title: 'Terms & conditions' },
      { href: '/privacy', title: 'Privacy policy' },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <Nav />
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 32px 100px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Sitemap</span>
        <h1 style={{ margin: '12px 0 40px', fontSize: 'clamp(1.75rem, 5vw, 40px)', fontWeight: 600, letterSpacing: '-0.03em' }}>
          Every page on this site.
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: 32 }}>
          {GROUPS.map((group) => (
            <div key={group.label}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92', display: 'block', marginBottom: 14 }}>
                {group.label}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {group.links.map((link) => (
                  <Link key={link.href} href={link.href} style={{ display: 'flex', flexDirection: 'column', color: '#232326' }}>
                    <span style={{ fontSize: 14.5, fontWeight: 600 }}>{link.title}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: '#8a8b92' }}>{link.href}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
