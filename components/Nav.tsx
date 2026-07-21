import Link from 'next/link';

export default function Nav() {
  return (
    <div className="nav-wrap">
      <header className="nav">
        <Link href="/" className="nav-logo">
          <span className="nav-mark" />
          UPPR Consulting
        </Link>
        <nav className="nav-links">
          <a href="/#avantaje">Advantages</a>
          <a href="/#audituri">Audits</a>
          <Link href="/formular">Pricing</Link>
          <Link href="/cont">Account</Link>
        </nav>
        <Link href="/formular" className="btn-primary small">
          Order audit
        </Link>
      </header>
    </div>
  );
}
