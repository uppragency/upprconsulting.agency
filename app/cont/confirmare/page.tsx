import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function ConfirmationPage() {
  return (
    <>
      <Nav />
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '96px 32px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e', margin: 0 }}>Payment confirmed</p>
        <h1 style={{ margin: '12px 0 0', fontSize: 36, fontWeight: 600, letterSpacing: '-0.03em' }}>Your order is in progress</h1>
        <p style={{ color: '#55565e', marginTop: 16, fontSize: 16, lineHeight: 1.6 }}>
          You'll get the 4 audits and 2 personalized videos in your account within 48 hours.
        </p>
        <Link
          href="/cont"
          className="btn-dark"
          style={{ display: 'inline-block', marginTop: 32, background: '#232326', color: '#fff', padding: '15px 28px', borderRadius: 99, fontSize: 15, fontWeight: 500 }}
        >
          Go to your account
        </Link>
      </section>
      <Footer />
    </>
  );
}
