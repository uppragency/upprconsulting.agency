import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LogoutButton from '@/components/LogoutButton';

const LABELS: Record<string, string> = {
  social_audit: 'Social media audit',
  brand_audit: 'Visual identity audit',
  website_audit: 'Website audit',
  uiux_audit: 'UI/UX audit',
  video_website: '30-min video — Website',
  video_brand: '30-min video — Visual identity & social media',
};

export default async function ContPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase.from('profiles').select('client_id').eq('id', user.id).single();

  if (!profile?.client_id) {
    return (
      <>
        <Nav />
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: 24, fontWeight: 600 }}>Your order is being processed</h1>
            <LogoutButton />
          </div>
          <p style={{ color: '#55565e', marginTop: 12 }}>
            Check back in a few minutes. If you've already paid and this message persists, get in touch.
          </p>
        </section>
        <Footer />
      </>
    );
  }

  const { data: client } = await supabase.from('clients').select('business_name, status').eq('id', profile.client_id).single();
  const { data: deliverables } = await supabase
    .from('deliverables')
    .select('type, status, content_text, content_url, delivered_at')
    .eq('client_id', profile.client_id);

  const delivered = deliverables?.filter((d) => d.status === 'delivered') ?? [];

  return (
    <>
      <Nav />
      <section style={{ background: '#232326', color: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 32px 96px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#e2fa5c' }}>Your account</span>
              <h1 style={{ margin: '10px 0 0', fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em' }}>{client?.business_name ?? 'Welcome'}</h1>
            </div>
            <LogoutButton />
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 14, fontSize: 16 }}>
            {client?.status === 'paid' && !delivered.length
              ? 'Your order is in progress. Delivery within 48 hours.'
              : `${delivered.length} of ${deliverables?.length ?? 6} deliverables available.`}
          </p>

          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 8, marginTop: 40, maxWidth: 640 }}>
            {deliverables?.map((d) => (
              <div key={d.type} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '14px 18px' }}>
                <div>
                  <span style={{ fontSize: 14, fontWeight: 500, display: 'block' }}>{LABELS[d.type] ?? d.type}</span>
                  {d.status === 'delivered' && d.content_url && (
                    <a href={d.content_url} target="_blank" rel="noreferrer" style={{ fontSize: 12.5, color: '#e2fa5c' }}>
                      Open deliverable
                    </a>
                  )}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    padding: '4px 10px',
                    borderRadius: 99,
                    background: d.status === 'delivered' ? 'rgba(226,250,92,0.15)' : 'rgba(255,255,255,0.08)',
                    color: d.status === 'delivered' ? '#e2fa5c' : 'rgba(255,255,255,0.6)',
                  }}
                >
                  {d.status === 'delivered' ? 'Delivered' : 'In progress'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
