'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TestimonialActions({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function setStatus(status: 'approved' | 'rejected') {
    setLoading(true);
    try {
      await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <button
        onClick={() => setStatus('approved')}
        disabled={loading}
        className="btn-dark"
        style={{ background: '#232326', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 99, fontSize: 13, cursor: 'pointer' }}
      >
        Approve
      </button>
      <button
        onClick={() => setStatus('rejected')}
        disabled={loading}
        style={{ border: '1px solid rgba(192,83,63,0.4)', color: '#c0533f', background: 'transparent', padding: '8px 16px', borderRadius: 99, fontSize: 13, cursor: 'pointer' }}
      >
        Reject
      </button>
    </div>
  );
}
