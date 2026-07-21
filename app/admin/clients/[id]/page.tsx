import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LogoutButton from '@/components/LogoutButton';
import AdminDeliverableRow from '@/components/AdminDeliverableRow';
import AdminChecklistManager from '@/components/AdminChecklistManager';
import AdminHealthScore from '@/components/AdminHealthScore';

export default async function AdminClientPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') redirect('/account');

  const { data: client } = await supabase.from('clients').select('*').eq('id', params.id).single();
  if (!client) redirect('/admin');

  const { data: deliverables } = await supabase
    .from('deliverables')
    .select('id, type, status, content_url, admin_note')
    .eq('client_id', params.id)
    .order('type');

  const { data: checklist } = await supabase
    .from('checklist_items')
    .select('id, label, done')
    .eq('client_id', params.id)
    .order('created_at');

  return (
    <>
      <Nav />
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '64px 32px 96px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap', marginBottom: 8 }}>
          <div>
            <Link href="/admin" style={{ fontSize: 13, color: '#55565e' }}>← All clients</Link>
            <h1 style={{ margin: '10px 0 0', fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em' }}>{client.business_name}</h1>
            <p style={{ margin: '6px 0 0', color: '#55565e', fontSize: 14 }}>
              {client.contact_name} · {client.email} · {client.phone}
            </p>
          </div>
          <LogoutButton />
        </div>

        {client.project_description && (
          <div style={{ background: '#fbfaf8', border: '1px solid rgba(35,35,38,0.08)', borderRadius: 14, padding: 20, marginTop: 20, fontSize: 14, color: '#55565e', lineHeight: 1.6 }}>
            {client.project_description}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 32 }}>
          {deliverables?.map((d) => (
            <AdminDeliverableRow key={d.id} deliverable={d} />
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }} className="grid-2-responsive">
          <AdminHealthScore clientId={client.id} initialScore={client.health_score} />
          <AdminChecklistManager clientId={client.id} items={checklist ?? []} />
        </div>
      </section>
      <Footer />
    </>
  );
}
