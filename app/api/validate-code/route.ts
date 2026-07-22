import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const { code } = await request.json();
  if (!code) return NextResponse.json({ valid: false });

  const service = createServiceRoleClient();
  const { data } = await service.from('profiles').select('id').eq('referral_code', code.trim().toUpperCase()).maybeSingle();

  return NextResponse.json({ valid: !!data, discountPercent: data ? 15 : 0 });
}
