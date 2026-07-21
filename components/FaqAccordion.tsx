'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: 'What exactly do I get for 50 EUR?',
    a: 'Four complete audits (social media, visual identity, website, UI/UX) plus two personalized 30-minute videos walking you through the findings — all delivered to your client dashboard within 48 hours.',
  },
  {
    q: 'How long does delivery take?',
    a: "48 hours from the moment you order. Deliverables appear in your account as they're ready, so you often get the first audits sooner.",
  },
  {
    q: 'Are the videos generic or personalized?',
    a: 'Fully personalized. Each video is recorded specifically about your website and your brand — a live walkthrough with concrete examples from your own pages and posts.',
  },
  {
    q: 'What do I do with the audit afterward?',
    a: 'Every audit ends with concrete next steps in priority order. You can implement them yourself, hand them to your team, or have UPPR Agency take over execution.',
  },
  {
    q: 'Is there a subscription or recurring payment?',
    a: "No. One payment of 50 EUR, nothing recurring, nothing to cancel. We don't even store your card details — payment is handled by Stripe.",
  },
  {
    q: "What if I'm not satisfied?",
    a: "Write to us within 14 days and we'll either rework the audit or refund you. Simple as that.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number>(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            className="faq-card"
            style={{
              background: '#fff',
              border: '1px solid rgba(35,35,38,0.08)',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 8px 24px -16px rgba(35,35,38,0.12)',
            }}
          >
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              style={{
                all: 'unset',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                width: '100%',
                padding: '20px 24px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: 16,
                fontWeight: 600,
                color: '#232326',
              }}
            >
              {f.q}
              <span
                style={{
                  flexShrink: 0,
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: isOpen ? '#232326' : 'rgba(35,35,38,0.06)',
                  color: isOpen ? '#fff' : '#232326',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 14,
                  transition: 'all 0.2s',
                }}
              >
                {isOpen ? '×' : '+'}
              </span>
            </button>
            {isOpen && (
              <p style={{ margin: 0, padding: '0 24px 22px', fontSize: 15, lineHeight: 1.6, color: '#55565e', maxWidth: 520 }}>{f.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
