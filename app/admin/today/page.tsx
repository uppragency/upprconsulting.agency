import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LogoutButton from '@/components/LogoutButton';
import { DELIVERABLE_LABELS } from '@/components/DeliverableIcon';

export default async function AdminTodayPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') redirect('/account');

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const { data: clients } = await supabase.from('clients').select('id, business_name, status, created_at');
  const { data: deliverables } = await supabase.from('deliverables').select('id, client_id, type, status, delivered_at');

  const newToday = (clients ?? []).filter((c) => new Date(c.created_at) >= startOfDay);
  const paidClients = (clients ?? []).filter((c) => c.status === 'paid');
  const clientById = Object.fromEntries((clients ?? []).map((c) => [c.id, c]));

  const pendingDeliverables = (deliverables ?? [])
    .filter((d) => d.status !== 'delivered' && clientById[d.client_id]?.status === 'paid')
    .map((d) => ({ ...d, client: clientById[d.client_id] }))
    .sort((a, b) => new Date(a.client.created_at).getTime() - new Date(b.client.created_at).getTime());

  const overduePending = pendingDeliverables.filter((d) => (Date.now() - new Date(d.client.created_at).getTime()) / 36e5 > 48);

  const statCard = (label: string, value: string | number) => (
    <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 22 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92' }}>{label}</span>
      <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', marginTop: 6 }}>{value}</div>
    </div>
  );

  return (
    <>
      <Nav />
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '64px 32px 96px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
          <div>
            <Link href="/admin" style={{ fontSize: 13, color: '#55565e' }}>← Clients</Link>
            <h1 style={{ margin: '10px 0 0', fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em' }}>Today</h1>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: '#8a8b92' }}>
              {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <LogoutButton />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 40 }}>
          {statCard('New orders today', newToday.length)}
          {statCard('Deliverables to send', pendingDeliverables.length)}
          {statCard('Overdue (48h+)', overduePending.length)}
          {statCard('Total paid clients', paidClients.length)}
        </div>

        {newToday.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92', display: 'block', marginBottom: 10 }}>
              New orders today
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {newToday.map((c) => (
                <Link key={c.id} href={`/admin/clients/${c.id}`} style={{ display: 'flex', justifyContent: 'space-between', background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 12, padding: '12px 16px', fontSize: 14 }}>
                  <span>{c.business_name}</span>
                  <span style={{ color: c.status === 'paid' ? '#6a7d0a' : '#8a8b92', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{c.status}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92', display: 'block', marginBottom: 10 }}>
            To send, oldest first
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {pendingDeliverables.map((d) => {
              const overdue = (Date.now() - new Date(d.client.created_at).getTime()) / 36e5 > 48;
              return (
                <Link
                  key={d.id}
                  href={`/admin/clients/${d.client_id}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    background: overdue ? 'rgba(192,83,63,0.05)' : '#fff',
                    border: '1px solid rgba(35,35,38,0.1)',
                    borderRadius: 12,
                    padding: '12px 16px',
                    fontSize: 14,
                    flexWrap: 'wrap',
                    gap: 8,
                  }}
                >
                  <span>
                    {d.client.business_name} <span style={{ color: '#8a8b92' }}>· {DELIVERABLE_LABELS[d.type]}</span>
                  </span>
                  {overdue && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, background: '#c0533f', color: '#fff', padding: '2px 8px', borderRadius: 99 }}>
                      OVERDUE
                    </span>
                  )}
                </Link>
              );
            })}
            {!pendingDeliverables.length && <p style={{ color: '#55565e', fontSize: 14 }}>Nothing pending. All caught up.</p>}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
