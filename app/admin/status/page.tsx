import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LogoutButton from '@/components/LogoutButton';

export default async function AdminStatusPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') redirect('/account');

  const { data: clients } = await supabase.from('clients').select('id, business_name, status, created_at').order('created_at', { ascending: false });
  const { data: deliverables } = await supabase.from('deliverables').select('status');

  const paidCount = clients?.filter((c) => c.status === 'paid').length ?? 0;
  const pendingCount = clients?.filter((c) => c.status === 'pending_payment').length ?? 0;
  const deliveredCount = deliverables?.filter((d) => d.status === 'delivered').length ?? 0;
  const remainingCount = deliverables?.filter((d) => d.status !== 'delivered').length ?? 0;
  const lastOrder = clients?.[0];

  const statCard = (label: string, value: string | number, sub?: string) => (
    <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 24 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92' }}>{label}</span>
      <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em', margin: '8px 0 4px' }}>{value}</div>
      {sub && <p style={{ margin: 0, fontSize: 12.5, color: '#8a8b92' }}>{sub}</p>}
    </div>
  );

  return (
    <>
      <Nav />
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 32px 96px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
          <div>
            <Link href="/admin" style={{ fontSize: 13, color: '#55565e' }}>← Clients</Link>
            <h1 style={{ margin: '10px 0 0', fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em' }}>Status</h1>
          </div>
          <LogoutButton />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {statCard('Paid clients', paidCount)}
          {statCard('Awaiting payment', pendingCount)}
          {statCard('Delivered', deliveredCount, `${remainingCount} remaining`)}
          {statCard('Total orders', clients?.length ?? 0)}
        </div>

        {lastOrder && (
          <div style={{ background: '#fbfaf8', border: '1px solid rgba(35,35,38,0.08)', borderRadius: 16, padding: 20 }}>
            <span style={{ fontSize: 13, color: '#55565e' }}>Last order</span>
            <p style={{ margin: '6px 0 0', fontSize: 15, fontWeight: 600 }}>
              {lastOrder.business_name} · {new Date(lastOrder.created_at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
