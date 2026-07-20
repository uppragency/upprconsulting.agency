import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          UPPR Consulting
        </Link>
        <div className="nav-links">
          <Link href="/#ce-primesti">Ce primești</Link>
          <Link href="/#cum-functioneaza">Cum funcționează</Link>
          <Link href="/cont">Cont</Link>
          <Link href="/formular" className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}>
            Comandă audit
          </Link>
        </div>
      </div>
    </nav>
  );
}
