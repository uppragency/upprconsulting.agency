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

  const { data: profile } = await supabase
    .from('profiles')
    .select('client_id')
    .eq('id', user.id)
    .single();

  if (!profile?.client_id) {
    return (
      <>
        <div className="gradient-bar" />
        <Nav />
        <section className="container" style={{ padding: '60px 24px' }}>
          <div className="dash-header">
            <h1 style={{ fontSize: 24 }}>Your order is being processed</h1>
            <LogoutButton />
          </div>
          <p style={{ color: 'var(--text-muted)', marginTop: 12 }}>
            Check back in a few minutes. If you've already paid and this message persists, get in touch.
          </p>
        </section>
        <Footer />
      </>
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

  const delivered = deliverables?.filter((d) => d.status === 'delivered') ?? [];

  return (
    <>
      <div className="gradient-bar" />
      <Nav />
      <section className="container" style={{ padding: '60px 24px 100px' }}>
        <div className="dash-header">
          <div>
            <p className="form-eyebrow">Your account</p>
            <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em' }}>
              {client?.business_name ?? 'Welcome'}
            </h1>
          </div>
          <LogoutButton />
        </div>

        <p style={{ color: 'var(--text-muted)', marginTop: 12 }}>
          {client?.status === 'paid' && !delivered.length
            ? 'Your order is in progress. Delivery within 48 hours.'
            : `${delivered.length} of ${deliverables?.length ?? 6} deliverables available.`}
        </p>

        <div className="list-card" style={{ marginTop: 40, maxWidth: 640 }}>
          {deliverables?.map((d) => (
            <div key={d.type} className="dash-row">
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{LABELS[d.type] ?? d.type}</h4>
                {d.status === 'delivered' && d.content_url && (
                  <a href={d.content_url} target="_blank" rel="noreferrer" style={{ fontSize: 14 }}>
                    Open deliverable
                  </a>
                )}
              </div>
              <span className={`dash-status ${d.status === 'delivered' ? 'done' : 'pending'}`}>
                {d.status === 'delivered' ? 'Delivered' : 'In progress'}
              </span>
            </div>
          ))}
        </div>
      </section>
      <Footer />
      <div className="gradient-bar" />
    </>
  );
}
