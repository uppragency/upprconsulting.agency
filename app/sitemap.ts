import { createClient } from '@/lib/supabase/server';
import { INDUSTRIES } from '@/lib/industries';
import { SITE_URL } from '@/lib/seo';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();
  const { data: articles } = await supabase.from('articles').select('slug, updated_at').eq('status', 'published');

  const base = SITE_URL;

  const staticRoutes = [
    '', '/blog', '/glossary', '/order', '/login', '/calculator',
    '/contact', '/roadmap', '/changelog', '/sitemap', '/status', '/terms', '/privacy',
    '/industries', '/compare', '/refund-policy', '/faq', '/process', '/resources', '/ro', '/audit-website-romania',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const industryRoutes = INDUSTRIES.map((i) => ({
    url: `${base}/industries/${i.slug}`,
    lastModified: new Date(),
  }));

  const articleRoutes = (articles ?? []).map((a) => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: new Date(a.updated_at),
  }));

  return [...staticRoutes, ...industryRoutes, ...articleRoutes];
}
