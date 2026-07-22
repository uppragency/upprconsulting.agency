import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: order } = await supabase.from('clients').select('*').eq('id', params.id).single();
  if (!order || order.user_id !== user.id) notFound();

  const { data: payment } = await supabase
    .from('orders')
    .select('amount_cents, currency, paid_at, stripe_checkout_session_id, status')
    .eq('client_id', order.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const row = (label: string, value: string | null | undefined) =>
    value ? (
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '10px 0', borderBottom: '1px solid rgba(35,35,38,0.06)', fontSize: 14 }}>
        <span style={{ color: '#55565e' }}>{label}</span>
        <span style={{ fontWeight: 500, textAlign: 'right' }}>{value}</span>
      </div>
    ) : null;

  return (
    <>
      <Nav />
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '64px 32px 96px' }}>
        <Link href="/account" style={{ fontSize: 13, color: '#55565e' }}>← Your account</Link>
        <h1 style={{ margin: '10px 0 4px', fontSize: 32, fontWeight: 600, letterSpacing: '-0.02em' }}>Order details</h1>
        <p style={{ margin: '0 0 32px', color: '#55565e', fontSize: 14 }}>
          {new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>

        <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 24, marginBottom: 20 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92' }}>Payment</span>
          <div style={{ marginTop: 8 }}>
            {row('Status', payment?.status === 'paid' ? 'Paid' : 'Awaiting payment')}
            {payment && row('Amount', `€${(payment.amount_cents / 100).toFixed(2)}`)}
            {payment?.paid_at && row('Paid on', new Date(payment.paid_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }))}
            {payment?.stripe_checkout_session_id && row('Reference', payment.stripe_checkout_session_id.slice(-10))}
          </div>
          {payment?.status === 'paid' && (
            <Link
              href={`/account/orders/${order.id}/invoice`}
              className="btn-dark"
              style={{ display: 'inline-block', marginTop: 16, background: '#232326', color: '#fff', padding: '10px 20px', borderRadius: 99, fontSize: 14 }}
            >
              Download invoice
            </Link>
          )}
        </div>

        <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 24, marginBottom: 20 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92' }}>What you submitted</span>
          <div style={{ marginTop: 8 }}>
            {row('Business name', order.business_name)}
            {row('Contact name', order.contact_name)}
            {row('Email', order.email)}
            {row('Website', order.website_url)}
            {row('Instagram', order.instagram_handle)}
            {row('TikTok', order.tiktok_handle)}
          </div>
          {order.project_description && (
            <div style={{ marginTop: 12, fontSize: 14, color: '#55565e', lineHeight: 1.6 }}>
              <span style={{ display: 'block', color: '#8a8b92', fontSize: 12.5, marginBottom: 4 }}>Description</span>
              {order.project_description}
            </div>
          )}
        </div>

        <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 24 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92' }}>Billing</span>
          <div style={{ marginTop: 8 }}>
            {row('Billed as', order.payer_type === 'company' ? 'Company (invoice)' : 'Individual')}
            {order.payer_type === 'company' && (
              <>
                {row('Legal company name', order.company_legal_name)}
                {row('Tax ID / CUI', order.company_tax_id)}
                {row('Registration number', order.company_reg_number)}
                {row('Registered address', order.company_address)}
              </>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
