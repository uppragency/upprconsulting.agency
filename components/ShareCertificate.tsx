'use client';

import { useRef, useState } from 'react';

export default function ShareCertificate({
  businessName,
  healthScore,
  deliveredCount,
  totalCount,
}: {
  businessName: string;
  healthScore: number | null;
  deliveredCount: number;
  totalCount: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    if (!ref.current) return;
    setLoading(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(ref.current, { backgroundColor: '#232326', scale: 2 });
      const link = document.createElement('a');
      link.download = `uppr-audit-${businessName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div
        ref={ref}
        style={{
          background: '#232326',
          color: '#fff',
          borderRadius: 20,
          padding: 32,
          fontFamily: 'var(--font-body)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
          <span style={{ width: 20, height: 20, background: '#e2fa5c', borderRadius: '50%', display: 'inline-block' }} />
          <span style={{ fontWeight: 700, fontSize: 14 }}>UPPR Consulting</span>
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#e2fa5c', margin: '0 0 8px' }}>
          Audit summary
        </p>
        <h3 style={{ margin: '0 0 20px', fontSize: 22, fontWeight: 700 }}>{businessName}</h3>
        <div style={{ display: 'flex', gap: 32 }}>
          {healthScore !== null && (
            <div>
              <div style={{ fontSize: 36, fontWeight: 700 }}>{healthScore}<span style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)' }}>/100</span></div>
              <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.6)' }}>Health score</div>
            </div>
          )}
          <div>
            <div style={{ fontSize: 36, fontWeight: 700 }}>{deliveredCount}/{totalCount}</div>
            <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.6)' }}>Delivered</div>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={handleDownload}
        disabled={loading}
        style={{ marginTop: 12, border: '1px solid rgba(35,35,38,0.12)', background: '#fff', borderRadius: 99, padding: '9px 18px', fontSize: 13.5, cursor: 'pointer' }}
      >
        {loading ? 'Preparing...' : 'Download as image'}
      </button>
    </div>
  );
}
