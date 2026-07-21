import Link from 'next/link';

export default function Nav() {
  return (
    <nav style={{ position: 'sticky', top: 14, zIndex: 50, padding: '0 16px' }}>
      <div
        style={{
          maxWidth: 1060,
          margin: '0 auto',
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(35,35,38,0.08)',
          borderRadius: 99,
          padding: '8px 8px 8px 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          boxShadow: '0 12px 40px -16px rgba(35,35,38,0.25)',
        }}
      >
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#232326', borderRadius: 99, padding: '7px 16px 7px 8px' }}
        >
          <span
            style={{
              width: 24,
              height: 24,
              background: 'var(--accent)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#232326',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
            }}
          >
            U
          </span>
          <span style={{ fontWeight: 600, fontSize: 14, letterSpacing: '-0.01em', color: '#fff' }}>UPPR Consulting</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
          <a href="/#advantages" className="nav-link" style={{ color: '#55565e', padding: '8px 14px', borderRadius: 99 }}>
            Advantages
          </a>
          <a href="/#audits" className="nav-link" style={{ color: '#55565e', padding: '8px 14px', borderRadius: 99 }}>
            Audits
          </a>
          <Link href="/blog" className="nav-link" style={{ color: '#55565e', padding: '8px 14px', borderRadius: 99 }}>
            Blog
          </Link>
          <a href="/#pricing" className="nav-link" style={{ color: '#55565e', padding: '8px 14px', borderRadius: 99 }}>
            Pricing
          </a>
          <Link href="/account" className="nav-link" style={{ color: '#55565e', padding: '8px 14px', borderRadius: 99 }}>
            My Audits
          </Link>
        </div>
        <Link
          href="/order"
          className="btn-dark"
          style={{ background: '#232326', color: '#fff', padding: '9px 18px', borderRadius: 99, fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}
        >
          Order audit <span style={{ fontFamily: 'var(--font-mono)' }}>→</span>
        </Link>
      </div>
    </nav>
  );
}
