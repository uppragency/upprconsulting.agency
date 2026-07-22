import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Resources',
  description: 'Free tools and guides from UPPR Consulting: blog, glossary, cost calculator, and comparison guide.',
  path: '/resources',
});

const RESOURCES = [
  {
    href: '/blog',
    icon: '📝',
    title: 'Blog',
    desc: 'Practical notes on audits, brands, and websites, one specific topic at a time.',
  },
  {
    href: '/glossary',
    icon: '📖',
    title: 'Glossary',
    desc: 'Plain-language definitions of the website and marketing terms we use in our audits.',
  },
  {
    href: '/calculator',
    icon: '🧮',
    title: 'Cost calculator',
    desc: "A quick, illustrative estimate of what an outdated website or inconsistent brand could be costing you.",
  },
  {
    href: '/compare',
    icon: '⚖️',
    title: 'How we compare',
    desc: 'An honest look at agencies, freelancers, and free automated tools, and where each one falls short.',
  },
  {
    href: '/demo',
    icon: '👀',
    title: 'See a sample audit',
    desc: 'A real preview of the findings and the dashboard you get, no signup required.',
  },
  {
    href: '/process',
    icon: '🗺️',
    title: 'How it works',
    desc: 'A step-by-step look at exactly what happens after you order.',
  },
  {
    href: '/industries',
    icon: '🏷️',
    title: 'By industry',
    desc: 'Common issues we find, broken down by business type.',
  },
  {
    href: '/faq',
    icon: '❓',
    title: 'FAQ',
    desc: 'Answers about pricing, delivery, billing, and how the audit works.',
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Nav />
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '80px 32px 100px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Resources</span>
        <h1 style={{ margin: '12px 0 40px', fontSize: 'clamp(1.75rem, 5vw, 42px)', fontWeight: 600, letterSpacing: '-0.03em' }}>
          Everything free, in one place.
        </h1>

        <div className="grid-3-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {RESOURCES.map((r) => (
            <Link key={r.href} href={r.href} style={{ display: 'block', background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 26 }}>
              <span style={{ fontSize: 26 }}>{r.icon}</span>
              <h2 style={{ margin: '14px 0 8px', fontSize: 17, fontWeight: 700 }}>{r.title}</h2>
              <p style={{ margin: 0, fontSize: 14, color: '#55565e', lineHeight: 1.55 }}>{r.desc}</p>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
