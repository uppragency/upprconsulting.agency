import { createClient } from '@/lib/supabase/server';

export const revalidate = 3600;

function escapeXml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function GET() {
  const supabase = createClient();
  const { data: articles } = await supabase
    .from('articles')
    .select('title, slug, meta_description, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(50);

  const siteUrl = 'https://upprconsulting.agency';

  const items = (articles ?? [])
    .map(
      (a) => `
    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${siteUrl}/blog/${a.slug}</link>
      <guid>${siteUrl}/blog/${a.slug}</guid>
      <pubDate>${new Date(a.published_at).toUTCString()}</pubDate>
      <description>${escapeXml(a.meta_description ?? '')}</description>
    </item>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>UPPR Consulting Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Notes on audits, brands, and websites.</description>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml' } });
}
