import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = { title: 'Contact — UPPR Consulting' };

function ContactCard({ icon, label, value, href }: { icon: string; label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      style={{ display: 'block', background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 24 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 26 }}>{icon}</span>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92' }}>{label}</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#232326', marginTop: 2 }}>{value}</div>
        </div>
      </div>
    </a>
  );
}

export default function ContactPage() {
  return (
    <>
      <Nav />
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '80px 32px 100px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Get in touch</span>
        <h1 style={{ margin: '12px 0 12px', fontSize: 38, fontWeight: 600, letterSpacing: '-0.03em' }}>Skip the form, just reach out.</h1>
        <p style={{ margin: '0 0 40px', color: '#55565e', fontSize: 15, lineHeight: 1.6 }}>
          Question before ordering, or about an existing audit? Use whichever is faster for you.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          <ContactCard icon="✉️" label="Email" value="office@uppr.agency" href="mailto:office@uppr.agency" />
          <ContactCard icon="💬" label="WhatsApp" value="+40 790 682 363" href="https://wa.me/40790682363" />
        </div>

        <Link href="/order" className="btn-dark" style={{ display: 'inline-block', background: '#232326', color: '#fff', padding: '15px 28px', borderRadius: 99, fontSize: 15, fontWeight: 500 }}>
          Or just order the audit — €47.97
        </Link>
      </section>
      <Footer />
    </>
  );
}
