import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/FaqAccordion';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Audit website, brand și social media — UPPR Consulting',
  description: 'Primești 4 audituri complete și 2 videoclipuri personalizate despre identitatea vizuală și site-ul tău, livrate în 48 de ore. 250 RON, o singură plată.',
  path: '/ro',
});

const ACCENT = '#e2fa5c';

const heroDeliverables = [
  { name: 'Audit social media', status: 'Livrat', bg: 'rgba(35,35,38,0.06)', fg: '#232326' },
  { name: 'Audit identitate vizuală', status: 'Livrat', bg: 'rgba(35,35,38,0.06)', fg: '#232326' },
  { name: 'Audit website', status: 'Livrat', bg: 'rgba(35,35,38,0.06)', fg: '#232326' },
  { name: 'Audit UI/UX', status: 'Livrat', bg: 'rgba(35,35,38,0.06)', fg: '#232326' },
  { name: 'Video — Website', status: 'În lucru', bg: '#f3edff', fg: '#6d5bb8' },
  { name: 'Video — Identitate vizuală', status: 'În lucru', bg: '#f3edff', fg: '#6d5bb8' },
];

const accountItems = [
  { name: 'Audit social media', status: 'Livrat', dbg: 'rgba(226,250,92,0.15)', dfg: ACCENT },
  { name: 'Audit identitate vizuală', status: 'Livrat', dbg: 'rgba(226,250,92,0.15)', dfg: ACCENT },
  { name: 'Audit website', status: 'În lucru', dbg: 'rgba(255,255,255,0.08)', dfg: 'rgba(255,255,255,0.6)' },
  { name: 'Audit UI/UX', status: 'În lucru', dbg: 'rgba(255,255,255,0.08)', dfg: 'rgba(255,255,255,0.6)' },
  { name: 'Video — Website', status: 'În lucru', dbg: 'rgba(255,255,255,0.08)', dfg: 'rgba(255,255,255,0.6)' },
  { name: 'Video — Identitate vizuală', status: 'În lucru', dbg: 'rgba(255,255,255,0.08)', dfg: 'rgba(255,255,255,0.6)' },
];

const kinds = ['Studiouri de design interior', 'Clinici stomatologice', 'Branduri de cosmetice', 'Prăjitorii de cafea', 'Retail local', 'Servicii'];

const aiCosts = [
  'Conținutul sună generic, fără personalitate',
  'Nimeni nu-ți spune de ce pleacă vizitatorii',
  'Site-ul și social media par două branduri diferite',
  'Decizii luate pe ghicite, nu pe date',
];

const steps = [
  { num: '01', title: 'Ne trimiți linkurile', desc: 'URL-ul site-ului și conturile de social media. Atât ne trebuie ca să pornim — fără apeluri, fără formulare complicate.' },
  { num: '02', title: 'Analizăm totul manual', desc: 'Fiecare pagină, fiecare postare, verificată de o persoană, nu de un script. Revizuit integral de un om.' },
  { num: '03', title: 'Primești raportul complet', desc: 'Patru audituri structurate și două videoclipuri personalizate, prioritizate și gata de implementat, în contul tău, în 48 de ore.' },
];

const compareRows = [
  { label: 'Timp până la rezultat', diy: 'Nedefinit', freelancer: '1–2 săptămâni', uppr: '48 de ore' },
  { label: 'Nivel de detaliu', diy: 'Subiectiv', freelancer: 'Variabil', uppr: '4 audituri structurate' },
  { label: 'Explicat sau doar scris', diy: '—', freelancer: 'De obicei doar text', uppr: '2 videoclipuri personalizate' },
  { label: 'Cost', diy: 'Timpul tău', freelancer: 'Adesea peste 1.000 RON', uppr: '250 RON, o singură plată' },
];

const advantages = [
  { tag: '48H', title: 'Livrare, nu o promisiune', desc: 'Comanzi azi, primești auditurile și videoclipurile în cont în 48 de ore. Fără săptămâni de așteptat un telefon.' },
  { tag: '01', title: 'Echipă reală, nu șabloane', desc: 'Fiecare audit e făcut de o persoană care se uită efectiv la afacerea ta, nu generat automat.' },
  { tag: '02', title: 'Recomandări aplicabile', desc: 'Nu primești doar un diagnostic. Primești pași concreți, în ordinea priorității.' },
  { tag: '250 RON', title: 'Fără abonament', desc: 'O singură plată. Fără contract lunar doar ca să afli ce nu funcționează.' },
  { tag: '03', title: 'Explicat, nu doar scris', desc: 'Cele 2 videoclipuri personalizate îți arată exact unde să te uiți și de ce contează.' },
  { tag: '04', title: 'Conectat la execuție', desc: 'Dacă vrei și implementare, aceeași echipă (UPPR Agency) poate prelua marketing-ul și retenția.' },
];

const videos = [
  { title: '30 min video — Website', desc: 'Un tur live al site-ului tău, explicat pas cu pas, cu exemple concrete despre ce trebuie îmbunătățit.' },
  { title: '30 min video — Identitate vizuală & social media', desc: 'Ce comunică brandul tău acum, ce ar trebui să comunice, și cum ajungi acolo.' },
];

const audits = [
  { num: '01', title: 'Audit social media', desc: 'Ce funcționează și ce te costă engagement, cu recomandări concrete de conținut.' },
  { num: '02', title: 'Audit identitate vizuală', desc: 'Consistență, percepție, și puncte slabe în logo, culori și tipografie, aplicate pe toate materialele.' },
  { num: '03', title: 'Audit website', desc: 'Structură, viteză, conversie, și ce oprește vizitatorii să cumpere sau să te contacteze.' },
  { num: '04', title: 'Audit UI/UX', desc: 'Puncte de fricțiune în experiența de navigare, de la homepage la formular sau checkout.' },
];

const personas = [
  { title: 'Antreprenori la firme mici', desc: 'Ai construit afacerea, nu brandul. Vrei să știi ce te costă efectiv clienți.', stat: '70%', statLabel: 'spun că n-au avut niciodată un audit real înainte' },
  { title: 'Echipe de marketing', desc: 'Ai nevoie de o privire din afară pe un site și conturi de care ești prea aproape ca să le mai vezi clar.', stat: '48h', statLabel: 'timp de livrare, se încadrează în orice sprint' },
  { title: 'Fondatori solo', desc: 'Faci tot singur, inclusiv partea de marketing pentru care nu ai fost niciodată instruit.', stat: '250 RON', statLabel: 'mai puțin decât o campanie de ads irosită' },
];

const testimonials = [
  { quote: 'Auditul mi-a arătat în 2 zile ce nu văzusem în luni întregi: site-ul meu nu spunea nimic despre ce mă diferențiază. Am schimbat homepage-ul și am simțit diferența imediat.', initials: 'AI', name: 'Ana Ionescu', role: 'Fondator, studio de design interior' },
  { quote: 'Videoclipul despre website a fost partea cea mai utilă. A explicat pas cu pas de ce oamenii abandonau formularul de programare.', initials: 'MD', name: 'Mihai Dobre', role: 'Manager, clinică stomatologică' },
  { quote: 'Auditul de identitate vizuală a scos la iveală inconsistențe între site și Instagram pe care nu le observasem. Acum totul e aliniat.', initials: 'CP', name: 'Cristina Popa', role: 'Fondator, brand de cosmetice naturale' },
  { quote: 'Direct și rapid. Fără vorbe în plus, doar o listă clară cu ce trebuie reparat primul.', initials: 'RS', name: 'Radu Stanciu', role: 'Proprietar, prăjitorie de cafea locală' },
];

const privacy = [
  'Ne uităm doar la ce ne trimiți, nimic în plus',
  'Plățile sunt procesate securizat prin Stripe, nu vedem niciodată datele cardului tău',
  'Fișierele de audit se șterg la cerere după livrare',
  'Nu vindem și nu partajăm date cu terți',
];

const included = [
  'Audit social media',
  'Audit identitate vizuală',
  'Audit website',
  'Audit UI/UX',
  '2 videoclipuri personalizate, 30 min fiecare',
  'Livrare în 48 de ore',
  'Acces la propriul cont de client',
];

const faqsRo = [
  {
    q: 'Ce primesc exact pentru 250 RON?',
    a: 'Patru audituri complete (social media, identitate vizuală, website, UI/UX) plus două videoclipuri personalizate de 30 de minute care explică descoperirile — totul livrat în contul tău în 48 de ore.',
  },
  {
    q: 'Cât durează livrarea?',
    a: '48 de ore de la momentul comenzii. Livrabilele apar în cont pe măsură ce sunt gata, deci primești adesea primele audituri mai devreme.',
  },
  {
    q: 'Videoclipurile sunt generice sau personalizate?',
    a: 'Complet personalizate. Fiecare video e înregistrat specific despre site-ul și brandul tău — un tur live cu exemple concrete de pe paginile și postările tale.',
  },
  {
    q: 'Ce fac cu auditul după ce-l primesc?',
    a: 'Fiecare audit se termină cu pași concreți, în ordinea priorității. Poți să-i implementezi singur, să-i predai echipei tale, sau să lași UPPR Agency să preia execuția.',
  },
  {
    q: 'Există abonament sau plată recurentă?',
    a: 'Nu. O singură plată, fără reînnoire, fără nimic de anulat. Nici măcar nu stocăm datele cardului — plata e procesată de Stripe.',
  },
  {
    q: 'Ce se întâmplă dacă nu sunt mulțumit?',
    a: 'Fiecare audit e personalizat pentru afacerea ta chiar din momentul în care începem lucrul, așa că nu oferim rambursări după plasarea comenzii. Vezi politica noastră de rambursare pentru explicația completă.',
  },
];

export default function RomanianLandingPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqsRo.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Nav />

      {/* HERO */}
      <header style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px 64px' }} className="grid-2-responsive">
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 64, alignItems: 'center' }} className="grid-2-responsive">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#55565e', background: '#fff', border: '1px solid rgba(35,35,38,0.1)', padding: '6px 14px', borderRadius: 99 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, display: 'inline-block' }} />
              Auditul care îți arată cât te costă lentoarea
            </div>
            <h1 style={{ margin: 0, fontSize: 60, lineHeight: 1.04, letterSpacing: '-0.035em', fontWeight: 600 }}>
              AI-ul îți face site-ul ieftin. Îți omoară afacerea încet.
            </h1>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.55, color: '#55565e', maxWidth: 480 }}>
              Conținut generat automat, un site construit rapid cu AI, postări scrise de un algoritm. Costă puțin azi.
              Pierzi vizitatori, audiență și urmăritori, lună de lună, până nu mai rămâne nimic de salvat.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
              <Link href="/order" className="btn-dark" style={{ background: '#232326', color: '#fff', padding: '15px 28px', borderRadius: 99, fontSize: 15, fontWeight: 500 }}>
                Comandă auditul
              </Link>
              <span style={{ fontSize: 14, color: '#55565e' }}>O singură plată, fără abonament</span>
            </div>
          </div>
          <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 20, padding: 24, boxShadow: '0 24px 48px -24px rgba(35,35,38,0.18)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <span style={{ fontWeight: 600, fontSize: 15 }}>Contul tău</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#55565e' }}>4 din 6 livrabile disponibile</span>
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

      {/* MARQUEE */}
      <section style={{ borderTop: '1px solid rgba(35,35,38,0.08)', borderBottom: '1px solid rgba(35,35,38,0.08)', padding: '20px 0', overflow: 'hidden', background: '#fff' }}>
        <div className="marquee-track" style={{ display: 'flex', gap: 56, width: 'max-content', animation: 'uppr-marquee 30s linear infinite' }}>
          {[...kinds, ...kinds].map((m, i) => (
            <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#55565e', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {m}
            </span>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 14, fontSize: 13, color: '#8a8b92' }}>Construit pentru afaceri reale, nu pentru demo-uri</div>
      </section>

      {/* WHAT'S CHANGING */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 32px' }}>
        <div className="grid-2-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Ce se schimbă</span>
            <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.08, letterSpacing: '-0.03em', fontWeight: 600 }}>Ieftin acum. Gol peste un an.</h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: '#55565e' }}>
              Fiecare pagină generată de AI, fiecare postare scrisă de un algoritm, arată puțin mai fals decât ceva făcut de un om.
              Vizitatorii simt asta, chiar dacă nu-ți pot spune de ce au plecat.
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
                <span style={{ fontSize: 14, color: '#55565e' }}>audiență pierdută în 6 luni</span>
              </div>
              <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 28, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.03em' }}>68%</span>
                <span style={{ fontSize: 14, color: '#55565e' }}>vizitatori derutați de mesaje neconcordante</span>
              </div>
            </div>
            <div style={{ background: '#232326', color: '#fff', borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: ACCENT }}>Filozofie</span>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>
                AI-ul poate genera un site în 10 minute și o postare în 10 secunde. Nu-ți poate spune de ce oamenii pleacă fără să cumpere.
                UPPR Consulting e stratul uman care verifică ce a stricat automatizarea, înainte să te coste audiența definitiv.
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
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Cum funcționează</span>
              <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.08, letterSpacing: '-0.03em', fontWeight: 600 }}>Vezi ce e greșit, reparat în 48 de ore.</h2>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: '#55565e' }}>
                Ne trimiți site-ul și conturile de social media, echipa noastră analizează totul manual, și primești un raport clar,
                prioritizat, plus 2 videoclipuri care te ghidează prin el.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 32 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}>100%</span>
                <span style={{ fontSize: 13, color: '#55565e' }}>Privat &amp; confidențial</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}>48 de ore</span>
                <span style={{ fontSize: 13, color: '#55565e' }}>De la comandă la raportul complet</span>
              </div>
            </div>
          </div>
          <div className="grid-3-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {steps.map((s) => (
              <div key={s.num} style={{ background: '#fbfaf8', border: '1px solid rgba(35,35,38,0.08)', borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#55565e' }}>Pasul {s.num}</span>
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
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Cum ne comparăm</span>
          <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.08, letterSpacing: '-0.03em', fontWeight: 600 }}>
            Trei moduri de a afla ce nu funcționează. Unul e construit pentru tine.
          </h2>
        </div>
        <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 20, overflow: 'hidden', overflowX: 'auto' }}>
          <div className="compare-grid compare-header-row" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1.2fr', borderBottom: '1px solid rgba(35,35,38,0.08)', minWidth: 640 }}>
            <div style={{ padding: '20px 24px' }} />
            <div style={{ padding: '20px 24px', fontSize: 14, fontWeight: 600, color: '#55565e' }}>Îți dai singur seama</div>
            <div style={{ padding: '20px 24px', fontSize: 14, fontWeight: 600, color: '#55565e' }}>Freelancer la întâmplare</div>
            <div style={{ padding: '20px 24px', fontSize: 14, fontWeight: 600, background: '#232326', color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT }} />
              UPPR Consulting
            </div>
          </div>
          {compareRows.map((r) => (
            <div key={r.label} className="compare-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1.2fr', borderBottom: '1px solid rgba(35,35,38,0.06)', minWidth: 640 }}>
              <div style={{ padding: '18px 24px', fontSize: 14, fontWeight: 600 }}>{r.label}</div>
              <div data-label="Îți dai singur seama" style={{ padding: '18px 24px', fontSize: 14, color: '#55565e' }}>{r.diy}</div>
              <div data-label="Freelancer la întâmplare" style={{ padding: '18px 24px', fontSize: 14, color: '#55565e' }}>{r.freelancer}</div>
              <div data-label="UPPR Consulting" style={{ padding: '18px 24px', fontSize: 14, fontWeight: 500, background: '#232326', color: '#fff' }}>{r.uppr}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ADVANTAGE */}
      <section style={{ background: '#232326', color: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 32px', display: 'flex', flexDirection: 'column', gap: 48 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: ACCENT }}>Avantajul UPPR</span>
            <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.08, letterSpacing: '-0.03em', fontWeight: 600 }}>Avantajul UPPR.</h2>
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
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Videoclipurile</span>
          <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.08, letterSpacing: '-0.03em', fontWeight: 600 }}>Explicat cu voce tare, nu doar în scris.</h2>
        </div>
        <div className="grid-2-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {videos.map((v) => (
            <div key={v.title} style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 20, padding: 32, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ aspectRatio: '16/9', background: 'repeating-linear-gradient(45deg,#f0efec,#f0efec 10px,#f6f5f2 10px,#f6f5f2 20px)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#232326', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ACCENT, fontSize: 18 }}>▶</div>
                <span style={{ position: 'absolute', bottom: 12, right: 12, fontFamily: 'var(--font-mono)', fontSize: 11, background: 'rgba(35,35,38,0.85)', color: '#fff', padding: '4px 10px', borderRadius: 6 }}>30:00</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#55565e' }}>video personalizat · 30 minute</span>
                <span style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-0.01em' }}>{v.title}</span>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: '#55565e' }}>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AUDITS */}
      <section style={{ background: '#fff', borderTop: '1px solid rgba(35,35,38,0.08)', borderBottom: '1px solid rgba(35,35,38,0.08)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 32px', display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 560 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Ce primești</span>
            <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.08, letterSpacing: '-0.03em', fontWeight: 600 }}>Patru audituri complete, un singur preț.</h2>
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

      {/* WHO */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 32px', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 600 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Pentru cine e</span>
          <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.08, letterSpacing: '-0.03em', fontWeight: 600 }}>Construit pentru afaceri cărora le pasă de audiența lor.</h2>
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
      <section style={{ background: '#232326', color: '#fff' }}>
        <div className="grid-2-responsive" style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 32px', display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 64, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: ACCENT }}>Direct din contul tău</span>
            <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.08, letterSpacing: '-0.03em', fontWeight: 600 }}>Așa arată contul tău după plată.</h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)' }}>
              Livrabilele apar pe măsură ce sunt gata, nu trebuie să aștepți toate cele 6 deodată.
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
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Testimoniale</span>
          <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.08, letterSpacing: '-0.03em', fontWeight: 600 }}>Ce spun clienții despre UPPR.</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#55565e', fontFamily: 'var(--font-mono)' }}>
            <span>★ 5.0 rating</span><span>·</span><span>30+ audituri livrate</span><span>·</span><span>94% ar recomanda</span>
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
      <section style={{ background: '#fff', borderTop: '1px solid rgba(35,35,38,0.08)', borderBottom: '1px solid rgba(35,35,38,0.08)' }}>
        <div className="grid-2-responsive" style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Preț</span>
            <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.08, letterSpacing: '-0.03em', fontWeight: 600 }}>Un preț. Totul inclus.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>Datele tale rămân ale tale.</span>
                {privacy.map((pr) => (
                  <div key={pr} style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontSize: 14, color: '#55565e' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', color: '#232326', fontSize: 12 }}>→</span>
                    {pr}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, border: '1px solid rgba(35,35,38,0.12)', padding: '5px 12px', borderRadius: 99, color: '#55565e' }}>Stocare criptată</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, border: '1px solid rgba(35,35,38,0.12)', padding: '5px 12px', borderRadius: 99, color: '#55565e' }}>Ștergere la cerere</span>
              </div>
            </div>
          </div>
          <div style={{ background: '#232326', color: '#fff', borderRadius: 24, padding: 40, display: 'flex', flexDirection: 'column', gap: 24, boxShadow: '0 32px 64px -32px rgba(35,35,38,0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 18, fontWeight: 600 }}>Audit UPPR</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, background: ACCENT, color: '#232326', padding: '5px 12px', borderRadius: 99 }}>Plată unică</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{ fontSize: 64, fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1 }}>≈250 RON</span>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>plată unică, fără abonament</span>
            </div>
            <p style={{ margin: '-14px 0 0', fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
              Echivalentul a 47,97 EUR · plata se procesează în EUR, suma exactă depinde de cursul băncii tale
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {included.map((i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15 }}>
                  <span style={{ color: ACCENT, fontFamily: 'var(--font-mono)', fontSize: 13 }}>✓</span>
                  {i}
                </div>
              ))}
            </div>
            <Link href="/order" className="btn-accent" style={{ background: ACCENT, color: '#232326', padding: 16, borderRadius: 99, fontSize: 16, fontWeight: 600, textAlign: 'center' }}>
              Comandă auditul — 250 RON
            </Link>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, border: '1px solid rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: 99, color: 'rgba(255,255,255,0.6)' }}>🔒 Plată securizată prin Stripe</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, border: '1px solid rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: 99, color: 'rgba(255,255,255,0.6)' }}>Acceptăm și cardul firmei</span>
            </div>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>Nu stocăm cardul · Fără taxare recurentă · Nimic de anulat</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-layout-responsive" style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 32px', display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 64, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'sticky', top: 96 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e', background: '#fff', border: '1px solid rgba(35,35,38,0.08)', padding: '6px 14px', borderRadius: 99, alignSelf: 'flex-start' }}>
            Întrebări frecvente
          </span>
          <h2 style={{ margin: 0, fontSize: 44, lineHeight: 1.06, letterSpacing: '-0.03em', fontWeight: 600 }}>Întrebări frecvente.</h2>
          <p style={{ margin: 0, fontSize: 16, color: '#55565e' }}>Răspunsuri rapide despre audit, preț și livrare.</p>
          <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.08)', borderRadius: 20, padding: 28, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start', boxShadow: '0 16px 40px -24px rgba(35,35,38,0.15)' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 16, color: '#232326' }}>?</div>
            <span style={{ fontSize: 17, fontWeight: 600 }}>Nu găsești răspunsul?</span>
            <a href="mailto:office@uppr.agency" className="btn-dark" style={{ background: '#232326', color: '#fff', padding: '11px 22px', borderRadius: 99, fontSize: 14, fontWeight: 500 }}>
              Contactează-ne
            </a>
          </div>
        </div>
        <FaqAccordion items={faqsRo} />
      </section>

      {/* FINAL CTA */}
      <section style={{ background: '#232326', color: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '96px 32px', display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', textAlign: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 52, lineHeight: 1.06, letterSpacing: '-0.035em', fontWeight: 600 }}>Vezi exact ce trebuie reparat.</h2>
          <p style={{ margin: 0, fontSize: 18, color: 'rgba(255,255,255,0.7)' }}>4 audituri, 2 videoclipuri personalizate, livrare în 48 de ore — o singură plată de 250 RON.</p>
          <Link href="/order" className="btn-accent" style={{ background: ACCENT, color: '#232326', padding: '16px 32px', borderRadius: 99, fontSize: 16, fontWeight: 600, marginTop: 8 }}>
            Comandă auditul — 250 RON
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
