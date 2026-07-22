import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { createClient } from '@/lib/supabase/server';

export const revalidate = 30;
export const metadata = { title: 'Status — UPPR Consulting' };

async function checkDatabase(): Promise<boolean> {
  try {
    const supabase = createClient();
    const { error } = await supabase.from('articles').select('id').limit(1);
    return !error;
  } catch {
    return false;
  }
}

function StatusRow({ label, ok, note }: { label: string; ok: boolean; note?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 22px', borderBottom: '1px solid rgba(35,35,38,0.08)', flexWrap: 'wrap', gap: 8 }}>
      <div>
        <span style={{ fontWeight: 600, fontSize: 15 }}>{label}</span>
        {note && <p style={{ margin: '2px 0 0', fontSize: 12.5, color: '#8a8b92' }}>{note}</p>}
      </div>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 13, color: ok ? '#3a7a3a' : '#c0533f' }}>
        <span style={{ width: 8, height: 8, borderRadius: 99, background: ok ? '#4ADE80' : '#FF6B9D', boxShadow: `0 0 8px ${ok ? '#4ADE80' : '#FF6B9D'}` }} />
        {ok ? 'Operational' : 'Issue detected'}
      </span>
    </div>
  );
}

export default async function StatusPage() {
  const dbOk = await checkDatabase();
  const stripeConfigured = !!process.env.STRIPE_SECRET_KEY;
  const now = new Date().toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <>
      <Nav />
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '80px 32px 100px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Status</span>
        <h1 style={{ margin: '12px 0 8px', fontSize: 'clamp(1.75rem, 5vw, 40px)', fontWeight: 600, letterSpacing: '-0.03em' }}>System status.</h1>
        <p style={{ margin: '0 0 32px', fontSize: 13, color: '#8a8b92' }}>Last checked: {now}</p>

        <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, overflow: 'hidden' }}>
          <StatusRow label="Website" ok={true} note="If this page loaded, hosting is up." />
          <StatusRow label="Database" ok={dbOk} note="Live check against Supabase." />
          <StatusRow label="Payments" ok={stripeConfigured} note="Configuration check, not a live probe of Stripe's own status." />
        </div>

        <p style={{ marginTop: 24, fontSize: 13, color: '#8a8b92', lineHeight: 1.6 }}>
          We don't monitor Stripe's own infrastructure here, they publish their own status at{' '}
          <a href="https://status.stripe.com" target="_blank" rel="noreferrer">status.stripe.com</a>.
        </p>
      </section>
      <Footer />
    </>
  );
}
