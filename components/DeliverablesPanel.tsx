'use client';

import { useState, useMemo } from 'react';
import { DeliverableIcon, DELIVERABLE_LABELS } from './DeliverableIcon';
import ReadCheckbox from './ReadCheckbox';

type Deliverable = {
  id: string;
  type: string;
  status: string;
  content_text: string | null;
  content_url: string | null;
  admin_note: string | null;
  delivered_at: string | null;
  read_by_client: boolean;
};

function isNew(deliveredAt: string | null) {
  if (!deliveredAt) return false;
  return Date.now() - new Date(deliveredAt).getTime() < 24 * 60 * 60 * 1000;
}

function DeliverableCard({ d }: { d: Deliverable }) {
  return (
    <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 16, padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: '#fbfaf8', border: '1px solid rgba(35,35,38,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <DeliverableIcon type={d.type} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 15, fontWeight: 600 }}>{DELIVERABLE_LABELS[d.type]}</span>
            {d.status === 'delivered' && isNew(d.delivered_at) && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, background: '#e2fa5c', color: '#232326', padding: '2px 8px', borderRadius: 99 }}>NEW</span>
            )}
            <span
              style={{
                marginLeft: 'auto',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                padding: '4px 10px',
                borderRadius: 99,
                background: d.status === 'delivered' ? 'rgba(226,250,92,0.25)' : 'rgba(35,35,38,0.06)',
                color: d.status === 'delivered' ? '#6a7d0a' : '#55565e',
              }}
            >
              {d.status === 'delivered' ? 'Delivered' : 'In progress'}
            </span>
          </div>

          {d.content_text && <p style={{ margin: '8px 0 0', fontSize: 13.5, color: '#55565e', lineHeight: 1.5 }}>{d.content_text}</p>}

          {d.admin_note && (
            <div style={{ marginTop: 10, background: '#fbfaf8', border: '1px solid rgba(35,35,38,0.08)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#3a3a40' }}>
              <strong>Note from the team:</strong> {d.admin_note}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 10, flexWrap: 'wrap' }}>
            {d.status === 'delivered' && d.content_url && (
              <a href={`/api/deliverables/${d.id}/download`} target="_blank" rel="noreferrer" style={{ fontSize: 13 }}>
                Open deliverable →
              </a>
            )}
            {d.status === 'delivered' && (
              <a
                href={`mailto:?subject=${encodeURIComponent(`${DELIVERABLE_LABELS[d.type]} — UPPR Consulting`)}&body=${encodeURIComponent(
                  `Sharing our "${DELIVERABLE_LABELS[d.type]}" audit deliverable.\n\nSign in to view it: https://upprconsulting-agency.vercel.app/login`
                )}`}
                style={{ fontSize: 13, color: '#55565e' }}
              >
                ✉️ Email to team
              </a>
            )}
            {d.status === 'delivered' && <ReadCheckbox deliverableId={d.id} initialRead={d.read_by_client} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DeliverablesPanel({ deliverables }: { deliverables: Deliverable[] }) {
  const [tab, setTab] = useState<'all' | 'delivered' | 'pending'>('all');
  const [search, setSearch] = useState('');

  const counts = useMemo(
    () => ({
      all: deliverables.length,
      delivered: deliverables.filter((d) => d.status === 'delivered').length,
      pending: deliverables.filter((d) => d.status !== 'delivered').length,
    }),
    [deliverables]
  );

  const filtered = useMemo(() => {
    return deliverables.filter((d) => {
      if (tab === 'delivered' && d.status !== 'delivered') return false;
      if (tab === 'pending' && d.status === 'delivered') return false;
      if (search && !DELIVERABLE_LABELS[d.type]?.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [deliverables, tab, search]);

  const audits = filtered.filter((d) => !d.type.startsWith('video_'));
  const videos = filtered.filter((d) => d.type.startsWith('video_'));

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '8px 16px',
    borderRadius: 99,
    fontSize: 13.5,
    fontWeight: 600,
    cursor: 'pointer',
    border: 'none',
    background: active ? '#232326' : '#fbfaf8',
    color: active ? '#fff' : '#55565e',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <button type="button" style={tabStyle(tab === 'all')} onClick={() => setTab('all')}>
          All ({counts.all})
        </button>
        <button type="button" style={tabStyle(tab === 'delivered')} onClick={() => setTab('delivered')}>
          Delivered ({counts.delivered})
        </button>
        <button type="button" style={tabStyle(tab === 'pending')} onClick={() => setTab('pending')}>
          In progress ({counts.pending})
        </button>
        <input
          type="text"
          placeholder="Search deliverables..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginLeft: 'auto', border: '1px solid rgba(35,35,38,0.12)', borderRadius: 99, padding: '8px 16px', fontSize: 13.5, fontFamily: 'var(--font-body)', minWidth: 180 }}
        />
      </div>

      {audits.length > 0 && (
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92', display: 'block', marginBottom: 10 }}>
            Audits
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {audits.map((d) => (
              <DeliverableCard key={d.id} d={d} />
            ))}
          </div>
        </div>
      )}

      {videos.length > 0 && (
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#8a8b92', display: 'block', marginBottom: 10 }}>
            Videos
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {videos.map((d) => (
              <DeliverableCard key={d.id} d={d} />
            ))}
          </div>
        </div>
      )}

      {!filtered.length && <p style={{ color: '#8a8b92', fontSize: 14 }}>No deliverables match your filter.</p>}
    </div>
  );
}
