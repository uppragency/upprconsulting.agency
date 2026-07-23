'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DiscountCodesManager({ codes }: { codes: { id: string; code: string; percent_off: number; active: boolean; times_used: number }[] }) {
  const [code, setCode] = useState('');
  const [percentOff, setPercentOff] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleCreate() {
    if (!code) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/discount-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, percentOff }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCode('');
      router.refresh();
    } catch (err: any) {
      setError(err.message ?? 'Could not create code.');
    } finally {
      setLoading(false);
    }
  }

  async function toggleActive(id: string, active: boolean) {
    setLoading(true);
    try {
      await fetch(`/api/admin/discount-codes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !active }),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    border: '1px solid rgba(35,35,38,0.12)',
    borderRadius: 10,
    padding: '9px 12px',
    fontSize: 14,
    fontFamily: 'var(--font-body)',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 22, display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#55565e' }}>
          New code
          <input style={{ ...inputStyle, textTransform: 'uppercase' }} value={code} onChange={(e) => setCode(e.target.value)} placeholder="SUMMER15" />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#55565e' }}>
          % off
          <input type="number" min={1} max={100} style={{ ...inputStyle, width: 90 }} value={percentOff} onChange={(e) => setPercentOff(Number(e.target.value))} />
        </label>
        <button
          onClick={handleCreate}
          disabled={loading || !code}
          className="btn-dark"
          style={{ background: '#232326', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 10, fontSize: 14, cursor: 'pointer' }}
        >
          Create
        </button>
      </div>
      {error && <p style={{ color: '#c0533f', fontSize: 13 }}>{error}</p>}

      <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(35,35,38,0.08)' }}>
              <th style={{ textAlign: 'left', padding: '14px 20px', color: '#55565e', fontWeight: 600, fontSize: 13 }}>Code</th>
              <th style={{ textAlign: 'left', padding: '14px 20px', color: '#55565e', fontWeight: 600, fontSize: 13 }}>Discount</th>
              <th style={{ textAlign: 'left', padding: '14px 20px', color: '#55565e', fontWeight: 600, fontSize: 13 }}>Times used</th>
              <th style={{ textAlign: 'left', padding: '14px 20px', color: '#55565e', fontWeight: 600, fontSize: 13 }}>Status</th>
              <th style={{ padding: '14px 20px' }} />
            </tr>
          </thead>
          <tbody>
            {codes.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px solid rgba(35,35,38,0.06)' }}>
                <td style={{ padding: '14px 20px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{c.code}</td>
                <td style={{ padding: '14px 20px' }}>{c.percent_off}%</td>
                <td style={{ padding: '14px 20px' }}>{c.times_used}</td>
                <td style={{ padding: '14px 20px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      padding: '4px 10px',
                      borderRadius: 99,
                      background: c.active ? 'rgba(226,250,92,0.25)' : 'rgba(35,35,38,0.06)',
                      color: c.active ? '#6a7d0a' : '#55565e',
                    }}
                  >
                    {c.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ padding: '14px 20px' }}>
                  <button
                    onClick={() => toggleActive(c.id, c.active)}
                    disabled={loading}
                    style={{ border: '1px solid rgba(35,35,38,0.12)', background: '#fff', borderRadius: 99, padding: '6px 14px', fontSize: 12.5, cursor: 'pointer' }}
                  >
                    {c.active ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
            {!codes.length && (
              <tr>
                <td colSpan={5} style={{ padding: '24px 20px', textAlign: 'center', color: '#8a8b92' }}>No codes yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
