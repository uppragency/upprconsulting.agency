import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Quick Guide',
  description: 'A short guide to your UPPR Consulting account: where to find your audits, how the checklist works, and what to do next.',
  path: '/guide',
});

export default function GuidePage() {
  return (
    <>
      <Nav />
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '80px 32px 100px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Quick guide</span>
        <h1 style={{ margin: '12px 0 12px', fontSize: 'clamp(1.75rem, 5vw, 40px)', fontWeight: 600, letterSpacing: '-0.03em' }}>
          Your account, in five minutes.
        </h1>
        <p style={{ margin: '0 0 40px', color: '#55565e', fontSize: 16, lineHeight: 1.6 }}>
          A short reference if you're new here, or forwarding this to someone on your team.
        </p>

        <div className="article-prose">
          <h2>Signing in</h2>
          <p>
            Use the email and password you set when you ordered. Forgot your password? Reset it from{' '}
            <Link href="/login">the sign-in page</Link>.
          </p>

          <h2>Where your audits show up</h2>
          <p>
            Everything lands in <Link href="/account">your account</Link>. Each of the 6 deliverables, four written
            audits and two personalized videos, appears as soon as it's ready. You don't need to wait for all of them
            at once.
          </p>

          <h2>The action checklist</h2>
          <p>
            Once your audits are in, you'll see a checklist of recommendations. Check items off as you implement
            them, both to track your own progress and to see how you compare to other clients.
          </p>

          <h2>Ordering again</h2>
          <p>
            Already have an account? Click "Order another audit" from your dashboard, no need to sign up again. Every
            order shows up in your order history.
          </p>

          <h2>Billing and receipts</h2>
          <p>
            Click "Order details &amp; invoice" from your account to see what you submitted, your billing type, and
            a downloadable payment receipt.
          </p>

          <h2>Referring someone</h2>
          <p>
            Every account has a unique referral link, in <Link href="/account/settings">Settings</Link>. Anyone who
            orders through it gets 15% off, and so do you, on your next order.
          </p>

          <h2>Still stuck?</h2>
          <p>
            Write to us any time at office@uppr.agency, or see the full <Link href="/faq">FAQ</Link>.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
