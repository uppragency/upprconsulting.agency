import { NextResponse } from 'next/server';
import { createClient, createServiceRoleClient } from '@/lib/supabase/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const { data: profile } = await supabase.from('profiles').select('client_id, role').eq('id', user.id).single();

  const { data: deliverable } = await supabase
    .from('deliverables')
    .select('id, client_id, content_url, status')
    .eq('id', params.id)
    .single();

  if (!deliverable || deliverable.status !== 'delivered' || !deliverable.content_url) {
    return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  }

  const isOwner = profile?.client_id === deliverable.client_id;
  const isAdmin = profile?.role === 'admin';

  if (!isOwner && !isAdmin) {
    return NextResponse.json({ error: 'Not allowed.' }, { status: 403 });
  }

  // Files uploaded through the admin panel are stored as "storage:<path>"
  if (deliverable.content_url.startsWith('storage:')) {
    const path = deliverable.content_url.replace('storage:', '');
    const admin = createServiceRoleClient();
    const { data: signed, error } = await admin.storage.from('deliverables').createSignedUrl(path, 60);

    if (error || !signed) {
      return NextResponse.json({ error: 'Could not generate download link.' }, { status: 500 });
    }

    return NextResponse.redirect(signed.signedUrl);
  }

  // Otherwise it's a pasted link (e.g. a Loom/Vimeo video URL)
  return NextResponse.redirect(deliverable.content_url);
}
