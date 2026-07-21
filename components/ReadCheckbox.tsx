'use client';

import { useState } from 'react';

export default function ReadCheckbox({ deliverableId, initialRead }: { deliverableId: string; initialRead: boolean }) {
  const [read, setRead] = useState(initialRead);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    const next = !read;
    setRead(next);
    setLoading(true);
    try {
      await fetch('/api/deliverables/mark-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deliverableId, read: next }),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: '#55565e', cursor: 'pointer', opacity: loading ? 0.6 : 1 }}>
      <input type="checkbox" checked={read} onChange={toggle} style={{ width: 14, height: 14 }} />
      I've reviewed this
    </label>
  );
}
