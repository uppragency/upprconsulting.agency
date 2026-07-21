import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollFade from '@/components/ScrollFade';

const ADVANTAGES = [
  { title: '48-hour delivery', desc: "No waiting weeks. Order today, get your audits in your account within 2 days.", icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.2 2" /></> },
  { title: 'Real team, not templates', desc: 'Every audit is done by a person actually looking at your business, not auto-generated.', icon: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /></> },
  { title: 'Actionable recommendations', desc: "You don't just get a diagnosis. You get concrete next steps, in priority order.", icon: <><path d="M5 19l1.2-4.2L15 6l3 3-8.8 8.8z" /><path d="M13.2 7.8L17.2 11.8" /></> },
  { title: 'No subscription', desc: "One payment, 50 EUR. No monthly contract just to find out what's not working.", icon: <><path d="M4 8h13l-3-3" /><path d="M20 16H7l3 3" /></> },
  { title: 'Explained, not just written', desc: 'The 2 personalized videos show you exactly where to look and why it matters.', icon: <><rect x="3" y="7" width="12" height="10" rx="2" /><path d="M15 10l6-3v10l-6-3z" /></> },
  { title: 'Connected to execution', desc: 'If you want it implemented too, the same team (UPPR Agency) can take over marketing and retention.', icon: <><rect x="4" y="4" width="8" height="8" rx="2.5" /><rect x="12" y="12" width="8" height="8" rx="2.5" /><path d="M12 8h3a2 2 0 0 1 2 2v2" /></> },
];

const AUDITS = [
  { title: 'Social media audit', desc: "What's working and what's costing you engagement, with concrete content recommendations.", icon: <><circle cx="12" cy="8" r="3" /><path d="M5 20c0-4 3-6 7-6s7 2 7 6" /></> },
  { title: 'Visual identity audit', desc: 'Consistency, perception, and weak points in your logo, colors, and typography, applied across all your materials.', icon: <><circle cx="12" cy="12" r="8" /><path d="M12 4v16M4 12h16" /></> },
  { title: 'Website audit', desc: "Structure, speed, conversion, and what's stopping visitors from buying or contacting you.", icon: <><rect x="4" y="5" width="16" height="12" rx="1.5" /><path d="M4 9h16" /></> },
  { title: 'UI/UX audit', desc: 'Friction points in the navigation experience, from homepage to form or checkout.', icon: <><rect x="4" y="4" width="7" height="16" rx="1.5" /><rect x="13" y="4" width="7" height="9" rx="1.5" /></> },
];

export default function HomePage() {
  return (
    <>
      <div className="gradient-bar" />
      <Nav />

      {/* HERO */}
      <section className="hero" style={{ maxWidth: 1500, margin: '0 auto' }}>
        <div className="orb" style={{ top: -140, left: -100, width: 380, height: 380, background: 'oklch(0.65 0.16 300 / 0.14)', animation: 'uppr-float-a 18s ease-in-out infinite' }} />
        <div className="orb" style={{ bottom: -160, right: -100, width: 420, height: 420, background: 'oklch(0.68 0.15 20 / 0.12)', animation: 'uppr-float-b 22s ease-in-out infinite' }} />
        <div className="sweep-line" style={{ top: '45%' }} />

        <div className="hero-inner">
          <span className="badge">The audit that shows you what slow is costing you</span>
          <h1>AI makes your website cheap.<br />It kills your business slowly.</h1>
          <p className="hero-sub">
            Auto-generated content, a website built fast with AI, posts written by an algorithm. Costs little today.
            You lose visitors, audience, and followers, month after month, until there's nothing left to save.
          </p>
          <Link href="/formular" className="btn-primary">Order audit</Link>
          <span style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>One payment, no subscription</span>
        </div>
      </section>

      {/* WHAT'S CHANGING */}
      <ScrollFade>
        <div className="dark-section-wrap" style={{ paddingBottom: 0 }}>
          <div className="dark-section">
            <div className="orb" style={{ top: -120, right: -100, width: 360, height: 360, background: 'oklch(0.6 0.22 305 / 0.3)', animation: 'uppr-float-b 19s ease-in-out infinite' }} />
            <div className="dark-section-inner">
              <span className="badge badge-dark">What's changing</span>
              <h2 style={{ color: 'white', fontSize: 'clamp(1.75rem, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '18px 0 14px' }}>
                Cheap now. Empty in a year.
              </h2>
              <p style={{ color: 'var(--text-muted-dark)', fontSize: 16, lineHeight: 1.6, maxWidth: 620, margin: '0 0 40px' }}>
                Every AI-generated page, every algorithm-written post, looks a little more fake than something made
                by a human. Visitors feel it, even if they can't tell you why they left.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                <div className="stat-card">
                  <span className="badge badge-dark">The hidden cost</span>
                  <h3>AI erodes trust, it doesn't build it</h3>
                  <p>Generic content, mismatched images, tone with no personality. Every visitor who notices is a follower or customer who doesn't come back.</p>
                  {/* FAKE DATA */}
                  <p className="stat-value">−41%</p>
                  <p className="stat-label">audience lost in 6 months, majority-AI accounts</p>
                </div>
                <div className="stat-card">
                  <span className="badge badge-dark">The fix</span>
                  <h3>A human audit stops the bleeding</h3>
                  <p>See exactly what feels off, what sounds generic, what doesn't align with your real brand. Fix it before you lose everything you've built.</p>
                  {/* FAKE DATA */}
                  <p className="stat-value">3×</p>
                  <p className="stat-label">average return reported by clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollFade>

      {/* PHILOSOPHY */}
      <ScrollFade>
        <section className="container" style={{ padding: '80px 24px' }}>
          <span className="badge">Philosophy</span>
          <p className="philosophy-text" style={{ marginTop: 20 }}>
            AI can generate a website in 10 minutes and a post in 10 seconds. It can't tell you why people leave
            without buying. UPPR Consulting is the human layer that checks what automation broke, before it
            costs you your audience for good.
          </p>
        </section>
      </ScrollFade>

      {/* HOW IT COMPARES */}
      <ScrollFade>
        <section className="container" style={{ padding: '20px 24px 96px', position: 'relative', overflow: 'hidden' }}>
          <div className="orb" style={{ top: -80, right: '5%', width: 320, height: 320, background: 'oklch(0.62 0.2 305 / 0.08)', animation: 'uppr-float-a 20s ease-in-out infinite' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span className="badge">How it compares</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '18px 0 40px', maxWidth: 700 }}>
              Three ways to find out what's not working. One is built for you.
            </h2>
            <div className="compare-light-wrap">
              <table className="compare-table-light">
                <thead>
                  <tr>
                    <th></th>
                    <th>You figure it out yourself</th>
                    <th>Random freelancer</th>
                    <th className="highlight-col">UPPR Consulting</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="row-label">Time to result</td><td>Undefined</td><td>1-2 weeks</td><td className="highlight-col">48 hours</td></tr>
                  <tr><td className="row-label">Level of detail</td><td>Subjective</td><td>Variable</td><td className="highlight-col">4 structured audits</td></tr>
                  <tr><td className="row-label">Explained or just written</td><td>—</td><td>Usually just text</td><td className="highlight-col">2 personalized videos</td></tr>
                  <tr><td className="row-label">Cost</td><td>Your time</td><td>Variable, often over 200 EUR</td><td className="highlight-col">50 EUR, one payment</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* ADVANTAGES — dark block */}
      <ScrollFade>
      <div className="dark-section-wrap">
        <div className="dark-section" id="avantaje">
          <div className="orb" style={{ top: -150, left: -120, width: 420, height: 420, background: 'oklch(0.6 0.22 305 / 0.35)', animation: 'uppr-float-a 17s ease-in-out infinite' }} />
          <div className="orb" style={{ bottom: -160, right: -120, width: 440, height: 440, background: 'oklch(0.65 0.2 20 / 0.28)', animation: 'uppr-float-b 21s ease-in-out infinite' }} />
          <div className="sweep-line" style={{ top: '30%', background: 'linear-gradient(90deg, transparent, oklch(0.75 0.16 300 / 0.4), transparent)' }} />

          <div className="dark-section-inner">
            <div className="section-header">
              <span className="badge badge-dark">UPPR advantage</span>
              <h2 style={{ color: 'white' }}>The UPPR advantage.</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
              {ADVANTAGES.map((a) => (
                <div key={a.title} className="dark-card">
                  <div className="icon-chip">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="oklch(0.78 0.15 300)" strokeWidth="1.6">{a.icon}</svg>
                  </div>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </ScrollFade>

      {/* VIDEO EXPLAINER */}
      <ScrollFade>
      <section style={{ overflow: 'hidden' }}>
        <div className="orb" style={{ top: -100, right: '10%', width: 340, height: 340, background: 'oklch(0.65 0.16 300 / 0.1)', animation: 'uppr-float-b 19s ease-in-out infinite' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '40px 24px 100px', display: 'grid', gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)', gap: 64, alignItems: 'start' }}>
          <div>
            <span className="badge">How it works</span>
            <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.02em', margin: '22px 0 36px' }}>Explained out loud, not just on paper.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
              <div className="video-item">
                <h4>30-min video — Website</h4>
                <p>A live walkthrough of your site, explained step by step, with concrete examples of what to improve.</p>
              </div>
              <div className="video-item">
                <h4>30-min video — Visual identity &amp; social media</h4>
                <p>What your brand communicates now, what it should communicate, and how to get there.</p>
              </div>
            </div>
          </div>
          <div className="video-card">
            <div className="video-thumb">
              <div className="video-play">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#111"><path d="M6 4l14 8-14 8z" /></svg>
              </div>
            </div>
            <div className="video-caption">personalized video, 30 minutes</div>
          </div>
        </div>
      </section>
      </ScrollFade>

      {/* AUDITS */}
      <ScrollFade>
      <section id="audituri" style={{ overflow: 'hidden' }}>
        <div className="orb" style={{ bottom: -120, left: '8%', width: 360, height: 360, background: 'oklch(0.68 0.15 20 / 0.1)', animation: 'uppr-float-a 20s ease-in-out infinite' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 1000, padding: '40px 24px 110px', textAlign: 'center' }}>
          <span className="badge">What you get</span>
          <h2 style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-0.02em', margin: '22px 0 14px' }}>Four complete audits, one price.</h2>

          <div className="list-card">
            {AUDITS.map((a) => (
              <div key={a.title} className="list-row">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="oklch(0.55 0.18 300)" strokeWidth="1.7">{a.icon}</svg>
                <div>
                  <h4>{a.title}</h4>
                  <p>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </ScrollFade>

      {/* STRAIGHT FROM YOUR ACCOUNT */}
      <ScrollFade>
        <section className="container" style={{ maxWidth: 1000, padding: '20px 24px 110px', textAlign: 'center' }}>
          <span className="badge">Straight from your account</span>
          <h2 style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-0.02em', margin: '22px 0 14px' }}>This is what your account looks like after payment.</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 480, margin: '0 auto' }}>
            Deliverables show up as they're ready, you don't have to wait for all 6 at once.
          </p>

          <div className="list-card" style={{ maxWidth: 560, margin: '40px auto 0', textAlign: 'left' }}>
            {[
              { title: 'Social media audit', done: true },
              { title: 'Visual identity audit', done: true },
              { title: 'Website audit', done: false },
              { title: 'UI/UX audit', done: false },
              { title: 'Video — Website', done: false },
              { title: 'Video — Visual identity', done: false },
            ].map((d) => (
              <div key={d.title} className="dash-row" style={{ padding: '20px 30px' }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{d.title}</span>
                <span className={`dash-status ${d.done ? 'done' : 'pending'}`}>
                  {d.done ? 'Delivered' : 'In progress'}
                </span>
              </div>
            ))}
          </div>
        </section>
      </ScrollFade>

      {/* FINAL CTA */}
      <ScrollFade>
      <section style={{ overflow: 'hidden', borderTop: '1px solid var(--border)' }}>
        <div className="orb" style={{ top: -80, left: '30%', width: 300, height: 300, background: 'oklch(0.62 0.2 305 / 0.1)', animation: 'uppr-float-a 16s ease-in-out infinite' }} />
        <div className="orb" style={{ bottom: -100, right: '15%', width: 320, height: 320, background: 'oklch(0.68 0.16 20 / 0.1)', animation: 'uppr-float-b 20s ease-in-out infinite' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 700, padding: '100px 24px 90px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
          <span className="nav-mark" style={{ width: 40, height: 40, borderRadius: 10 }} />
          <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.02em' }}>See exactly what needs fixing.</h2>
          <p style={{ fontSize: 17, color: 'var(--text-muted)' }}>
            4 audits, 2 personalized videos, 48-hour delivery — one payment of 50 EUR.
          </p>
          <Link href="/formular" className="btn-primary" style={{ marginTop: 8 }}>Order the audit — 50 EUR</Link>
        </div>
      </section>
      </ScrollFade>

      <Footer />
      <div className="gradient-bar" />
    </>
  );
}
