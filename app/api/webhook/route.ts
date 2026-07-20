import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createServiceRoleClient } from '@/lib/supabase/server';
import Stripe from 'stripe';

const DELIVERABLE_TYPES = [
  'social_audit',
  'brand_audit',
  'website_audit',
  'uiux_audit',
  'video_website',
  'video_brand',
] as const;

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook signature invalid: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const clientId = session.metadata?.client_id;

    if (clientId) {
      const admin = createServiceRoleClient();

      await admin
        .from('orders')
        .update({
          status: 'paid',
          stripe_payment_intent_id: session.payment_intent as string,
          paid_at: new Date().toISOString(),
        })
        .eq('stripe_checkout_session_id', session.id);

      await admin.from('clients').update({ status: 'paid' }).eq('id', clientId);

      // Seed cele 6 livrabile, pending
      await admin.from('deliverables').insert(
        DELIVERABLE_TYPES.map((type) => ({ client_id: clientId, type, status: 'pending' }))
      );
    }
  }

  return NextResponse.json({ received: true });
}
