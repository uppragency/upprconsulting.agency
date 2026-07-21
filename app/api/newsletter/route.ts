import { NextResponse } from 'next/server';
import { createServiceRoleClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email.' }, { status: 400 });
  }

  const admin = createServiceRoleClient();

  const { error } = await admin
    .from('newsletter_subscribers')
    .upsert({ email: email.toLowerCase().trim() }, { onConflict: 'email' });

  if (error) {
    return NextResponse.json({ error: 'Could not subscribe.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
