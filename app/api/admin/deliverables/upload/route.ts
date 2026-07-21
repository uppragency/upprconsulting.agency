import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Not allowed.' }, { status: 403 });
  }

  const formData = await request.formData();
  const deliverableId = String(formData.get('deliverableId'));
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  }

  const service = createServiceRoleClient();

  const { data: deliverable } = await service.from('deliverables').select('id, client_id').eq('id', deliverableId).single();
  if (!deliverable) {
    return NextResponse.json({ error: 'Deliverable not found.' }, { status: 404 });
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `${deliverable.client_id}/${deliverable.id}-${Date.now()}-${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await service.storage.from('deliverables').upload(path, buffer, {
    contentType: file.type || 'application/octet-stream',
    upsert: true,
  });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { error: updateError } = await service
    .from('deliverables')
    .update({ content_url: `storage:${path}`, status: 'delivered', delivered_at: new Date().toISOString() })
    .eq('id', deliverableId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
