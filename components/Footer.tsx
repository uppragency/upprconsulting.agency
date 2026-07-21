import Link from 'next/link';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer style={{ background: '#fbfaf8', borderTop: '1px solid rgba(35,35,38,0.08)' }}>
      <div
        className="grid-4-responsive"
        style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 32px 40px', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr', gap: 48 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, background: '#232326', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
              U
            </div>
            <span style={{ fontWeight: 600, fontSize: 16 }}>UPPR Consulting</span>
          </div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#55565e', maxWidth: 300 }}>
            The audit that shows you exactly what's not working in your website, brand, and social media, before it costs you your audience.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
          <span style={{ fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92' }}>Services</span>
          <a href="/#audits" className="footer-link" style={{ color: '#55565e' }}>Social media audit</a>
          <a href="/#audits" className="footer-link" style={{ color: '#55565e' }}>Visual identity audit</a>
          <a href="/#audits" className="footer-link" style={{ color: '#55565e' }}>Website audit</a>
          <a href="/#audits" className="footer-link" style={{ color: '#55565e' }}>UI/UX audit</a>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
          <span style={{ fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92' }}>Company</span>
          <Link href="/formular" className="footer-link" style={{ color: '#55565e' }}>Order audit</Link>
          <Link href="/cont" className="footer-link" style={{ color: '#55565e' }}>Your account</Link>
          <Link href="/legal/termeni" className="footer-link" style={{ color: '#55565e' }}>Terms &amp; conditions</Link>
          <Link href="/legal/confidentialitate" className="footer-link" style={{ color: '#55565e' }}>Privacy</Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92' }}>Newsletter</span>
          <NewsletterForm />
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 32px' }}>
        <div style={{ borderTop: '1px solid rgba(35,35,38,0.08)', paddingTop: 24, fontSize: 13, color: '#8a8b92' }}>
          © 2026 UPPR Consulting. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
