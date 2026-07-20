import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-cols">
          <div>
            <p className="nav-logo" style={{ marginBottom: '0.75rem' }}>UPPR Consulting</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: 320 }}>
              Audit de identitate vizuală, website și social media, livrat de aceeași echipă din spatele UPPR Agency.
            </p>
          </div>
          <div>
            <h4>Serviciu</h4>
            <Link href="/#ce-primesti">Ce primești</Link>
            <Link href="/#cum-functioneaza">Cum funcționează</Link>
            <Link href="/formular">Comandă audit</Link>
            <Link href="/cont">Contul tău</Link>
          </div>
          <div>
            <h4>Companie</h4>
            <a href="https://uppr.agency" target="_blank" rel="noreferrer">UPPR Agency</a>
            <Link href="/legal/termeni">Termeni</Link>
            <Link href="/legal/confidentialitate">Confidențialitate</Link>
            <Link href="/legal/rambursare">Politică rambursare</Link>
          </div>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '2.5rem' }}>
          © 2026 UPPR Consulting. Un produs UPPR Agency.
        </p>
      </div>
    </footer>
  );
}
