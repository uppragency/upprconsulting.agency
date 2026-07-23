export const BLOG_CATEGORIES = [
  { key: 'social', label: 'Social media', icon: '📱', tags: ['social media audit', 'social media', 'instagram', 'engagement rate', 'content strategy'] },
  { key: 'brand', label: 'Visual identity', icon: '🎨', tags: ['visual identity audit', 'brand identity', 'brand consistency', 'brand voice', 'branding', 'rebrand'] },
  { key: 'website', label: 'Website', icon: '🌐', tags: ['website audit', 'conversion rate', 'core web vitals', 'bounce rate', 'seo', 'local seo', 'ecommerce', 'checkout'] },
  { key: 'uiux', label: 'UI/UX', icon: '🧭', tags: ['ui/ux audit', 'usability testing', 'user flow', 'wireframe', 'accessibility', 'mobile-first design'] },
];

export function categoryForTags(tags: string[]): string | null {
  for (const cat of BLOG_CATEGORIES) {
    if (tags.some((t) => cat.tags.includes(t))) return cat.key;
  }
  return null;
}
