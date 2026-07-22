import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import TagFilter from '@/components/TagFilter';
import Pagination from '@/components/Pagination';
import { createClient } from '@/lib/supabase/server';
import { estimateReadingTime } from '@/lib/reading-time';
import { buildMetadata } from '@/lib/seo';

export const revalidate = 60;

export const metadata = buildMetadata({
  title: 'Blog',
  description: 'Notes on audits, brands, and websites from UPPR Consulting.',
  path: '/blog',
});

const POSTS_PER_PAGE = 9;

export default async function BlogPage({ searchParams }: { searchParams: { tag?: string; page?: string } }) {
  const supabase = createClient();
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, title, meta_description, content, tags, published_at, og_image')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  const allTags = Array.from(new Set((articles ?? []).flatMap((a) => a.tags ?? []))).sort();
  const activeTag = searchParams.tag;
  const filtered = activeTag ? (articles ?? []).filter((a) => a.tags?.includes(activeTag)) : articles ?? [];

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, Number(searchParams.page) || 1), totalPages);
  const pageItems = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <>
      <Nav />
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 32px 100px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Blog</span>
        <h1 style={{ margin: '12px 0 32px', fontSize: 42, fontWeight: 600, letterSpacing: '-0.03em' }}>Notes on audits, brands, and websites.</h1>

        {allTags.length > 0 && <TagFilter tags={allTags} activeTag={activeTag} />}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {pageItems.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              style={{ display: 'flex', gap: 20, alignItems: 'flex-start', background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 28 }}
            >
              {p.og_image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.og_image}
                  alt={p.title}
                  style={{ width: 96, height: 96, objectFit: 'cover', borderRadius: 12, flexShrink: 0 }}
                />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                {p.tags?.length > 0 && (
                  <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
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
              </div>
            </Link>
          ))}
          {!filtered.length && <p style={{ color: '#55565e' }}>No posts yet. Check back soon.</p>}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} activeTag={activeTag} />
      </section>
      <Footer />
    </>
  );
}
