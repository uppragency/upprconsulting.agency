import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { createClient } from '@/lib/supabase/server';
import { estimateReadingTime } from '@/lib/reading-time';

export const revalidate = 60;

export default async function BlogPage({ searchParams }: { searchParams: { tag?: string } }) {
  const supabase = createClient();
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, title, meta_description, content, tags, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  const allTags = Array.from(new Set((articles ?? []).flatMap((a) => a.tags ?? []))).sort();
  const activeTag = searchParams.tag;
  const filtered = activeTag ? (articles ?? []).filter((a) => a.tags?.includes(activeTag)) : articles ?? [];

  return (
    <>
      <Nav />
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 32px 100px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Blog</span>
        <h1 style={{ margin: '12px 0 32px', fontSize: 42, fontWeight: 600, letterSpacing: '-0.03em' }}>Notes on audits, brands, and websites.</h1>

        {allTags.length > 0 && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
            <Link href="/blog" className={`tag-pill${!activeTag ? ' active' : ''}`}>
              All
            </Link>
            {allTags.map((tag) => (
              <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className={`tag-pill${activeTag === tag ? ' active' : ''}`}>
                {tag}
              </Link>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              style={{ display: 'block', background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 28 }}
            >
              {p.tags?.length > 0 && (
                <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                  {p.tags.map((t: string) => (
                    <span key={t} className="tag-pill">{t}</span>
                  ))}
                </div>
              )}
              <h2 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em' }}>{p.title}</h2>
              {p.meta_description && <p style={{ margin: '0 0 10px', color: '#55565e', fontSize: 15, lineHeight: 1.55 }}>{p.meta_description}</p>}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#8a8b92' }}>
                {new Date(p.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} · {estimateReadingTime(p.content)} min read
              </span>
            </Link>
          ))}
          {!filtered.length && <p style={{ color: '#55565e' }}>No posts yet. Check back soon.</p>}
        </div>
      </section>
      <Footer />
    </>
  );
}
