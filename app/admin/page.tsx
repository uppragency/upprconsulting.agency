import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LogoutButton from '@/components/LogoutButton';

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { status?: string; sort?: string; q?: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') redirect('/account');

  const { data: clientsRaw } = await supabase
    .from('clients')
    .select('id, business_name, contact_name, email, status, created_at');

  const { data: deliverables } = await supabase.from('deliverables').select('client_id, status');

  const counts: Record<string, { total: number; delivered: number }> = {};
  deliverables?.forEach((d) => {
    if (!counts[d.client_id]) counts[d.client_id] = { total: 0, delivered: 0 };
    counts[d.client_id].total += 1;
    if (d.status === 'delivered') counts[d.client_id].delivered += 1;
  });

  const statusFilter = searchParams.status ?? 'all';
  const sort = searchParams.sort ?? 'date_desc';
  const query = (searchParams.q ?? '').trim().toLowerCase();

  const isOverdue = (c: { id: string; status: string; created_at: string }) => {
    if (c.status !== 'paid') return false;
    const progress = counts[c.id] ?? { total: 6, delivered: 0 };
    const hoursSince = (Date.now() - new Date(c.created_at).getTime()) / 36e5;
    return hoursSince > 48 && progress.delivered < (progress.total || 6);
  };

  let clients = (clientsRaw ?? []).filter((c) => (statusFilter === 'all' ? true : c.status === statusFilter));

  if (query) {
    clients = clients.filter(
      (c) =>
        c.business_name?.toLowerCase().includes(query) ||
        c.contact_name?.toLowerCase().includes(query) ||
        c.email?.toLowerCase().includes(query)
    );
  }

  clients = clients.sort((a, b) => {
    const pa = counts[a.id] ?? { total: 6, delivered: 0 };
    const pb = counts[b.id] ?? { total: 6, delivered: 0 };
    switch (sort) {
      case 'date_asc':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case 'progress_desc':
        return pb.delivered / (pb.total || 1) - pa.delivered / (pa.total || 1);
      case 'progress_asc':
        return pa.delivered / (pa.total || 1) - pb.delivered / (pb.total || 1);
      case 'date_desc':
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const filterLink = (params: Record<string, string>) => {
    const merged = { status: statusFilter, sort, q: query, ...params };
    return `/admin?status=${merged.status}&sort=${merged.sort}${merged.q ? `&q=${encodeURIComponent(merged.q)}` : ''}`;
  };

  const chip = (active: boolean): React.CSSProperties => ({
    padding: '7px 14px',
    borderRadius: 99,
    fontSize: 13,
    fontWeight: 600,
    background: active ? '#232326' : '#fbfaf8',
    color: active ? '#fff' : '#55565e',
    border: active ? 'none' : '1px solid rgba(35,35,38,0.1)',
  });

  return (
    <>
      <Nav />
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 32px 96px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Admin</span>
            <h1 style={{ margin: '8px 0 0', fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em' }}>Clients</h1>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/admin/analytics" className="nav-link" style={{ border: '1px solid rgba(35,35,38,0.12)', padding: '9px 18px', borderRadius: 99, fontSize: 14 }}>
              Analytics
            </Link>
            <Link href="/admin/security" className="nav-link" style={{ border: '1px solid rgba(35,35,38,0.12)', padding: '9px 18px', borderRadius: 99, fontSize: 14 }}>
              Security
            </Link>
            <Link href="/admin/discount-codes" className="nav-link" style={{ border: '1px solid rgba(35,35,38,0.12)', padding: '9px 18px', borderRadius: 99, fontSize: 14 }}>
              Discounts
            </Link>
            <Link href="/admin/testimonials" className="nav-link" style={{ border: '1px solid rgba(35,35,38,0.12)', padding: '9px 18px', borderRadius: 99, fontSize: 14 }}>
              Testimonials
            </Link>
            <Link href="/admin/today" className="nav-link" style={{ border: '1px solid rgba(35,35,38,0.12)', padding: '9px 18px', borderRadius: 99, fontSize: 14 }}>
              Today
            </Link>
            <Link href="/admin/stats" className="nav-link" style={{ border: '1px solid rgba(35,35,38,0.12)', padding: '9px 18px', borderRadius: 99, fontSize: 14 }}>
              Stats
            </Link>
            <Link href="/admin/status" className="nav-link" style={{ border: '1px solid rgba(35,35,38,0.12)', padding: '9px 18px', borderRadius: 99, fontSize: 14 }}>
              Status
            </Link>
            <Link href="/admin/blog" className="nav-link" style={{ border: '1px solid rgba(35,35,38,0.12)', padding: '9px 18px', borderRadius: 99, fontSize: 14 }}>
              Manage blog
            </Link>
            <LogoutButton />
          </div>
        </div>

        <form method="get" style={{ marginBottom: 20 }}>
          {statusFilter !== 'all' && <input type="hidden" name="status" value={statusFilter} />}
          {sort !== 'date_desc' && <input type="hidden" name="sort" value={sort} />}
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search by business, contact, or email..."
            style={{ width: '100%', maxWidth: 360, border: '1px solid rgba(35,35,38,0.12)', borderRadius: 10, padding: '10px 14px', fontSize: 14, fontFamily: 'var(--font-body)' }}
          />
        </form>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 20, alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <Link href={filterLink({ status: 'all' })} style={chip(statusFilter === 'all')}>All</Link>
            <Link href={filterLink({ status: 'paid' })} style={chip(statusFilter === 'paid')}>Paid</Link>
            <Link href={filterLink({ status: 'pending_payment' })} style={chip(statusFilter === 'pending_payment')}>Pending</Link>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <Link href={filterLink({ sort: 'date_desc' })} style={chip(sort === 'date_desc')}>Newest</Link>
            <Link href={filterLink({ sort: 'date_asc' })} style={chip(sort === 'date_asc')}>Oldest</Link>
            <Link href={filterLink({ sort: 'progress_asc' })} style={chip(sort === 'progress_asc')}>Least progress</Link>
            <Link href={filterLink({ sort: 'progress_desc' })} style={chip(sort === 'progress_desc')}>Most progress</Link>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 20, overflow: 'hidden', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, minWidth: 760 }}>
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
              {clients.map((c) => {
                const progress = counts[c.id] ?? { total: 0, delivered: 0 };
                const overdue = isOverdue(c);
                return (
                  <tr key={c.id} style={{ borderBottom: '1px solid rgba(35,35,38,0.06)', background: overdue ? 'rgba(192,83,63,0.05)' : 'transparent' }}>
                    <td style={{ padding: '16px 20px', fontWeight: 600 }}>
                      {c.business_name}
                      {overdue && (
                        <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 10.5, background: '#c0533f', color: '#fff', padding: '2px 8px', borderRadius: 99 }}>
                          OVERDUE
                        </span>
                      )}
                    </td>
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
                    <td style={{ padding: '16px 20px', display: 'flex', gap: 14 }}>
                      <Link href={`/admin/clients/${c.id}`} style={{ fontWeight: 600 }}>
                        Manage →
                      </Link>
                      <Link href={`/admin/clients/${c.id}/view`} style={{ color: '#55565e' }}>
                        View as client
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {!clients.length && (
                <tr>
                  <td colSpan={5} style={{ padding: '32px 20px', textAlign: 'center', color: '#55565e' }}>
                    No clients match this filter.
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
