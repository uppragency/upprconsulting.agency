import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import AuditDemoTabs from '@/components/AuditDemoTabs';

export const metadata = { title: 'See a sample audit — UPPR Consulting' };

const WHAT_YOU_GET = [
  { icon: '📱', title: 'Social media audit', desc: "What's working and what's costing you engagement." },
  { icon: '🎨', title: 'Visual identity audit', desc: 'Consistency across logo, colors, typography, everywhere your brand shows up.' },
  { icon: '🌐', title: 'Website audit', desc: "Structure, speed, and what's stopping visitors from converting." },
  { icon: '🧭', title: 'UI/UX audit', desc: 'Friction points in the navigation experience, start to finish.' },
];

const DASHBOARD_FEATURES = [
  { icon: '📊', title: 'Progress tracking', desc: 'See exactly which of your 6 deliverables are ready, in real time.' },
  { icon: '✅', title: 'Action checklist', desc: 'Check off recommendations as you implement them, compared to other clients.' },
  { icon: '🧾', title: 'Order history & invoices', desc: 'Every order, every receipt, downloadable any time.' },
  { icon: '🔐', title: 'One login, every order', desc: 'Order again later, everything stays in the same account.' },
];

export default function DemoPage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="container" style={{ maxWidth: 800, padding: '80px 24px 40px', textAlign: 'center' }}>
        <span className="badge">See it before you buy it</span>
        <h1 style={{ margin: '18px 0 14px', fontSize: 'clamp(1.75rem, 5vw, 42px)', fontWeight: 600, letterSpacing: '-0.03em' }}>
          What an audit from UPPR Consulting actually looks like.
        </h1>
        <p style={{ margin: 0, color: '#55565e', fontSize: 16, lineHeight: 1.6 }}>
          No signup, no email required. Here's a real sample of the findings and the account you get.
        </p>
      </section>

      {/* PART ONE — for the client */}
      <section className="container" style={{ maxWidth: 1000, padding: '20px 24px 60px' }}>
        <span className="eyebrow" style={{ display: 'block', marginBottom: 12 }}>What you get</span>
        <div className="grid-2-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 48 }}>
          {WHAT_YOU_GET.map((a) => (
            <div key={a.title} style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 22 }}>
              <span style={{ fontSize: 22 }}>{a.icon}</span>
              <h3 style={{ margin: '10px 0 6px', fontSize: 15, fontWeight: 700 }}>{a.title}</h3>
              <p style={{ margin: 0, fontSize: 13, color: '#55565e', lineHeight: 1.5 }}>{a.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#fbfaf8', border: '1px solid rgba(35,35,38,0.08)', borderRadius: 16, padding: 24, marginBottom: 48 }}>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#3a3a40' }}>
            <strong>Real findings, not a generic checklist.</strong> Every audit is written by a person who actually
            looked at your site and your accounts. The 3 examples below per category are illustrative, your real
            audit is specific to your business.
          </p>
        </div>

        <span className="eyebrow" style={{ display: 'block', marginBottom: 20 }}>Sample findings</span>
        <AuditDemoTabs />
      </section>

      {/* PART TWO — the dashboard */}
      <section style={{ background: '#232326', color: '#fff' }}>
        <div className="container" style={{ maxWidth: 1000, padding: '64px 24px' }}>
          <span className="eyebrow" style={{ display: 'block', marginBottom: 12, color: '#e2fa5c' }}>Your account</span>
          <h2 style={{ margin: '0 0 32px', fontSize: 'clamp(1.5rem, 4vw, 32px)', fontWeight: 600, letterSpacing: '-0.02em' }}>
            Everything lands in one dashboard.
          </h2>

          {/* Static dashboard preview */}
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: 24, marginBottom: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <div style={{ width: 22, height: 22, background: '#e2fa5c', borderRadius: 7 }} />
              <span style={{ fontWeight: 700, fontSize: 14 }}>Your business name</span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              {[true, true, true, true, false, false].map((done, i) => (
                <div key={i} style={{ flex: 1, height: 8, borderRadius: 99, background: done ? '#e2fa5c' : 'rgba(255,255,255,0.12)' }} />
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Social media audit', 'Visual identity audit'].map((d) => (
                <div key={d} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px 16px', fontSize: 13.5 }}>
                  <span>{d}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, background: 'rgba(226,250,92,0.15)', color: '#e2fa5c', padding: '3px 10px', borderRadius: 99 }}>Delivered</span>
                </div>
              ))}
              {['Website audit', 'UI/UX audit'].map((d) => (
                <div key={d} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px 16px', fontSize: 13.5 }}>
                  <span>{d}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', padding: '3px 10px', borderRadius: 99 }}>In progress</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid-2-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {DASHBOARD_FEATURES.map((f) => (
              <div key={f.title} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: 20 }}>
                <span style={{ fontSize: 20 }}>{f.icon}</span>
                <h3 style={{ margin: '10px 0 6px', fontSize: 14, fontWeight: 700 }}>{f.title}</h3>
                <p style={{ margin: 0, fontSize: 12.5, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="container" style={{ maxWidth: 640, padding: '64px 24px 100px', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 12px', fontSize: 'clamp(1.5rem, 4vw, 32px)', fontWeight: 600, letterSpacing: '-0.02em' }}>
          That was a preview. Your audit is specific to you.
        </h2>
        <Link href="/order" className="btn-dark" style={{ display: 'inline-block', marginTop: 12, background: '#232326', color: '#fff', padding: '15px 28px', borderRadius: 99, fontSize: 15, fontWeight: 500 }}>
          Order the real audit — €47.97
        </Link>
      </section>

      <Footer />
    </>
  );
}
