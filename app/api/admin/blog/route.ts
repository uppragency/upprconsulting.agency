import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Not allowed.' }, { status: 403 });

  const { title, content, metaTitle, metaDescription, ogImage, tags, relatedSlugs, status } = await request.json();
  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content are required.' }, { status: 400 });
  }

  const service = createServiceRoleClient();
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let i = 1;
  while (true) {
    const { data: existing } = await service.from('articles').select('id').eq('slug', slug).maybeSingle();
    if (!existing) break;
    slug = `${baseSlug}-${++i}`;
  }

  const { data, error } = await service
    .from('articles')
    .insert({
      title,
      slug,
      content,
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
      og_image: ogImage || null,
      tags: tags ?? [],
      related_slugs: relatedSlugs?.length ? relatedSlugs : null,
      status: status ?? 'draft',
      published_at: status === 'published' ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ article: data });
}
