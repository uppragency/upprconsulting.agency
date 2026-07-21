import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Not allowed.' }, { status: 403 });

  const { clientId, label } = await request.json();
  if (!clientId || !label) return NextResponse.json({ error: 'Missing fields.' }, { status: 400 });

  const service = createServiceRoleClient();
  const { error } = await service.from('checklist_items').insert({ client_id: clientId, label });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Not allowed.' }, { status: 403 });

  const { itemId } = await request.json();
  const service = createServiceRoleClient();
  const { error } = await service.from('checklist_items').delete().eq('id', itemId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
