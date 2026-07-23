import { NextResponse } from 'next/server';
import { createClient, createServiceRoleClient } from '@/lib/supabase/server';

const MAX_ATTEMPTS = 3;
const WINDOW_MINUTES = 15;

export async function POST(request: Request) {
  const { email, password, captchaA, captchaB, captchaAnswer } = await request.json();
  if (!email || !password) {
    return NextResponse.json({ error: 'Missing email or password.' }, { status: 400 });
  }

  const service = createServiceRoleClient();
  const since = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();

  const { data: recentAttempts } = await service
    .from('login_attempts')
    .select('success')
    .eq('email', email.toLowerCase())
    .gte('created_at', since);

  const recentFailures = (recentAttempts ?? []).filter((a: { success: boolean }) => !a.success).length;
  const requiresCaptcha = recentFailures >= MAX_ATTEMPTS;

  if (requiresCaptcha) {
    if (captchaA === undefined || captchaB === undefined || Number(captchaAnswer) !== Number(captchaA) + Number(captchaB)) {
      return NextResponse.json({ error: 'Please answer the verification question correctly.', requiresCaptcha: true }, { status: 400 });
    }
  }

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  await service.from('login_attempts').insert({ email: email.toLowerCase(), success: !error });

  if (error) {
    const newFailures = recentFailures + 1;
    return NextResponse.json(
      { error: 'Incorrect email or password.', requiresCaptcha: newFailures >= MAX_ATTEMPTS },
      { status: 401 }
    );
  }

  return NextResponse.json({ success: true });
}
