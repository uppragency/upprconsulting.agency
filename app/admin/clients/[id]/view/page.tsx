import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { DeliverableIcon, DELIVERABLE_LABELS } from '@/components/DeliverableIcon';

export default async function ViewAsClientPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') redirect('/account');

  const { data: client } = await supabase.from('clients').select('*').eq('id', params.id).single();
  if (!client) notFound();

  const { data: deliverables } = await supabase
    .from('deliverables')
    .select('id, type, status, content_text, content_url, admin_note, delivered_at')
    .eq('client_id', client.id);

  const { data: checklist } = await supabase.from('checklist_items').select('id, label, done').eq('client_id', client.id);

  const delivered = deliverables?.filter((d) => d.status === 'delivered') ?? [];

  return (
    <>
      <Nav />
      <section style={{ background: '#232326', color: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px 40px' }}>
          <div style={{ background: 'rgba(226,250,92,0.15)', border: '1px solid rgba(226,250,92,0.3)', borderRadius: 12, padding: '10px 16px', fontSize: 13, color: '#e2fa5c', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <span>👁 Viewing as client — read-only preview of what {client.contact_name} sees</span>
            <Link href={`/admin/clients/${client.id}`} style={{ color: '#e2fa5c', textDecoration: 'underline' }}>Back to admin</Link>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#e2fa5c' }}>Your account</span>
          <h1 style={{ margin: '10px 0 0', fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em' }}>{client.business_name}</h1>
          <p style={{ margin: '10px 0 0', color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
            {delivered.length} of {deliverables?.length ?? 6} delivered
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 800, margin: '0 auto', padding: '40px 32px 96px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {deliverables?.map((d) => (
          <div key={d.id} style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fbfaf8', border: '1px solid rgba(35,35,38,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <DeliverableIcon type={d.type} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 15, fontWeight: 600 }}>{DELIVERABLE_LABELS[d.type]}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      padding: '4px 10px',
                      borderRadius: 99,
                      background: d.status === 'delivered' ? 'rgba(226,250,92,0.25)' : 'rgba(35,35,38,0.06)',
                      color: d.status === 'delivered' ? '#6a7d0a' : '#55565e',
                    }}
                  >
                    {d.status === 'delivered' ? 'Delivered' : 'In progress'}
                  </span>
                </div>
                {d.admin_note && (
                  <div style={{ marginTop: 10, background: '#fbfaf8', border: '1px solid rgba(35,35,38,0.08)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#3a3a40' }}>
                    <strong>Note from the team:</strong> {d.admin_note}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {checklist && checklist.length > 0 && (
          <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 24 }}>
            <span style={{ fontSize: 16, fontWeight: 600 }}>Action checklist</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
              {checklist.map((item) => (
                <div key={item.id} style={{ fontSize: 14, color: item.done ? '#8a8b92' : '#232326', textDecoration: item.done ? 'line-through' : 'none' }}>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
