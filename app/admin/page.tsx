import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LogoutButton from '@/components/LogoutButton';

export default async function AdminPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') redirect('/account');

  const { data: clients } = await supabase.from('clients').select('id, business_name, contact_name, email, status, created_at').order('created_at', { ascending: false });

  const { data: deliverables } = await supabase.from('deliverables').select('client_id, status');

  const counts: Record<string, { total: number; delivered: number }> = {};
  deliverables?.forEach((d) => {
    if (!counts[d.client_id]) counts[d.client_id] = { total: 0, delivered: 0 };
    counts[d.client_id].total += 1;
    if (d.status === 'delivered') counts[d.client_id].delivered += 1;
  });

  return (
    <>
      <Nav />
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 32px 96px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Admin</span>
            <h1 style={{ margin: '8px 0 0', fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em' }}>Clients</h1>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link
              href="/admin/blog"
              className="nav-link"
              style={{ border: '1px solid rgba(35,35,38,0.12)', padding: '9px 18px', borderRadius: 99, fontSize: 14 }}
            >
              Manage blog
            </Link>
            <LogoutButton />
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 20, overflow: 'hidden', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, minWidth: 720 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(35,35,38,0.08)' }}>
                <th style={{ textAlign: 'left', padding: '16px 20px', color: '#55565e', fontWeight: 600 }}>Business</th>
                <th style={{ textAlign: 'left', padding: '16px 20px', color: '#55565e', fontWeight: 600 }}>Contact</th>
                <th style={{ textAlign: 'left', padding: '16px 20px', color: '#55565e', fontWeight: 600 }}>Status</th>
                <th style={{ textAlign: 'left', padding: '16px 20px', color: '#55565e', fontWeight: 600 }}>Progress</th>
                <th style={{ padding: '16px 20px' }} />
              </tr>
            </thead>
            <tbody>
              {clients?.map((c) => {
                const progress = counts[c.id] ?? { total: 0, delivered: 0 };
                return (
                  <tr key={c.id} style={{ borderBottom: '1px solid rgba(35,35,38,0.06)' }}>
                    <td style={{ padding: '16px 20px', fontWeight: 600 }}>{c.business_name}</td>
                    <td style={{ padding: '16px 20px', color: '#55565e' }}>
                      {c.contact_name}
                      <br />
                      <span style={{ fontSize: 12.5 }}>{c.email}</span>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 11,
                          padding: '4px 10px',
                          borderRadius: 99,
                          background: c.status === 'paid' ? 'rgba(226,250,92,0.25)' : 'rgba(35,35,38,0.06)',
                          color: c.status === 'paid' ? '#6a7d0a' : '#55565e',
                        }}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px', color: '#55565e' }}>{progress.delivered} / {progress.total || 6}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <Link href={`/admin/clients/${c.id}`} style={{ fontWeight: 600 }}>
                        Manage →
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {!clients?.length && (
                <tr>
                  <td colSpan={5} style={{ padding: '32px 20px', textAlign: 'center', color: '#55565e' }}>
                    No clients yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </>
  );
}
