import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const { code } = await request.json();
  if (!code) return NextResponse.json({ valid: false });

  const normalized = code.trim().toUpperCase();
  const service = createServiceRoleClient();

  // Fixed marketing/personal discount codes take priority
  const { data: fixedCode } = await service
    .from('discount_codes')
    .select('percent_off')
    .eq('code', normalized)
    .eq('active', true)
    .maybeSingle();

  if (fixedCode) {
    return NextResponse.json({ valid: true, discountPercent: fixedCode.percent_off });
  }

  // Otherwise, check if it's a user's referral code
  const { data: referrer } = await service.from('profiles').select('id').eq('referral_code', normalized).maybeSingle();

  return NextResponse.json({ valid: !!referrer, discountPercent: referrer ? 15 : 0 });
}
