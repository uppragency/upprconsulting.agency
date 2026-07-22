import { notFound } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { INDUSTRIES, getIndustry } from '@/lib/industries';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const industry = getIndustry(params.slug);
  if (!industry) return {};
  return buildMetadata({
    title: `Website & brand audit for ${industry.name}`,
    description: industry.tagline,
    path: `/industries/${industry.slug}`,
  });
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = getIndustry(params.slug);
  if (!industry) notFound();

  return (
    <>
      <Nav />
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '80px 32px 40px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>{industry.name}</span>
        <h1 style={{ margin: '12px 0 12px', fontSize: 'clamp(1.75rem, 5vw, 40px)', fontWeight: 600, letterSpacing: '-0.03em' }}>{industry.tagline}</h1>
        <p style={{ margin: 0, color: '#55565e', fontSize: 16, lineHeight: 1.6 }}>{industry.whyItMatters}</p>
      </section>

      <section style={{ maxWidth: 720, margin: '0 auto', padding: '0 32px 60px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92', display: 'block', marginBottom: 14 }}>
          What we commonly find in this industry
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {industry.painPoints.map((p) => (
            <div key={p} style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 12, padding: '16px 20px', fontSize: 14.5, color: '#3a3a40', display: 'flex', gap: 10 }}>
              <span style={{ color: '#c0533f' }}>✕</span>
              {p}
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#232326', color: '#fff' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '64px 32px', textAlign: 'center' }}>
          <h2 style={{ margin: '0 0 12px', fontSize: 'clamp(1.4rem, 4vw, 28px)', fontWeight: 600 }}>See what's true for your {industry.name.toLowerCase()}.</h2>
          <p style={{ margin: '0 0 24px', color: 'rgba(255,255,255,0.7)', fontSize: 15 }}>These are common patterns, your audit is specific to your business.</p>
          <Link href="/order" className="btn-accent" style={{ background: '#e2fa5c', color: '#232326', padding: '14px 28px', borderRadius: 99, fontSize: 15, fontWeight: 600 }}>
            Order the audit — €47.97
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
