'use client';

import { useEffect, useState } from 'react';
import type { FindingStep } from '@/lib/audit-demos';

export default function AuditDemoPlayer({ steps, auditName }: { steps: FindingStep[]; auditName: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
    const id = setInterval(() => {
      setActive((a) => (a + 1) % steps.length);
    }, 2600);
    return () => clearInterval(id);
  }, [steps]);

  const current = steps[active];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,0.8fr) minmax(0,1.2fr)', gap: 32 }} className="grid-2-responsive">
      {/* Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {steps.map((s, i) => (
          <div key={s.tag} style={{ display: 'flex', gap: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 15,
                  flexShrink: 0,
                  background: i === active ? 'linear-gradient(135deg, #7c3aed, #a855f7)' : i < active ? '#e2e2e6' : 'transparent',
                  border: i >= active ? '1.5px solid rgba(35,35,38,0.15)' : 'none',
                  boxShadow: i === active ? '0 0 0 4px rgba(124,58,237,0.15)' : 'none',
                  color: i === active ? '#fff' : '#8a8b92',
                  transition: 'all 0.3s ease',
                }}
              >
                {s.icon}
              </div>
              {i < steps.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 24, background: i < active ? '#e2e2e6' : 'rgba(35,35,38,0.1)' }} />}
            </div>
            <div style={{ paddingBottom: 24 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#8a8b92', textTransform: 'uppercase' }}>{s.tag}</span>
              <p style={{ margin: '2px 0 0', fontSize: 14, fontWeight: i === active ? 700 : 500, color: i === active ? '#232326' : '#8a8b92' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Report card */}
      <div>
        <div
          key={active}
          style={{
            background: '#232326',
            borderRadius: 18,
            padding: 28,
            animation: 'fade-slide-in 0.4s ease',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#e2fa5c' }}>{auditName}</span>
          <h3 style={{ margin: '10px 0 12px', fontSize: 19, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{current.finding}</h3>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)' }}>{current.detail}</p>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 16, justifyContent: 'center' }}>
          {steps.map((_, i) => (
            <div key={i} style={{ width: i === active ? 20 : 6, height: 6, borderRadius: 99, background: i === active ? '#232326' : 'rgba(35,35,38,0.15)', transition: 'all 0.3s ease' }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fade-slide-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
