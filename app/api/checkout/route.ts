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
    return NextResponse.json({ error: 'You must be signed in.' }, { status: 401 });
  }

  const body = await request.json();
  const {
    businessName,
    contactName,
    email,
    websiteUrl,
    instagramHandle,
    tiktokHandle,
    description,
    referralCode,
    payerType,
    companyLegalName,
    companyTaxId,
    companyRegNumber,
    companyAddress,
  } = body;

  const admin = createServiceRoleClient();

  let discountApplied = false;
  if (referralCode) {
    const { data: referrer } = await admin.from('profiles').select('id').eq('referral_code', referralCode).maybeSingle();
    if (referrer) discountApplied = true;
  }

  const unitAmount = discountApplied ? 4250 : 5000;

  // Create the client record, linked directly to the authenticated user
  // (this allows one account to place multiple orders over time)
  const { data: client, error: clientError } = await admin
    .from('clients')
    .insert({
      business_name: businessName,
      contact_name: contactName,
      email,
      website_url: websiteUrl || null,
      instagram_handle: instagramHandle || null,
      tiktok_handle: tiktokHandle || null,
      project_description: description || null,
      status: 'pending_payment',
      user_id: user.id,
      referred_by_code: discountApplied ? referralCode : null,
      payer_type: payerType === 'company' ? 'company' : 'individual',
      company_legal_name: payerType === 'company' ? companyLegalName || null : null,
      company_tax_id: payerType === 'company' ? companyTaxId || null : null,
      company_reg_number: payerType === 'company' ? companyRegNumber || null : null,
      company_address: payerType === 'company' ? companyAddress || null : null,
    })
    .select()
    .single();

  if (clientError || !client) {
    return NextResponse.json({ error: 'Could not save your details.' }, { status: 500 });
  }

  // Keep profiles.client_id pointing at the most recent order, for any legacy lookups
  await admin.from('profiles').update({ client_id: client.id, role: 'client' }).eq('id', user.id);

  const origin = request.headers.get('origin') ?? 'https://upprconsulting.agency';

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          unit_amount: unitAmount,
          product_data: {
            name: 'UPPR Consulting — Full Audit',
            description: discountApplied
              ? '4 audits (social media, visual identity, website, UI/UX) + 2 personalized videos. Referral discount applied.'
              : '4 audits (social media, visual identity, website, UI/UX) + 2 personalized videos.',
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${origin}/account/confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/order`,
    customer_email: email,
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
