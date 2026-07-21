import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function ConfirmationPage() {
  return (
    <>
      <div className="gradient-bar" />
      <Nav />
      <section className="container" style={{ maxWidth: 560, padding: '80px 24px', textAlign: 'center' }}>
        <p className="form-eyebrow" style={{ textAlign: 'center' }}>Payment confirmed</p>
        <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 8 }}>
          Your order is in progress
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: 16 }}>
          You'll get the 4 audits and 2 personalized videos in your account within 48 hours.
        </p>
        <Link href="/cont" className="btn-primary" style={{ marginTop: 32 }}>
          Go to your account
        </Link>
      </section>
      <Footer />
      <div className="gradient-bar" />
    </>
  );
}
