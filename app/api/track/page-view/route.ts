import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const { path, sessionId } = await request.json();
  const service = createServiceRoleClient();
  await service.from('page_events').insert({ event_type: 'page_view', path, session_id: sessionId || null });
  return NextResponse.json({ success: true });
}
