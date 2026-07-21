import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LogoutButton from '@/components/LogoutButton';

export default async function AdminBlogPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') redirect('/account');

  const { data: posts } = await supabase.from('blog_posts').select('id, title, slug, published, created_at').order('created_at', { ascending: false });

  return (
    <>
      <Nav />
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '64px 32px 96px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
          <div>
            <Link href="/admin" style={{ fontSize: 13, color: '#55565e' }}>← Clients</Link>
            <h1 style={{ margin: '10px 0 0', fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em' }}>Blog posts</h1>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/admin/blog/new" className="btn-dark" style={{ background: '#232326', color: '#fff', padding: '10px 20px', borderRadius: 99, fontSize: 14, fontWeight: 500 }}>
              New post
            </Link>
            <LogoutButton />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {posts?.map((p) => (
            <Link
              key={p.id}
              href={`/admin/blog/${p.id}/edit`}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 14, padding: '16px 20px' }}
            >
              <span style={{ fontWeight: 600 }}>{p.title}</span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  padding: '4px 10px',
                  borderRadius: 99,
                  background: p.published ? 'rgba(226,250,92,0.25)' : 'rgba(35,35,38,0.06)',
                  color: p.published ? '#6a7d0a' : '#55565e',
                }}
              >
                {p.published ? 'Published' : 'Draft'}
              </span>
            </Link>
          ))}
          {!posts?.length && <p style={{ color: '#55565e' }}>No posts yet.</p>}
        </div>
      </section>
      <Footer />
    </>
  );
}
