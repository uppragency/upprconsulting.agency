import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'How UPPR Consulting collects, uses, and protects your personal data.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '80px 32px 100px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Legal</span>
        <h1 style={{ margin: '12px 0 8px', fontSize: 38, fontWeight: 600, letterSpacing: '-0.03em' }}>Privacy Policy</h1>
        <p style={{ color: '#8a8b92', fontSize: 13, marginBottom: 40 }}>Last updated: July 2026</p>

        <div className="article-prose">
          <p>UPPR Consulting collects and processes the minimum personal data needed to deliver the Service.</p>

          <h2>1. What we collect</h2>
          <p>
            When you order an audit, we collect your name, email, business name, website and social media links, and
            an optional description of your business. If you pay as a company, we also collect your company's legal
            name, tax ID, registration number, and registered address, solely to issue an invoice.
          </p>

          <h2>2. Payment data</h2>
          <p>
            Payments are handled entirely by Stripe. We never receive or store your card number, expiry date, or
            CVC.
          </p>

          <h2>3. How we use your data</h2>
          <p>
            To create and manage your account, deliver your audits and videos, respond to support requests, and, if
            you opt in, send you occasional emails about audits and website tips.
          </p>

          <h2>4. Data retention</h2>
          <p>
            We keep your account and order data for as long as your account is active. You can request deletion of
            your audit files at any time by emailing office@uppr.agency; we will remove them from storage, keeping
            only the minimal billing records required by law.
          </p>

          <h2>5. Sharing</h2>
          <p>
            We do not sell your data. We share data only with the service providers required to run the business:
            Supabase (hosting and database), Stripe (payments). Both are bound by their own data protection
            obligations.
          </p>

          <h2>6. Your rights</h2>
          <p>
            You can request access to, correction of, or deletion of your personal data at any time by emailing
            office@uppr.agency.
          </p>

          <h2>7. Cookies</h2>
          <p>
            We use only the cookies required to keep you signed in. We do not currently use third-party advertising
            or tracking cookies.
          </p>

          <h2>8. Contact</h2>
          <p>Questions about this policy: office@uppr.agency.</p>
        </div>
      </section>
      <Footer />
    </>
  );
}
