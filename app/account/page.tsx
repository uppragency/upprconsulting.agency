import { createClient, createServiceRoleClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LogoutButton from '@/components/LogoutButton';
import ChecklistItem from '@/components/ChecklistItem';
import DeliverablesPanel from '@/components/DeliverablesPanel';
import ShareCertificate from '@/components/ShareCertificate';
import { DELIVERABLE_LABELS } from '@/components/DeliverableIcon';

export default async function AccountPage({ searchParams }: { searchParams: { order?: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: allOrders } = await supabase
    .from('clients')
    .select('id, business_name, status, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (!allOrders?.length) {
    return (
      <>
        <Nav />
        <section style={{ maxWidth: 700, margin: '0 auto', padding: '96px 32px', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#fbfaf8', border: '1px solid rgba(35,35,38,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 24 }}>
            ⏳
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 600, margin: 0 }}>Your order is being processed</h1>
          <p style={{ color: '#55565e', marginTop: 12, fontSize: 15, lineHeight: 1.6 }}>
            This usually takes a moment right after payment. If it's been more than a few minutes and this message
            persists, write to us and we'll sort it out.
          </p>
          <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center' }}>
            <a href="mailto:office@uppr.agency" className="btn-dark" style={{ background: '#232326', color: '#fff', padding: '11px 22px', borderRadius: 99, fontSize: 14 }}>
              Contact us
            </a>
            <LogoutButton />
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const selected = allOrders.find((o) => o.id === searchParams.order) ?? allOrders[0];
  const client = selected;

  const { data: order } = await supabase
    .from('orders')
    .select('amount_cents, currency, paid_at, stripe_checkout_session_id')
    .eq('client_id', client.id)
    .eq('status', 'paid')
    .order('paid_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: clientFull } = await supabase.from('clients').select('health_score').eq('id', client.id).single();

  const { data: deliverables } = await supabase
    .from('deliverables')
    .select('id, type, status, content_text, content_url, admin_note, delivered_at, read_by_client')
    .eq('client_id', client.id);

  const { data: checklist } = await supabase
    .from('checklist_items')
    .select('id, label, done')
    .eq('client_id', client.id)
    .order('created_at');

  const service = createServiceRoleClient();
  const { data: allChecklist } = await service.from('checklist_items').select('client_id, done');
  let avgCompletion: number | null = null;
  if (allChecklist?.length) {
    const byClient: Record<string, { total: number; done: number }> = {};
    allChecklist.forEach((i: any) => {
      if (!byClient[i.client_id]) byClient[i.client_id] = { total: 0, done: 0 };
      byClient[i.client_id].total += 1;
      if (i.done) byClient[i.client_id].done += 1;
    });
    const ratios = Object.values(byClient)
      .filter((c) => c.total > 0)
      .map((c) => c.done / c.total);
    if (ratios.length) avgCompletion = Math.round((ratios.reduce((a, b) => a + b, 0) / ratios.length) * 100);
  }

  const delivered = deliverables?.filter((d) => d.status === 'delivered') ?? [];
  const allDelivered = deliverables?.length === 6 && delivered.length === 6;
  const orderDate = order?.paid_at ?? client.created_at;
  const amount = order ? (order.amount_cents / 100).toFixed(0) : '50';

  const doneChecklist = checklist?.filter((c) => c.done).length ?? 0;

  return (
    <>
      <Nav />
      <section style={{ background: '#232326', color: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 32px 56px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#e2fa5c' }}>Your account</span>
              <h1 style={{ margin: '10px 0 0', fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em' }}>{client.business_name}</h1>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <Link
                href="/account/settings"
                style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '9px 18px', borderRadius: 99, fontSize: 14 }}
              >
                Settings
              </Link>
              <Link
                href="/order"
                style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '9px 18px', borderRadius: 99, fontSize: 14 }}
              >
                Order another audit
              </Link>
              <LogoutButton />
            </div>
          </div>

          {/* PROGRESS DOTS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 32 }}>
            {(deliverables ?? []).map((d) => (
              <div
                key={d.id}
                title={DELIVERABLE_LABELS[d.type]}
                style={{ flex: 1, height: 8, borderRadius: 99, background: d.status === 'delivered' ? '#e2fa5c' : 'rgba(255,255,255,0.12)' }}
              />
            ))}
          </div>
          <p style={{ margin: '10px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
            {delivered.length} of {deliverables?.length ?? 6} delivered
          </p>

          {/* TIMELINE */}
          <div style={{ display: 'flex', gap: 24, marginTop: 32, flexWrap: 'wrap' }}>
            {[
              { label: 'Order placed', done: true, date: orderDate },
              { label: 'Analysis in progress', done: true, date: null },
              { label: 'All delivered', done: allDelivered, date: allDelivered ? delivered.map((d) => d.delivered_at).sort().reverse()[0] : null },
            ].map((step, i) => (
              <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: step.done ? '#e2fa5c' : 'rgba(255,255,255,0.1)',
                    color: step.done ? '#232326' : 'rgba(255,255,255,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {step.done ? '✓' : i + 1}
                </span>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{step.label}</div>
                  {step.date && (
                    <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.5)' }}>
                      {new Date(step.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px 96px' }}>
        {allOrders.length > 1 && (
          <div style={{ marginBottom: 32 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92' }}>Order history</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
              {allOrders.map((o) => (
                <Link
                  key={o.id}
                  href={`/account?order=${o.id}`}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: o.id === client.id ? '#fbfaf8' : '#fff',
                    border: o.id === client.id ? '1px solid #232326' : '1px solid rgba(35,35,38,0.1)',
                    borderRadius: 12,
                    padding: '12px 18px',
                    fontSize: 14,
                  }}
                >
                  <span>
                    {o.business_name} · {new Date(o.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      padding: '4px 10px',
                      borderRadius: 99,
                      background: o.status === 'paid' ? 'rgba(226,250,92,0.25)' : 'rgba(35,35,38,0.06)',
                      color: o.status === 'paid' ? '#6a7d0a' : '#55565e',
                    }}
                  >
                    {o.status === 'paid' ? 'Paid' : 'Awaiting payment'}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1fr)', gap: 24 }} className="grid-2-responsive">
          {/* LEFT: deliverables */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <DeliverablesPanel deliverables={deliverables ?? []} />

            {checklist && checklist.length > 0 && (
              <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 24, marginTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
                  <span style={{ fontSize: 16, fontWeight: 600 }}>Your action checklist</span>
                  <span style={{ fontSize: 13, color: '#55565e' }}>{doneChecklist}/{checklist.length} done</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {checklist.map((item) => (
                    <ChecklistItem key={item.id} item={item} />
                  ))}
                </div>
                {avgCompletion !== null && (
                  <p style={{ marginTop: 14, fontSize: 12.5, color: '#8a8b92' }}>
                    You've checked {doneChecklist}/{checklist.length} recommendations. The average across clients is {avgCompletion}%.
                  </p>
                )}
              </div>
            )}

            {allDelivered && (
              <div style={{ background: '#232326', color: '#fff', borderRadius: 16, padding: 24, marginTop: 12 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#e2fa5c' }}>What's next</span>
                <h3 style={{ margin: '10px 0 8px', fontSize: 19, fontWeight: 600 }}>Want it implemented, not just diagnosed?</h3>
                <p style={{ margin: '0 0 16px', fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.55 }}>
                  UPPR Agency, the same team, can take over the marketing and retention work your audit surfaced.
                </p>
                <a href="https://uppr.agency" target="_blank" rel="noreferrer" style={{ background: '#e2fa5c', color: '#232326', padding: '10px 20px', borderRadius: 99, fontSize: 14, fontWeight: 600, display: 'inline-block' }}>
                  Visit UPPR Agency
                </a>
              </div>
            )}
          </div>

          {/* RIGHT: sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {clientFull?.health_score !== null && clientFull?.health_score !== undefined && (
              <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 24, textAlign: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92' }}>Digital health score</span>
                <div style={{ fontSize: 48, fontWeight: 700, letterSpacing: '-0.03em', margin: '8px 0' }}>
                  {clientFull.health_score}
                  <span style={{ fontSize: 20, color: '#8a8b92' }}>/100</span>
                </div>
                <p style={{ margin: 0, fontSize: 12.5, color: '#8a8b92' }}>Set by your auditor, based on your report.</p>
              </div>
            )}

            <ShareCertificate
              businessName={client.business_name}
              healthScore={clientFull?.health_score ?? null}
              deliveredCount={delivered.length}
              totalCount={deliverables?.length ?? 6}
            />

            <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 24 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92' }}>Order summary</span>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#55565e' }}>Date</span>
                  <span>{orderDate ? new Date(orderDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#55565e' }}>Amount paid</span>
                  <span>€{amount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#55565e' }}>Reference</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5 }}>
                    {order?.stripe_checkout_session_id ? order.stripe_checkout_session_id.slice(-10) : '—'}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ background: '#fbfaf8', border: '1px solid rgba(35,35,38,0.08)', borderRadius: 16, padding: 24 }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>Questions about your audit?</span>
              <p style={{ margin: '8px 0 16px', fontSize: 13.5, color: '#55565e', lineHeight: 1.5 }}>Write to us any time, we'll get back to you.</p>
              <a href="mailto:office@uppr.agency" className="btn-dark" style={{ background: '#232326', color: '#fff', padding: '10px 18px', borderRadius: 99, fontSize: 13.5, display: 'inline-block' }}>
                Email us
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
