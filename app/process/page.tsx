import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'How it works',
  description: 'A step-by-step look at exactly what happens after you order an audit from UPPR Consulting.',
  path: '/process',
});

const ACCENT = '#e2fa5c';

export default function ProcessPage() {
  return (
    <>
      <Nav />
      <section style={{ maxWidth: 700, margin: '0 auto', padding: '80px 32px 40px', textAlign: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>How it works</span>
        <h1 style={{ margin: '12px 0 12px', fontSize: 'clamp(1.75rem, 5vw, 42px)', fontWeight: 600, letterSpacing: '-0.03em' }}>
          From order to insight, in 48 hours.
        </h1>
        <p style={{ margin: 0, color: '#55565e', fontSize: 16, lineHeight: 1.6 }}>
          Here's exactly what happens, step by step, once you order.
        </p>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '20px 32px 100px', display: 'flex', flexDirection: 'column', gap: 64 }}>
        {/* Step 1 */}
        <div className="grid-2-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#8a8b92' }}>Step 01</span>
            <h2 style={{ margin: '8px 0 12px', fontSize: 24, fontWeight: 700 }}>Order and create your account</h2>
            <p style={{ margin: 0, fontSize: 15, color: '#55565e', lineHeight: 1.6 }}>
              Tell us about your business, your website, and your social accounts. Two minutes, then a secure Stripe checkout. Your account is created instantly.
            </p>
          </div>
          <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 20, padding: 24, boxShadow: '0 24px 48px -24px rgba(35,35,38,0.18)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#55565e' }}>Step 1 of 2</span>
              <div style={{ flex: 1, display: 'flex', gap: 5 }}>
                <div style={{ flex: 1, height: 5, borderRadius: 99, background: '#232326' }} />
                <div style={{ flex: 1, height: 5, borderRadius: 99, background: 'rgba(35,35,38,0.1)' }} />
              </div>
            </div>
            {['Your name', 'Email', 'Business name', 'Website link'].map((f) => (
              <div key={f} style={{ marginBottom: 10 }}>
                <span style={{ fontSize: 11.5, color: '#8a8b92' }}>{f}</span>
                <div style={{ height: 34, background: '#fbfaf8', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 8, marginTop: 4 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Step 2 */}
        <div className="grid-2-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
          <div className="grid-2-responsive-reverse" style={{ order: 2 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#8a8b92' }}>Step 02</span>
            <h2 style={{ margin: '8px 0 12px', fontSize: 24, fontWeight: 700 }}>A real person reviews your business</h2>
            <p style={{ margin: 0, fontSize: 15, color: '#55565e', lineHeight: 1.6 }}>
              No automated scan. Someone on our team goes through your website, brand, and social accounts by hand, checking against the same structured process every time.
            </p>
          </div>
          <div style={{ order: 1, background: '#232326', borderRadius: 20, padding: 32, textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(226,250,92,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 26 }}>
              🔍
            </div>
            <p style={{ margin: 0, color: '#fff', fontSize: 14.5, fontWeight: 600 }}>Website · Brand · Social media</p>
            <p style={{ margin: '6px 0 0', color: 'rgba(255,255,255,0.55)', fontSize: 12.5 }}>Reviewed against a structured checklist, not a generic template</p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="grid-2-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#8a8b92' }}>Step 03</span>
            <h2 style={{ margin: '8px 0 12px', fontSize: 24, fontWeight: 700 }}>Audits land in your dashboard</h2>
            <p style={{ margin: 0, fontSize: 15, color: '#55565e', lineHeight: 1.6 }}>
              Each of the 6 deliverables appears in your account as it's ready, you don't wait for all of them at once. You'll usually see the first ones well before the 48-hour mark.
            </p>
          </div>
          <div style={{ background: '#232326', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: 24 }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
              {[true, true, true, false, false, false].map((done, i) => (
                <div key={i} style={{ flex: 1, height: 7, borderRadius: 99, background: done ? ACCENT : 'rgba(255,255,255,0.12)' }} />
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { name: 'Social media audit', status: 'Delivered' },
                { name: 'Visual identity audit', status: 'Delivered' },
                { name: 'Website audit', status: 'In progress' },
              ].map((d) => (
                <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '10px 14px' }}>
                  <span style={{ fontSize: 13, color: '#fff' }}>{d.name}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10.5,
                      padding: '3px 9px',
                      borderRadius: 99,
                      background: d.status === 'Delivered' ? 'rgba(226,250,92,0.15)' : 'rgba(255,255,255,0.08)',
                      color: d.status === 'Delivered' ? ACCENT : 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {d.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="grid-2-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
          <div style={{ order: 2 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#8a8b92' }}>Step 04</span>
            <h2 style={{ margin: '8px 0 12px', fontSize: 24, fontWeight: 700 }}>Implement and track your progress</h2>
            <p style={{ margin: 0, fontSize: 15, color: '#55565e', lineHeight: 1.6 }}>
              Every audit ends with a prioritized checklist. Check items off as you implement them, right in your dashboard, and see how you compare to other clients.
            </p>
          </div>
          <div style={{ order: 1, background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 20, padding: 24 }}>
            <span style={{ fontSize: 14, fontWeight: 700, display: 'block', marginBottom: 12 }}>Your action checklist</span>
            {[
              { label: 'Update homepage headline', done: true },
              { label: 'Fix mobile navigation', done: true },
              { label: 'Add alt text to images', done: false },
            ].map((item) => (
              <label key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, padding: '6px 0', color: item.done ? '#8a8b92' : '#232326' }}>
                <input type="checkbox" checked={item.done} readOnly style={{ width: 15, height: 15 }} />
                <span style={{ textDecoration: item.done ? 'line-through' : 'none' }}>{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#232326', color: '#fff' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '64px 32px', textAlign: 'center' }}>
          <h2 style={{ margin: '0 0 12px', fontSize: 'clamp(1.4rem, 4vw, 28px)', fontWeight: 600 }}>Ready to see it for your own business?</h2>
          <Link href="/order" className="btn-accent" style={{ background: ACCENT, color: '#232326', padding: '14px 28px', borderRadius: 99, fontSize: 15, fontWeight: 600, display: 'inline-block', marginTop: 8 }}>
            Order the audit — €47.97
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
