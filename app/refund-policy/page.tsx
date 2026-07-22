import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Refund Policy',
  description: 'UPPR Consulting audits are personalized products. Read our refund policy before ordering.',
  path: '/refund-policy',
});

export default function RefundPolicyPage() {
  return (
    <>
      <Nav />
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '80px 32px 100px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Legal</span>
        <h1 style={{ margin: '12px 0 8px', fontSize: 38, fontWeight: 600, letterSpacing: '-0.03em' }}>Refund Policy</h1>
        <p style={{ color: '#8a8b92', fontSize: 13, marginBottom: 40 }}>Last updated: July 2026</p>

        <div className="article-prose">
          <div style={{ background: '#fbfaf8', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 14, padding: 22, marginBottom: 28 }}>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 15.5 }}>
              All sales are final. We do not offer refunds, under any circumstances, once an order has been placed.
            </p>
          </div>

          <h2>Why we don't offer refunds</h2>
          <p>
            The audit you order is a personalized product. As soon as your order is placed, our team begins reviewing
            your specific website, brand, and social accounts, work that has real value the moment it starts, whether
            or not the final report has been delivered yet. Unlike a physical product, it can't be "returned."
          </p>

          <h2>What we do instead</h2>
          <p>
            If something is genuinely wrong, delivery is late, a deliverable is missing, or the audit clearly doesn't
            match what was promised, contact us at office@uppr.agency. We will make it right: completing what's
            missing, correcting an error, or revising a finding, but as a fix, not as a refund.
          </p>

          <h2>Before you order</h2>
          <p>
            If you're unsure whether this is the right fit for your business, ask us first at{' '}
            office@uppr.agency or see a sample of real findings on our{' '}
            <a href="/demo">demo page</a> before ordering.
          </p>

          <h2>Payment disputes</h2>
          <p>
            Initiating a chargeback with your bank instead of contacting us directly may result in your account being
            suspended while the dispute is resolved through Stripe.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
