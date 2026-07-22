import Link from 'next/link';
import FooterAccountSection from './FooterAccountSection';

export default function Footer() {
  return (
    <footer style={{ background: '#fbfaf8', borderTop: '1px solid rgba(35,35,38,0.08)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 32px 40px' }}>
        <div className="footer-columns-grid">
          {/* Brand */}
          <div className="footer-brand" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, background: '#232326', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                U
              </div>
              <span style={{ fontWeight: 600, fontSize: 16 }}>UPPR Consulting</span>
            </div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#55565e', maxWidth: 460 }}>
              The audit that shows you exactly what's not working in your website, brand, and social media, before it costs you your audience.
            </p>
            <Link href="/ro" className="footer-link" style={{ color: '#55565e', fontSize: 13 }}>🇷🇴 Versiune în română</Link>
            <Link href="/audit-website-romania" className="footer-link" style={{ color: '#55565e', fontSize: 13 }}>Audit website România</Link>
          </div>

          {/* Services */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
            <span style={{ fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92' }}>Services</span>
            <a href="/#audits" className="footer-link" style={{ color: '#55565e' }}>Social media audit</a>
            <a href="/#audits" className="footer-link" style={{ color: '#55565e' }}>Visual identity audit</a>
            <a href="/#audits" className="footer-link" style={{ color: '#55565e' }}>Website audit</a>
            <a href="/#audits" className="footer-link" style={{ color: '#55565e' }}>UI/UX audit</a>
            <Link href="/calculator" className="footer-link" style={{ color: '#55565e' }}>Cost calculator</Link>
            <Link href="/industries" className="footer-link" style={{ color: '#55565e' }}>By industry</Link>
            <Link href="/compare" className="footer-link" style={{ color: '#55565e' }}>How we compare</Link>
            <Link href="/process" className="footer-link" style={{ color: '#55565e' }}>How it works</Link>
            <Link href="/resources" className="footer-link" style={{ color: '#55565e' }}>Resources</Link>
          </div>

          {/* Company */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
            <span style={{ fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92' }}>Company</span>
            <Link href="/order" className="footer-link" style={{ color: '#55565e' }}>Order audit</Link>
            <Link href="/blog" className="footer-link" style={{ color: '#55565e' }}>Blog</Link>
            <Link href="/glossary" className="footer-link" style={{ color: '#55565e' }}>Glossary</Link>
            <Link href="/faq" className="footer-link" style={{ color: '#55565e' }}>FAQ</Link>
            <Link href="/contact" className="footer-link" style={{ color: '#55565e' }}>Contact</Link>
          </div>

          <FooterAccountSection />
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 32px' }}>
        <div style={{ borderTop: '1px solid rgba(35,35,38,0.08)', paddingTop: 24, fontSize: 13, color: '#8a8b92', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span>© 2026 UPPR Consulting. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/roadmap" className="footer-link" style={{ color: '#8a8b92', margin: 0 }}>Roadmap</Link>
            <Link href="/changelog" className="footer-link" style={{ color: '#8a8b92', margin: 0 }}>Changelog</Link>
            <Link href="/terms" className="footer-link" style={{ color: '#8a8b92', margin: 0 }}>Terms &amp; conditions</Link>
            <Link href="/refund-policy" className="footer-link" style={{ color: '#8a8b92', margin: 0 }}>Refund policy</Link>
            <Link href="/privacy" className="footer-link" style={{ color: '#8a8b92', margin: 0 }}>Privacy</Link>
            <Link href="/sitemap" className="footer-link" style={{ color: '#8a8b92', margin: 0 }}>Sitemap</Link>
            <Link href="/status" className="footer-link" style={{ color: '#8a8b92', margin: 0 }}>Status</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
