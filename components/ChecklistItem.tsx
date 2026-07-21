'use client';

import { useState } from 'react';

export default function ChecklistItem({ item }: { item: { id: string; label: string; done: boolean } }) {
  const [done, setDone] = useState(item.done);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    const next = !done;
    setDone(next);
    setLoading(true);
    try {
      await fetch('/api/checklist/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: item.id, done: next }),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, cursor: 'pointer', opacity: loading ? 0.6 : 1 }}>
      <input type="checkbox" checked={done} onChange={toggle} style={{ width: 16, height: 16, flexShrink: 0 }} />
      <span style={{ textDecoration: done ? 'line-through' : 'none', color: done ? '#8a8b92' : '#232326' }}>{item.label}</span>
    </label>
  );
}
