import Link from 'next/link';

export default function ConfirmarePage() {
  return (
    <main className="container" style={{ maxWidth: 560, paddingTop: '5rem', textAlign: 'center' }}>
      <p className="label">Plată confirmată</p>
      <h1 style={{ fontSize: '2rem', marginTop: '0.75rem' }}>Comanda ta e în lucru</h1>
      <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
        Primești cele 4 audituri și cele 2 video-uri personalizate în contul tău în maximum 48 de ore.
        Îți trimitem un email la fiecare livrabil nou.
      </p>
      <Link href="/cont" className="btn-primary" style={{ marginTop: '2rem' }}>
        Mergi la contul tău
      </Link>
    </main>
  );
}
