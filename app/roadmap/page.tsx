import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = { title: 'Roadmap — UPPR Consulting' };

const COLUMNS = [
  {
    label: 'Shipped',
    color: '#4ADE80',
    items: [
      'Full audit ordering flow with secure Stripe checkout',
      'Client dashboard with live delivery progress',
      'Action checklist with completion comparison',
      'Order history, multiple orders per account',
      'Downloadable payment receipts',
      'Referral links with automatic discount',
      'Admin panel: client management, deliverable uploads',
      'Blog with automatic glossary linking',
      'Cost calculator',
      'Company invoicing details for legal entities',
    ],
  },
  {
    label: 'In progress',
    color: '#A855F7',
    items: ['Expanding the blog with more audit case studies', 'Refining mobile performance across all pages'],
  },
  {
    label: 'Planned',
    color: '#FBBF24',
    items: [
      'Before/after screenshot comparison once you implement changes',
      'Automatic 6-month audit refresh reminder',
      'Single-file export of all deliverables',
      'Client-side notes on individual checklist items',
    ],
  },
];

export default function RoadmapPage() {
  return (
    <>
      <Nav />
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 32px 100px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Roadmap</span>
        <h1 style={{ margin: '12px 0 40px', fontSize: 'clamp(1.75rem, 5vw, 40px)', fontWeight: 600, letterSpacing: '-0.03em' }}>
          What we've built, and what's next.
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 20 }}>
          {COLUMNS.map((col) => (
            <div key={col.label} style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 24 }}>
              <span
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '5px 12px',
                  borderRadius: 99,
                  background: `${col.color}20`,
                  color: col.color === '#FBBF24' ? '#a5730a' : col.color,
                  marginBottom: 16,
                }}
              >
                {col.label}
              </span>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.items.map((item) => (
                  <li key={item} style={{ fontSize: 14, lineHeight: 1.5, color: '#3a3a40', paddingLeft: 16, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: col.color === '#FBBF24' ? '#a5730a' : col.color }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
