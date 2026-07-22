'use client';

import { useState } from 'react';
import { AUDIT_DEMOS } from '@/lib/audit-demos';
import AuditDemoPlayer from './AuditDemoPlayer';

export default function AuditDemoTabs() {
  const [activeKey, setActiveKey] = useState(AUDIT_DEMOS[0].key);
  const current = AUDIT_DEMOS.find((d) => d.key === activeKey)!;

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
        {AUDIT_DEMOS.map((d) => (
          <button
            key={d.key}
            onClick={() => setActiveKey(d.key)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '9px 16px',
              borderRadius: 99,
              fontSize: 13.5,
              fontWeight: 600,
              cursor: 'pointer',
              border: activeKey === d.key ? 'none' : '1px solid rgba(35,35,38,0.12)',
              background: activeKey === d.key ? '#232326' : '#fff',
              color: activeKey === d.key ? '#fff' : '#55565e',
            }}
          >
            <span>{d.icon}</span>
            {d.label}
          </button>
        ))}
      </div>
      <AuditDemoPlayer key={current.key} steps={current.steps} auditName={current.auditName} />
    </div>
  );
}
