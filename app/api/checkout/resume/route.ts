import { NextResponse } from 'next/server';
import { createClient, createServiceRoleClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: Request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });

  const { clientId } = await request.json();
  const admin = createServiceRoleClient();

  const { data: client } = await admin.from('clients').select('*').eq('id', clientId).single();
  if (!client || client.user_id !== user.id) {
    return NextResponse.json({ error: 'Not found.' }, { status: 404 });
  }
  if (client.status === 'paid') {
    return NextResponse.json({ error: 'This order is already paid.' }, { status: 400 });
  }

  // Reuse the amount from the original order if one exists (keeps any referral discount consistent)
  const { data: existingOrder } = await admin
    .from('orders')
    .select('amount_cents')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const unitAmount = existingOrder?.amount_cents ?? 4797;
  const origin = request.headers.get('origin') ?? 'https://upprconsulting-agency.vercel.app';

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          unit_amount: unitAmount,
          product_data: { name: 'UPPR Consulting — Full Audit' },
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/account/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/account`,
    customer_email: client.email,
    metadata: { client_id: client.id },
  });

  await admin.from('orders').insert({
    client_id: client.id,
    stripe_checkout_session_id: session.id,
    amount_cents: unitAmount,
    currency: 'eur',
    status: 'created',
  });

  return NextResponse.json({ url: session.url });
}
