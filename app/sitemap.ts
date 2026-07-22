import { createClient } from '@/lib/supabase/server';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();
  const { data: articles } = await supabase.from('articles').select('slug, updated_at').eq('status', 'published');

  const base = 'https://upprconsulting.agency';

  const staticRoutes = ['', '/blog', '/glossary', '/order', '/login'].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const articleRoutes = (articles ?? []).map((a) => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: new Date(a.updated_at),
  }));

  return [...staticRoutes, ...articleRoutes];
}
