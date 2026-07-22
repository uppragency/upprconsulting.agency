'use client';

import { useState } from 'react';
import { FAQS } from '@/lib/faqs';

export default function FaqAccordion({ items = FAQS }: { items?: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {items.map((f, i) => {
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
