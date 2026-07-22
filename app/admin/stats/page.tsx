import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LogoutButton from '@/components/LogoutButton';
import { RevenueChart, FunnelChart } from '@/components/StatsCharts';

function dayKey(d: Date) {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export default async function AdminStatsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') redirect('/account');

  const { data: orders } = await supabase.from('orders').select('amount_cents, status, paid_at, created_at, client_id');
  const { data: clients } = await supabase.from('clients').select('id, referred_by_code, status, created_at');
  const { data: pageEvents } = await supabase
    .from('page_events')
    .select('created_at')
    .eq('event_type', 'order_page_view')
    .gte('created_at', new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString());

  const paidOrders = (orders ?? []).filter((o) => o.status === 'paid');

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const thisMonthRevenueCents = paidOrders
    .filter((o) => o.paid_at && new Date(o.paid_at) >= monthStart)
    .reduce((sum, o) => sum + o.amount_cents, 0);

  const avgOrderValueCents = paidOrders.length ? paidOrders.reduce((s, o) => s + o.amount_cents, 0) / paidOrders.length : 0;
  const referralOrdersCount = (clients ?? []).filter((c) => c.referred_by_code && c.status === 'paid').length;

  // Revenue trend, last 14 days
  const revenueByDay: Record<string, number> = {};
  for (let i = 13; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    revenueByDay[dayKey(d)] = 0;
  }
  paidOrders.forEach((o) => {
    if (!o.paid_at) return;
    const key = dayKey(new Date(o.paid_at));
    if (key in revenueByDay) revenueByDay[key] += o.amount_cents / 100;
  });
  const revenueData = Object.entries(revenueByDay).map(([date, revenue]) => ({ date, revenue: Math.round(revenue * 100) / 100 }));

  // Funnel: page views vs completed orders per day, last 14 days
  const viewsByDay: Record<string, number> = {};
  const ordersByDay: Record<string, number> = {};
  for (let i = 13; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    viewsByDay[dayKey(d)] = 0;
    ordersByDay[dayKey(d)] = 0;
  }
  (pageEvents ?? []).forEach((e) => {
    const key = dayKey(new Date(e.created_at));
    if (key in viewsByDay) viewsByDay[key] += 1;
  });
  (clients ?? []).forEach((c) => {
    if (c.status !== 'paid') return;
    const key = dayKey(new Date(c.created_at));
    if (key in ordersByDay) ordersByDay[key] += 1;
  });
  const funnelData = Object.keys(viewsByDay).map((date) => ({ date, views: viewsByDay[date], orders: ordersByDay[date] }));

  const totalViews = (pageEvents ?? []).length;
  const totalPaid = paidOrders.length;
  const abandonmentRate = totalViews > 0 ? Math.round((1 - totalPaid / totalViews) * 100) : null;

  const statCard = (label: string, value: string, sub?: string) => (
    <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 24 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92' }}>{label}</span>
      <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em', margin: '8px 0 4px' }}>{value}</div>
      {sub && <p style={{ margin: 0, fontSize: 12.5, color: '#8a8b92' }}>{sub}</p>}
    </div>
  );

  return (
    <>
      <Nav />
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 32px 96px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
          <div>
            <Link href="/admin" style={{ fontSize: 13, color: '#55565e' }}>← Clients</Link>
            <h1 style={{ margin: '10px 0 0', fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em' }}>Stats &amp; revenue</h1>
          </div>
          <LogoutButton />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
          {statCard('Revenue this month', `€${(thisMonthRevenueCents / 100).toFixed(2)}`)}
          {statCard('Average order value', `€${(avgOrderValueCents / 100).toFixed(2)}`)}
          {statCard('Orders from referrals', String(referralOrdersCount))}
          {statCard('Total paid orders', String(totalPaid))}
        </div>

        <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 24, marginBottom: 20 }}>
          <span style={{ fontSize: 15, fontWeight: 600 }}>Revenue, last 14 days</span>
          <div style={{ marginTop: 16 }}>
            <RevenueChart data={revenueData} />
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 600 }}>Order page views vs completed orders</span>
            {abandonmentRate !== null && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#55565e' }}>
                {totalViews} views · {totalPaid} paid · ~{abandonmentRate}% didn't complete
              </span>
            )}
          </div>
          <p style={{ margin: '6px 0 0', fontSize: 12.5, color: '#8a8b92' }}>
            Tracking started when this feature was added — earlier orders won't have a matching page view.
          </p>
          <div style={{ marginTop: 16 }}>
            <FunnelChart data={funnelData} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
