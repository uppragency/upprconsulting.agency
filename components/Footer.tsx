import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cols">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span className="nav-mark" style={{ width: 24, height: 24, borderRadius: 7 }} />
            <span style={{ fontSize: 17, fontWeight: 700 }}>UPPR Consulting</span>
          </div>
          <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: 300, margin: '0 0 20px' }}>
            The audit that shows you exactly what's not working in your website, brand, and social media, before it costs you your audience.
          </p>
          <div className="footer-social">
            <a href="https://uppr.agency" target="_blank" rel="noreferrer" aria-label="UPPR Agency">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M14 8h3V4h-3c-2.2 0-4 1.8-4 4v3H7v4h3v9h4v-9h3l1-4h-4V8c0-.6.4-1 1-1z" /></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><rect x="3" y="3" width="18" height="18" rx="4" /></svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M4 4l16 8-16 8V4z" /></svg>
            </a>
          </div>
        </div>
        <div>
          <h4>Services</h4>
          <a href="/#audituri">Social media audit</a>
          <a href="/#audituri">Visual identity audit</a>
          <a href="/#audituri">Website audit</a>
          <a href="/#audituri">UI/UX audit</a>
        </div>
        <div>
          <h4>Company</h4>
          <Link href="/formular">Order audit</Link>
          <Link href="/cont">Your account</Link>
          <Link href="/legal/termeni">Terms &amp; conditions</Link>
          <Link href="/legal/confidentialitate">Privacy</Link>
        </div>
      </div>
      <div className="footer-bottom">© 2026 UPPR Consulting. All rights reserved.</div>
    </footer>
  );
}
