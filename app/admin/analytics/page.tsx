import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LogoutButton from '@/components/LogoutButton';

export default async function AdminAnalyticsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') redirect('/account');

  const now = new Date();
  const startThisWeek = new Date(now);
  startThisWeek.setDate(now.getDate() - 7);
  const startLastWeek = new Date(now);
  startLastWeek.setDate(now.getDate() - 14);

  const { data: events } = await supabase
    .from('page_events')
    .select('path, session_id, created_at, event_type')
    .gte('created_at', startLastWeek.toISOString())
    .order('created_at', { ascending: true });

  const { data: clients } = await supabase.from('clients').select('id, session_id, status, created_at');

  const pageViews = (events ?? []).filter((e) => e.event_type === 'page_view');
  const thisWeek = pageViews.filter((e) => new Date(e.created_at) >= startThisWeek);
  const lastWeek = pageViews.filter((e) => new Date(e.created_at) < startThisWeek && new Date(e.created_at) >= startLastWeek);

  function topPaths(items: typeof pageViews, limit = 8) {
    const counts: Record<string, number> = {};
    items.forEach((e) => {
      counts[e.path] = (counts[e.path] ?? 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit);
  }

  const topThisWeek = topPaths(thisWeek);
  const lastWeekCounts: Record<string, number> = {};
  lastWeek.forEach((e) => {
    lastWeekCounts[e.path] = (lastWeekCounts[e.path] ?? 0) + 1;
  });

  // Conversion map: first page visited per session -> did that session convert to a paid order?
  const firstPathBySession: Record<string, string> = {};
  pageViews.forEach((e) => {
    if (e.session_id && !firstPathBySession[e.session_id]) {
      firstPathBySession[e.session_id] = e.path;
    }
  });

  const paidSessionIds = new Set((clients ?? []).filter((c) => c.status === 'paid' && c.session_id).map((c) => c.session_id));

  const entryPathStats: Record<string, { sessions: number; converted: number }> = {};
  Object.entries(firstPathBySession).forEach(([sessionId, path]) => {
    if (!entryPathStats[path]) entryPathStats[path] = { sessions: 0, converted: 0 };
    entryPathStats[path].sessions += 1;
    if (paidSessionIds.has(sessionId)) entryPathStats[path].converted += 1;
  });

  const conversionRows = Object.entries(entryPathStats)
    .map(([path, s]) => ({ path, ...s, rate: s.sessions ? Math.round((s.converted / s.sessions) * 100) : 0 }))
    .sort((a, b) => b.sessions - a.sessions)
    .slice(0, 8);

  // Traffic drop alert: today's views vs 7-day average
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const todayViews = pageViews.filter((e) => new Date(e.created_at) >= startOfToday).length;
  const last7DaysViews = pageViews.filter((e) => new Date(e.created_at) >= startThisWeek).length;
  const dailyAverage = last7DaysViews / 7;
  const isDropping = dailyAverage > 5 && todayViews < dailyAverage * 0.5 && new Date().getHours() > 14;

  const statCard = (label: string, value: string | number, sub?: string) => (
    <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 22 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92' }}>{label}</span>
      <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', marginTop: 6 }}>{value}</div>
      {sub && <p style={{ margin: '4px 0 0', fontSize: 11.5, color: '#8a8b92' }}>{sub}</p>}
    </div>
  );

  return (
    <>
      <Nav />
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 32px 96px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
          <div>
            <Link href="/admin" style={{ fontSize: 13, color: '#55565e' }}>← Clients</Link>
            <h1 style={{ margin: '10px 0 0', fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em' }}>Analytics</h1>
          </div>
          <LogoutButton />
        </div>

        {isDropping && (
          <div style={{ background: 'rgba(192,83,63,0.08)', border: '1px solid rgba(192,83,63,0.25)', borderRadius: 14, padding: '16px 20px', marginBottom: 24 }}>
            <strong style={{ color: '#c0533f', fontSize: 14 }}>⚠ Traffic looks low today</strong>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#8a3f33' }}>
              {todayViews} page views so far today, vs a daily average of {Math.round(dailyAverage)} over the last 7 days.
            </p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 40 }}>
          {statCard('Page views, last 7 days', last7DaysViews, `${Math.round(dailyAverage)}/day average`)}
          {statCard('Page views, today', todayViews)}
          {statCard('Unique sessions tracked', Object.keys(firstPathBySession).length)}
        </div>

        <div style={{ marginBottom: 40 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92', display: 'block', marginBottom: 12 }}>
            Most visited pages, this week vs last week
          </span>
          <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(35,35,38,0.08)' }}>
                  <th style={{ textAlign: 'left', padding: '12px 20px', color: '#55565e', fontSize: 13 }}>Page</th>
                  <th style={{ textAlign: 'left', padding: '12px 20px', color: '#55565e', fontSize: 13 }}>This week</th>
                  <th style={{ textAlign: 'left', padding: '12px 20px', color: '#55565e', fontSize: 13 }}>Last week</th>
                </tr>
              </thead>
              <tbody>
                {topThisWeek.map(([path, count]) => (
                  <tr key={path} style={{ borderBottom: '1px solid rgba(35,35,38,0.06)' }}>
                    <td style={{ padding: '12px 20px', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{path}</td>
                    <td style={{ padding: '12px 20px', fontWeight: 600 }}>{count}</td>
                    <td style={{ padding: '12px 20px', color: '#8a8b92' }}>{lastWeekCounts[path] ?? 0}</td>
                  </tr>
                ))}
                {!topThisWeek.length && (
                  <tr><td colSpan={3} style={{ padding: '20px', textAlign: 'center', color: '#8a8b92' }}>No page views yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92', display: 'block', marginBottom: 12 }}>
            Conversion by entry page (last 14 days)
          </span>
          <p style={{ margin: '0 0 12px', fontSize: 12.5, color: '#8a8b92' }}>Which page a visitor landed on first, and how often that session led to a paid order.</p>
          <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(35,35,38,0.08)' }}>
                  <th style={{ textAlign: 'left', padding: '12px 20px', color: '#55565e', fontSize: 13 }}>Entry page</th>
                  <th style={{ textAlign: 'left', padding: '12px 20px', color: '#55565e', fontSize: 13 }}>Sessions</th>
                  <th style={{ textAlign: 'left', padding: '12px 20px', color: '#55565e', fontSize: 13 }}>Converted</th>
                  <th style={{ textAlign: 'left', padding: '12px 20px', color: '#55565e', fontSize: 13 }}>Rate</th>
                </tr>
              </thead>
              <tbody>
                {conversionRows.map((r) => (
                  <tr key={r.path} style={{ borderBottom: '1px solid rgba(35,35,38,0.06)' }}>
                    <td style={{ padding: '12px 20px', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{r.path}</td>
                    <td style={{ padding: '12px 20px' }}>{r.sessions}</td>
                    <td style={{ padding: '12px 20px' }}>{r.converted}</td>
                    <td style={{ padding: '12px 20px', fontWeight: 600, color: r.rate > 0 ? '#6a7d0a' : '#8a8b92' }}>{r.rate}%</td>
                  </tr>
                ))}
                {!conversionRows.length && (
                  <tr><td colSpan={4} style={{ padding: '20px', textAlign: 'center', color: '#8a8b92' }}>Not enough data yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
