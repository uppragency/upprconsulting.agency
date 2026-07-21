import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/require-admin';

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: 'Not allowed.' }, { status: 403 });

  const { clientId, score } = await request.json();
  if (!clientId || score === undefined) return NextResponse.json({ error: 'Missing fields.' }, { status: 400 });

  const service = createServiceRoleClient();
  const { error } = await service.from('clients').update({ health_score: score }).eq('id', clientId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
