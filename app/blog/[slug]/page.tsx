import { notFound } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { createClient } from '@/lib/supabase/server';
import { estimateReadingTime } from '@/lib/reading-time';
import { linkifyGlossaryTerms } from '@/lib/glossary-linkify';
import { SITE_URL, SITE_NAME } from '@/lib/seo';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: article } = await supabase
    .from('articles')
    .select('title, meta_title, meta_description, og_image')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single();

  if (!article) return {};

  return {
    title: article.meta_title ?? article.title,
    description: article.meta_description ?? undefined,
    alternates: { canonical: `${SITE_URL}/blog/${params.slug}` },
    openGraph: {
      title: article.meta_title ?? article.title,
      description: article.meta_description ?? undefined,
      url: `${SITE_URL}/blog/${params.slug}`,
      siteName: SITE_NAME,
      type: 'article',
      // Only set explicitly if a custom image was uploaded — otherwise Next.js
      // automatically falls back to opengraph-image.tsx in this same route segment.
      images: article.og_image ? [article.og_image] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single();

  if (!article) notFound();

  const { data: relatedRaw } = await supabase
    .from('articles')
    .select('slug, title, tags')
    .eq('status', 'published')
    .neq('id', article.id)
    .order('published_at', { ascending: false })
    .limit(20);

  const related = (relatedRaw ?? [])
    .filter((a) => a.tags?.some((t: string) => article.tags?.includes(t)))
    .slice(0, 3);

  const contentHtml = linkifyGlossaryTerms(article.content);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    author: { '@type': 'Organization', name: 'UPPR Consulting' },
    publisher: { '@type': 'Organization', name: 'UPPR Consulting' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <article style={{ maxWidth: 720, margin: '0 auto', padding: '80px 32px 60px' }}>
        {article.tags?.length > 0 && (
          <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
            {article.tags.map((t: string) => (
              <Link key={t} href={`/blog?tag=${encodeURIComponent(t)}`} className="tag-pill">
                {t}
              </Link>
            ))}
          </div>
        )}
        <h1 style={{ margin: '0 0 14px', fontSize: 40, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{article.title}</h1>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, color: '#8a8b92' }}>
          {new Date(article.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} · {estimateReadingTime(article.content)} min read
        </span>

        {article.og_image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.og_image}
            alt={article.title}
            style={{ width: '100%', maxHeight: 420, objectFit: 'cover', borderRadius: 16, margin: '28px 0 0' }}
          />
        )}

        <div className="article-prose" style={{ marginTop: 32 }} dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>

      {related.length > 0 && (
        <section style={{ maxWidth: 720, margin: '0 auto', padding: '0 32px 100px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92' }}>Related</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 12, padding: '16px 20px', fontWeight: 600, fontSize: 15 }}>
                {r.title}
              </Link>
            ))}
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}
