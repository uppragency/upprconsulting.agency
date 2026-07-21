'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LABELS: Record<string, string> = {
  social_audit: 'Social media audit',
  brand_audit: 'Visual identity audit',
  website_audit: 'Website audit',
  uiux_audit: 'UI/UX audit',
  video_website: '30-min video — Website',
  video_brand: '30-min video — Visual identity & social media',
};

export default function AdminDeliverableRow({
  deliverable,
}: {
  deliverable: { id: string; type: string; status: string; content_url: string | null };
}) {
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleLinkSave() {
    if (!link) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/deliverables/link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deliverableId: deliverable.id, url: link }),
      });
      if (!res.ok) throw new Error();
      setLink('');
      router.refresh();
    } catch {
      setError('Could not save the link.');
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('deliverableId', deliverable.id);
      formData.append('file', file);
      const res = await fetch('/api/admin/deliverables/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      setError('Upload failed.');
    } finally {
      setLoading(false);
      e.target.value = '';
    }
  }

  const isDelivered = deliverable.status === 'delivered';

  return (
    <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 15, fontWeight: 600 }}>{LABELS[deliverable.type] ?? deliverable.type}</span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            padding: '4px 10px',
            borderRadius: 99,
            background: isDelivered ? 'rgba(226,250,92,0.25)' : 'rgba(35,35,38,0.06)',
            color: isDelivered ? '#6a7d0a' : '#55565e',
          }}
        >
          {isDelivered ? 'Delivered' : 'Pending'}
        </span>
      </div>

      {isDelivered && deliverable.content_url && (
        <a href={`/api/deliverables/${deliverable.id}/download`} target="_blank" rel="noreferrer" style={{ fontSize: 13, display: 'block', marginBottom: 12 }}>
          Open current file/link →
        </a>
      )}

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="url"
          placeholder="Paste a video link (Loom, Vimeo...)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          style={{ flex: '1 1 220px', border: '1px solid rgba(35,35,38,0.12)', borderRadius: 10, padding: '9px 12px', fontSize: 13.5, fontFamily: 'var(--font-body)' }}
        />
        <button
          type="button"
          onClick={handleLinkSave}
          disabled={loading || !link}
          className="btn-dark"
          style={{ background: '#232326', color: '#fff', border: 'none', borderRadius: 10, padding: '9px 14px', fontSize: 13.5, cursor: 'pointer' }}
        >
          Save link
        </button>
        <label
          style={{
            border: '1px solid rgba(35,35,38,0.12)',
            borderRadius: 10,
            padding: '9px 14px',
            fontSize: 13.5,
            cursor: 'pointer',
            background: '#fbfaf8',
          }}
        >
          {loading ? 'Uploading...' : 'Upload PDF'}
          <input type="file" accept="application/pdf" onChange={handleFileUpload} disabled={loading} style={{ display: 'none' }} />
        </label>
      </div>
      {error && <p style={{ color: '#c0533f', fontSize: 12.5, marginTop: 8 }}>{error}</p>}
    </div>
  );
}
