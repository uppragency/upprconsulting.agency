'use client';

import { useState } from 'react';
import Link from 'next/link';

const TEASER_FINDINGS = [
  'Mismatched brand colors between the homepage and social profiles',
  'A contact or booking form with more fields than it needs',
  'Mobile load time slower than the 2.5s threshold that affects rankings',
];

export default function CompetitorUrlWidget() {
  const [url, setUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (url.trim()) setSubmitted(true);
  }

  return (
    <div style={{ background: '#fff', border: '1px solid rgba(35,35,38,0.1)', borderRadius: 20, padding: 32 }}>
      {!submitted ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <input
            type="text"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a competitor's website URL"
            style={{ flex: '1 1 260px', border: '1px solid rgba(35,35,38,0.12)', borderRadius: 10, padding: '13px 16px', fontSize: 15, fontFamily: 'var(--font-body)' }}
          />
          <button
            type="submit"
            className="btn-dark"
            style={{ background: '#232326', color: '#fff', border: 'none', padding: '13px 24px', borderRadius: 10, fontSize: 14.5, fontWeight: 500, cursor: 'pointer' }}
          >
            See what a real audit could find
          </button>
        </form>
      ) : (
        <div>
          <p style={{ margin: '0 0 6px', fontSize: 13, color: '#8a8b92' }}>
            Illustrative example for <strong>{url}</strong> — not a real analysis of this site.
          </p>
          <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 700 }}>A real audit typically uncovers things like:</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {TEASER_FINDINGS.map((f) => (
              <div key={f} style={{ background: '#fbfaf8', border: '1px solid rgba(35,35,38,0.08)', borderRadius: 10, padding: '12px 16px', fontSize: 14 }}>
                {f}
              </div>
            ))}
          </div>
          <p style={{ margin: '0 0 16px', fontSize: 13.5, color: '#55565e' }}>
            Want to know what's actually true for your own site instead of a competitor's?
          </p>
          <Link href="/order" className="btn-accent" style={{ background: '#e2fa5c', color: '#232326', padding: '13px 24px', borderRadius: 99, fontSize: 14.5, fontWeight: 600, display: 'inline-block' }}>
            Order your real audit — €47.97
          </Link>
        </div>
      )}
    </div>
  );
}
