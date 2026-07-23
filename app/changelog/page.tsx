import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Changelog',
  description: 'A dated history of every update shipped to the UPPR Consulting platform.',
  path: '/changelog',
});

const ENTRIES = [
  {
    date: 'July 2026',
    tag: 'v3.6',
    items: [
      'Fixed a security gap where discount and referral codes silently failed for anonymous visitors',
      'New admin pages: discount codes (create/manage/track usage), analytics, and security',
      'Login now requires a simple verification question after repeated failed attempts',
      'Blog: category filters (by audit type), checklist items now link to relevant articles',
      'New "Quick guide" page for clients',
      'Homepage visual polish: icons, color-coded sections, connected step indicators, scroll-in animations',
      'Admin "Today" page now shows today vs. yesterday comparisons',
    ],
  },
  {
    date: 'July 2026',
    tag: 'v3.2',
    items: [
      'Full SEO overhaul: metadata, Open Graph, Twitter cards, and canonical URLs on every page',
      '65 new blog articles, covering audits, industries, and website fundamentals',
      'Blog: collapsible tag filter, pagination, cover images with proper alt text',
      'Newsletter signup removed (replaced by TheMarketer after the domain switch)',
      'Order page: exit-intent reassurance message, two-step form with a progress bar',
      'Client testimonial requests after full delivery, with admin approval workflow',
      'Dedicated FAQ page, separate from the homepage section',
      'Smarter related articles: manual picks first, then shared tags, then most recent',
      'Performance pass: public pages render statically again (moved auth checks client-side)',
      'Homepage "Recent in blog" section removed',
      'New pages: "How it works" process guide, Resources hub',
      'Romanian-language landing page and a keyword-focused audit page for local search',
    ],
  },
  {
    date: 'July 2026',
    tag: 'v2.8',
    items: [
      'Dashboard: notification badge for unread deliverables, celebration animation on completion',
      'Dashboard: guided first-visit tour, "email to team" shortcut on each deliverable',
      'Admin: new "Today" page with a daily summary of orders and pending deliverables',
      'New pages: industry-specific audits, comparison vs. alternatives, dedicated refund policy',
      'FAQ schema markup for Google rich results',
      'Refund policy clarified: personalized product, no refunds after ordering',
    ],
  },
  {
    date: 'July 2026',
    tag: 'v2.6',
    items: [
      'Fixed a crash on the account page caused by nested links',
      'Footer redesigned into 4 columns on desktop (Brand, Services, Company, My Account)',
      'Login redirect loop fixed with a full page navigation instead of a soft transition',
    ],
  },
  {
    date: 'July 2026',
    tag: 'v2.3 – v2.5',
    items: [
      'Mobile navigation redesigned: hamburger menu with full-screen slide-in panel',
      'Order form restructured: billing type (individual/company), invoicing fields, live order summary with discount codes',
      'Price updated across the entire site',
      'Terms & Privacy pages published',
    ],
  },
  {
    date: 'July 2026',
    tag: 'v2.0 – v2.2',
    items: [
      'Admin panel: client list with search, filters, and overdue-order alerts',
      'Admin: "view as client" preview, per-deliverable private notes, digital health score',
      'Client dashboard: progress bar, delivery timeline, checklist with peer comparison',
      'Order history: one account can hold multiple orders, resume unpaid orders',
      'Referral links with automatic 15% discount',
      'Stats & revenue dashboard for admin, with charts',
      'Order page view tracking for conversion analysis',
    ],
  },
  {
    date: 'July 2026',
    tag: 'v1.5 – v1.9',
    items: [
      'Entire site translated to English, routes renamed (/formular → /order, /cont → /account)',
      'Blog rebuilt with draft/published status, tags, and automatic glossary linking',
      'RSS feed and auto-generated social preview images for blog posts',
      'Admin account created, client deliverable upload (PDF/video links)',
    ],
  },
  {
    date: 'July 2026',
    tag: 'v1.0 – v1.4',
    items: [
      'Initial launch: Stripe checkout, Supabase authentication, client dashboard',
      'Design fully rebuilt to the current light theme with the UPPR Consulting identity',
      'Homepage sections: comparison table, testimonials, pricing, FAQ',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <>
      <Nav />
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '80px 32px 100px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Changelog</span>
        <h1 style={{ margin: '12px 0 40px', fontSize: 'clamp(1.75rem, 5vw, 40px)', fontWeight: 600, letterSpacing: '-0.03em' }}>
          Every update, in plain language.
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {ENTRIES.map((entry) => (
            <div key={entry.tag} style={{ borderLeft: '2px solid rgba(35,35,38,0.1)', paddingLeft: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--violet)' }}>{entry.date}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, background: 'rgba(35,35,38,0.06)', color: '#55565e', padding: '3px 10px', borderRadius: 99 }}>{entry.tag}</span>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {entry.items.map((item) => (
                  <li key={item} style={{ fontSize: 14.5, lineHeight: 1.55, color: '#3a3a40' }}>
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
