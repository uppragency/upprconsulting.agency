import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Not allowed.' }, { status: 403 });
  }

  const { deliverableId, url } = await request.json();

  if (!deliverableId || !url) {
    return NextResponse.json({ error: 'Missing fields.' }, { status: 400 });
  }

  const service = createServiceRoleClient();

  const { error } = await service
    .from('deliverables')
    .update({ content_url: url, status: 'delivered', delivered_at: new Date().toISOString() })
    .eq('id', deliverableId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
