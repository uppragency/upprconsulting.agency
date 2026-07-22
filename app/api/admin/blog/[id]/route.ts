import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Not allowed.' }, { status: 403 });

  const { title, content, metaTitle, metaDescription, ogImage, tags, status } = await request.json();
  const service = createServiceRoleClient();

  const { data: existing } = await service.from('articles').select('status, published_at').eq('id', params.id).single();
  const isFirstPublish = status === 'published' && existing?.status !== 'published' && !existing?.published_at;

  const { error } = await service
    .from('articles')
    .update({
      title,
      content,
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
      og_image: ogImage || null,
      tags: tags ?? [],
      status,
      updated_at: new Date().toISOString(),
      ...(isFirstPublish ? { published_at: new Date().toISOString() } : {}),
    })
    .eq('id', params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Not allowed.' }, { status: 403 });

  const service = createServiceRoleClient();
  const { error } = await service.from('articles').delete().eq('id', params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
