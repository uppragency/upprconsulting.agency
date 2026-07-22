import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CalculatorQuiz from '@/components/CalculatorQuiz';

export const metadata = { title: "What's slowness costing you? — UPPR Consulting" };

export default function CalculatorPage() {
  return (
    <>
      <Nav />
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '80px 32px 100px' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#55565e' }}>Quick estimate</span>
        <h1 style={{ margin: '12px 0 12px', fontSize: 38, fontWeight: 600, letterSpacing: '-0.03em' }}>What's slowness costing you?</h1>
        <p style={{ margin: '0 0 40px', color: '#55565e', fontSize: 15, lineHeight: 1.6 }}>
          Four quick questions. This gives a rough, illustrative estimate, not an audited number, to help you see the
          scale of the problem.
        </p>
        <CalculatorQuiz />
      </section>
      <Footer />
    </>
  );
}
