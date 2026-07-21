'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const TEMPLATES = [
  'Optimize homepage headline',
  'Add alt text to images',
  'Fix mobile navigation',
  'Improve page load speed',
  'Update social media bio',
  'Add a clear call-to-action button',
  'Fix broken internal links',
  'Add customer testimonials',
];

export default function AdminChecklistManager({
  clientId,
  items,
}: {
  clientId: string;
  items: { id: string; label: string; done: boolean }[];
}) {
  const [label, setLabel] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function addItem(text: string) {
    if (!text) return;
    setLoading(true);
    try {
      await fetch('/api/admin/checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, label: text }),
      });
      setLabel('');
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(itemId: string) {
    setLoading(true);
    try {
      await fetch('/api/admin/checklist', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId }),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  const existingLabels = new Set(items.map((i) => i.label));

  return (
    <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 20 }}>
      <span style={{ fontSize: 15, fontWeight: 600 }}>Action checklist</span>
      <p style={{ margin: '6px 0 14px', fontSize: 12.5, color: '#55565e' }}>
        Items the client can check off as they implement your recommendations.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
        {items.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13.5 }}>
            <span>{item.label} {item.done && <span style={{ color: '#8a8b92' }}>(checked)</span>}</span>
            <button
              onClick={() => handleDelete(item.id)}
              disabled={loading}
              style={{ background: 'none', border: 'none', color: '#c0533f', fontSize: 12.5, cursor: 'pointer' }}
            >
              Remove
            </button>
          </div>
        ))}
        {!items.length && <p style={{ fontSize: 13, color: '#8a8b92', margin: 0 }}>No checklist items yet.</p>}
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        {TEMPLATES.filter((t) => !existingLabels.has(t)).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => addItem(t)}
            disabled={loading}
            style={{ fontSize: 12, border: '1px dashed rgba(35,35,38,0.2)', background: '#fbfaf8', borderRadius: 99, padding: '5px 12px', cursor: 'pointer', color: '#55565e' }}
          >
            + {t}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Or write a custom item..."
          style={{ flex: 1, border: '1px solid rgba(35,35,38,0.12)', borderRadius: 10, padding: '9px 12px', fontSize: 13.5, fontFamily: 'var(--font-body)' }}
        />
        <button
          onClick={() => addItem(label)}
          disabled={loading || !label}
          className="btn-dark"
          style={{ background: '#232326', color: '#fff', border: 'none', borderRadius: 10, padding: '9px 14px', fontSize: 13.5, cursor: 'pointer' }}
        >
          Add
        </button>
      </div>
    </div>
  );
}
