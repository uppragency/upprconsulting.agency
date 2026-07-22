import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { INDUSTRIES } from '@/lib/industries';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Audits by industry',
  description: 'Common website, brand, and social media issues we find by business type.',
  path: '/industries',
});

export default function IndustriesPage() {
  return (
    <>
      <Nav />
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 32px 100px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>By industry</span>
        <h1 style={{ margin: '12px 0 40px', fontSize: 'clamp(1.75rem, 5vw, 40px)', fontWeight: 600, letterSpacing: '-0.03em' }}>
          What we typically find, by business type.
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {INDUSTRIES.map((i) => (
            <Link key={i.slug} href={`/industries/${i.slug}`} style={{ display: 'block', background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 24 }}>
              <h2 style={{ margin: '0 0 6px', fontSize: 18, fontWeight: 700 }}>{i.name}</h2>
              <p style={{ margin: 0, fontSize: 14.5, color: '#55565e' }}>{i.tagline}</p>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
