import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FaqAccordion from '@/components/FaqAccordion';
import { FAQS, EXTRA_FAQS } from '@/lib/faqs';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Frequently Asked Questions',
  description: 'Answers about pricing, delivery, billing, and how a UPPR Consulting audit actually works.',
  path: '/faq',
});

export default function FaqPage() {
  const allFaqs = [...FAQS, ...EXTRA_FAQS];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Nav />
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '80px 32px 100px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>FAQ</span>
        <h1 style={{ margin: '12px 0 12px', fontSize: 'clamp(1.75rem, 5vw, 42px)', fontWeight: 600, letterSpacing: '-0.03em' }}>
          Frequently asked questions.
        </h1>
        <p style={{ margin: '0 0 40px', color: '#55565e', fontSize: 16, lineHeight: 1.6 }}>
          Everything about pricing, delivery, billing, and how the audit works.
        </p>
        <FaqAccordion items={allFaqs} />
      </section>
      <Footer />
    </>
  );
}
