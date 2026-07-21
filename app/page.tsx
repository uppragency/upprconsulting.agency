import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollFade from '@/components/ScrollFade';
import BeforeAfterToggle from '@/components/BeforeAfterToggle';

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

          <div className="hero-preview hero-in">
            <div className="hero-preview-bar">
              <span /><span /><span />
            </div>
            <div className="hero-preview-title">
              <strong>Your account</strong>
              4 of 6 deliverables available
            </div>
            <div style={{ padding: '4px 0 8px' }}>
              {[
                { title: 'Social media audit', done: true },
                { title: 'Visual identity audit', done: true },
                { title: 'Website audit', done: true },
                { title: 'UI/UX audit', done: true },
                { title: 'Video — Website', done: false },
                { title: 'Video — Visual identity', done: false },
              ].map((d) => (
                <div key={d.title} className="dash-row" style={{ padding: '12px 20px' }}>
                  <span style={{ fontSize: 13.5 }}>{d.title}</span>
                  <span className={`dash-status ${d.done ? 'done' : 'pending'}`}>
                    {d.done ? 'Delivered' : 'In progress'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST MARQUEE */}
      <div className="marquee-wrap">
        <span className="badge marquee-badge">Built for real businesses, not demos</span>
        <div className="marquee">
          <div className="marquee-track">
            {[...Array(2)].flatMap((_, i) =>
              ['Interior design studios', 'Dental clinics', 'Cosmetics brands', 'Coffee roasteries', 'Local retailers', 'Service businesses'].map((label) => (
                <span key={`${label}-${i}`} className="marquee-item">{label}</span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* WHAT'S CHANGING — Before/After toggle */}
      <ScrollFade>
        <section className="container" style={{ padding: '64px 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="badge">What's changing</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '18px 0 14px' }}>
              Cheap now. Empty in a year.
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.6, maxWidth: 620, margin: '0 auto' }}>
              Every AI-generated page, every algorithm-written post, looks a little more fake than something made
              by a human. Visitors feel it, even if they can't tell you why they left.
            </p>
          </div>
          <BeforeAfterToggle />
        </section>
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

      {/* HOW IT WORKS — hub diagram */}
      <ScrollFade>
        <section className="container" style={{ padding: '20px 24px 96px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.8fr) minmax(0, 1.2fr)', gap: 56, alignItems: 'center' }}>
            <div>
              <span className="badge">How it works</span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '18px 0 14px' }}>
                See what's wrong, fixed in 48 hours.
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
                Send us your website and social accounts, our team reviews everything by hand, and you get a clear,
                prioritized report with 2 videos walking you through it.
              </p>
              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 700 }}>100%</p>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Private &amp; confidential</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 700 }}>48 hours</p>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>From order to full report</p>
                </div>
              </div>
            </div>

            <div>
              <div className="step-tabs">
                <span className="step-tab">Step 01</span>
                <span className="step-tab active">Step 02</span>
                <span className="step-tab">Step 03</span>
              </div>
              <div className="hub-panel">
                <div className="hub-diagram">
                  <div className="hub-node">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="oklch(0.4 0.02 300)" strokeWidth="1.6"><rect x="4" y="5" width="16" height="12" rx="1.5" /><path d="M4 9h16" /></svg>
                  </div>
                  <div className="hub-line" />
                  <div className="hub-center">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><circle cx="10" cy="10" r="6" /><path d="M19 19l-4.5-4.5" /></svg>
                  </div>
                  <div className="hub-line" />
                  <div className="hub-node">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="oklch(0.4 0.02 300)" strokeWidth="1.6"><path d="M4 19V9M10 19V5M16 19v-7M4 19h16" /></svg>
                  </div>
                </div>
                <div className="hub-caption">
                  <span className="hub-badge">Human-reviewed</span>
                  <h4>We analyze your website &amp; social presence</h4>
                  <p>Every page, every post, checked by a person, not a script.</p>
                </div>
              </div>
            </div>
          </div>
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
            <div className="bento-grid">
              <div className="bento-hero">
                <p className="bento-number">48H</p>
                <div>
                  <h3>Delivery, not a promise</h3>
                  <p>Order today, get your audits and videos in your account within 48 hours. No waiting weeks for a call back.</p>
                </div>
              </div>
              {ADVANTAGES.slice(1).map((a) => (
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
            <span className="badge">The videos</span>
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

      {/* WHO IT'S FOR */}
      <ScrollFade>
        <section className="container" style={{ maxWidth: 1500, padding: '20px 24px 100px' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <span className="badge">Who this is for</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '18px 0 14px' }}>
              Built for businesses that care about their audience.
            </h2>
          </div>
          <div className="who-scroller">
            <div className="who-card">
              <div className="icon-chip">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
              </div>
              <h4>Small business owners</h4>
              <p>You built the business, not the brand. You want to know what's actually costing you customers.</p>
              <p className="who-stat">70%</p>
              <p className="who-stat-label">say they never had a proper audit before</p>
            </div>
            <div className="who-card">
              <div className="icon-chip">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><circle cx="9" cy="8" r="3" /><path d="M2 20c0-3.5 3-5 7-5s7 1.5 7 5" /><circle cx="18" cy="9" r="2.4" /><path d="M22 20c0-2.6-1.8-4-4-4.2" /></svg>
              </div>
              <h4>Marketing teams</h4>
              <p>You need outside eyes on a website and socials you're too close to see clearly anymore.</p>
              <p className="who-stat">48h</p>
              <p className="who-stat-label">turnaround, fits inside any sprint</p>
            </div>
            <div className="who-card">
              <div className="icon-chip">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" /></svg>
              </div>
              <h4>Solo founders</h4>
              <p>You're doing it all yourself, including the parts of marketing you were never trained for.</p>
              <p className="who-stat">50 EUR</p>
              <p className="who-stat-label">less than one wasted ad campaign</p>
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

      {/* TESTIMONIALS */}
      {/* FAKE DATA — replace with real client testimonials once you have them */}
      <ScrollFade>
        <section className="container" style={{ maxWidth: 1500, padding: '20px 24px 100px' }}>
          <div className="testimonial-wrap">
            <div className="testimonial-header">
              <span className="badge">Testimonials</span>
              <h2 style={{ marginTop: 16 }}>What clients say about UPPR.</h2>
              <div className="testimonial-trust">
                <span>★ 5.0 rating</span>
                <span>·</span>
                <span>30+ audits delivered</span>
                <span>·</span>
                <span>94% would recommend</span>
              </div>
            </div>
            <div className="testimonial-scroller">
              {[
                { name: 'Ana Ionescu', role: 'Founder, interior design studio', quote: 'The audit showed me in 2 days what I hadn\u2019t seen in months: my website said nothing about what makes me different. I changed the homepage and felt the difference immediately.' },
                { name: 'Mihai Dobre', role: 'Manager, dental clinic', quote: 'The website video was the most useful part. It explained step by step why people were abandoning the booking form.' },
                { name: 'Cristina Popa', role: 'Founder, natural cosmetics brand', quote: 'The visual identity audit surfaced inconsistencies between my site and Instagram I hadn\u2019t noticed. Everything is aligned now.' },
                { name: 'Radu Stanciu', role: 'Owner, local coffee roastery', quote: 'Straightforward and fast. No fluff, just a clear list of what to fix first.' },
              ].map((t) => (
                <div key={t.name} className="testimonial-card">
                  <span className="stars">★★★★★</span>
                  <p className="quote">"{t.quote}"</p>
                  <div className="testimonial-person">
                    <div className="avatar-initials">{t.name.split(' ').map((n) => n[0]).join('')}</div>
                    <div>
                      <p className="name">{t.name}</p>
                      <p className="role">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* PRICING */}
      <ScrollFade>
        <section className="container" style={{ padding: '20px 24px 100px', textAlign: 'center' }}>
          <span className="badge">Pricing</span>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '18px 0 40px' }}>
            One price. Everything included.
          </h2>
          <div className="pricing-card">
            <span className="badge-popular">One-time payment</span>
            <p style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'oklch(0.65 0.02 300)', fontFamily: 'var(--font-mono)' }}>UPPR Audit</p>
            <div className="pricing-price">
              <span className="amount">€50</span>
              <span className="period">one-time, no subscription</span>
            </div>
            <Link href="/formular" className="btn-primary" style={{ background: 'white', color: '#111', width: '100%' }}>
              Order the audit
            </Link>
            <ul className="pricing-list" style={{ textAlign: 'left' }}>
              {[
                'Social media audit',
                'Visual identity audit',
                'Website audit',
                'UI/UX audit',
                '2 personalized videos, 30 min each',
                'Delivered within 48 hours',
                'Access to your own client dashboard',
              ].map((f) => (
                <li key={f}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <p className="pricing-note">No credit card stored · No recurring charge · Cancel is automatic, there's nothing to cancel</p>
        </section>
      </ScrollFade>

      {/* PRIVACY */}
      <ScrollFade>
        <section className="container" style={{ padding: '20px 24px 100px', display: 'grid', gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)', gap: 56, alignItems: 'center' }}>
          <div className="privacy-visual">
            <div className="privacy-lock">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
            </div>
            <div className="privacy-nodes">
              <div className="privacy-node">Encrypted storage</div>
              <div className="privacy-node">Deleted on request</div>
            </div>
          </div>
          <div>
            <span className="badge">Privacy</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '18px 0 14px' }}>
              Your data stays yours.
            </h2>
            <Link href="/formular" className="btn-primary" style={{ marginBottom: 24 }}>Order audit</Link>
            <ul className="check-list">
              {[
                'We only look at what you send us, nothing more',
                'Payments are handled securely by Stripe, we never see your card details',
                'Audit files are deleted on request after delivery',
                'No data is sold or shared with third parties',
              ].map((item) => (
                <li key={item} className="check-good">{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </ScrollFade>

      {/* FAQ */}
      <ScrollFade>
        <section className="container" style={{ maxWidth: 1100, padding: '20px 24px 100px' }}>
          <div style={{ marginBottom: 36 }}>
            <span className="badge">FAQ</span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.02em', margin: '18px 0 8px' }}>
              Frequently asked questions.
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>Quick answers about the audit, pricing, and delivery.</p>
          </div>
          <div className="faq-layout">
            <div>
              {[
                { q: 'What exactly do I get for 50 EUR?', a: '4 written audits (social media, visual identity, website, UI/UX) and 2 personalized videos, 30 minutes each, one about your website and one about your visual identity and social media.' },
                { q: 'How long does delivery take?', a: "Maximum 48 hours from confirmed payment. Deliverables appear in your account as they're ready, you don't have to wait for all 6 at once." },
                { q: 'Are the videos generic or personalized?', a: "They're personalized, recorded specifically for your business, not generic material sent to every client." },
                { q: 'What do I do with the audit afterward?', a: 'It contains concrete recommendations, in priority order. You can implement them yourself, with your team, or work with UPPR Agency for execution.' },
                { q: 'Is there a subscription or recurring payment?', a: 'No. One payment of 50 EUR, no auto-renewal.' },
                { q: "What if I'm not satisfied?", a: "Get in touch, we review every case individually. Full details are in our refund policy." },
              ].map((item) => (
                <details key={item.q} className="faq-item">
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
            <div className="faq-side-card">
              <div style={{ display: 'flex', marginBottom: 4 }}>
                {['AI', 'DM', 'CP'].map((initials, i) => (
                  <div
                    key={initials}
                    className="avatar-initials"
                    style={{ marginLeft: i === 0 ? 0 : -10, border: '2px solid white', width: 34, height: 34, fontSize: 11 }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <h4>Still have questions?</h4>
              <p>Get in touch and we'll walk you through exactly how the audit works.</p>
              <a href="mailto:office@uppr.agency" className="btn-primary small" style={{ width: '100%' }}>
                Email us
              </a>
            </div>
          </div>
        </section>
      </ScrollFade>

      {/* FINAL CTA — banner with side visuals */}
      <ScrollFade>
      <section className="container" style={{ padding: '20px 24px 100px' }}>
        <div className="cta-banner">
          <div className="cta-side-card">
            <div className="cta-mock">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.7"><rect x="4" y="5" width="16" height="12" rx="1.5" /><path d="M4 9h16" /></svg>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, maxWidth: 520 }}>
            <span className="nav-mark" style={{ width: 40, height: 40, borderRadius: 10 }} />
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.02em', color: 'white' }}>
              See exactly what needs fixing.
            </h2>
            <p style={{ fontSize: 17, color: 'oklch(0.85 0.02 300)' }}>
              4 audits, 2 personalized videos, 48-hour delivery — one payment of 50 EUR.
            </p>
            <Link href="/formular" className="btn-primary" style={{ background: 'white', color: '#111' }}>
              Order the audit — 50 EUR
            </Link>
          </div>
          <div className="cta-side-card">
            <div className="cta-mock">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#111"><path d="M6 4l14 8-14 8z" /></svg>
            </div>
          </div>
        </div>
      </section>
      </ScrollFade>

      <Footer />
      <div className="gradient-bar" />
    </>
  );
}
