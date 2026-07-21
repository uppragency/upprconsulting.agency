import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { createClient } from '@/lib/supabase/server';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: post } = await supabase.from('blog_posts').select('*').eq('slug', params.slug).eq('published', true).single();

  if (!post) notFound();

  const paragraphs = post.content.split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      <Nav />
      <article style={{ maxWidth: 720, margin: '0 auto', padding: '80px 32px 100px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#8a8b92' }}>
          {new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
        <h1 style={{ margin: '14px 0 32px', fontSize: 40, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{post.title}</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {paragraphs.map((p: string, i: number) => (
            <p key={i} style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: '#333336' }}>
              {p}
            </p>
          ))}
        </div>
      </article>
      <Footer />
    </>
  );
}
