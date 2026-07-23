import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Roadmap',
  description: 'What UPPR Consulting has shipped so far, what is in progress, and what is planned next.',
  path: '/roadmap',
});

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
      'Blog with automatic glossary linking, tags, and pagination',
      'Cost calculator',
      'Company invoicing details for legal entities',
      'Unread deliverable notification badge in navigation',
      'Celebration animation when all deliverables are ready',
      'Guided first-visit tour of the dashboard',
      '"Email to team" shortcut on each deliverable',
      'Admin "Today" summary page',
      'Industry-specific pages',
      'Comparison page: alternatives and human vs. automated tools',
      'FAQ rich results (schema markup) and a dedicated FAQ page',
      'Dedicated refund policy',
      'Site-wide SEO overhaul: metadata, Open Graph, canonical URLs on every page',
      '65 blog articles covering audits, industries, and website fundamentals',
      'Exit-intent reassurance message on the order page',
      'Client testimonial requests, with admin approval',
      'Smarter related articles (manual picks, then tags, then recent)',
      'Performance pass: public pages render statically again',
      'Two-step order form with a visual progress bar',
      '"How it works" step-by-step process page',
      'Resources hub page',
      'Romanian-language landing page and a keyword-focused audit page',
      'Homepage visual refresh: icons, colored accents, connected stepper, scroll animations',
      'Fixed and hardened discount code validation (found and closed an RLS gap)',
      'Admin panel for creating and managing discount codes, with usage tracking',
      'Blog category filters, on top of tag filtering',
      'Blog posts now link to relevant articles from the client checklist',
      '"Quick guide" page for new clients',
      'Brute-force protection on login, with a challenge after repeated failures',
      'Admin security page: recent login attempts, flagged emails',
      'Admin analytics: top pages, week-over-week comparison, conversion by entry page, low-traffic alert',
      'Site-wide anonymous session tracking, to support conversion analytics',
    ],
  },
  {
    label: 'In progress',
    color: '#A855F7',
    items: [
      'Expanding the blog with more audit case studies',
      'Gathering real client testimonials to replace placeholder ones',
      'Gathering enough analytics data for more precise conversion insights',
    ],
  },
  {
    label: 'Planned',
    color: '#FBBF24',
    items: [
      'Before/after screenshot comparison once you implement changes',
      'Automatic 6-month audit refresh reminder',
      'Single-file export of all deliverables',
      'Client-side notes on individual checklist items',
      'Email notification to the team on new orders',
      'Real (non-placeholder) social proof once order volume grows',
      'Full activity log for admin actions (client creation, password changes)',
      '"Readers who checked this off also read..." recommendations, once enough data exists',
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
