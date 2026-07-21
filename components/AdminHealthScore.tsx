'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminHealthScore({ clientId, initialScore }: { clientId: string; initialScore: number | null }) {
  const [score, setScore] = useState(initialScore ?? '');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSave() {
    setLoading(true);
    try {
      await fetch('/api/admin/health-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, score: score === '' ? null : Number(score) }),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 20 }}>
      <span style={{ fontSize: 15, fontWeight: 600 }}>Digital health score</span>
      <p style={{ margin: '6px 0 14px', fontSize: 12.5, color: '#55565e' }}>Shown to the client as a score out of 100. Leave empty to hide it.</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="number"
          min={0}
          max={100}
          value={score}
          onChange={(e) => setScore(e.target.value === '' ? '' : Number(e.target.value))}
          style={{ width: 100, border: '1px solid rgba(35,35,38,0.12)', borderRadius: 10, padding: '9px 12px', fontSize: 13.5, fontFamily: 'var(--font-body)' }}
        />
        <button
          onClick={handleSave}
          disabled={loading}
          className="btn-dark"
          style={{ background: '#232326', color: '#fff', border: 'none', borderRadius: 10, padding: '9px 14px', fontSize: 13.5, cursor: 'pointer' }}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}
