import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';

export async function POST() {
  const service = createServiceRoleClient();
  await service.from('page_events').insert({ event_type: 'order_page_view', path: '/order' });
  return NextResponse.json({ success: true });
}
