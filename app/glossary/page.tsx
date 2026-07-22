import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { GLOSSARY_TERMS } from '@/lib/glossary-terms';

export const metadata = {
  title: 'Glossary — UPPR Consulting',
  description: 'Plain-language definitions of the website, brand, and marketing terms we use in our audits.',
};

export default function GlossaryPage() {
  return (
    <>
      <Nav />
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '80px 32px 100px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Glossary</span>
        <h1 style={{ margin: '12px 0 12px', fontSize: 40, fontWeight: 600, letterSpacing: '-0.03em' }}>Terms we use in our audits.</h1>
        <p style={{ margin: '0 0 40px', color: '#55565e', fontSize: 16, lineHeight: 1.6 }}>
          Plain-language definitions, no jargon. Linked automatically from our blog articles wherever these terms come up.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {GLOSSARY_TERMS.map((t) => (
            <div key={t.slug} id={t.slug} style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 14, padding: 22, scrollMarginTop: 100 }}>
              <h2 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 700 }}>{t.term}</h2>
              <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: '#55565e' }}>{t.def}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
