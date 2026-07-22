import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CompetitorUrlWidget from '@/components/CompetitorUrlWidget';

export const metadata = { title: 'How UPPR Consulting compares — UPPR Consulting' };

const CATEGORIES = [
  {
    name: 'Big marketing agencies',
    price: '€1,000+',
    turnaround: '2–4 weeks',
    detail: 'A generalist audit template, junior staff, agency overhead built into the price.',
  },
  {
    name: 'Freelance marketplaces',
    price: 'Variable, often €100–300',
    turnaround: 'Depends entirely on the freelancer',
    detail: "Quality swings wildly. No dashboard, no structure, no guarantee the person has audited a business like yours before.",
  },
  {
    name: 'Free automated tools',
    price: 'Free',
    turnaround: 'Instant',
    detail: 'A score and a list of technical flags, no context, no priority order, no understanding of your actual business.',
  },
];

const AUTOMATED_LIMITS = [
  'Flags technical issues (page speed, broken links) but has no opinion on whether your message actually lands',
  "Can't tell you your brand looks inconsistent across channels, it only sees one URL at a time",
  "Generates a generic score, not specific next steps ranked by what will actually move the needle for you",
  'Has no idea what a good result looks like for your specific type of business',
];

export default function ComparePage() {
  return (
    <>
      <Nav />
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '80px 32px 40px', textAlign: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>How we compare</span>
        <h1 style={{ margin: '12px 0 12px', fontSize: 'clamp(1.75rem, 5vw, 42px)', fontWeight: 600, letterSpacing: '-0.03em' }}>
          Three ways to find out what's wrong. One is built for you.
        </h1>
        <p style={{ margin: 0, color: '#55565e', fontSize: 16, lineHeight: 1.6 }}>
          No fabricated numbers about named competitors here, just an honest look at the categories of options.
        </p>
      </section>

      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '20px 32px 60px' }}>
        <div className="grid-3-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 20 }}>
          {CATEGORIES.map((c) => (
            <div key={c.name} style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 22 }}>
              <h3 style={{ margin: '0 0 10px', fontSize: 15.5, fontWeight: 700 }}>{c.name}</h3>
              <p style={{ margin: '0 0 4px', fontSize: 13.5, color: '#55565e' }}><strong>Price:</strong> {c.price}</p>
              <p style={{ margin: '0 0 10px', fontSize: 13.5, color: '#55565e' }}><strong>Turnaround:</strong> {c.turnaround}</p>
              <p style={{ margin: 0, fontSize: 13.5, color: '#8a8b92', lineHeight: 1.5 }}>{c.detail}</p>
            </div>
          ))}
        </div>
        <div style={{ background: '#232326', color: '#fff', borderRadius: 16, padding: 22, textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 6px', fontSize: 15.5, fontWeight: 700, color: '#e2fa5c' }}>UPPR Consulting</h3>
          <p style={{ margin: 0, fontSize: 13.5, color: 'rgba(255,255,255,0.75)' }}>€47.97, delivered within 48 hours, 4 structured audits + 2 personalized videos, in a real dashboard.</p>
        </div>
      </section>

      <section style={{ maxWidth: 800, margin: '0 auto', padding: '20px 32px 60px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e', display: 'block', marginBottom: 12 }}>
          Human audit vs. automated tools
        </span>
        <h2 style={{ margin: '0 0 20px', fontSize: 'clamp(1.4rem, 4vw, 28px)', fontWeight: 600, letterSpacing: '-0.02em' }}>
          Free tools like PageSpeed or Similarweb are useful. They're just not the whole picture.
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {AUTOMATED_LIMITS.map((l) => (
            <div key={l} style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 12, padding: '14px 18px', fontSize: 14.5, color: '#3a3a40' }}>
              {l}
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 700, margin: '0 auto', padding: '20px 32px 100px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e', display: 'block', marginBottom: 12 }}>
          Curious about a competitor?
        </span>
        <h2 style={{ margin: '0 0 20px', fontSize: 'clamp(1.4rem, 4vw, 28px)', fontWeight: 600, letterSpacing: '-0.02em' }}>
          See the kind of thing a real audit looks for.
        </h2>
        <CompetitorUrlWidget />
      </section>

      <Footer />
    </>
  );
}
