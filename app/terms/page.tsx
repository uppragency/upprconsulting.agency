import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = { title: 'Terms & Conditions — UPPR Consulting' };

export default function TermsPage() {
  return (
    <>
      <Nav />
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '80px 32px 100px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Legal</span>
        <h1 style={{ margin: '12px 0 8px', fontSize: 38, fontWeight: 600, letterSpacing: '-0.03em' }}>Terms &amp; Conditions</h1>
        <p style={{ color: '#8a8b92', fontSize: 13, marginBottom: 40 }}>Last updated: July 2026</p>

        <div className="article-prose">
          <p>
            These terms govern your use of upprconsulting.agency and the audit service sold on it ("the Service"),
            operated by UPPR Consulting. By ordering the Service, you agree to these terms.
          </p>

          <h2>1. The Service</h2>
          <p>
            For a one-time payment, you receive four written audits (social media, visual identity, website, UI/UX)
            and two personalized videos, delivered to your account within 48 hours of a confirmed payment. Delivery
            times are a target based on normal operating conditions, not a guaranteed contractual deadline, though we
            treat delays seriously and will communicate if we expect to miss it.
          </p>

          <h2>2. Payment</h2>
          <p>
            Payment is processed securely by Stripe. We do not store your card details. Prices are shown in EUR;
            any other currency shown on the site is an approximate conversion for reference only, the actual charge
            is in EUR.
          </p>

          <h2>3. Refunds</h2>
          <p>
            If you are not satisfied with your audit, contact us within 14 days of delivery at
            {' '}office@uppr.agency. We review every case individually. If the audit was not delivered, or was
            substantially incomplete, we will issue a full refund. If work has been delivered and reviewed, we may
            offer a partial refund or a revision at our discretion.
          </p>

          <h2>4. Accounts</h2>
          <p>
            You are responsible for keeping your account password confidential. One account may be used to place
            multiple orders over time. We may suspend an account used for fraudulent activity or in violation of
            these terms.
          </p>

          <h2>5. Referrals &amp; discounts</h2>
          <p>
            Referral codes give a percentage discount on a single order and are not transferable, exchangeable for
            cash, or combinable with other offers unless explicitly stated.
          </p>

          <h2>6. Intellectual property</h2>
          <p>
            The audits and videos we deliver are yours to use for your own business. We retain no rights over your
            brand assets, website content, or business information shared with us.
          </p>

          <h2>7. Limitation of liability</h2>
          <p>
            The audit is advisory. We are not liable for business outcomes resulting from decisions made based on
            our recommendations. Our total liability under these terms is limited to the amount you paid for the
            Service.
          </p>

          <h2>8. Changes</h2>
          <p>
            We may update these terms from time to time. Continued use of the Service after a change constitutes
            acceptance of the updated terms.
          </p>

          <h2>9. Contact</h2>
          <p>Questions about these terms: office@uppr.agency.</p>
        </div>
      </section>
      <Footer />
    </>
  );
}
