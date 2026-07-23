'use client';

import { useState, useEffect } from 'react';

export default function OrderSummary({
  initialCode,
  onCodeChange,
}: {
  initialCode?: string | null;
  onCodeChange: (code: string | null) => void;
}) {
  const [codeInput, setCodeInput] = useState(initialCode ?? '');
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function applyCode(code: string) {
    if (!code) return;
    setChecking(true);
    setError(null);
    try {
      const res = await fetch('/api/validate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (data.valid) {
        setAppliedCode(code.toUpperCase());
        setDiscountPercent(data.discountPercent ?? 0);
        onCodeChange(code.toUpperCase());
      } else {
        setError('That code is not valid.');
        setAppliedCode(null);
        setDiscountPercent(0);
        onCodeChange(null);
      }
    } finally {
      setChecking(false);
    }
  }

  useEffect(() => {
    if (initialCode) applyCode(initialCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCode]);

  function removeCode() {
    setAppliedCode(null);
    setDiscountPercent(0);
    setCodeInput('');
    onCodeChange(null);
  }

  const base = 47.97;
  const discount = appliedCode ? Math.round(base * (discountPercent / 100) * 100) / 100 : 0;
  const total = base - discount;

  const inputStyle: React.CSSProperties = {
    flex: 1,
    background: '#fbfaf8',
    border: '1px solid rgba(35,35,38,0.12)',
    borderRadius: 10,
    padding: '10px 12px',
    fontSize: 14,
    fontFamily: 'var(--font-body)',
    color: '#232326',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Order summary</h3>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <p style={{ margin: '0 0 10px', fontSize: 14.5, fontWeight: 600 }}>UPPR Consulting — Full Audit</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              'Social media audit',
              'Visual identity audit',
              'Website audit',
              'UI/UX audit',
              '2 personalized videos, 30 min each',
              'Delivered within 48 hours',
              'Access to your own client dashboard',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#3a3a40' }}>
                <span style={{ color: '#6a7d0a', fontFamily: 'var(--font-mono)', fontSize: 12 }}>✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
        <span style={{ fontSize: 14.5, fontWeight: 600, whiteSpace: 'nowrap' }}>€{base.toFixed(2)}</span>
      </div>

      {!appliedCode ? (
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            placeholder="Discount code"
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            style={inputStyle}
          />
          <button
            type="button"
            onClick={() => applyCode(codeInput)}
            disabled={checking || !codeInput}
            style={{ border: '1px solid rgba(35,35,38,0.15)', background: '#fff', borderRadius: 10, padding: '0 16px', fontSize: 13.5, cursor: 'pointer' }}
          >
            {checking ? '...' : 'Apply'}
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="tag-pill active" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            🏷 {appliedCode}
            <button
              type="button"
              onClick={removeCode}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 13, padding: 0, lineHeight: 1 }}
              aria-label="Remove code"
            >
              ×
            </button>
          </span>
        </div>
      )}
      {error && <p style={{ margin: 0, fontSize: 12.5, color: '#c0533f' }}>{error}</p>}

      <div style={{ borderTop: '1px solid rgba(35,35,38,0.08)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#55565e' }}>
          <span>Subtotal</span>
          <span>€{base.toFixed(2)}</span>
        </div>
        {appliedCode && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#6a7d0a' }}>
            <span>Discount · {appliedCode}</span>
            <span>− €{discount.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div style={{ borderTop: '1px solid rgba(35,35,38,0.1)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: 15, fontWeight: 700 }}>Total</span>
        <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>€{total.toFixed(2)}</span>
      </div>
    </div>
  );
}
