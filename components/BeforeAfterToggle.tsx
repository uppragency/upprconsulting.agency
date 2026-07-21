'use client';

import { useState } from 'react';

// FAKE DATA — replace with real numbers once you have a track record
const BEFORE = {
  heading: 'What AI-only decisions cost you',
  points: [
    'Content sounds generic, no personality',
    "No one tells you why visitors leave",
    'Website and social media feel disconnected',
    'Decisions based on guesses, not data',
  ],
  stats: [
    { value: '−41%', label: 'audience lost in 6 months' },
    { value: '68%', label: 'visitors confused by mixed messaging' },
  ],
};

const AFTER = {
  heading: 'The clarity you get with UPPR',
  points: [
    'A clear, prioritized list of what to fix',
    'Explained on video, not just written',
    'Identity and website finally aligned',
    'Confident, audit-backed decisions',
  ],
  stats: [
    { value: '3×', label: 'average return reported by clients' },
    { value: '48h', label: 'from order to full audit' },
  ],
};

export default function BeforeAfterToggle() {
  const [after, setAfter] = useState(false);
  const data = after ? AFTER : BEFORE;

  return (
    <div>
      <div className="toggle-labels">
        <button
          type="button"
          className={!after ? 'active' : ''}
          onClick={() => setAfter(false)}
        >
          Before UPPR
        </button>
        <div className="toggle-switch" onClick={() => setAfter((v) => !v)} role="switch" aria-checked={after}>
          <div className={`toggle-knob ${after ? 'on' : ''}`} />
        </div>
        <button
          type="button"
          className={after ? 'active' : ''}
          onClick={() => setAfter(true)}
        >
          After UPPR
        </button>
      </div>

      <div className={`toggle-card ${after ? 'is-after' : 'is-before'}`}>
        <h3>{data.heading}</h3>
        <ul className="toggle-list">
          {data.points.map((p) => (
            <li key={p} className={after ? 'check-good' : 'check-bad'}>
              {p}
            </li>
          ))}
        </ul>
        <div className="toggle-stats">
          {data.stats.map((s) => (
            <div key={s.label} className="toggle-stat">
              <p className="toggle-stat-value">{s.value}</p>
              <p className="toggle-stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
