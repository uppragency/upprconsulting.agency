import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import HeroGraphic from '@/components/HeroGraphic';

// FAKE DATA — cifre plauzibile pentru lansare inițială. Înlocuiește cu date reale
// (clienți, testimoniale, statistici) înainte de a face site-ul public pe domeniul final.

const CLIENTI_MARQUEE = [
  'STUDIO NOVA', 'ATELIER VERDE', 'CAFÉ LUMEN', 'NORDPRINT', 'HALO STUDIO', 'BRICK & CO',
];

const AUDITURI = [
  { titlu: 'Audit social media', descriere: 'Ce funcționează și ce te costă engagement pe conturile tale, cu recomandări concrete de conținut.' },
  { titlu: 'Audit identitate vizuală', descriere: 'Consistență, percepție și puncte slabe în logo, culori, tipografie, aplicate în toate materialele tale.' },
  { titlu: 'Audit website', descriere: 'Structură, viteză, conversie și ce oprește vizitatorii să cumpere sau să te contacteze.' },
  { titlu: 'Audit UI/UX', descriere: 'Fricțiuni în experiența de navigare, de la homepage la formular sau checkout.' },
];

const VIDEO = [
  { titlu: 'Video 30 min — Website', descriere: 'Analiză live a site-ului tău, explicată pas cu pas, cu exemple concrete de îmbunătățit.' },
  { titlu: 'Video 30 min — Identitate vizuală & social media', descriere: 'Ce transmite brandul tău acum, ce ar trebui să transmită și cum ajungi acolo.' },
];

const AVANTAJE = [
  { icon: '⏱', titlu: 'Livrare în 48 de ore', descriere: 'Nu aștepți săptămâni. Comanzi azi, ai auditurile în cont în maximum 2 zile.' },
  { icon: '◎', titlu: 'Echipă reală, nu șabloane', descriere: 'Fiecare audit e făcut de o persoană care se uită efectiv la businessul tău, nu generat automat.' },
  { icon: '✎', titlu: 'Recomandări acționabile', descriere: 'Nu primești doar diagnostic. Primești pașii concreți de urmat, în ordinea priorității.' },
  { icon: '⇄', titlu: 'Fără abonament', descriere: 'O singură plată, 50 EUR. Nu te înscrii într-un contract lunar ca să afli ce nu funcționează.' },
  { icon: '🎥', titlu: 'Explicat, nu doar scris', descriere: 'Cele 2 video-uri personalizate îți arată exact unde te uiți și de ce contează.' },
  { icon: '🔗', titlu: 'Legătură cu execuția', descriere: 'Dacă vrei să și implementezi, aceeași echipă (UPPR Agency) poate prelua partea de marketing și retenție.' },
];

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        {/* 1. HERO */}
        <section className="container hero">
          <div className="hero-aurora" aria-hidden="true">
            <div className="aurora-blob" style={{ width: '50vw', height: '50vw', top: '-15vw', left: '10vw' }} />
            <div className="aurora-blob" style={{ width: '40vw', height: '40vw', bottom: '-15vw', right: '5vw', animationDelay: '-10s' }} />
          </div>
          <div className="grid-floor" aria-hidden="true" />

          <span className="badge hero-in">Auditul care arată ce distruge AI-ul ieftin</span>

          <h1 className="hero-in glitch" data-text="AI-ul îți face site-ul ieftin. Îți omoară businessul lent.">
            AI-ul îți face site-ul ieftin. Îți omoară businessul lent.
          </h1>

          <p className="hero-sub hero-in">
            Conținut generat automat, site construit rapid cu AI, postări scrise de un algoritm. Costă puțin azi.
            Pierzi vizite, audiență și followeri, lună de lună, până nu mai rămâne nimic de salvat.
          </p>

          <div className="hero-actions hero-in">
            <Link href="/formular" className="btn-primary">
              Vezi ce pierzi — 50 EUR
            </Link>
            <a href="#ce-primesti" className="btn-outline">
              Vezi ce primești
            </a>
          </div>

          <p className="hero-in cursor-blink" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginTop: '1.5rem' }}>
            {/* FAKE DATA */}
            &gt; 30 audituri livrate · 60 de zile
          </p>

          <div className="scroll-indicator hero-in">
            <span className="line" />
            <div className="scroll-mouse"><span /></div>
            <span>Vezi cum funcționează</span>
          </div>
        </section>

        {/* 2. MARQUEE */}
        <div className="marquee">
          <div className="marquee-track">
            {[...CLIENTI_MARQUEE, ...CLIENTI_MARQUEE].map((nume, i) => (
              <span key={i} className="marquee-item">{nume}</span>
            ))}
          </div>
        </div>

        {/* 2.5 LIVE PIPELINE */}
        <Reveal as="section" className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <HeroGraphic />
            <div className="gradient-border">
              <div className="card live-widget">
                <p style={{ marginBottom: '0.75rem' }}>
                  <span className="dot" />AUDIT_PIPELINE.status <span style={{ color: 'var(--text-muted)' }}>LIVE</span>
                </p>
                <div className="live-step">
                  <span>Comandă primită</span>
                  <span style={{ color: 'var(--violet-3)' }}>100%</span>
                </div>
                <div className="live-step">
                  <span>Analiză în curs</span>
                  <span style={{ color: 'var(--violet-3)' }}>72%</span>
                </div>
                <div className="live-step">
                  <span>Video-uri înregistrate</span>
                  <span style={{ color: 'var(--text-muted)' }}>pending</span>
                </div>
                <div className="live-step">
                  <span>Livrat în cont</span>
                  <span style={{ color: 'var(--text-muted)' }}>&lt; 48h</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 3. PHILOSOPHY */}
        <Reveal as="section" className="container">
          <span className="eyebrow">FILOSOFIA</span>
          <p style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', lineHeight: 1.4, maxWidth: 820 }}>
            AI-ul poate genera un site în 10 minute și o postare în 10 secunde. Nu poate să-ți spună de ce
            oamenii pleacă fără să cumpere. UPPR Consulting e stratul uman care verifică ce automatizarea a stricat,
            înainte să-ți piardă audiența definitiv.
          </p>
        </Reveal>

        {/* 4. THE MATH HAS CHANGED */}
        <Reveal as="section" className="container">
          <span className="eyebrow">CE SE SCHIMBĂ</span>
          <h2 className="section-title">Ieftin acum. Gol peste un an.</h2>
          <p className="section-sub">
            Fiecare pagină generată de AI, fiecare postare scrisă de un algoritm, arată puțin mai fals decât ceva
            făcut de un om. Vizitatorii simt asta, chiar dacă nu-ți spun de ce pleacă.
          </p>
          <div className="grid-2" style={{ marginTop: '2rem' }}>
            <div className="card">
              <span className="eyebrow" style={{ marginBottom: '0.5rem' }}>costul ascuns</span>
              <h3 style={{ fontSize: '1.1rem' }}>AI-ul erodează încrederea, nu o construiește</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Conținut generic, imagini care nu se potrivesc, ton fără personalitate. Fiecare vizitator care
                observă asta e un follower sau un client care nu se mai întoarce.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem' }}>
                {/* FAKE DATA */}
                <div><p className="stat-value">−41%</p><p className="stat-label">audiență pierdută în 6 luni, conturi majoritar AI</p></div>
              </div>
            </div>
            <div className="card">
              <span className="eyebrow" style={{ marginBottom: '0.5rem' }}>compensarea</span>
              <h3 style={{ fontSize: '1.1rem' }}>Un audit uman oprește scurgerea</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Vezi exact ce a rămas nefiresc, ce sună generic, ce nu se aliniază cu brandul tău real.
                Corectezi înainte să pierzi tot ce ai construit.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem' }}>
                {/* FAKE DATA */}
                <div><p className="stat-value">3×</p><p className="stat-label">retur mediu raportat de clienți</p></div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 5. WHERE TRAFFIC GOES */}
        <Reveal as="section" className="container">
          <span className="eyebrow">CE VEDE UN CLIENT</span>
          <h2 className="section-title">Diferența dintre generic și real, vizitatorii o simt în 3 secunde.</h2>
          <div className="grid-2" style={{ marginTop: '2rem' }}>
            <div className="card">
              <h3 style={{ fontSize: '1rem' }}>Site & conținut generate AI</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.75rem' }}>
                Vizitator ajunge → recunoaște tonul generic, imaginile fără sens → pleacă, fără să realizeze de ce.
              </p>
              <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '0.75rem' }}>✕ Audiența scade lent, lună de lună.</p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '1rem' }}>Verificat de un audit uman</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.75rem' }}>
                Vizitator ajunge → mesaj și identitate vizuală reale, coerente → ia decizia de a te contacta.
              </p>
              <p style={{ color: '#4ade80', fontSize: '0.85rem', marginTop: '0.75rem' }}>✓ Audiența rămâne și crește.</p>
            </div>
          </div>
        </Reveal>

        {/* 6. HOW OPTIONS STACK UP */}
        <Reveal as="section" className="container">
          <span className="eyebrow">CUM SE COMPARĂ</span>
          <h2 className="section-title">Trei moduri de a afla ce nu funcționează. Unul e construit pentru tine.</h2>
          <div className="card" style={{ marginTop: '2rem', overflowX: 'auto' }}>
            <table className="compare-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Îți dai singur seama</th>
                  <th>Freelancer random</th>
                  <th className="highlight">UPPR Consulting</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Timp până la rezultat</td><td>Nedefinit</td><td>1-2 săptămâni</td><td className="highlight">48 de ore</td></tr>
                <tr><td>Nivel de detaliu</td><td>Subiectiv</td><td>Variabil</td><td className="highlight">4 audituri structurate</td></tr>
                <tr><td>Explicat sau doar scris</td><td>—</td><td>De obicei doar text</td><td className="highlight">2 video-uri personalizate</td></tr>
                <tr><td>Cost</td><td>Timpul tău</td><td>Variabil, des peste 200 EUR</td><td className="highlight">50 EUR, o singură plată</td></tr>
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* 7. HOW WE START */}
        <Reveal as="section" className="container" id="cum-functioneaza">
          <div className="process-section" style={{ padding: 'clamp(2rem, 5vw, 3.5rem)' }}>
            <span className="badge" style={{ marginBottom: '1.5rem' }}>Procesul nostru</span>
            <div className="process-header">
              <h2>
                <span className="process-title-italic">De la comandă la</span>
                <span className="process-title-bold">Audit livrat rapid</span>
              </h2>
              <p className="process-header-note">
                Ținem lucrurile simple, fără birocrație — de la formular la livrarea în cont, în maximum 48 de ore.
              </p>
            </div>

            <div className="grid-auto" style={{ marginTop: '3rem' }}>
              {[
                { pas: '/01', titlu: 'Completezi formularul', desc: 'Datele tale și o scurtă descriere a businessului, 2 minute.', icon: '✎' },
                { pas: '/02', titlu: 'Plătești o singură dată', desc: '50 EUR prin Stripe, plată securizată, fără abonament.', icon: '⚙' },
                { pas: '/03', titlu: 'Echipa analizează', desc: 'Cele 4 audituri și cele 2 video-uri se pregătesc în maximum 48 de ore.', icon: '◎' },
                { pas: '/04', titlu: 'Primești totul în cont', desc: 'Acces instant în dashboard, fiecare livrabil apare pe măsură ce e gata.', icon: '⇢' },
              ].map((s) => (
                <div key={s.pas} className="card process-card">
                  <span className="eyebrow">{s.pas}</span>
                  <h3 style={{ fontSize: '1.15rem', marginTop: '0.5rem' }}>{s.titlu}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>{s.desc}</p>
                  <div className="process-icon-glow" />
                  <div className="process-icon">{s.icon}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 8. WHAT WE DO */}
        <Reveal as="section" className="container" id="ce-primesti">
          <span className="eyebrow">CE PRIMEȘTI</span>
          <h2 className="section-title">Patru audituri complete, un singur preț.</h2>
          <div className="grid-2" style={{ marginTop: '2rem' }}>
            {AUDITURI.map((item) => (
              <div key={item.titlu} className="gradient-border">
                <div className="card" style={{ height: '100%' }}>
                  <h3 style={{ fontSize: '1.05rem' }}>{item.titlu}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>{item.descriere}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* 9. BEYOND: VIDEOS */}
        <Reveal as="section" className="container">
          <span className="eyebrow">PE LÂNGĂ AUDITURI</span>
          <h2 className="section-title">Explicat pe voce, nu doar pe hârtie.</h2>
          <div className="grid-2" style={{ marginTop: '2rem' }}>
            {VIDEO.map((item) => (
              <div key={item.titlu} className="gradient-border">
                <div className="card" style={{ height: '100%' }}>
                  <h3 style={{ fontSize: '1.05rem' }}>{item.titlu}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>{item.descriere}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="card" style={{ marginTop: '1rem' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Vrei să și implementezi recomandările de marketing și retenție? <a href="https://uppr.agency" target="_blank" rel="noreferrer" style={{ color: 'var(--violet-3)' }}>UPPR Agency</a>, aceeași echipă, poate prelua execuția.
            </p>
          </div>
        </Reveal>

        {/* 10. WHY UPPR */}
        <Reveal as="section" className="container">
          <span className="eyebrow">DE CE UPPR CONSULTING</span>
          <h2 className="section-title">Avantajul UPPR.</h2>
          <div className="grid-auto" style={{ marginTop: '2rem' }}>
            {AVANTAJE.map((a) => (
              <div key={a.titlu} className="card">
                <span style={{ fontSize: '1.25rem' }}>{a.icon}</span>
                <h3 style={{ fontSize: '1rem', marginTop: '0.5rem' }}>{a.titlu}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>{a.descriere}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* 11. RECENZII */}
        {/* FAKE DATA — întreaga secțiune, până la primele recenzii reale */}
        <Reveal as="section" className="container">
          <div className="reviews-header">
            <span className="badge">Recenzii</span>
            <h2>Ce spun clienții.</h2>
            <p className="section-sub">
              Feedback real de la clienți care au aflat exact ce nu funcționa în identitatea lor vizuală și digitală.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <Link href="/formular" className="btn-primary">Comandă auditul</Link>
              <a href="#ce-primesti" className="btn-outline">Vezi ce primești</a>
            </div>
          </div>

          <div className="grid-2" style={{ marginTop: '2.5rem' }}>
            {[
              { nume: 'Ana Ionescu', rol: 'Fondator, studio de design interior', citat: 'Auditul mi-a arătat în 2 zile ce nu vedeam de luni de zile: site-ul meu nu spunea nimic despre ce mă diferențiază. Am schimbat homepage-ul și am simțit diferența imediat.' },
              { nume: 'Mihai Dobre', rol: 'Manager, clinică stomatologică', citat: 'Video-ul despre website a fost cel mai util. Mi-a explicat pas cu pas de ce oamenii abandonau formularul de programare.' },
              { nume: 'Cristina Popa', rol: 'Fondator, brand de cosmetice naturale', citat: 'Auditul de identitate vizuală a scos la iveală inconsistențe pe care nu le observasem între site și Instagram. Acum totul e aliniat.' },
            ].map((r) => (
              <div key={r.nume} className="card">
                <div className="review-card-head">
                  <div className="avatar-initials">
                    {r.nume.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h4>{r.nume}</h4>
                    <span>{r.rol}</span>
                  </div>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>„{r.citat}"</p>
                <p className="stars" style={{ marginTop: '1rem' }}>5.0 ★★★★★</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* 12. STRAIGHT FROM DASHBOARD */}
        <Reveal as="section" className="container">
          <span className="eyebrow">DIRECT DIN CONT</span>
          <h2 className="section-title">Așa arată contul tău după plată.</h2>
          <p className="section-sub">Livrabilele apar pe măsură ce sunt gata, nu trebuie să aștepți toate 6 deodată.</p>
          <div className="card" style={{ marginTop: '2rem', maxWidth: 480 }}>
            {['Audit social media', 'Audit identitate vizuală', 'Audit website', 'Audit UI/UX', 'Video — Website', 'Video — Identitate vizuală'].map((d, i) => (
              <div key={d} className="live-step">
                <span style={{ fontSize: '0.9rem' }}>{d}</span>
                <span className="label" style={{ color: i < 2 ? 'var(--violet-3)' : 'var(--text-muted)' }}>
                  {i < 2 ? 'Livrat' : 'În lucru'}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* 13. IS THIS A FIT */}
        <Reveal as="section" className="container">
          <span className="eyebrow">E POTRIVIT PENTRU TINE?</span>
          <h2 className="section-title">Construit pentru unele businessuri. Nu pentru toate.</h2>
          <div className="grid-2" style={{ marginTop: '2rem' }}>
            <div className="card">
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>probabil nu e potrivit</h3>
              <ul className="check-list">
                <li className="check-bad">Nu ai încă un website sau conturi social active</li>
                <li className="check-bad">Cauți doar un logo nou, fără context de business</li>
                <li className="check-bad">Vrei implementare inclusă, nu doar diagnostic</li>
              </ul>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>e potrivit</h3>
              <ul className="check-list">
                <li className="check-good">Ai un website și prezență social activă</li>
                <li className="check-good">Simți că ceva nu convertește, dar nu știi exact ce</li>
                <li className="check-good">Vrei un diagnostic clar înainte să investești în schimbări</li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* 14. CTA formular */}
        <Reveal as="section" className="container">
          <div className="gradient-border">
            <div className="card" style={{ textAlign: 'center' }}>
              <span className="eyebrow">AUDIT COMPLET, 50 EUR</span>
              <h2 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>Vezi exact ce ai de reparat.</h2>
              <ul className="check-list" style={{ display: 'inline-grid', textAlign: 'left', marginTop: '1.25rem' }}>
                <li className="check-good">4 audituri complete (social, brand, website, UI/UX)</li>
                <li className="check-good">2 video-uri personalizate, 30 de minute fiecare</li>
                <li className="check-good">Livrare în maximum 48 de ore</li>
                <li className="check-good">O singură plată, fără abonament</li>
              </ul>
              <div>
                <Link href="/formular" className="btn-primary" style={{ marginTop: '1.5rem' }}>
                  Comandă auditul — 50 EUR
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 15. UPSELL / cross-link */}
        <Reveal as="section" className="container">
          <span className="eyebrow">MERGI MAI DEPARTE</span>
          <div className="card">
            <h2 style={{ fontSize: '1.25rem' }}>Vrei ca cineva să și implementeze recomandările?</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              UPPR Agency, aceeași echipă din spatele UPPR Consulting, rulează marketing prin email și SMS
              pentru afaceri mici și mijlocii.
            </p>
            <a href="https://uppr.agency" target="_blank" rel="noreferrer" className="btn-primary" style={{ marginTop: '1.25rem' }}>
              Vezi UPPR Agency
            </a>
          </div>
        </Reveal>

        {/* 16. FAQ */}
        <Reveal as="section" className="container">
          <span className="eyebrow">ÎNTREBĂRI FRECVENTE</span>
          <h2 className="section-title">Răspunsuri clare, înainte să comanzi.</h2>
          <div style={{ marginTop: '1.5rem' }}>
            {[
              { q: 'Ce primesc exact pentru cei 50 EUR?', a: '4 audituri scrise (social media, identitate vizuală, website, UI/UX) și 2 video-uri personalizate de 30 de minute, unul despre website, unul despre identitate vizuală și social media.' },
              { q: 'Cât durează livrarea?', a: 'Maximum 48 de ore de la confirmarea plății. Livrabilele apar în contul tău pe măsură ce sunt gata, nu trebuie să aștepți toate 6 deodată.' },
              { q: 'Video-urile sunt generice sau personalizate?', a: 'Sunt personalizate, înregistrate special pentru businessul tău, nu materiale generice trimise tuturor clienților.' },
              { q: 'Ce fac cu auditul după ce îl primesc?', a: 'Conține recomandări concrete, în ordinea priorității. Le poți implementa singur, cu echipa ta, sau poți lucra cu UPPR Agency pentru execuție.' },
              { q: 'Există abonament sau plăți recurente?', a: 'Nu. O singură plată de 50 EUR, fără reînnoire automată.' },
              { q: 'Ce se întâmplă dacă nu sunt mulțumit?', a: 'Scrie-ne, analizăm fiecare caz individual. Detaliile complete sunt în politica de rambursare.' },
            ].map((item) => (
              <details key={item.q} className="faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>

        {/* 17. FINAL CTA */}
        <Reveal as="section" className="container">
          <div className="card" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.75rem' }}>Businessul tău vorbește. Întrebarea e ce transmite.</h2>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem' }}>
              48 de ore, un audit complet, fără abonament.
            </p>
            <Link href="/formular" className="btn-primary" style={{ marginTop: '1.5rem' }}>
              Comandă auditul — 50 EUR
            </Link>
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
