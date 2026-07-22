'use client';

import { useState } from 'react';

export default function ResumePaymentButton({ clientId }: { clientId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not start payment.');
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong.');
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className="btn-accent"
        style={{ background: '#e2fa5c', color: '#232326', border: 'none', padding: '13px 26px', borderRadius: 99, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
      >
        {loading ? 'Redirecting to payment...' : 'Complete payment'}
      </button>
      {error && <p style={{ color: '#c0533f', fontSize: 13, marginTop: 8 }}>{error}</p>}
    </div>
  );
}
