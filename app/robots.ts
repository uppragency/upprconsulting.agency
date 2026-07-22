import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/demo', '/admin', '/admin/*', '/account', '/account/*', '/api/*'],
    },
    sitemap: 'https://upprconsulting.agency/sitemap.xml',
  };
}
