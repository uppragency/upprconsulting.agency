import Link from 'next/link';

const AUDITURI = [
  { titlu: 'Audit social media', descriere: 'Ce funcționează și ce te costă engagement pe conturile tale.' },
  { titlu: 'Audit identitate vizuală', descriere: 'Consistență, percepție și puncte slabe în logo, culori, tipografie.' },
  { titlu: 'Audit website', descriere: 'Structură, viteză, conversie și ce oprește vizitatorii să cumpere.' },
  { titlu: 'Audit UI/UX', descriere: 'Fricțiuni în experiența de navigare, de la homepage la checkout.' },
];

const VIDEO = [
  { titlu: 'Video 30 min — Website', descriere: 'Analiză live a site-ului tău, explicată pas cu pas.' },
  { titlu: 'Video 30 min — Identitate vizuală & social media', descriere: 'Ce transmite brandul tău acum și ce ar trebui să transmită.' },
];

export default function HomePage() {
  return (
    <main>
      <section className="container" style={{ paddingTop: '5rem', paddingBottom: '4rem' }}>
        <p className="label">UPPR Consulting</p>
        <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', marginTop: '1rem', maxWidth: 720 }}>
          Vezi exact ce oprește businessul tău să convertească.
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: 560, marginTop: '1.25rem' }}>
          4 audituri complete și 2 video-uri personalizate despre identitatea vizuală și website-ul tău,
          livrate în contul tău în 48 de ore. O singură plată, 50 EUR.
        </p>
        <Link href="/formular" className="btn-primary" style={{ marginTop: '2rem' }}>
          Comandă auditul — 50 EUR
        </Link>
      </section>

      <section className="container" style={{ paddingBottom: '4rem' }}>
        <p className="label">Ce primești</p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
            marginTop: '1rem',
          }}
        >
          {AUDITURI.map((item) => (
            <div key={item.titlu} className="gradient-border">
              <div className="card" style={{ height: '100%' }}>
                <h3 style={{ fontSize: '1.05rem' }}>{item.titlu}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  {item.descriere}
                </p>
              </div>
            </div>
          ))}
          {VIDEO.map((item) => (
            <div key={item.titlu} className="gradient-border">
              <div className="card" style={{ height: '100%' }}>
                <h3 style={{ fontSize: '1.05rem' }}>{item.titlu}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  {item.descriere}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container" style={{ paddingBottom: '5rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem' }}>Livrare în 48 de ore, direct în contul tău</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem' }}>
            Completezi formularul, plătești o singură dată, primești acces instant la dashboard.
          </p>
          <Link href="/formular" className="btn-primary" style={{ marginTop: '1.5rem' }}>
            Începe acum
          </Link>
        </div>
      </section>
    </main>
  );
}
