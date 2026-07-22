import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Audit Website, Identitate Vizuală și UI/UX România',
  description: 'Audit profesional de website, identitate vizuală, UI/UX și social media pentru afaceri din România. Livrare în 48 de ore, 250 RON, făcut de oameni, nu de unelte automate.',
  path: '/audit-website-romania',
});

const ACCENT = '#e2fa5c';

const SERVICES = [
  {
    id: 'audit-website',
    title: 'Audit website România',
    keyword: 'Audit website',
    desc: 'Verificăm structura site-ului, viteza de încărcare, textele și tot ce oprește vizitatorii să cumpere sau să te contacteze. Un audit de website profesional îți arată exact unde pierzi clienți, nu doar ce scor obții pe o unealtă automată.',
    points: ['Structură și navigare', 'Viteză de încărcare pe mobil', 'Text și mesaj principal (headline)', 'Formulare și pasul de conversie'],
  },
  {
    id: 'audit-identitate-vizuala',
    title: 'Audit identitate vizuală',
    keyword: 'Identitate vizuală',
    desc: 'Verificăm consistența logo-ului, culorilor și tipografiei pe toate canalele — site, social media, materiale printate. Un audit de identitate vizuală scoate la iveală inconsistențele pe care le vezi zilnic și nu le mai observi.',
    points: ['Consistență culori și logo pe toate canalele', 'Tipografie și ton de comunicare', 'Percepție vizuală față de concurență', 'Recomandări concrete de aliniere'],
  },
  {
    id: 'audit-ui-ux',
    title: 'Audit UI/UX',
    keyword: 'UI/UX',
    desc: 'Analizăm experiența de utilizare a site-ului sau aplicației tale: navigare, formulare, zone de fricțiune care fac vizitatorii să renunțe înainte să cumpere sau să se înscrie.',
    points: ['Fluxul de navigare, de la homepage la conversie', 'Zone tactile pe mobil (butoane, linkuri)', 'Gestionarea erorilor în formulare', 'Puncte de blocaj în experiența utilizatorului'],
  },
  {
    id: 'audit-social-media',
    title: 'Audit social media',
    keyword: 'Social media',
    desc: 'Analizăm Instagram, Facebook și celelalte conturi active: ce postări funcționează, unde pierzi engagement, și dacă mesajul de pe rețelele sociale se potrivește cu ce arată site-ul.',
    points: ['Consistență cu brandul de pe website', 'Ritm de postare și engagement real', 'Bio și linkuri funcționale', 'Recomandări de conținut concrete'],
  },
];

export default function AuditWebsiteRomaniaPage() {
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Audit website și identitate vizuală',
    provider: { '@type': 'Organization', name: 'UPPR Consulting' },
    areaServed: 'RO',
    description: 'Audit profesional de website, identitate vizuală, UI/UX și social media pentru afaceri din România.',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <Nav />

      <header style={{ maxWidth: 800, margin: '0 auto', padding: '80px 32px 40px', textAlign: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>
          Audit website & identitate vizuală · România
        </span>
        <h1 style={{ margin: '14px 0 14px', fontSize: 'clamp(1.9rem, 5vw, 48px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Audit de website, identitate vizuală și UI/UX pentru afaceri din România.
        </h1>
        <p style={{ margin: '0 auto', maxWidth: 620, color: '#55565e', fontSize: 17, lineHeight: 1.6 }}>
          Nu o unealtă automată — un om verifică manual site-ul, brandul și conturile tale de social media, și îți arată exact
          ce nu funcționează. Livrare în 48 de ore, 250 RON, o singură plată.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 28, flexWrap: 'wrap' }}>
          <Link href="/order" className="btn-dark" style={{ background: '#232326', color: '#fff', padding: '15px 30px', borderRadius: 99, fontSize: 15, fontWeight: 500 }}>
            Comandă auditul — 250 RON
          </Link>
          <Link href="/ro" style={{ padding: '15px 20px', fontSize: 15, fontWeight: 500, color: '#55565e' }}>
            Vezi mai multe detalii →
          </Link>
        </div>
      </header>

      {/* SERVICES, keyword-focused sections */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '40px 32px 80px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {SERVICES.map((s) => (
          <div key={s.id} id={s.id} style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 20, padding: 32, scrollMarginTop: 100 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92' }}>{s.keyword}</span>
            <h2 style={{ margin: '8px 0 12px', fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em' }}>{s.title}</h2>
            <p style={{ margin: '0 0 18px', fontSize: 15.5, color: '#55565e', lineHeight: 1.65 }}>{s.desc}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }} className="grid-2-responsive">
              {s.points.map((p) => (
                <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: '#3a3a40' }}>
                  <span style={{ color: '#6a7d0a', fontFamily: 'var(--font-mono)', fontSize: 12 }}>✓</span>
                  {p}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Why local businesses */}
      <section style={{ background: '#232326', color: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '72px 32px', textAlign: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: ACCENT }}>
            Pentru afaceri românești
          </span>
          <h2 style={{ margin: '12px 0 16px', fontSize: 'clamp(1.5rem, 4vw, 32px)', fontWeight: 600 }}>
            De la clinici stomatologice la studiouri de design, brand-uri de cosmetice și cafenele.
          </h2>
          <p style={{ margin: '0 auto', maxWidth: 560, color: 'rgba(255,255,255,0.7)', fontSize: 15.5, lineHeight: 1.6 }}>
            Lucrăm cu afaceri mici și mijlocii din toate industriile — nu doar cu magazine online. Un audit website, un audit
            de identitate vizuală, sau ambele, îți arată exact ce te costă lentoarea sau inconsistența brandului.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 640, margin: '0 auto', padding: '80px 32px', textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 12px', fontSize: 'clamp(1.5rem, 4vw, 32px)', fontWeight: 600, letterSpacing: '-0.02em' }}>
          250 RON. 4 audituri complete. 48 de ore.
        </h2>
        <p style={{ margin: '0 0 24px', color: '#55565e', fontSize: 15.5 }}>
          Fără abonament, fără contract lunar. O singură plată, rezultate concrete.
        </p>
        <Link href="/order" className="btn-accent" style={{ background: ACCENT, color: '#232326', padding: '16px 32px', borderRadius: 99, fontSize: 16, fontWeight: 600, display: 'inline-block' }}>
          Comandă auditul acum
        </Link>
      </section>

      <Footer />
    </>
  );
}
