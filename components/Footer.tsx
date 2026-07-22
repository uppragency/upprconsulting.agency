import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import LogoutButton from './LogoutButton';

export default async function Footer() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
          </div>

          {/* Services */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
            <span style={{ fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92' }}>Services</span>
            <a href="/#audits" className="footer-link" style={{ color: '#55565e' }}>Social media audit</a>
            <a href="/#audits" className="footer-link" style={{ color: '#55565e' }}>Visual identity audit</a>
            <a href="/#audits" className="footer-link" style={{ color: '#55565e' }}>Website audit</a>
            <a href="/#audits" className="footer-link" style={{ color: '#55565e' }}>UI/UX audit</a>
            <Link href="/calculator" className="footer-link" style={{ color: '#55565e' }}>Cost calculator</Link>
          </div>

          {/* Company */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
            <span style={{ fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92' }}>Company</span>
            <Link href="/order" className="footer-link" style={{ color: '#55565e' }}>Order audit</Link>
            <Link href="/blog" className="footer-link" style={{ color: '#55565e' }}>Blog</Link>
            <Link href="/glossary" className="footer-link" style={{ color: '#55565e' }}>Glossary</Link>
            <Link href="/contact" className="footer-link" style={{ color: '#55565e' }}>Contact</Link>
            <Link href="/roadmap" className="footer-link" style={{ color: '#55565e' }}>Roadmap</Link>
            <Link href="/changelog" className="footer-link" style={{ color: '#55565e' }}>Changelog</Link>
            <Link href="/terms" className="footer-link" style={{ color: '#55565e' }}>Terms &amp; conditions</Link>
            <Link href="/privacy" className="footer-link" style={{ color: '#55565e' }}>Privacy</Link>
          </div>

          {/* My Account */}
          <div className="footer-my-account" style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
            <span style={{ fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92' }}>My Account</span>
            {user ? (
              <>
                <Link href="/account" className="footer-link" style={{ color: '#55565e' }}>View orders</Link>
                <Link href="/account/settings" className="footer-link" style={{ color: '#55565e' }}>Settings &amp; password</Link>
                <Link href="/order" className="footer-link" style={{ color: '#55565e' }}>Order another audit</Link>
                <div style={{ marginTop: 4 }}>
                  <LogoutButton variant="light" />
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="footer-link" style={{ color: '#55565e' }}>Sign in</Link>
                <Link href="/order" className="footer-link" style={{ color: '#55565e' }}>Order &amp; create account</Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 32px' }}>
        <div style={{ borderTop: '1px solid rgba(35,35,38,0.08)', paddingTop: 24, fontSize: 13, color: '#8a8b92', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span>© 2026 UPPR Consulting. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 16 }}>
            <Link href="/sitemap" className="footer-link" style={{ color: '#8a8b92', margin: 0 }}>Sitemap</Link>
            <Link href="/status" className="footer-link" style={{ color: '#8a8b92', margin: 0 }}>Status</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
