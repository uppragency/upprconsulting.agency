'use client';

import { useState } from 'react';
import Link from 'next/link';

const QUESTIONS = [
  {
    q: 'How many monthly visitors does your website get?',
    options: [
      { label: 'Under 500', value: 300 },
      { label: '500 – 2,000', value: 1200 },
      { label: '2,000 – 10,000', value: 5000 },
      { label: 'Over 10,000', value: 15000 },
    ],
  },
  {
    q: "When did you last update your website's design?",
    options: [
      { label: 'In the last 6 months', value: 0.02 },
      { label: '1–2 years ago', value: 0.05 },
      { label: '2+ years ago', value: 0.09 },
      { label: "I don't remember", value: 0.13 },
    ],
  },
  {
    q: 'Is your social media presence consistent with your website?',
    options: [
      { label: 'Yes, fully aligned', value: 0 },
      { label: 'Mostly, some gaps', value: 0.03 },
      { label: 'Not really', value: 0.07 },
    ],
  },
  {
    q: 'Roughly, what does one new customer cost you in ads or effort?',
    options: [
      { label: 'Under €20', value: 20 },
      { label: '€20 – €50', value: 35 },
      { label: '€50 – €150', value: 100 },
      { label: 'Over €150', value: 200 },
    ],
  },
];

export default function CalculatorQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  function choose(value: number) {
    const next = [...answers, value];
    setAnswers(next);
    setStep(step + 1);
  }

  function reset() {
    setAnswers([]);
    setStep(0);
  }

  const isDone = step >= QUESTIONS.length;

  let estimate = 0;
  if (isDone) {
    const [visitors, frictionRate, brandGap, costPerCustomer] = answers;
    const lostVisitors = visitors * (frictionRate + brandGap);
    estimate = Math.round(lostVisitors * (costPerCustomer / 100));
  }

  return !isDone ? (
    <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 32 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#8a8b92' }}>
        Question {step + 1} of {QUESTIONS.length}
      </span>
      <h2 style={{ margin: '10px 0 24px', fontSize: 20, fontWeight: 600 }}>{QUESTIONS[step].q}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {QUESTIONS[step].options.map((o) => (
          <button
            key={o.label}
            onClick={() => choose(o.value)}
            style={{
              textAlign: 'left',
              padding: '14px 18px',
              borderRadius: 10,
              border: '1px solid rgba(35,35,38,0.12)',
              background: '#fbfaf8',
              fontSize: 15,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            }}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 24 }}>
        {QUESTIONS.map((_, i) => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 99, background: i <= step ? '#232326' : 'rgba(35,35,38,0.1)' }} />
        ))}
      </div>
    </div>
  ) : (
    <div style={{ background: '#232326', color: '#fff', borderRadius: 20, padding: 40, textAlign: 'center' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#e2fa5c' }}>Estimated monthly cost</span>
      <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em', margin: '14px 0' }}>
        ~€{estimate.toLocaleString('en-GB')}
      </div>
      <p style={{ margin: '0 0 28px', fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
        That's a rough estimate of visitors likely lost to an outdated site or inconsistent brand, valued at what a
        new customer costs you. A real audit shows exactly where.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/order" className="btn-accent" style={{ background: '#e2fa5c', color: '#232326', padding: '14px 28px', borderRadius: 99, fontSize: 15, fontWeight: 600 }}>
          Order the real audit — €47.97
        </Link>
        <button
          onClick={reset}
          style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', padding: '14px 24px', borderRadius: 99, fontSize: 14, cursor: 'pointer' }}
        >
          Start over
        </button>
      </div>
    </div>
  );
}
