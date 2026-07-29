import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const { testKey, variant, sessionId } = await request.json();
  if (!testKey || !variant || !sessionId) return NextResponse.json({ success: false });

  const service = createServiceRoleClient();

  // One view logged per session per test, avoid inflating counts on repeat visits/renders
  const { data: existing } = await service
    .from('ab_test_events')
    .select('id')
    .eq('test_key', testKey)
    .eq('session_id', sessionId)
    .maybeSingle();

  if (!existing) {
    await service.from('ab_test_events').insert({ test_key: testKey, variant, session_id: sessionId });
  }

  return NextResponse.json({ success: true });
}
