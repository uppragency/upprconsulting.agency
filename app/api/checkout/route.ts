import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServiceRoleClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: Request) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Trebuie să fii autentificat.' }, { status: 401 });
  }

  const body = await request.json();
  const { businessName, contactName, email, phone, descriere } = body;

  const admin = createServiceRoleClient();

  // Creează clientul
  const { data: client, error: clientError } = await admin
    .from('clients')
    .insert({
      business_name: businessName,
      contact_name: contactName,
      email,
      phone,
      project_description: descriere,
      status: 'pending_payment',
    })
    .select()
    .single();

  if (clientError || !client) {
    return NextResponse.json({ error: 'Nu am putut salva datele.' }, { status: 500 });
  }

  // Leagă profilul (creat automat de Supabase la signUp) de client
  const { error: profileError } = await admin
    .from('profiles')
    .update({ client_id: client.id, role: 'client' })
    .eq('id', user.id);

  if (profileError) {
    return NextResponse.json({ error: 'Nu am putut lega contul de comandă.' }, { status: 500 });
  }

  const origin = request.headers.get('origin') ?? 'https://upprconsulting.agency';

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          unit_amount: 5000,
          product_data: {
            name: 'Audit complet UPPR Consulting',
            description: '4 audituri (social media, identitate vizuală, website, UI/UX) + 2 video-uri personalizate.',
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/cont/confirmare?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/formular`,
    customer_email: email,
    metadata: { client_id: client.id },
  });

  await admin.from('orders').insert({
    client_id: client.id,
    stripe_checkout_session_id: session.id,
    amount_cents: 5000,
    currency: 'eur',
    status: 'created',
  });

  return NextResponse.json({ url: session.url });
}
