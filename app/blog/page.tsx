import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { createClient } from '@/lib/supabase/server';

export default async function BlogPage() {
  const supabase = createClient();
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, title, excerpt, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false });

  return (
    <>
      <Nav />
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 32px 100px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Blog</span>
        <h1 style={{ margin: '12px 0 40px', fontSize: 42, fontWeight: 600, letterSpacing: '-0.03em' }}>Notes on audits, brands, and websites.</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {posts?.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              style={{ display: 'block', background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 28 }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#8a8b92' }}>
                {new Date(p.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <h2 style={{ margin: '8px 0 8px', fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em' }}>{p.title}</h2>
              {p.excerpt && <p style={{ margin: 0, color: '#55565e', fontSize: 15, lineHeight: 1.55 }}>{p.excerpt}</p>}
            </Link>
          ))}
          {!posts?.length && <p style={{ color: '#55565e' }}>No posts yet. Check back soon.</p>}
        </div>
      </section>
      <Footer />
    </>
  );
}
