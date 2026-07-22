import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import PrintButton from '@/components/PrintButton';

export default async function InvoicePage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: order } = await supabase.from('clients').select('*').eq('id', params.id).single();
  if (!order || order.user_id !== user.id) notFound();

  const { data: payment } = await supabase
    .from('orders')
    .select('amount_cents, paid_at, stripe_checkout_session_id, status')
    .eq('client_id', order.id)
    .eq('status', 'paid')
    .order('paid_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!payment) notFound();

  const billTo =
    order.payer_type === 'company'
      ? { name: order.company_legal_name, lines: [`Tax ID: ${order.company_tax_id}`, order.company_reg_number ? `Reg. no.: ${order.company_reg_number}` : null, order.company_address] }
      : { name: order.contact_name, lines: [order.email] };

  return (
    <div style={{ background: '#fbfaf8', minHeight: '100vh', padding: '48px 24px' }}>
      <div className="no-print" style={{ maxWidth: 640, margin: '0 auto 20px', display: 'flex', justifyContent: 'flex-end' }}>
        <PrintButton />
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 48 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 24, height: 24, background: '#232326', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e2fa5c', fontFamily: 'var(--font-mono)', fontSize: 12 }}>U</div>
              <span style={{ fontWeight: 700, fontSize: 16 }}>UPPR Consulting</span>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: '#55565e', lineHeight: 1.6 }}>office@uppr.agency</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>Receipt</h1>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#55565e' }}>
              {payment.paid_at ? new Date(payment.paid_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 24, marginBottom: 32 }}>
          <div>
            <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92' }}>Billed to</span>
            <p style={{ margin: '6px 0 0', fontWeight: 600, fontSize: 15 }}>{billTo.name}</p>
            {billTo.lines.filter(Boolean).map((l) => (
              <p key={l as string} style={{ margin: '2px 0 0', fontSize: 13, color: '#55565e' }}>{l}</p>
            ))}
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92' }}>Reference</span>
            <p style={{ margin: '6px 0 0', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{payment.stripe_checkout_session_id?.slice(-10)}</p>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(35,35,38,0.1)' }}>
              <th style={{ textAlign: 'left', padding: '10px 0', fontSize: 12, color: '#8a8b92', fontWeight: 600 }}>Description</th>
              <th style={{ textAlign: 'right', padding: '10px 0', fontSize: 12, color: '#8a8b92', fontWeight: 600 }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(35,35,38,0.06)' }}>
              <td style={{ padding: '14px 0', fontSize: 14 }}>UPPR Consulting — Full Audit (4 audits + 2 videos)</td>
              <td style={{ padding: '14px 0', fontSize: 14, textAlign: 'right' }}>€{(payment.amount_cents / 100).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: 12, color: '#8a8b92' }}>Total paid</span>
            <p style={{ margin: '4px 0 0', fontSize: 26, fontWeight: 700 }}>€{(payment.amount_cents / 100).toFixed(2)}</p>
          </div>
        </div>

        <p style={{ marginTop: 40, fontSize: 12, color: '#8a8b92', borderTop: '1px solid rgba(35,35,38,0.08)', paddingTop: 16 }}>
          Payment processed securely by Stripe. This document serves as a payment receipt.
        </p>
      </div>

      <style>{`@media print { .no-print { display: none !important; } body { background: white; } }`}</style>
    </div>
  );
}
