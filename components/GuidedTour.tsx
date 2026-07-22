'use client';

import { useEffect, useState } from 'react';

const STEPS = [
  { title: 'Your progress', body: 'This bar fills up as each of your 6 deliverables gets marked ready.' },
  { title: 'Your deliverables', body: 'Audits and videos appear below as they arrive, no need to refresh.' },
  { title: 'Action checklist', body: 'Check off recommendations as you implement them, compared to other clients.' },
  { title: 'Order details', body: "Use this button any time for billing info, your submitted form, and receipts." },
];

export default function GuidedTour({ storageKey }: { storageKey: string }) {
  const [step, setStep] = useState(-1);

  useEffect(() => {
    const seen = localStorage.getItem(storageKey);
    if (!seen) setStep(0);
  }, [storageKey]);

  function close() {
    localStorage.setItem(storageKey, '1');
    setStep(-1);
  }

  function next() {
    if (step >= STEPS.length - 1) {
      close();
    } else {
      setStep(step + 1);
    }
  }

  if (step < 0) return null;
  const current = STEPS[step];

  return (
    <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 150, width: 'min(400px, calc(100vw - 32px))' }}>
      <div style={{ background: '#232326', color: '#fff', borderRadius: 16, padding: 22, boxShadow: '0 20px 50px -12px rgba(0,0,0,0.4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#e2fa5c' }}>
            {step + 1}/{STEPS.length}
          </span>
          <button onClick={close} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 14 }}>
            Skip
          </button>
        </div>
        <h4 style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700 }}>{current.title}</h4>
        <p style={{ margin: '0 0 16px', fontSize: 13.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.75)' }}>{current.body}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {STEPS.map((_, i) => (
              <div key={i} style={{ width: i === step ? 16 : 6, height: 6, borderRadius: 99, background: i === step ? '#e2fa5c' : 'rgba(255,255,255,0.2)', transition: 'all 0.2s' }} />
            ))}
          </div>
          <button
            onClick={next}
            style={{ background: '#e2fa5c', color: '#232326', border: 'none', padding: '8px 18px', borderRadius: 99, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
          >
            {step === STEPS.length - 1 ? 'Got it' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
