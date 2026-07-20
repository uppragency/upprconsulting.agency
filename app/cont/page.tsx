import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

const LABELS: Record<string, string> = {
  social_audit: 'Audit social media',
  brand_audit: 'Audit identitate vizuală',
  website_audit: 'Audit website',
  uiux_audit: 'Audit UI/UX',
  video_website: 'Video 30 min — Website',
  video_brand: 'Video 30 min — Identitate vizuală & social media',
};

export default async function ContPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/formular');

  const { data: profile } = await supabase
    .from('profiles')
    .select('client_id')
    .eq('id', user.id)
    .single();

  if (!profile?.client_id) {
    return (
      <main className="container" style={{ paddingTop: '4rem' }}>
        <h1 style={{ fontSize: '1.5rem' }}>Comanda ta se procesează</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          Revino peste câteva minute. Dacă ai plătit deja și mesajul persistă, scrie-ne.
        </p>
      </main>
    );
  }

  const { data: client } = await supabase
    .from('clients')
    .select('business_name, status')
    .eq('id', profile.client_id)
    .single();

  const { data: deliverables } = await supabase
    .from('deliverables')
    .select('type, status, content_text, content_url, delivered_at')
    .eq('client_id', profile.client_id);

  const livrate = deliverables?.filter((d) => d.status === 'delivered') ?? [];
  const inAsteptare = deliverables?.filter((d) => d.status === 'pending') ?? [];

  return (
    <main className="container" style={{ paddingTop: '3.5rem', paddingBottom: '4rem' }}>
      <p className="label">Contul tău</p>
      <h1 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>
        {client?.business_name ?? 'Bun venit'}
      </h1>
      <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
        {client?.status === 'paid' && !livrate.length
          ? 'Comanda ta e în lucru. Livrare în maximum 48 de ore.'
          : `${livrate.length} din ${deliverables?.length ?? 6} livrabile disponibile.`}
      </p>

      <div style={{ display: 'grid', gap: '0.75rem', marginTop: '2rem' }}>
        {deliverables?.map((d) => (
          <div key={d.type} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1rem' }}>{LABELS[d.type] ?? d.type}</h3>
              {d.status === 'delivered' && d.content_url && (
                <a href={d.content_url} target="_blank" rel="noreferrer" style={{ color: 'var(--violet-3)', fontSize: '0.9rem' }}>
                  Deschide livrabilul
                </a>
              )}
            </div>
            <span
              className="label"
              style={{ color: d.status === 'delivered' ? 'var(--violet-3)' : 'var(--text-muted)' }}
            >
              {d.status === 'delivered' ? 'Livrat' : 'În lucru'}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
