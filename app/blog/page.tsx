import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import TagFilter from '@/components/TagFilter';
import Pagination from '@/components/Pagination';
import { createClient } from '@/lib/supabase/server';
import { estimateReadingTime } from '@/lib/reading-time';
import { buildMetadata } from '@/lib/seo';
import { BLOG_CATEGORIES, categoryForTags } from '@/lib/blog-categories';

export const revalidate = 60;

export const metadata = buildMetadata({
  title: 'Blog',
  description: 'Notes on audits, brands, and websites from UPPR Consulting.',
  path: '/blog',
});

const POSTS_PER_PAGE = 9;

export default async function BlogPage({ searchParams }: { searchParams: { tag?: string; page?: string; category?: string } }) {
  const supabase = createClient();
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, title, meta_description, content, tags, published_at, og_image')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  const allTags = Array.from(new Set((articles ?? []).flatMap((a) => a.tags ?? []))).sort();
  const activeTag = searchParams.tag;
  const activeCategory = searchParams.category;

  let filtered = articles ?? [];
  if (activeCategory) {
    filtered = filtered.filter((a) => categoryForTags(a.tags ?? []) === activeCategory);
  }
  if (activeTag) {
    filtered = filtered.filter((a) => a.tags?.includes(activeTag));
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, Number(searchParams.page) || 1), totalPages);
  const pageItems = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <>
      <Nav />
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 32px 100px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Blog</span>
        <h1 style={{ margin: '12px 0 24px', fontSize: 42, fontWeight: 600, letterSpacing: '-0.03em' }}>Notes on audits, brands, and websites.</h1>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          <Link
            href="/blog"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13.5,
              fontWeight: 600,
              padding: '8px 16px',
              borderRadius: 99,
              background: !activeCategory ? '#232326' : '#fff',
              color: !activeCategory ? '#fff' : '#55565e',
              border: !activeCategory ? 'none' : '1px solid rgba(35,35,38,0.1)',
            }}
          >
            All categories
          </Link>
          {BLOG_CATEGORIES.map((cat) => (
            <Link
              key={cat.key}
              href={`/blog?category=${cat.key}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 13.5,
                fontWeight: 600,
                padding: '8px 16px',
                borderRadius: 99,
                background: activeCategory === cat.key ? '#232326' : '#fff',
                color: activeCategory === cat.key ? '#fff' : '#55565e',
                border: activeCategory === cat.key ? 'none' : '1px solid rgba(35,35,38,0.1)',
              }}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </Link>
          ))}
        </div>

        {allTags.length > 0 && <TagFilter tags={allTags} activeTag={activeTag} />}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {pageItems[0] && (
            <Link
              href={`/blog/${pageItems[0].slug}`}
              className="grid-2-responsive"
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 1fr',
                gap: 32,
                paddingBottom: 36,
                borderBottom: '1px solid rgba(35,35,38,0.1)',
              }}
            >
              <div
                style={{
                  aspectRatio: '16/10',
                  borderRadius: 16,
                  background: pageItems[0].og_image ? undefined : 'linear-gradient(135deg, #232326, #3a3a40)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {pageItems[0].og_image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={pageItems[0].og_image} alt={pageItems[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  pageItems[0].tags?.[0] && (
                    <span
                      style={{
                        position: 'absolute',
                        left: 20,
                        bottom: 20,
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: 'var(--accent)',
                        background: 'rgba(226,250,92,0.15)',
                        padding: '4px 10px',
                        borderRadius: 99,
                      }}
                    >
                      {pageItems[0].tags[0]}
                    </span>
                  )
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#8a8b92', marginBottom: 10 }}>
                  FEATURED · {estimateReadingTime(pageItems[0].content)} MIN READ
                </span>
                <h2 style={{ margin: '0 0 10px', fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{pageItems[0].title}</h2>
                {pageItems[0].meta_description && (
                  <p style={{ margin: 0, fontSize: 14.5, color: '#55565e', lineHeight: 1.55 }}>{pageItems[0].meta_description}</p>
                )}
              </div>
            </Link>
          )}

          {pageItems.length > 1 && (
            <div className="grid-3-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {pageItems.slice(1).map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} style={{ display: 'block' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#8a8b92', textTransform: 'uppercase' }}>{p.tags?.[0] ?? 'Article'}</span>
                  <h3 style={{ fontSize: 15.5, fontWeight: 600, margin: '6px 0 4px', lineHeight: 1.35 }}>{p.title}</h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#8a8b92' }}>{estimateReadingTime(p.content)} min read</span>
                </Link>
              ))}
            </div>
          )}

          {!filtered.length && <p style={{ color: '#55565e' }}>No posts yet. Check back soon.</p>}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} activeTag={activeTag} />
      </section>
      <Footer />
    </>
  );
}
