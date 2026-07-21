import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/FaqAccordion';

const ACCENT = '#e2fa5c';

const heroDeliverables = [
  { name: 'Social media audit', status: 'Delivered', bg: 'rgba(35,35,38,0.06)', fg: '#232326' },
  { name: 'Visual identity audit', status: 'Delivered', bg: 'rgba(35,35,38,0.06)', fg: '#232326' },
  { name: 'Website audit', status: 'Delivered', bg: 'rgba(35,35,38,0.06)', fg: '#232326' },
  { name: 'UI/UX audit', status: 'Delivered', bg: 'rgba(35,35,38,0.06)', fg: '#232326' },
  { name: 'Video — Website', status: 'In progress', bg: '#f3edff', fg: '#6d5bb8' },
  { name: 'Video — Visual identity', status: 'In progress', bg: '#f3edff', fg: '#6d5bb8' },
];

const accountItems = [
  { name: 'Social media audit', status: 'Delivered', dbg: 'rgba(226,250,92,0.15)', dfg: ACCENT },
  { name: 'Visual identity audit', status: 'Delivered', dbg: 'rgba(226,250,92,0.15)', dfg: ACCENT },
  { name: 'Website audit', status: 'In progress', dbg: 'rgba(255,255,255,0.08)', dfg: 'rgba(255,255,255,0.6)' },
  { name: 'UI/UX audit', status: 'In progress', dbg: 'rgba(255,255,255,0.08)', dfg: 'rgba(255,255,255,0.6)' },
  { name: 'Video — Website', status: 'In progress', dbg: 'rgba(255,255,255,0.08)', dfg: 'rgba(255,255,255,0.6)' },
  { name: 'Video — Visual identity', status: 'In progress', dbg: 'rgba(255,255,255,0.08)', dfg: 'rgba(255,255,255,0.6)' },
];

const kinds = ['Interior design studios', 'Dental clinics', 'Cosmetics brands', 'Coffee roasteries', 'Local retailers', 'Service businesses'];

const aiCosts = [
  'Content sounds generic, no personality',
  "No one tells you why visitors leave",
  'Website and social media feel disconnected',
  'Decisions based on guesses, not data',
];

const steps = [
  { num: '01', title: 'Send us your links', desc: "Your website URL and social accounts. That's all we need to get started — no calls, no forms." },
  { num: '02', title: 'We analyze everything by hand', desc: 'Every page, every post, checked by a person, not a script. Human-reviewed, end to end.' },
  { num: '03', title: 'You get the full report', desc: 'Four structured audits and two personalized videos, prioritized and ready to act on, in your dashboard within 48 hours.' },
];

const compareRows = [
  { label: 'Time to result', diy: 'Undefined', freelancer: '1–2 weeks', uppr: '48 hours' },
  { label: 'Level of detail', diy: 'Subjective', freelancer: 'Variable', uppr: '4 structured audits' },
  { label: 'Explained or just written', diy: '—', freelancer: 'Usually just text', uppr: '2 personalized videos' },
  { label: 'Cost', diy: 'Your time', freelancer: 'Often over €200', uppr: '€50, one payment' },
];

const advantages = [
  { tag: '48H', title: 'Delivery, not a promise', desc: 'Order today, get your audits and videos in your account within 48 hours. No waiting weeks for a call back.' },
  { tag: '01', title: 'Real team, not templates', desc: 'Every audit is done by a person actually looking at your business, not auto-generated.' },
  { tag: '02', title: 'Actionable recommendations', desc: "You don't just get a diagnosis. You get concrete next steps, in priority order." },
  { tag: '€50', title: 'No subscription', desc: "One payment, 50 EUR. No monthly contract just to find out what's not working." },
  { tag: '03', title: 'Explained, not just written', desc: 'The 2 personalized videos show you exactly where to look and why it matters.' },
  { tag: '04', title: 'Connected to execution', desc: 'If you want it implemented too, the same team (UPPR Agency) can take over marketing and retention.' },
];

const videos = [
  { title: '30-min video — Website', desc: 'A live walkthrough of your site, explained step by step, with concrete examples of what to improve.' },
  { title: '30-min video — Visual identity & social media', desc: 'What your brand communicates now, what it should communicate, and how to get there.' },
];

const audits = [
  { num: '01', title: 'Social media audit', desc: "What's working and what's costing you engagement, with concrete content recommendations." },
  { num: '02', title: 'Visual identity audit', desc: 'Consistency, perception, and weak points in your logo, colors, and typography, applied across all your materials.' },
  { num: '03', title: 'Website audit', desc: "Structure, speed, conversion, and what's stopping visitors from buying or contacting you." },
  { num: '04', title: 'UI/UX audit', desc: 'Friction points in the navigation experience, from homepage to form or checkout.' },
];

const personas = [
  { title: 'Small business owners', desc: "You built the business, not the brand. You want to know what's actually costing you customers.", stat: '70%', statLabel: 'say they never had a proper audit before' },
  { title: 'Marketing teams', desc: "You need outside eyes on a website and socials you're too close to see clearly anymore.", stat: '48h', statLabel: 'turnaround, fits inside any sprint' },
  { title: 'Solo founders', desc: "You're doing it all yourself, including the parts of marketing you were never trained for.", stat: '€50', statLabel: 'less than one wasted ad campaign' },
];

const testimonials = [
  { quote: "The audit showed me in 2 days what I hadn't seen in months: my website said nothing about what makes me different. I changed the homepage and felt the difference immediately.", initials: 'AI', name: 'Ana Ionescu', role: 'Founder, interior design studio' },
  { quote: 'The website video was the most useful part. It explained step by step why people were abandoning the booking form.', initials: 'MD', name: 'Mihai Dobre', role: 'Manager, dental clinic' },
  { quote: "The visual identity audit surfaced inconsistencies between my site and Instagram I hadn't noticed. Everything is aligned now.", initials: 'CP', name: 'Cristina Popa', role: 'Founder, natural cosmetics brand' },
  { quote: 'Straightforward and fast. No fluff, just a clear list of what to fix first.', initials: 'RS', name: 'Radu Stanciu', role: 'Owner, local coffee roastery' },
];

const privacy = [
  'We only look at what you send us, nothing more',
  'Payments are handled securely by Stripe, we never see your card details',
  'Audit files are deleted on request after delivery',
  'No data is sold or shared with third parties',
];

const included = [
  'Social media audit',
  'Visual identity audit',
  'Website audit',
  'UI/UX audit',
  '2 personalized videos, 30 min each',
  'Delivered within 48 hours',
  'Access to your own client dashboard',
];

export default function HomePage() {
  return (
    <>
      <Nav />

      {/* HERO */}
      <header style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px 64px' }} className="grid-2-responsive">
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 64, alignItems: 'center' }} className="grid-2-responsive">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#55565e', background: '#fff', border: '1px solid rgba(35,35,38,0.1)', padding: '6px 14px', borderRadius: 99 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, display: 'inline-block' }} />
              The audit that shows you what slow is costing you
            </div>
            <h1 style={{ margin: 0, fontSize: 60, lineHeight: 1.04, letterSpacing: '-0.035em', fontWeight: 600 }}>
              AI makes your website cheap. It kills your business slowly.
            </h1>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.55, color: '#55565e', maxWidth: 480 }}>
              Auto-generated content, a website built fast with AI, posts written by an algorithm. Costs little today.
              You lose visitors, audience, and followers, month after month, until there's nothing left to save.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
              <Link href="/formular" className="btn-dark" style={{ background: '#232326', color: '#fff', padding: '15px 28px', borderRadius: 99, fontSize: 15, fontWeight: 500 }}>
                Order audit
              </Link>
              <span style={{ fontSize: 14, color: '#55565e' }}>One payment, no subscription</span>
            </div>
          </div>
          <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 20, padding: 24, boxShadow: '0 24px 48px -24px rgba(35,35,38,0.18)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <span style={{ fontWeight: 600, fontSize: 15 }}>Your account</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#55565e' }}>4 of 6 deliverables available</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {heroDeliverables.map((d) => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fbfaf8', border: '1px solid rgba(35,35,38,0.06)', borderRadius: 12, padding: '12px 16px' }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{d.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '4px 10px', borderRadius: 99, background: d.bg, color: d.fg }}>{d.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* LOGO / AUDIENCE MARQUEE */}
      <section style={{ borderTop: '1px solid rgba(35,35,38,0.08)', borderBottom: '1px solid rgba(35,35,38,0.08)', padding: '20px 0', overflow: 'hidden', background: '#fff' }}>
        <div className="marquee-track" style={{ display: 'flex', gap: 56, width: 'max-content', animation: 'uppr-marquee 30s linear infinite' }}>
          {[...kinds, ...kinds].map((m, i) => (
            <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#55565e', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {m}
            </span>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 14, fontSize: 13, color: '#8a8b92' }}>Built for real businesses, not demos</div>
      </section>

      {/* WHAT'S CHANGING */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 32px' }}>
        <div className="grid-2-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>What's changing</span>
            <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.08, letterSpacing: '-0.03em', fontWeight: 600 }}>Cheap now. Empty in a year.</h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: '#55565e' }}>
              Every AI-generated page, every algorithm-written post, looks a little more fake than something made by a human.
              Visitors feel it, even if they can't tell you why they left.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
              {aiCosts.map((c) => (
                <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, color: '#232326' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', color: '#c0533f', fontSize: 13 }}>✕</span>
                  {c}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="grid-2-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 28, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.03em' }}>−41%</span>
                <span style={{ fontSize: 14, color: '#55565e' }}>audience lost in 6 months</span>
              </div>
              <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 28, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.03em' }}>68%</span>
                <span style={{ fontSize: 14, color: '#55565e' }}>visitors confused by mixed messaging</span>
              </div>
            </div>
            <div style={{ background: '#232326', color: '#fff', borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: ACCENT }}>Philosophy</span>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>
                AI can generate a website in 10 minutes and a post in 10 seconds. It can't tell you why people leave without buying.
                UPPR Consulting is the human layer that checks what automation broke, before it costs you your audience for good.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: '#fff', borderTop: '1px solid rgba(35,35,38,0.08)', borderBottom: '1px solid rgba(35,35,38,0.08)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 32px', display: 'flex', flexDirection: 'column', gap: 48 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 560 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>How it works</span>
              <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.08, letterSpacing: '-0.03em', fontWeight: 600 }}>See what's wrong, fixed in 48 hours.</h2>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: '#55565e' }}>
                Send us your website and social accounts, our team reviews everything by hand, and you get a clear, prioritized
                report with 2 videos walking you through it.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}>100%</span>
                <span style={{ fontSize: 13, color: '#55565e' }}>Private &amp; confidential</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}>48 hours</span>
                <span style={{ fontSize: 13, color: '#55565e' }}>From order to full report</span>
              </div>
            </div>
          </div>
          <div className="grid-3-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {steps.map((s) => (
              <div key={s.num} style={{ background: '#fbfaf8', border: '1px solid rgba(35,35,38,0.08)', borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#55565e' }}>Step {s.num}</span>
                <span style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-0.01em' }}>{s.title}</span>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: '#55565e' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 32px', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 640 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>How it compares</span>
          <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.08, letterSpacing: '-0.03em', fontWeight: 600 }}>
            Three ways to find out what's not working. One is built for you.
          </h2>
        </div>
        <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 20, overflow: 'hidden', overflowX: 'auto' }}>
          <div className="compare-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1.2fr', borderBottom: '1px solid rgba(35,35,38,0.08)', minWidth: 640 }}>
            <div style={{ padding: '20px 24px' }} />
            <div style={{ padding: '20px 24px', fontSize: 14, fontWeight: 600, color: '#55565e' }}>You figure it out yourself</div>
            <div style={{ padding: '20px 24px', fontSize: 14, fontWeight: 600, color: '#55565e' }}>Random freelancer</div>
            <div style={{ padding: '20px 24px', fontSize: 14, fontWeight: 600, background: '#232326', color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT }} />
              UPPR Consulting
            </div>
          </div>
          {compareRows.map((r) => (
            <div key={r.label} className="compare-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1.2fr', borderBottom: '1px solid rgba(35,35,38,0.06)', minWidth: 640 }}>
              <div style={{ padding: '18px 24px', fontSize: 14, fontWeight: 600 }}>{r.label}</div>
              <div style={{ padding: '18px 24px', fontSize: 14, color: '#55565e' }}>{r.diy}</div>
              <div style={{ padding: '18px 24px', fontSize: 14, color: '#55565e' }}>{r.freelancer}</div>
              <div style={{ padding: '18px 24px', fontSize: 14, fontWeight: 500, background: '#232326', color: '#fff' }}>{r.uppr}</div>
            </div>
          ))}
        </div>
      </section>

      {/* UPPR ADVANTAGE */}
      <section id="advantages" style={{ background: '#232326', color: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 32px', display: 'flex', flexDirection: 'column', gap: 48 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: ACCENT }}>UPPR advantage</span>
            <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.08, letterSpacing: '-0.03em', fontWeight: 600 }}>The UPPR advantage.</h2>
          </div>
          <div className="grid-3-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {advantages.map((a) => (
              <div key={a.title} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: ACCENT }}>{a.tag}</span>
                <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' }}>{a.title}</span>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: 'rgba(255,255,255,0.7)' }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEOS */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 32px', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 560 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>The videos</span>
          <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.08, letterSpacing: '-0.03em', fontWeight: 600 }}>Explained out loud, not just on paper.</h2>
        </div>
        <div className="grid-2-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {videos.map((v) => (
            <div key={v.title} style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 20, padding: 32, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ aspectRatio: '16/9', background: 'repeating-linear-gradient(45deg,#f0efec,#f0efec 10px,#f6f5f2 10px,#f6f5f2 20px)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#232326', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ACCENT, fontSize: 18 }}>▶</div>
                <span style={{ position: 'absolute', bottom: 12, right: 12, fontFamily: 'var(--font-mono)', fontSize: 11, background: 'rgba(35,35,38,0.85)', color: '#fff', padding: '4px 10px', borderRadius: 6 }}>30:00</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#55565e' }}>personalized video · 30 minutes</span>
                <span style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-0.01em' }}>{v.title}</span>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: '#55565e' }}>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section id="audits" style={{ background: '#fff', borderTop: '1px solid rgba(35,35,38,0.08)', borderBottom: '1px solid rgba(35,35,38,0.08)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 32px', display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 560 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>What you get</span>
            <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.08, letterSpacing: '-0.03em', fontWeight: 600 }}>Four complete audits, one price.</h2>
          </div>
          <div className="grid-4-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
            {audits.map((au) => (
              <div key={au.num} style={{ background: '#fbfaf8', border: '1px solid rgba(35,35,38,0.08)', borderRadius: 16, padding: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#55565e' }}>{au.num}</span>
                <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em' }}>{au.title}</span>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: '#55565e' }}>{au.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 32px', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 600 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Who this is for</span>
          <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.08, letterSpacing: '-0.03em', fontWeight: 600 }}>Built for businesses that care about their audience.</h2>
        </div>
        <div className="grid-3-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
          {personas.map((p) => (
            <div key={p.title} style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' }}>{p.title}</span>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: '#55565e', flex: 1 }}>{p.desc}</p>
              <div style={{ borderTop: '1px solid rgba(35,35,38,0.08)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em' }}>{p.stat}</span>
                <span style={{ fontSize: 13, color: '#55565e' }}>{p.statLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACCOUNT PREVIEW */}
      <section id="account" style={{ background: '#232326', color: '#fff' }}>
        <div className="grid-2-responsive" style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 32px', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 64, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: ACCENT }}>Straight from your account</span>
            <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.08, letterSpacing: '-0.03em', fontWeight: 600 }}>This is what your account looks like after payment.</h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)' }}>
              Deliverables show up as they're ready, you don't have to wait for all 6 at once.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {accountItems.map((d) => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '14px 18px' }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{d.name}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '4px 10px', borderRadius: 99, background: d.dbg, color: d.dfg }}>{d.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 32px', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Testimonials</span>
          <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.08, letterSpacing: '-0.03em', fontWeight: 600 }}>What clients say about UPPR.</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#55565e', fontFamily: 'var(--font-mono)' }}>
            <span>★ 5.0 rating</span><span>·</span><span>30+ audits delivered</span><span>·</span><span>94% would recommend</span>
          </div>
        </div>
        <div className="grid-2-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <span style={{ color: '#232326', fontSize: 14, letterSpacing: 2 }}>★★★★★</span>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: '#232326', flex: 1 }}>"{t.quote}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#232326' }}>
                  {t.initials}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{t.name}</span>
                  <span style={{ fontSize: 13, color: '#55565e' }}>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ background: '#fff', borderTop: '1px solid rgba(35,35,38,0.08)', borderBottom: '1px solid rgba(35,35,38,0.08)' }}>
        <div className="grid-2-responsive" style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Pricing</span>
            <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.08, letterSpacing: '-0.03em', fontWeight: 600 }}>One price. Everything included.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>Your data stays yours.</span>
                {privacy.map((pr) => (
                  <div key={pr} style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontSize: 14, color: '#55565e' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', color: '#232326', fontSize: 12 }}>→</span>
                    {pr}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, border: '1px solid rgba(35,35,38,0.12)', padding: '5px 12px', borderRadius: 99, color: '#55565e' }}>Encrypted storage</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, border: '1px solid rgba(35,35,38,0.12)', padding: '5px 12px', borderRadius: 99, color: '#55565e' }}>Deleted on request</span>
              </div>
            </div>
          </div>
          <div style={{ background: '#232326', color: '#fff', borderRadius: 24, padding: 40, display: 'flex', flexDirection: 'column', gap: 24, boxShadow: '0 32px 64px -32px rgba(35,35,38,0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 18, fontWeight: 600 }}>UPPR Audit</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, background: ACCENT, color: '#232326', padding: '5px 12px', borderRadius: 99 }}>One-time payment</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{ fontSize: 64, fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1 }}>€50</span>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>one-time, no subscription</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {included.map((i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15 }}>
                  <span style={{ color: ACCENT, fontFamily: 'var(--font-mono)', fontSize: 13 }}>✓</span>
                  {i}
                </div>
              ))}
            </div>
            <Link href="/formular" className="btn-accent" style={{ background: ACCENT, color: '#232326', padding: 16, borderRadius: 99, fontSize: 16, fontWeight: 600, textAlign: 'center' }}>
              Order the audit — €50
            </Link>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>No credit card stored · No recurring charge · Nothing to cancel</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-layout-responsive" style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 32px', display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 64, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 96 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e', background: '#fff', border: '1px solid rgba(35,35,38,0.08)', padding: '6px 14px', borderRadius: 99, alignSelf: 'flex-start' }}>
            Common questions
          </span>
          <h2 style={{ margin: 0, fontSize: 44, lineHeight: 1.06, letterSpacing: '-0.03em', fontWeight: 600 }}>Frequently asked questions.</h2>
          <p style={{ margin: 0, fontSize: 16, color: '#55565e' }}>Quick answers about the audit, pricing, and delivery.</p>
          <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.08)', borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start', boxShadow: '0 16px 40px -24px rgba(35,35,38,0.15)' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 16, color: '#232326' }}>?</div>
            <span style={{ fontSize: 17, fontWeight: 600 }}>Can't find your answer?</span>
            <a href="mailto:office@uppr.agency" className="btn-dark" style={{ background: '#232326', color: '#fff', padding: '11px 22px', borderRadius: 99, fontSize: 14, fontWeight: 500 }}>
              Contact us
            </a>
          </div>
        </div>
        <FaqAccordion />
      </section>

      {/* FINAL CTA */}
      <section style={{ background: '#232326', color: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '96px 32px', display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 52, lineHeight: 1.06, letterSpacing: '-0.035em', fontWeight: 600 }}>See exactly what needs fixing.</h2>
          <p style={{ margin: 0, fontSize: 18, color: 'rgba(255,255,255,0.7)' }}>4 audits, 2 personalized videos, 48-hour delivery — one payment of €50.</p>
          <Link href="/formular" className="btn-accent" style={{ background: ACCENT, color: '#232326', padding: '16px 32px', borderRadius: 99, fontSize: 16, fontWeight: 600, marginTop: 8 }}>
            Order the audit — €50
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
