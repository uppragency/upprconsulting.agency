import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LogoutButton from '@/components/LogoutButton';
import TestimonialActions from '@/components/TestimonialActions';

export default async function AdminTestimonialsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') redirect('/account');

  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('id, rating, quote, status, created_at, clients(business_name)')
    .order('created_at', { ascending: false });

  return (
    <>
      <Nav />
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '64px 32px 96px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
          <div>
            <Link href="/admin" style={{ fontSize: 13, color: '#55565e' }}>← Clients</Link>
            <h1 style={{ margin: '10px 0 0', fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em' }}>Testimonials</h1>
          </div>
          <LogoutButton />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {testimonials?.map((t: any) => (
            <div key={t.id} style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{t.clients?.business_name ?? 'Unknown'}</span>
                  <span style={{ marginLeft: 10, color: '#e2fa5c' }}>{'★'.repeat(t.rating)}</span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    padding: '4px 10px',
                    borderRadius: 99,
                    background: t.status === 'approved' ? 'rgba(226,250,92,0.25)' : t.status === 'rejected' ? 'rgba(192,83,63,0.1)' : 'rgba(35,35,38,0.06)',
                    color: t.status === 'approved' ? '#6a7d0a' : t.status === 'rejected' ? '#c0533f' : '#55565e',
                  }}
                >
                  {t.status}
                </span>
              </div>
              <p style={{ margin: '0 0 14px', fontSize: 14.5, color: '#3a3a40', lineHeight: 1.55 }}>"{t.quote}"</p>
              {t.status === 'pending' && <TestimonialActions id={t.id} />}
            </div>
          ))}
          {!testimonials?.length && <p style={{ color: '#55565e' }}>No testimonials yet.</p>}
        </div>
      </section>
      <Footer />
    </>
  );
}
