import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';

const DAILY_CAPACITY = 1;
const WEEKLY_CAPACITY = 7;

export async function GET() {
  const service = createServiceRoleClient();

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - 7);

  const { count: todayCount } = await service
    .from('clients')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'paid')
    .gte('created_at', startOfDay.toISOString());

  const { count: weekCount } = await service
    .from('clients')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'paid')
    .gte('created_at', startOfWeek.toISOString());

  return NextResponse.json({
    todayRemaining: Math.max(0, DAILY_CAPACITY - (todayCount ?? 0)),
    weekRemaining: Math.max(0, WEEKLY_CAPACITY - (weekCount ?? 0)),
  });
}
