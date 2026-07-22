import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });

  const { clientId, rating, quote } = await request.json();
  if (!clientId || !rating || !quote) {
    return NextResponse.json({ error: 'Missing fields.' }, { status: 400 });
  }

  const { error } = await supabase.from('testimonials').insert({ client_id: clientId, rating, quote });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
