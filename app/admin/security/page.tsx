import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LogoutButton from '@/components/LogoutButton';

export default async function AdminSecurityPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') redirect('/account');

  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { data: attempts } = await supabase
    .from('login_attempts')
    .select('email, success, created_at')
    .gte('created_at', since)
    .order('created_at', { ascending: false })
    .limit(100);

  const failedByEmail: Record<string, number> = {};
  (attempts ?? []).forEach((a) => {
    if (!a.success) failedByEmail[a.email] = (failedByEmail[a.email] ?? 0) + 1;
  });
  const flagged = Object.entries(failedByEmail)
    .filter(([, count]) => count >= 3)
    .sort((a, b) => b[1] - a[1]);

  return (
    <>
      <Nav />
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '64px 32px 96px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
          <div>
            <Link href="/admin" style={{ fontSize: 13, color: '#55565e' }}>← Clients</Link>
            <h1 style={{ margin: '10px 0 0', fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em' }}>Security</h1>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: '#8a8b92' }}>Failed login attempts, last 7 days.</p>
          </div>
          <LogoutButton />
        </div>

        {flagged.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92', display: 'block', marginBottom: 10 }}>
              Flagged (3+ failures)
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {flagged.map(([email, count]) => (
                <div key={email} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(192,83,63,0.06)', border: '1px solid rgba(192,83,63,0.2)', borderRadius: 12, padding: '12px 16px', fontSize: 14 }}>
                  <span>{email}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#c0533f' }}>{count} failed attempts</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92', display: 'block', marginBottom: 10 }}>
            Recent attempts
          </span>
          <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(35,35,38,0.08)' }}>
                  <th style={{ textAlign: 'left', padding: '12px 20px', color: '#55565e', fontSize: 13 }}>Email</th>
                  <th style={{ textAlign: 'left', padding: '12px 20px', color: '#55565e', fontSize: 13 }}>Result</th>
                  <th style={{ textAlign: 'left', padding: '12px 20px', color: '#55565e', fontSize: 13 }}>When</th>
                </tr>
              </thead>
              <tbody>
                {attempts?.map((a, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(35,35,38,0.06)' }}>
                    <td style={{ padding: '10px 20px' }}>{a.email}</td>
                    <td style={{ padding: '10px 20px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '3px 9px', borderRadius: 99, background: a.success ? 'rgba(226,250,92,0.25)' : 'rgba(192,83,63,0.1)', color: a.success ? '#6a7d0a' : '#c0533f' }}>
                        {a.success ? 'Success' : 'Failed'}
                      </span>
                    </td>
                    <td style={{ padding: '10px 20px', color: '#8a8b92', fontSize: 13 }}>
                      {new Date(a.created_at).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
                {!attempts?.length && (
                  <tr><td colSpan={3} style={{ padding: '20px', textAlign: 'center', color: '#8a8b92' }}>No login attempts recorded yet.</td></tr>
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
