import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LogoutButton from '@/components/LogoutButton';
import AdminDeliverableRow from '@/components/AdminDeliverableRow';

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
    .select('id, type, status, content_url')
    .eq('client_id', params.id)
    .order('type');

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
      </section>
      <Footer />
    </>
  );
}
